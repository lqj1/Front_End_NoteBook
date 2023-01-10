import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 引入字体文件
import './assets/font/iconfont.css'
// 引入全局样式文件
import './assets/css/global.less'

import SocketService from '@/utils/socket_service'
// 对服务端进行websocket的连接
SocketService.Instance.connect()
// 请求基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到Vue的原型对象上
// 在别的组件中使用 this.$http
Vue.prototype.$http = axios

// 在index.html中引入echarts.js，就将echarts挂载到了windows上，window.echarts可以调用
// 再将全局的echarts对象挂载到Vue的原型对象上
Vue.prototype.$echarts = window.echarts // 此时在别的组件可以通过 this.$echarts调用
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')