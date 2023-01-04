import moment from 'moment'

const UseWorkTime = (startDay, endDay) => {
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
  return { min, max }
}

export default UseWorkTime
