import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import test from '@/components/pages/test'
import home from '@/components/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
        path: '/test',
        name: 'test',
        component: test
      },
  ]
})
