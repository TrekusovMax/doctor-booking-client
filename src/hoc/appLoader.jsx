import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDataLoadingStatus,
  getIsLoggedIn,
  loadUsersList,
} from '../store/users'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersStatusLoading = useSelector(getDataLoadingStatus())
  useEffect(() => {
    dispatch(loadUsersList())
  }, [isLoggedIn])
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
export default AppLoader