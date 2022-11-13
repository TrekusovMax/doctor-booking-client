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
import { capitalize } from '../../utils/capitalize'

import { getColorCels } from '../../utils/getColorCels'
import { setWorkTime } from './functions'

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
  const [startDay, setStartDay] = useState({
    hours: 0,
    minutes: 0,
  })
  const [endDay, setEndDay] = useState({
    hours: 23,
    minutes: 59,
  })
  const [receiptTime, setReceiptTime] = useState(5)

  const onView = (newView) => setView(newView)
  const onNavigate = (newDate) => {
    setWorkTime(sheduleDays, newDate, setStartDay, setEndDay, setReceiptTime)
    setDate(newDate)
  }

  const localizer = momentLocalizer(moment)
  const CURRENT_DATE = moment().toDate()

  //Установка выходных дней
  const daysOfWeek = []
  const allowedDays = {}
  sheduleDays &&
    sheduleDays.map((item) => daysOfWeek.push(...Object.keys(item)))
  sheduleDays &&
    sheduleDays.map(
      (day, i) => (allowedDays[daysOfWeek[i]] = day[daysOfWeek[i]].enabled),
    )

  useEffect(() => {
    dispatch(getShedule())
  }, [])

  // console.log(sheduleDays)
  const handleSelectSlot = ({ start, end }) => {
    setWorkTime(sheduleDays, start, setStartDay, setEndDay, setReceiptTime)

    if (view === Views.DAY || view === Views.MONTH) {
      if (
        moment(start).valueOf() >
        moment(date_to)
          .endOf('day')
          .valueOf()
      ) {
        return
      }
    }
    if (view === Views.MONTH) {
      //Если дата меньше текущей
      if (moment(start).valueOf() < moment().valueOf()) {
        return
      }
      //Если выходной
      if (!allowedDays[`${capitalize(moment(start).format('dddd'))}`]) {
        return
      }
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
  //const handleSelectEvent = useCallback((event) => <BasicModal />, [])

  const ColoredDateCellWrapper = ({ children, value }) => {
    if (view === Views.MONTH) {
      return React.cloneElement(Children.only(children, value), {
        style: {
          ...children.style,
          backgroundColor: getColorCels(value, date_from, date_to, allowedDays),
        },
      })
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
  const dayPropGetter = (date) => ({
    style: {
      backgroundColor: getColorCels(date, date_from, date_to, allowedDays),
    },
  })

  // Время начала рабочего дня
  const min = new Date(
    CURRENT_DATE.getFullYear(),
    CURRENT_DATE.getMonth(),
    CURRENT_DATE.getDate(),
    startDay.hours,
    startDay.minutes,
  )

  // Время окончания рабочего дня
  const max = new Date(
    CURRENT_DATE.getFullYear(),
    CURRENT_DATE.getMonth(),
    CURRENT_DATE.getDate(),
    endDay.hours,
    endDay.minutes,
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
      step={receiptTime}
      timeslots={1}
      max={max}
      min={min}
      onSelecting={onSelecting}
      dayPropGetter={dayPropGetter}
    />
  )
}

export default IndexCalendar
