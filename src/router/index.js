import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

/* login */
import Login from '../views/login/'
/* layout*/
import Layout from '../views/layout/Layout';
Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/login',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      name: '首页',
      component: Layout,
      hidden: true
    }
  ]
})
