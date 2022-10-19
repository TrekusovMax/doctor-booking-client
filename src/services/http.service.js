import axios from 'axios'
import config from '../config.json'
import authService from './auth.service'
import localStorageService from './localStorage.service'

const http = axios.create({
  baseURL: config.apiEndpoint,
})

http.interceptors.request.use(
  async function(config) {
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpires = refreshToken && expiresDate < Date.now()

    if (isExpires) {
      const data = await authService.refresh()
      localStorageService.setTokens(data)
    }
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
    return config
  },
  function(error) {
    console.log('error', error)
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedErrors) {
      console.error('Unexpected error!')
    }
    return Promise.reject(error)
  },
)
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
}

export default httpService
