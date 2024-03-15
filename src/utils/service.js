import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { getToken, removeToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'https://digiforen.double-cash.com'
})

service.interceptors.request.use(
  (config) => {
    const user = useUserStore()
    if (user.token) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data.status === 'fail') {
      if (response.data.code === 1220) {
        removeToken()
        router.push('/login')
      } else {
        console.log(response)
      }
    }
    return response
  },
  (error) => {
    const { response } = error
    if (response && response.data) {
      return Promise.reject(error)
    }
    const { message } = error
    console.error(message)
    return Promise.reject(error)
  }
)

export default service