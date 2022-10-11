import axios from 'axios'
import config from '../config.json'

const httpAuth = axios.create({
  baseURL: config.apiEndpoint,
})

const authService = {
  register: async ({ login, password, name, isAdmin }) => {
    const { data } = await httpAuth.post('/auth/signUp', {
      login,
      password,
      name,
      isAdmin,
    })
    return data
  },
}

export default authService
