import { isNull } from 'lodash'
import moment from 'moment'
import { capitalize } from './capitalize'
const CURRENT_DATE = moment().toDate()

export function getColorCels(value, date_from, date_to, allowedDays) {
  const dayOfWeek = capitalize(moment(value).format('dddd'))

  if (
    value >= date_from &&
    value <= date_to &&
    allowedDays[`${dayOfWeek}`] &&
    value >= CURRENT_DATE
  ) {
    return 'lightgreen'
  }

  if (
    moment(value).format('DD-YY-MMMM') === moment(date_to).format('DD-YY-MMMM')
  ) {
    return 'lightgreen'
  }

  if (
    value >= date_from &&
    isNull(date_to) &&
    allowedDays[`${dayOfWeek}`] &&
    value >= CURRENT_DATE
  ) {
    return 'lightgreen'
  }
  if (
    value >= date_from &&
    isNull(date_to) &&
    !allowedDays[`${dayOfWeek}`] &&
    value >= CURRENT_DATE
  ) {
    return '#F08080'
  }
  if (
    !allowedDays[`${dayOfWeek}`] &&
    value >= date_from &&
    value <= date_to &&
    value >= CURRENT_DATE
  ) {
    return '#F08080'
  }

  return 'lightgrey'
}
