import axios from 'axios'
import config from '../config.json'

const httpService = axios.create({
  baseURL: config.apiEndpoint + '/order/',
})
const orderService = {
  get: async () => {
    const { data } = await httpService.get('getAllOrders')
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post('sendOrder', payload)
    return data
  },
}

export default orderService
