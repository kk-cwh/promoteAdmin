import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    alias: '/home',
    redirect: '/home/index',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    name: 'home',
    children: [{
      path: 'index',
      name: 'promote_index',
      meta: { title: '推广首页', icon: 'home' },
      component: () => import('@/views/promote/index')
    },
    {
      path: 'promote-publish',
      name: 'promote_publish',
      hidden: true,
      meta: { title: '发布公告', icon: 'form' },
      component: () => import('@/views/promote/publish')
    }

    ]
  },

  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/index',
    name: 'agent',
    // meta: { title: '代理管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'agent_index',
        component: () => import('@/views/agent/index'),
        meta: { title: '代理管理', icon: 'manage' }
      }
    ]
  },

  {
    path: '/promote-config',
    component: Layout,
    name: 'promote_config',
    children: [
      {
        path: 'index',
        name: 'promote_config_index',
        component: () => import('@/views/promote/config'),
        meta: { title: '推广配置', icon: 'config' }
      }

    ]
  },
  {
    path: '/promote-statistics',
    component: Layout,
    name: 'promote_statistics',
    children: [
      {
        path: 'index',
        name: 'promote_statistics_index',
        component: () => import('@/views/promote/statistics'),
        meta: { title: '推广统计', icon: 'count' }
      }

    ]
  },
  {
    path: '/income-statistics',
    component: Layout,
    name: 'income_statistics',
    children: [
      {
        path: 'index',
        name: 'income_statistics_index',
        component: () => import('@/views/income/statistics'),
        meta: { title: '收入统计', icon: 'count' }
      }

    ]
  },
  {
    path: '/income-detail',
    component: Layout,
    name: 'income_detail',
    children: [
      {
        path: 'index',
        name: 'income_detail_index',
        component: () => import('@/views/income/detail'),
        meta: { title: '收入明细', icon: 'detail' }
      }

    ]
  },
  {
    path: '/agent-feedback',
    component: Layout,
    name: 'agent_feedback',
    children: [
      {
        path: 'index',
        name: 'agent_feedback_index',
        component: () => import('@/views/agent/feedback'),
        meta: { title: '代理反馈', icon: 'feedback' }
      }

    ]
  },
  {
    path: '/merchant-binding',
    component: Layout,
    name: 'merchant_binding',
    children: [
      {
        path: 'index',
        name: 'merchant_binding_index',
        component: () => import('@/views/merchant/binding'),
        meta: { title: '商人绑定', icon: 'merchant' }
      }

    ]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   name: 'user',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'user_index',
  //       component: () => import('@/views/user/index'),
  //       meta: { title: '系统用户', icon: 'record' }
  //     }

  //   ]
  // },
  // {
  //   path: '/red-envelope-record',
  //   component: Layout,
  //   name: 'red_envelope_record',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'red_envelope_record_index',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '红包记录', icon: 'manage' }
  //     }

  //   ]
  // },
  {
    path: '/accounts',
    component: Layout,
    name: 'accounts',
    meta: { title: '财务管理', icon: 'manage' },
    children: [

      {
        path: 'settlement-account',
        name: 'settlement_account',
        component: () => import('@/views/accounts/settlement-account'),
        meta: { title: '结算账户', icon: 'user' }
      },
      {
        path: 'settlement-pwd',
        name: 'settlement_pwd',
        component: () => import('@/views/accounts/settlement-pwd'),
        meta: { title: '结算密码', icon: 'password' }
      },
      {
        path: 'settlement',
        name: 'settlement',
        component: () => import('@/views/accounts/settlement'),
        meta: { title: '提交结算', icon: 'money' }
      },
      {
        path: 'settlement-records',
        name: 'settlement_records',
        component: () => import('@/views/accounts/settlement-records'),
        meta: { title: '结算记录', icon: 'manage' }
      }

    ]
  },
  {
    path: '/merchant-manage',
    component: Layout,
    name: 'merchant_person_info',
    // meta: { title: '个人管理', icon: 'manage' },
    children: [
      {
        path: 'personinfo',
        name: 'person_info',
        component: () => import('@/views/merchant/personinfo'),
        meta: { title: '个人信息', icon: 'user' }
      }
      // {
      //   path: 'transfer',
      //   name: 'transfer',
      //   component: () => import('@/views/merchant/transfer'),
      //   meta: { title: '转账操作', icon: 'manage' }
      // },
      // {
      //   path: 'transfer-records',
      //   name: 'transfer_records',
      //   component: () => import('@/views/merchant/transferRecords'),
      //   meta: { title: '转账记录', icon: 'manage' }
      // },
      // {
      //   path: 'score-records',
      //   name: 'score_records',
      //   component: () => import('@/views/merchant/scoreRecords'),
      //   meta: { title: '进分记录', icon: 'manage' }
      // }

    ]
  },
  {
    path: '/merchant-manage',
    component: Layout,
    name: 'merchant_transfer',
    // meta: { title: '个人管理', icon: 'manage' },
    children: [
      {
        path: 'transfer',
        name: 'transfer',
        component: () => import('@/views/merchant/transfer'),
        meta: { title: '转账操作', icon: 'manage' }
      }

    ]
  },
  {
    path: '/merchant-manage',
    component: Layout,
    name: 'merchant_transfer_records',
    // meta: { title: '个人管理', icon: 'manage' },
    children: [

      {
        path: 'transfer-records',
        name: 'transfer_records',
        component: () => import('@/views/merchant/transferRecords'),
        meta: { title: '转账记录', icon: 'detail' }
      }

    ]
  }, {
    path: '/merchant-manage',
    component: Layout,
    name: 'merchant_score_records',
    // meta: { title: '个人管理', icon: 'manage' },
    children: [

      {
        path: 'score-records',
        name: 'score_records',
        component: () => import('@/views/merchant/scoreRecords'),
        meta: { title: '进分记录', icon: 'detail' }
      }

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

