import { getToken, setToken, setKey, clearAllCache } from '@/utils/auth'
import http from '@/utils/request'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: 'https://avatars1.githubusercontent.com/u/16732754?s=40&v=4',
    isAdmin: false
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
    },
    SET_IS_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
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
            commit('SET_IS_ADMIN', !response.agency_user.isAdmin)
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    SysUserList({ commit, state }, query) {
      return http({
        url: '/api/users',
        method: 'get',
        params: query
      })
    },
    // 添加注册用户
    AddUser({ commit, state }, data) {
      return http({
        url: '/api/register',
        method: 'post',
        data: data
      })
    },
    // 代理列表
    AgencyList({ commit, state }, query) {
      return http({
        url: '/api/agencies',
        method: 'get',
        params: query
      })
    },
    // 添加代理
    AddAgency({ commit, state }, query) {
      return http({
        url: '/api/agencies/create',
        method: 'post',
        data: query
      })
    },
    // 推广首页数据
    GetAgencyHome({ commit, state }, query) {
      return http({
        url: '/api/agencies/home',
        method: 'get',
        params: query
      })
    },
    // 推广配置列表
    PromotionConfig({ commit, state }, query) {
      return http({
        url: '/api/agencies/promotion',
        method: 'get',
        params: query
      })
    },
    // 添加推广配置
    AddPromotionConfig({ commit, state }, data) {
      return http({
        url: '/api/agencies/promotion',
        method: 'post',
        data: data
      })
    },
    // 添加发布公告
    AddPublicReport({ commit, state }, data) {
      return http({
        url: '/api/notice/create',
        method: 'post',
        data: data
      })
    },
    // 更新发布公告
    UpdatePublicReport({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'patch',
        data: data
      })
    },
    // 推广统计
    PromotionList({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'get',
        params: data
      })
    },
    // 收入统计
    IncomeList({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'get',
        params: data
      })
    },
    // 收入明细
    IncomeDetail({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'get',
        params: data
      })
    },
    // 代理反馈
    FeedbackList({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'get',
        params: data
      })
    },
    // 商人绑定
    MerchantInfo({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'get',
        params: data
      })
    },
    // 结算记录
    SettlementRecords({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'get',
        params: data
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
