import moment from 'moment'
import { useSelector } from 'react-redux'
import { getOrdersList } from '../store/order'

const UseOrderList = () => {
  let ordersList = useSelector(getOrdersList())
  ordersList = ordersList.map((item) => {
    return {
      ...item,
      start: moment(item.start).toDate(),
      end: moment(item.end).toDate(),
    }
  })
  return { ordersList }
}

export default UseOrderList
