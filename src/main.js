import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
 
Vue.use(VueSocketio, io('http://localhost:3001', { path: '/timetracker' }), { store });
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)

if (localStorage.getItem('my-token')) {
  store.commit('setAuth', JSON.parse(localStorage.getItem('my-token')))
}

export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
