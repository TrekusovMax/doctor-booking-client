import axios from 'axios'
import config from '../config.json'

const http = axios.create({
  baseURL: config.apiEndpoint,
})

axios.interceptors.response.use(
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
