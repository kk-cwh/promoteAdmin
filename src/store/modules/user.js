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
    SysUserList({ commit, state }, params) {
      return http({
        url: '/api/users',
        method: 'get',
        params
      })
    },
    // 添加注册用户
    AddUser({ commit, state }, data) {
      return http({
        url: '/api/register',
        method: 'post',
        data
      })
    },
    // 代理下的直属玩家
    AgencyPlayer({ commit, state }, params) {
      return http({
        url: '/api/agencies/activePlayers',
        method: 'get',
        params
      })
    },
    // 玩家明细
    AgencyPlayerDetail({ commit, state }, params) {
      return http({
        url: `/api/agencies/activePlayersDetail/${params.id}`,
        method: 'get',
        params
      })
    },
    // 代理列表
    AgencyList({ commit, state }, params) {
      return http({
        url: '/api/agencies',
        method: 'get',
        params
      })
    },
    // 添加代理
    AddAgency({ commit, state }, data) {
      return http({
        url: '/api/agencies/create',
        method: 'post',
        data
      })
    },
    // 更新代理稅率
    UpdateAgency({ commit, state }, data) {
      return http({
        url: `/api/agencies/update/${data.id}`,
        method: 'patch',
        data
      })
    },
    // 推广首页数据
    GetAgencyHome({ commit, state }, params) {
      return http({
        url: '/api/agencies/home',
        method: 'get',
        params
      })
    },
    // 推广配置列表
    PromotionConfig({ commit, state }, params) {
      return http({
        url: '/api/agencies/promotion',
        method: 'get',
        params
      })
    },
    // 添加推广配置
    AddPromotionConfig({ commit, state }, data) {
      return http({
        url: '/api/agencies/promotion',
        method: 'post',
        data
      })
    },
    // 添加发布公告
    AddPublicReport({ commit, state }, data) {
      return http({
        url: '/api/notice/create',
        method: 'post',
        data
      })
    },
    // 更新发布公告
    UpdatePublicReport({ commit, state }, data) {
      return http({
        url: `/api/notice/update/${data.id}`,
        method: 'patch',
        data
      })
    },
    // 推广统计
    PromotionList({ commit, state }, params) {
      return http({
        url: `/api/statement/promotion`,
        method: 'get',
        params
      })
    },
    // 收入统计
    IncomeList({ commit, state }, params) {
      return http({
        url: `/api/statement/income`,
        method: 'get',
        params
      })
    },
    // 收入明细
    IncomeDetail({ commit, state }, params) {
      return http({
        url: `/api/statement/incomeDetail`,
        method: 'get',
        params
      })
    },
    // 代理反馈
    FeedbackList({ commit, state }, params) {
      return http({
        url: `/api/agencies/feedback`,
        method: 'get',
        params
      })
    },
    // 代理反馈
    AddFeedback({ commit, state }, data) {
      return http({
        url: `/api/agencies/feedback`,
        method: 'post',
        data
      })
    },
    // 商人绑定联系方式s
    MerchantInfos({ commit, state }, params) {
      return http({
        url: `/api/agencies/merchant`,
        method: 'get',
        params
      })
    },
    // 商人绑定
    MerchantBinding({ commit, state }, data) {
      return http({
        url: `/api/agencies/merchant`,
        method: 'post',
        data
      })
    },
    // 结算账户
    SettlementAccount({ commit, state }, data) {
      return http({
        url: `/api/agencies/payInfo`,
        method: 'post',
        data
      })
    },
    // 结算密码
    SettlementPwd({ commit, state }, data) {
      return http({
        url: `/api/agencies/payPassword`,
        method: 'post',
        data
      })
    },
    // 提交结算 get 提交结算base
    SettlementBefore({ commit, state }, params) {
      return http({
        url: `/api/agencies/payCash`,
        method: 'get',
        params
      })
    },
    // 提交结算
    SettlementSubmit({ commit, state }, params) {
      return http({
        url: `/api/agencies/payCashStore`,
        method: 'get',
        params
      })
    },
    // 结算记录
    SettlementRecords({ commit, state }, params) {
      return http({
        url: `/api/agencies/payLog`,
        method: 'get',
        params
      })
    },
    // 转账操作
    Transfer({ commit, state }, data) {
      return http({
        url: `/api/agencies/transformGold`,
        method: 'post',
        data
      })
    },
    // 转账记录
    TransferRecords({ commit, state }, params) {
      return http({
        url: `/api/agencies/transformPlayerList`,
        method: 'get',
        params
      })
    },
    // 进分记录
    ScoreRecords({ commit, state }, params) {
      return http({
        url: `/api/agencies/transformAgencyList`,
        method: 'get',
        params
      })
    },
    // 个人信息 / 代理商信息
    GetAgencyInfo({ commit, state }, params) {
      return http({
        url: `/api/agencies/info`,
        method: 'get',
        params
      })
    },
    // 重置转账密码
    ResetTransferPwd({ commit, state }, data) {
      return http({
        url: `/api/agencies/transformPassword`,
        method: 'post',
        data
      })
    },
    // 发送手机验证码
    sendPhoneCode({ commit, state }, data) {
      return http({
        url: `/api/auth/getCode`,
        method: 'post',
        data
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
