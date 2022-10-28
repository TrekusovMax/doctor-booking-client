import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import { generateAuthError } from '../utils/generateAuthError'
const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: false,
      dataLoaded: false,
      isRegistered: false,
      isDeleted: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
      isRegistered: false,
      isDeleted: false,
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
      state.dataLoaded = true
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload }
      state.isLoggedIn = true
      state.isRegistered = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLoggedOut: (state) => {
      state.auth = null
      state.entities = null
      state.isLoggedIn = false
      state.dataLoaded = false
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload
    },
    userDeleteSuccessed: (state) => {
      state.isDeleted = true
    },
    authRequested: (state) => {
      state.error = null
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
  userLoggedOut,
  userUpdateSuccessed,
  userDeleteSuccessed,
} = actions

const authRequested = createAction('users/authRequested')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const content = await userService.get()
    dispatch(usersReceved(content))
    return content
  } catch (error) {
    dispatch(usersRequestFiled(error))
  }
}
export const deleteUser = (id) => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const deletedUser = await userService.delete(id)
    const content = await userService.get()
    dispatch(usersReceved(content))
    dispatch(userDeleteSuccessed())
    return deletedUser
  } catch (error) {
    dispatch(usersRequestFiled(error))
  }
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
}

export const login = (payload) => async (dispatch) => {
  const { login, password } = payload

  dispatch(authRequested())
  try {
    const data = await authService.login({ login, password })

    dispatch(authRequestSuccess({ userId: data.userId }))
    localStorageService.setTokens(data)
    return data
  } catch (error) {
    const { code, message } = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(authRequestFailed(errorMessage))
    } else {
      dispatch(authRequestFailed(error.message))
    }
  }
}

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    dispatch(authRequestSuccess({ userId: data.userId, isRegistered: true }))
    return data
  } catch (error) {
    dispatch(authRequestFailed(error.response.data.error))
  }
}
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}

export const getUsersList = () => (state) => {
  return state.users.entities
}

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId)
  }
}
export const getUserCurrentData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null
}
export const clearAuthErrors = () => (dispatch) => {
  dispatch(authRequested())
}

export const getIsRegistered = () => (state) => state.users.isRegistered
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getDataLoadingStatus = () => (state) => state.users.isLoading
export const getCurrentUsersId = () => (state) => state.users.auth.userId
export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
