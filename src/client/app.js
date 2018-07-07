import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import App from './App.vue'
// import createStore from './store/store.js'
import createRouter from './config/router.js'

import './assets/styles/global.scss'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

export default () => {
  const router = createRouter()
  // const store = createStore()

  const app = new Vue({
    router,
    // store,
    render: h => h(App)
  })

  return {app, router}
  // return {app, router, store}
}
