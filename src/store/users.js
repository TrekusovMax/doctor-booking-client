import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false,
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true }
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
  },
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceved,
  usersRequestFiled,
  authRequestSuccess,
  authRequestFailed,
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')

function createUser(payload) {
  return async function(dispatch) {
    dispatch(userCreateRequested())
  }
}

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested())
  try {
    const content = await userService.get()
    dispatch(usersReceved(content))
  } catch (error) {
    dispatch(usersRequestFiled(error))
  }
}

export const signUp = ({ login, password, name, isAdmin }) => async (
  dispatch,
) => {
  dispatch(authRequested())
  try {
    const data = await authService.register({ login, password, name, isAdmin })
    console.log('tokens', data)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.localId }))
    dispatch(createUser())
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const getUsersList = () => (state) => {
  return state.users.entities
}

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId)
  }
}

export default usersReducer