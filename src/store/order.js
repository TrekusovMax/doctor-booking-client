import { createSlice } from '@reduxjs/toolkit'
import { isArray } from 'lodash'
import orderService from '../services/order.service'

const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    isLoading: true,
    error: null,
    dataLoaded: false,
    date: { month: null, year: null },
  },

  reducers: {
    orderRequested: (state) => {
      state.isLoading = true
    },
    orderReceved: (state, action) => {
      isArray(action.payload)
        ? (state.orders = action.payload)
        : state.orders.push(action.payload)

      state.isLoading = false
      state.dataLoaded = true
    },
    orderRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    orderDeleted: (state, action) => {
      state.isLoading = false
      state.dataLoaded = true
    },
    orderStatusChanged: (state, action) => {
      state.isLoading = false
      state.dataLoaded = true
    },
    setOrderDate: (state, action) => {
      state.date = action.payload
    },
  },
})

const { reducer: ordersReducer, actions } = ordersSlice
const {
  orderRequested,
  orderReceved,
  orderRequestFiled,
  setOrderDate,
  orderStatusChanged,
  orderDeleted,
} = actions

export const getOrders = () => async (dispatch) => {
  dispatch(orderRequested())
  try {
    const content = await orderService.getAll()
    dispatch(orderReceved(content))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}
export const setCurrentMonth = (month, year) => async (dispatch) => {
  try {
    dispatch(setOrderDate({ month, year }))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}
export const getOrdersOnMonth = (month, year) => async (dispatch) => {
  dispatch(orderRequested())
  try {
    const content = await orderService.getOnMonth(month, year)
    dispatch(orderReceved(content))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}
export const createOrder = (payload) => async (dispatch) => {
  dispatch(orderRequested())
  try {
    const content = await orderService.create(payload)
    dispatch(orderReceved(content))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}
export const deleteOrder = (payload) => async (dispatch) => {
  dispatch(orderRequested())
  try {
    await orderService.deleteOrder(payload.id)
    dispatch(orderDeleted())
    dispatch(getOrdersOnMonth(payload.month, payload.year))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}
export const changeStatusOrder = (payload) => async (dispatch) => {
  dispatch(orderRequested())
  try {
    await orderService.changeStatus(payload.id)
    dispatch(orderStatusChanged())
    dispatch(getOrdersOnMonth(payload.month, payload.year))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}

export const getOrdersList = () => (state) => state.orders.orders
export const getCurrentMonth = () => (state) => state.orders.date

export default ordersReducer
