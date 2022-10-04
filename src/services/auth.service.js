import axios from 'axios'
import config from '../config.json'

const httpAuth = axios.create({
  baseURL: config.apiEndpoint,
})

const authService = {
  register: async ({ login, password, name }) => {
    const { data } = await httpAuth.post('/signUp')
    return data
  },
}

export default authService
