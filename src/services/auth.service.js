import axios from 'axios'
import config from '../config.json'
import localStorageService from './localStorage.service'

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + '/auth/',
})

const authService = {
  register: async ({ login, password, name, isAdmin }) => {
    const { data } = await httpAuth.post('signUp', {
      login,
      password,
      name,
      isAdmin,
    })
    return data
  },
  login: async ({ login, password }) => {
    const { data } = await httpAuth.post('signInWithPassword', {
      login,
      password,
    })

    return data
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grand_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    })

    return data
  },
}

export default authService
