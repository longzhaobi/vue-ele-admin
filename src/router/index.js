import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

/* login */
import Login from '../views/login/'
/* layout*/
import Layout from '../views/layout/Layout';

// dashboard
const dashboard = resolve => require(['../views/dashboard/index'], resolve);

/* Introduction*/
const Introduction = resolve => require(['../views/introduction/index'], resolve);

/* components*/
const componentsIndex = resolve => require(['../views/components/index'], resolve);
const Tinymce = resolve => require(['../views/components/tinymce'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/login',
      component: Login,
      hidden: true
    },{
      path: '/',
      name: '首页',
      redirect: '/dashboard',
      component: Layout,
      hidden: true,
      children: [{ path: 'dashboard', component: dashboard }]
    },{
      path: '/introduction',
      component: Layout,
      redirect: '/introduction/index',
      icon: 'xinrenzhinan',
      noDropdown: true,
      children: [
        { path: 'index', component: Introduction, name: '简述' }
      ]
    },{
      path: '/components',
      component: Layout,
      redirect: '/components/index',
      name: '组件',
      icon: 'zujian',
      children: [
        { path: 'index', component: componentsIndex, name: '介绍 ' },
        { path: 'tinymce', component: Tinymce, name: '富文本编辑器' }
      ]
    }
  ]
})
