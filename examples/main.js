import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import oView from 'vue-oview'
import 'vue-oview/dist/oview.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(oView)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
