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
    }]
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
        component: () => import('@/views/form/index'),
        meta: { title: '商人绑定', icon: 'form' }
      }

    ]
  },
  {
    path: '/red-envelope-record',
    component: Layout,
    name: 'red_envelope_record',
    children: [
      {
        path: 'index',
        name: 'red_envelope_record_index',
        component: () => import('@/views/form/index'),
        meta: { title: '红包记录', icon: 'record' }
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

