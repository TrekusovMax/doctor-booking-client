import axios from 'axios'
import config from '../config.json'
import httpService from './http.service'

const userEndpoint = 'order/'

const orderService = {
  getAll: async () => {
    const { data } = await httpService.get(userEndpoint + 'getAllOrders')
    return data
  },
  getOnMonth: async (month, year) => {
    const { data } = await httpService.get(
      userEndpoint + `getOrdersOnMonth/${month}/${year}`,
    )
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post(userEndpoint + 'sendOrder', payload)
    return data
  },
  changeStatus: async (id) => {
    const { data } = await httpService.patch(userEndpoint + id)
    return data
  },
  deleteOrder: async (id) => {
    const { data } = await httpService.delete(userEndpoint + id)
    return data
  },
}

export default orderService
