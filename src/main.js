import Vue from 'vue'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import App from './App.vue'
import store from './store'
import router from './router'
import {
  sync
} from 'vuex-router-sync'
import * as filter from './filter' //自定义过滤器

import 'mint-ui/lib/style.css'
import 'vue2-animate/dist/vue2-animate.min.css' // animate
import 'normalize.css' //重置浏览器默认样式
import 'flex.css' //flex.css
import './iconfont/iconfont.css' //web字体图标

sync(store, router)

Vue.use(VueResource)

const FastClick = require('fastclick')
FastClick.attach(document.body)

/**
 * 兼容微信设置页面的title
 */
export const setDocumentTitle = function(title) {
  document.title = title;
  let ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function() {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}

router.beforeEach((to, from, next) => {
  typeof to.meta.title !== undefined && setDocumentTitle(to.meta.title)
  next()
})

Object.keys(filter).forEach(k => Vue.filter(k, filter[k])) //注册过滤器

const app = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
