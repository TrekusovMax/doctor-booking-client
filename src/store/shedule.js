import { createSlice } from '@reduxjs/toolkit'
import sheduleService from '../services/shedule.service'

const sheduleSlice = createSlice({
  name: 'shedule',
  initialState: {
    id: null,
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
      state.id = action.payload._id
      state.isLoading = false
      state.dataLoaded = true
    },
    sheduleRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: sheduleReducer, actions } = sheduleSlice
const { sheduleRequested, sheduleReceved, sheduleRequestFiled } = actions

export const getShedule = () => async (dispatch) => {
  dispatch(sheduleRequested())
  try {
    const content = await sheduleService.get()
    dispatch(sheduleReceved(content))
  } catch (error) {
    dispatch(sheduleRequestFiled(error))
  }
}

export const setNewShedule = (payload) => async (dispatch) => {
  dispatch(sheduleRequested())
  try {
    const content = await sheduleService.create(payload)
    dispatch(sheduleReceved(content))
  } catch (error) {
    dispatch(sheduleRequestFiled(error))
  }
}

export const getDays = () => (state) => state.shedule.days
export const getDateFrom = () => (state) => state.shedule.date_from
export const getDateTo = () => (state) => state.shedule.date_to
export const getIsLoading = () => (state) => state.shedule.isLoading
export const getSheduleId = () => (state) => state.shedule.id

export default sheduleReducer
