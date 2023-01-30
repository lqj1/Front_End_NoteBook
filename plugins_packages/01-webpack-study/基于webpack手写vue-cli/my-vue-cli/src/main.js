import { add } from './tools/add.js'
import './styles/index.scss'
console.log('main.js: ', add(1, 2))


import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: (h) => h(App)
}).$mount('#app')