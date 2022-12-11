import ordersReducer from './order'
import sheduleReducer from './shedule'
import usersReducer from './users'
const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
  users: usersReducer,
  shedule: sheduleReducer,
  orders: ordersReducer,
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  })
}
