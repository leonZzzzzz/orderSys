import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import ordersys from '@/components/page/ordersys'
import batchdel from '@/components/page/batchdel'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
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
  ]
})
