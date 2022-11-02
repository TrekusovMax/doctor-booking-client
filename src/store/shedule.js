import { createAction, createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'shedule',
  initialState: {
    days: [],
    date_from: 0,
    date_to: 0,
    isLoading: true,
    error: null,
    dataLoaded: false,
  },

  reducers: {
    sheduleRequested: (state) => {
      state.isLoading = true
    },
    sheduleReceved: (state, action) => {
      state.days = action.payload.days
      state.date_from = action.payload.date_from
      state.date_to = action.payload.date_to
      state.isLoading = false
      state.dataLoaded = true
    },
    sheduleRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: sheduleReducer, actions } = usersSlice
const { sheduleRequested, sheduleReceved, sheduleRequestFiled } = actions

export default sheduleReducer
