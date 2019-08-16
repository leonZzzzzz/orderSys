import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import ordersys from '@/components/page/ordersys'
import batchdel from '@/components/page/batchdel'
import billing from '@/components/page/billing'
import navbar from '@/components/page/navBar'
import stated from '@/components/page/stated'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: navbar,
      children: [
        {
          path: '/ordersys',
          name: 'ordersys',
          component: ordersys
        },
        {
          path: '/batchdel',
          name: 'batchdel',
          component: batchdel
        },
        {
          path: '/billing',
          name: 'billing',
          component: billing
        },
        {
          path: '/stated',
          name: 'stated',
          component: stated
        },
      ]
    },
  ]
})
