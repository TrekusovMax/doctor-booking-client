import React, {
  Children,
  useCallback,
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
import PatientOrderModal from './patientOrderModal'
import {
  getCurrentMonth,
  getOrdersList,
  getOrdersOnMonth,
  setCurrentMonth,
} from '../../store/order'

const IndexCalendar = () => {
  const dispatch = useDispatch()

  const [myEvents, setEvents] = useState([])
  const ordersList = useSelector(getOrdersList())
  const date_from = useSelector(getDateFrom())
  const date_to = useSelector(getDateTo())
  const sheduleDays = useSelector(getDays())
  const getMonth = useSelector(getCurrentMonth())

  const [view, setView] = useState(Views.MONTH)
  const [date, setDate] = useState(new Date())

  const [startDay, setStartDay] = useState({
    hours: 0,
    minutes: 0,
  })
  const [endDay, setEndDay] = useState({
    hours: 23,
    minutes: 59,
  })

  const [receiptTime, setReceiptTime] = useState(5)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [orderTime, setOrderTime] = useState({
    start: moment().toDate(),
    end: moment().toDate(),
  })

  const onView = (newView) => setView(newView)
  const onNavigate = (newDate) => {
    setWorkTime(sheduleDays, newDate, setStartDay, setEndDay, setReceiptTime)
    setDate(newDate)
  }

  const month = new Date(date).getMonth() + 1
  const year = new Date(date).getFullYear()

  useEffect(() => {
    dispatch(setCurrentMonth(month, year))
    dispatch(getOrdersOnMonth(month, year))
  }, [month, year])

  const localizer = momentLocalizer(moment)

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
    // dispatch(getOrders())
  }, [])
  useEffect(() => {
    const newList = ordersList.map((item) => {
      return {
        ...item,
        start: moment(item.start).toDate(),
        end: moment(item.end).toDate(),
      }
    })
    setEvents(newList)
  }, [ordersList])

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
    if (allowedDays[`${capitalize(moment(start).format('dddd'))}`]) {
      setOrderTime({ start, end })
      setIsOrderModalOpen(true)
    }
  }

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
  const CustomEvent = ({ event }) => {
    return <BasicModal event={event} />
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
    moment()
      .toDate()
      .getFullYear(),
    moment()
      .toDate()
      .getMonth(),
    moment()
      .toDate()
      .getDate(),
    startDay.hours,
    startDay.minutes,
  )

  // Время окончания рабочего дня
  const max = new Date(
    moment()
      .toDate()
      .getFullYear(),
    moment()
      .toDate()
      .getMonth(),
    moment()
      .toDate()
      .getDate(),
    endDay.hours,
    endDay.minutes,
  )

  return (
    <>
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
        views={['month', 'day' /* , 'work_week' */]}
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
      <PatientOrderModal
        isOpen={isOrderModalOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        setEvents={setEvents}
        orderTime={orderTime}
      />
    </>
  )
}

export default IndexCalendar
