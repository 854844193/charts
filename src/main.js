// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/font.css'
import './assets/css/iconfont.css'
import './assets/css/bootstrap.min.css'
import dataV from '@jiaminghi/data-view'
let echarts = require('echarts/echarts.all')

Vue.use(dataV)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
