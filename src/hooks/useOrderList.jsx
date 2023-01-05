import moment from 'moment'
import { useSelector } from 'react-redux'
import { getIsLoading, getOrdersList } from '../store/order'

const UseOrderList = () => {
  let ordersList = useSelector(getOrdersList())
  const isLoadingData = useSelector(getIsLoading())
  ordersList = ordersList.map((item) => {
    return (
      !isLoadingData && {
        ...item,
        start: moment(item.start).toDate(),
        end: moment(item.end).toDate(),
      }
    )
  })
  return { ordersList }
}

export default UseOrderList
