import React, { Children, useCallback, useId, useMemo, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import CustomToolbar from './CustomToolbar '
import BasicModal from './Modal'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import 'moment-timezone'
import 'moment/locale/ru'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const IndexCalendar = () => {
  const CURRENT_DATE = moment().toDate()
  const events = [
    {
      id: useId(),
      start: moment().toDate(),
      end: moment().toDate(),
      title: 'Some title',
    },
  ]

  const [myEvents, setEvents] = useState(events)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      if (moment(start).valueOf() >= moment().valueOf()) {
        const title = window.prompt('Новое событие')

        if (title) {
          setEvents((prev) => [...prev, { start, end, title }])
        }
      }
    },
    [setEvents],
  )
  //const handleSelectEvent = useCallback((event) => <BasicModal />, [])
  const localizer = momentLocalizer(moment)

  const ColoredDateCellWrapper = ({ children, value }) =>
    React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
      },
    })

  const onSelecting = useCallback((range) => {
    return false
  }, [])

  const messages = {
    week: 'Неделя',
    work_week: 'Рабочая неделя',
    day: 'День',
    month: 'Месяц',
    previous: 'Предыдущая неделя',
    next: 'Следующая неделя',
    today: 'Сегодня',
    agenda: 'Подробнее',
  }
  /*   const handleEventClick = (event) => {
    console.log(event)
  } */

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
      monthHeaderFormat: (date) => capitalize(moment(date).format('MMMM YYYY г.')),
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
      defaultView="month"
      events={myEvents}
      style={{ height: '100vh' }}
      views={['month', 'day', 'work_week']}
      messages={messages}
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
