import React, {
  Children,
  useCallback,
  useId,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import CustomToolbar from './CustomToolbar '
import BasicModal from './Modal'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment-timezone'
import 'moment/locale/ru'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDateFrom,
  getDateTo,
  getDays,
  getShedule,
} from '../../store/shedule'
import { capitalize, isNull } from 'lodash'
import shallowEqual from 'shallowequal'

const IndexCalendar = () => {
  const events = [
    {
      id: useId(),
      start: moment().toDate(),
      end: moment().toDate(),
      title: 'Some title',
    },
  ]
  const dispatch = useDispatch()
  const date_from = useSelector(getDateFrom())
  const date_to = useSelector(getDateTo())
  const sheduleDays = useSelector(getDays())

  const [view, setView] = useState(Views.MONTH)
  const [date, setDate] = useState(new Date())
  const [myEvents, setEvents] = useState(events)

  const onView = (newView) => setView(newView)
  const onNavigate = (newDate) => setDate(newDate)

  const localizer = momentLocalizer(moment)
  const CURRENT_DATE = moment().toDate()

  useEffect(() => {
    dispatch(getShedule())
  }, [])
  //console.log(sheduleDays)

  const handleSelectSlot = ({ start, end }) => {
    if (view === Views.MONTH) {
      setView(Views.DAY)
      setDate(moment(start))
      return
    }
    if (moment(start).valueOf() >= moment().valueOf()) {
      const title = window.prompt('Новое событие')

      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    }
  }
  const daysOfWeek = []
  const allowedDays = {}
  //const handleSelectEvent = useCallback((event) => <BasicModal />, [])
  sheduleDays &&
    sheduleDays.map(
      (item) => daysOfWeek.push(...Object.keys(item)),
      //console.log(item['Среда'] && item['Среда'].enabled),
    )

  sheduleDays &&
    sheduleDays.map(
      (day, i) => (allowedDays[daysOfWeek[i]] = day[daysOfWeek[i]].enabled),
    )

  //console.log(allowedDays)
  const ColoredDateCellWrapper = ({ children, value }) => {
    if (view === Views.MONTH) {
      //  console.log(allowedDays[`${capitalize(moment(value).format('dddd'))}`])
      //console.log(moment(value).format('dddd'))
      //sheduleDays.map((s) => console.log(s[`${capitalize(moment(value).format('dddd'))}`]))
      if (
        value >= date_from &&
        value < date_to &&
        allowedDays[`${capitalize(moment(value).format('dddd'))}`]
      ) {
        return React.cloneElement(Children.only(children, value), {
          style: {
            ...children.style,
            backgroundColor: 'lightgreen',
          },
        })
      }

      if (value >= date_from && isNull(date_to)) {
        return React.cloneElement(Children.only(children, value), {
          style: {
            ...children.style,
            backgroundColor: 'lightgreen',
          },
        })
      }
      if (
        !allowedDays[`${capitalize(moment(value).format('dddd'))}`] &&
        value >= date_from &&
        value < date_to
      ) {
        return React.cloneElement(Children.only(children, value), {
          style: {
            ...children.style,
            backgroundColor: 'red',
          },
        })
      }
      return React.cloneElement(Children.only(children, value), {
        style: {
          ...children.style,
          backgroundColor: 'lightgrey',
        },
      })

      /*return React.cloneElement(Children.only(children, value), {
        style: {
          ...children.style,
          backgroundColor:
            value >= date_from && value < date_to ? 'lightgreen' : 'lightgrey',
          backgroundColor:
            value >= date_from && isNull(date_to) ? 'lightgreen' : 'lightgrey',
          backgroundColor:
            allowedDays &&
            allowedDays[`${capitalize(moment(value).format('dddd'))}`]
              ? 'lightgreen'
              : 'red',
        }, 
      })*/
    }
  }

  const onSelecting = useCallback((range) => {
    return false
  }, [])

  //Настройка внешнего вида события
  const CustomEvent = (event) => {
    return <BasicModal event={event} />
    /* return (
      <span className="flex  justify-between flex-nowrap">
        <strong> {event.title} </strong>
      </span>
    ) */
  }
  //Заглавная буква в названии
  function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
  }
  //Форматы дат
  const formats = useMemo(
    () => ({
      dayHeaderFormat: (date) => moment(date).format('DD MMMM YYYY г.'),
      dayFormat: (date) => moment(date).format('DD MMMM'),
      agendaDateFormat: (date) => moment(date).format('DD MMMM'),
      monthHeaderFormat: (date) =>
        capitalize(moment(date).format('MMMM YYYY г.')),
      dayRangeHeaderFormat: ({ start, end }) =>
        moment(start).format('DD MMMM') + ' - ' + moment(end).format('DD MMMM'),
      dateFormat: (date) => moment(date).format('D'),
      weekdayFormat: (date, culture, localizer) =>
        capitalize(localizer.format(date, 'dddd', culture)),
    }),
    [],
  )
  // Время начала рабочего дня
  const min = new Date(
    CURRENT_DATE.getFullYear(),
    CURRENT_DATE.getMonth(),
    CURRENT_DATE.getDate(),
    8,
  )

  // Время окончания рабочего дня
  const max = new Date(
    CURRENT_DATE.getFullYear(),
    CURRENT_DATE.getMonth(),
    CURRENT_DATE.getDate(),
    17,
  )

  return (
    <Calendar
      formats={formats}
      culture={'ru-RU'}
      localizer={localizer}
      defaultDate={new Date()}
      date={date}
      view={view}
      defaultView={view}
      events={myEvents}
      style={{ height: '100vh' }}
      onView={onView}
      onNavigate={onNavigate}
      views={['month', 'day', 'work_week']}
      selectable
      onSelectSlot={handleSelectSlot} //запись события
      //onSelectEvent={handleSelectEvent}
      components={{
        dateCellWrapper: ColoredDateCellWrapper,
        toolbar: CustomToolbar,
        event: CustomEvent,
      }}
      step={10}
      timeslots={1}
      max={max}
      min={min}
      onSelecting={onSelecting}
    />
  )
}

export default IndexCalendar
