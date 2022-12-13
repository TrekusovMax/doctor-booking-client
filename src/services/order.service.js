import axios from 'axios'
import config from '../config.json'

const httpService = axios.create({
  baseURL: config.apiEndpoint + '/order/',
})
const orderService = {
  getAll: async () => {
    const { data } = await httpService.get('getAllOrders')
    return data
  },
  getOnMonth: async (month, year) => {
    const { data } = await httpService.get(`getOrdersOnMonth/${month}/${year}`)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post('sendOrder', payload)
    return data
  },
}

export default orderService
