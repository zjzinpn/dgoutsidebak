/** When your routing table is too long, you can split it into small modules**/

import Mobile from '@/views/mobile-manage/Mobile'

const mobileManage = {
  path: '/mobile',
  component: Mobile,
  alwaysShow: true,
  hidden:true,
  name: '移动端',
  redirect: 'noredirect',
  meta: {
    title: '移动端',
    icon: 'component',
    resources: 'mobile'
  },
  children: [
    {
      path: 'equickloan',
      component: () => import('@/views/mobile-manage/inclusive/equickloan'),
      name: 'e抵快贷',
      meta: { title: 'e抵快贷',icon: 'my-user', noCache: true, resources: 'equickloan'}
    }


  ]
};

export default mobileManage
