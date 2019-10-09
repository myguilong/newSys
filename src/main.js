import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './plugins/element.js'

Vue.config.productionTip = false
import http from './https'
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
