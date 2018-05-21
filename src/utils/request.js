import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, getKey } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

function needRefreshToken() {
  const oData = new Date(getKey('expired_at')).getTime() // 过期时间 的戳
  const nData = new Date().getTime()
  const stamp = oData - nData
  const minutes = parseInt((stamp % (1000 * 60 * 60)) / (1000 * 60))
  return minutes >= 30
}

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    console.log(response)
    const status = response.status
    if (status === 200 || status === 201 || status === 204) {
      return response.data
    } else {
      return Promise.reject('error')
    }
  },
  error => {
    console.log('error.response:', error.response)// for debug
    Message({
      message: error.response.statusText,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
