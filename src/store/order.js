import { createAction, createSlice } from '@reduxjs/toolkit'
import { isArray } from 'lodash'
import orderService from '../services/order.service'

const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    isLoading: true,
    error: null,
    dataLoaded: false,
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
  },
})

const { reducer: ordersReducer, actions } = ordersSlice
const { orderRequested, orderReceved, orderRequestFiled } = actions

export const getOrders = () => async (dispatch) => {
  dispatch(orderRequested())
  try {
    const content = await orderService.get()
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
    //getOrders()
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}

export const getOrdersList = () => (state) => state.orders.orders

export default ordersReducer
