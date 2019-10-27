import VueRouter from 'vue-router'

import collapse from '../views/modules/collapse'

const routes = [
  { path: '/collapse', component: collapse }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

export default router
