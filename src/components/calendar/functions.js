import { capitalize } from '../../utils/capitalize'
import moment from 'moment'
import shallowEqual from 'shallowequal'

export const setWorkTime = (
  sheduleDays,
  start,
  setStartDay,
  setEndDay,
  setReceiptTime,
) => {
  const dayOfWeek = capitalize(moment(start).format('dddd'))
  const today = sheduleDays.filter((day) =>
    shallowEqual(Object.keys(day).join(), dayOfWeek),
  )[0]
  setStartDay({
    hours: today[dayOfWeek].hoursStart,
    minutes: today[dayOfWeek].minutesStart,
  })
  setEndDay({
    hours: today[dayOfWeek].hoursEnd,
    minutes: today[dayOfWeek].minutesEnd,
  })
  setReceiptTime(today[dayOfWeek].receiptTime)
}
