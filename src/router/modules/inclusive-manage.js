/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const inclusiveManage = {
  path: '/inclusiveManage',
  component: Layout,
  alwaysShow: true,
  name: '普惠金融',
  redirect: 'noredirect',
  meta: {
    title: '普惠金融',
    icon: 'component',
    resources: 'inclusiveManage'
  },
  children: [
    {
      path: 'eQuickLoan',
      component: () => import('@/views/inclusive-manage/equickloan'),
      name: '个人e抵快贷',
      meta: { title: '个人e抵快贷', icon: 'my-user', noCache: true, resources: 'eQuickLoan' }
    },
    {
      path: 'corpLoan',
      component: () => import('@/views/inclusive-manage/corploan'),
      name: '小企业法人贷款',
      meta: { title: '小企业法人贷款', icon: 'my-user', noCache: true, resources: 'corpLoan' }
    },
    {
      path: 'inclusiveargs',
      component: () => import('@/views/inclusive-manage/inclusiveargs'),
      name: '参数管理',
      meta: { title: '参数管理', icon: 'my-user', noCache: true, resources: 'inclusiveargs' }
    }
  ]
};

export default inclusiveManage
