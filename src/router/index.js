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
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout
    }
  ]
})
