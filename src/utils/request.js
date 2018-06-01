import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, setToken, getKey, setKey } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://dev.agency.com',
  timeout: 15000 // 请求超时时间
})

function needRefreshToken() {
  const expired_at = getKey('expired_at')
  const oData = +new Date(expired_at) // 过期时间的戳
  const nData = +new Date()
  const stamp = oData - nData
  const minutes = parseInt(stamp / (1000 * 60))
  return !(minutes >= 30)
}

function getRefreshToken() {
  // 刷新token 注意这里用到的service
  return service.get('/api/auth/refresh')
    .then((res) => { return Promise.resolve(res.data) })
}

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer' + ' ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改

    if (needRefreshToken() && config.url.indexOf('/api/auth/refresh') === -1 && config.url.indexOf('/api/logout') === -1 && config.url.indexOf('/api/auth/login') === -1) {
      getRefreshToken().then(res => {
        // window.isRefreshing = false
        setKey('expired_at', res.expired_at)
        setToken(res.token)
        config.headers.Authorization = 'Bearer' + ' ' + res.token
      }).catch(() => {
        Message({
          message: '登陆已过期,请重新登陆！',
          type: 'error',
          duration: 5 * 1000
        })
        window.location.href = '#/login'
      })
    }
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const status = response.status
    if (status === 200 || status === 201 || status === 204) {
      return response.data
    } else {
      return Promise.reject('error')
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
