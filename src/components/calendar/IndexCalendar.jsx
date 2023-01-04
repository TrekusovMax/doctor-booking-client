import React, {
  Children,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react'

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import CustomToolbar from './CustomToolbar'
import { Modal } from '@mui/material'
import BasicModal from './Modal'
import moment from 'moment'
import UseCalendar from '../../hooks/useWorkTime'

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
import { getUserCurrentData } from '../../store/users'
import { getColorCels } from '../../utils/getColorCels'
import { setWorkTime } from './functions'
import PatientOrderModal from './patientOrderModal'
import { getOrdersOnMonth, setCurrentMonth } from '../../store/order'
import UseOrderList from '../../hooks/useOrderList'

const IndexCalendar = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getUserCurrentData())
  const { ordersList } = UseOrderList()
  const date_from = useSelector(getDateFrom())
  const date_to = useSelector(getDateTo())
  const sheduleDays = useSelector(getDays())

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
  //Установка выходных дней
  const daysOfWeek = []
  const allowedDays = {}
  const localizer = momentLocalizer(moment)

  //получение текущего месяца и года
  const month = new Date(date).getMonth() + 1
  const year = new Date(date).getFullYear()

  const onView = (newView) => setView(newView)

  const onNavigate = (newDate) => {
    setWorkTime(sheduleDays, newDate, setStartDay, setEndDay, setReceiptTime)
    setDate(newDate)
  }
  useEffect(() => {
    dispatch(setCurrentMonth(month, year))
    dispatch(getOrdersOnMonth(month, year))
  }, [month, year])

  //получение расписания
  useEffect(() => {
    dispatch(getShedule())
  }, [])

  sheduleDays &&
    sheduleDays.map((item) => daysOfWeek.push(...Object.keys(item)))
  sheduleDays &&
    sheduleDays.map(
      (day, i) => (allowedDays[daysOfWeek[i]] = day[daysOfWeek[i]].enabled),
    )

  //нажатие на ячейку
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

  const onSelecting = useCallback(() => {
    return false
  }, [])

  //Настройка внешнего вида события
  const CustomEvent = ({ event }) => {
    if (currentUser && currentUser.isAdmin) return <BasicModal event={event} />
    return
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

  // Время окончания рабочего дня
  const { min, max } = useMemo(() => UseCalendar(startDay, endDay), [date])

  const OrderModal = React.forwardRef(() => (
    <PatientOrderModal
      setIsOrderModalOpen={setIsOrderModalOpen}
      orderTime={orderTime}
    />
  ))

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
        events={ordersList}
        style={{ height: '100vh' }}
        onView={onView}
        onNavigate={onNavigate}
        views={['month', 'day']}
        selectable
        onSelectSlot={handleSelectSlot} //запись события
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
      <Modal open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
        <OrderModal />
      </Modal>
    </>
  )
}

export default IndexCalendar
