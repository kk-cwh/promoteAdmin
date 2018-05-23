import { getToken, setToken, setKey, clearAllCache } from '@/utils/auth'
import http from '@/utils/request'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/auth/login',
          method: 'post',
          data: { name: userInfo.username, password: userInfo.password }
        }).then(response => {
          if (response.data) {
            const data = response.data
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            setKey('expired_at', data.expired_at)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取登陆用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/user',
          method: 'get'
        }).then(response => {
          if (response.agency_user) {
            commit('SET_NAME', response.agency_user.name)
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    SysUserList({ commit, state }, query) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/users',
          method: 'get',
          params: query
        }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/logout',
          method: 'delete'
        }).then(response => {
          commit('SET_TOKEN', '')
          clearAllCache()
          resolve(response)
        }).catch(error => {
          clearAllCache()
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        clearAllCache()
        resolve()
      })
    }
  }
}

export default user
