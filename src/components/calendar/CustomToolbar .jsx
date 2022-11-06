import React from 'react'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const CustomToolbar = (props) => {
  const goToBack = () => {
    props.onNavigate('PREV')
  }
  const goToNext = () => {
    props.onNavigate('NEXT')
  }
  const goToCurrent = () => {
    props.onNavigate('TODAY')
  }
  const goToDayView = () => {
    props.onView('day')
  }
  const goToWeekView = () => {
    props.onView('work_week')
  }
  const goToMonthView = () => {
    props.onView('month')
  }

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          <span className="next-icon">
            {props.view === 'month' ? 'Предыдущий месяц' : ''}
            {props.view === 'day' ? 'Предыдущий день' : ''}
            {props.view === 'work_week' ? 'Предыдущая неделя' : ''}
          </span>
        </button>
        <button type="button" onClick={goToCurrent}>
          <span className="next-icon">Сегодня</span>
        </button>
        <button type="button" onClick={goToNext}>
          <span className="fa fa-chevron-right">
            {props.view === 'month' ? 'Следующий месяц' : ''}
            {props.view === 'day' ? 'Следующий день' : ''}
            {props.view === 'work_week' ? 'Следующая неделя' : ''}
          </span>
        </button>
      </span>
      <span className="rbc-toolbar-label">
        <strong>{props.label}</strong>
      </span>
      <span className="rbc-btn-group">
        <button type="button" onClick={goToMonthView}>
          Месяц
        </button>
        <button type="button" onClick={goToDayView}>
          День
        </button>
        <button type="button" onClick={goToWeekView}>
          Рабочая неделя
        </button>
      </span>
    </div>
  )
}

export default CustomToolbar
