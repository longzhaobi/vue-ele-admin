import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import ElementUI from 'element-ui'
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import 'element-ui/lib/theme-default/index.css'
import 'assets/custom-theme/index.css'
import 'normalize.css/normalize.css';
import 'styles/index.scss'
import 'components/Icon-svg/index'
import 'assets/iconfont/iconfont'
import * as filters from './filters';

import './mock/index.js';
Vue.use(ElementUI);

Vue.config.productionTip = false


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
// 设置全局加载条
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd'];// 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (to.meta && to.meta.role) {
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next();
        } else {
          next('/401');
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

// window.onunhandledrejection = e => {
//     console.log('unhandled', e.reason, e.promise);
//     e.preventDefault()
// };

// 生产环境错误日志
if (process.env === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
