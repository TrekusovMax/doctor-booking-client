import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const CustomToolbar = (props) => {
  /* moment.updateLocale('ru', {
    months: [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ],
  }) */
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

  /* const setLabel = (view) => {
    switch (view) {
      case 'month':
        moment.updateLocale('ru', {
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
        })
        return moment(props.date).format('MMMM YYYY г.')
      case 'day':
        //console.log(props)
        return moment(props.date).format('DD MMMM YYYY')
      case 'work_week':
        //console.log(props)
        //const days = props.label.replace(/[^\w–]/g, '')

        return moment(props.date).format(` MMMM YYYY г.`)
    }
  } */

  //console.log(moment().local().format('MMMM'))
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          <span className="next-icon">Предыдущий месяц</span>
        </button>
        <button type="button" onClick={goToCurrent}>
          <span className="next-icon">Сегодня</span>
        </button>
        <button type="button" onClick={goToNext}>
          <span className="fa fa-chevron-right">Следующий месяц</span>
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
