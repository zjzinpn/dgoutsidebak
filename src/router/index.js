import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import Mobile from '@/views/mobile-manage/Mobile'


/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import treeTableRouter from './modules/tree-table'
// import nestedRouter from './modules/nested'

// 系统管理
import systemManage from "./modules/system-manage";
import inclusiveManage from "./modules/inclusive-manage";
import mobileManage from "./modules/mobile-manage";


/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/my',
    component: Layout,
    hidden: true,
    children:[
      {
        path: 'loginInfo',
        component: () => import('@/views/dashboard/myDashboard/loginInfo'),
        name: 'loginInfo',
        meta: { title: '个人信息', icon: 'user', noCache: true}
      }
    ]
  },
  // mobileManage,
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: false, resources: 'dashboard'}
      }
    ]
  },


  // {
  //   path: '/',
  // component: Mobile,
  // alwaysShow: true,
  // hidden:true,
  // name: '移动端',
  // redirect: 'equickloan',
  // children: [
  //   {
  //     path: 'equickloan',
  //     component: () => import('@/views/mobile-manage/inclusive/equickloan'),
  //     name: 'e抵快贷',
  //     meta: { title: 'e抵快贷',icon: 'my-user', noCache: true, resources: 'equickloan'}
  //   }
  // ]
  // },



]

export default new Router({
  // mode: 'history', // require service support
 // base: 'xiao-xiao-su',
    base: '/',
    mode: 'history',
    //  mode:'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})



// 异步挂载的路由
// 动态需要根据权限加载的路由表
// 这个路由链，根据数据库中的一一对应，也就是说这是一个最完整的路由链，
// 根据登录的用户权限的不同，然后从中提取出对应当前用户的路由添加到vue router中
// meta:属性中resources属性最为重要，用meta.resources和我们获取用户信息中menus.resources匹配
export const asyncRoutes = [

  systemManage,
  inclusiveManage,


  { path: '*', redirect: '/404', hidden: true }
]
