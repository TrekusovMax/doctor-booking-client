import usersReducer from './users'
const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
  users: usersReducer,
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  })
}
