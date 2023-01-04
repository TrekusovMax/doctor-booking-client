import { createSlice } from '@reduxjs/toolkit'
import { isArray } from 'lodash'
import orderService from '../services/order.service'

const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    order: {},
    isLoading: true,
    error: null,
    dataLoaded: false,
    date: { month: null, year: null },
    orderTime: {},
  },

  reducers: {
    orderRequested: (state) => {
      state.isLoading = true
    },
    orderClear: (state) => {
      state.orders = []
    },
    orderReceved: (state, action) => {
      isArray(action.payload)
        ? (state.orders = action.payload)
        : state.orders.push(action.payload)
      state.isLoading = false
      state.dataLoaded = true
    },
    orderRecevedOne: (state, action) => {
      state.order = action.payload
      state.isLoading = false
      state.dataLoaded = true
    },
    orderRecevedAll: (state, action) => {
      state.orders = action.payload
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
    setOrderTime: (state, action) => {
      state.orderTime = action.payload
    },
  },
})

const { reducer: ordersReducer, actions } = ordersSlice
const {
  orderRecevedOne,
  orderRecevedAll,
  orderRequested,
  orderReceved,
  orderRequestFiled,
  setOrderDate,
  orderStatusChanged,
  orderDeleted,
  setOrderTime,
  orderClear,
} = actions

export const clear = () => async (dispatch) => {
  dispatch(orderClear())
}

export const getOrderById = (id) => async (dispatch) => {
  dispatch(orderRequested())
  try {
    const content = await orderService.getById(id)
    dispatch(orderRecevedOne(content))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}
export const getAllOrders = () => async (dispatch) => {
  dispatch(orderRequested())
  try {
    const content = await orderService.getAll()
    dispatch(orderRecevedAll(content))
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}
export const setTime = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderTime(JSON.stringify(payload)))
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
export const deleteOrderFromList = (payload) => async (dispatch) => {
  dispatch(orderRequested())
  try {
    await orderService.deleteOrder(payload.id)
    dispatch(orderDeleted())
    dispatch(getAllOrders())
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
export const changeStatusOrderFromList = (payload) => async (dispatch) => {
  dispatch(orderRequested())
  try {
    await orderService.changeStatus(payload.id)
    dispatch(orderStatusChanged())
    dispatch(getAllOrders())
  } catch (error) {
    dispatch(orderRequestFiled(error))
  }
}

export const getOneOrder = () => (state) => state.orders.order
export const getOrdersList = () => (state) => state.orders.orders
export const getCurrentMonth = () => (state) => state.orders.date
export const getOrderTime = () => (state) => state.orders.orderTime
export const getIsLoading = () => (state) => state.orders.isLoading
export const getError = () => (state) => state.orders.error

export default ordersReducer
