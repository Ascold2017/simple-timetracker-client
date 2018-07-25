import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client'
import VueMoment from 'vue-moment'
const moment = require('moment')
require('moment/locale/ru')

Vue.use(VueSocketio, io('http://localhost:3001', { path: '/timetracker' }), { store });
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueMoment, { moment })

if (localStorage.getItem('my-token')) {
  store.commit('setAuth', JSON.parse(localStorage.getItem('my-token')))
}

Vue.filter('toTime', (val) => {

    const sec_num = parseInt(val, 10) // don't forget the second param
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds = sec_num - (hours * 3600) - (minutes * 60)

    if (hours   < 10) { hours   = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }

    return hours + ':' + minutes + ':' + seconds
})

export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
