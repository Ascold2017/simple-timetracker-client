import Vue from 'vue'
import Vuex from 'vuex'
import * as Api from '../api'
import $app from '../main'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: null,

        profile: {
            companyName: '',
            username: '',
            role: null
        },

        snackbar: {
            show: false,
            text: ''
        },


        companies: [],

        users: [],

        tasks: [],

        userStat: []
    },

    mutations: {
        SOCKET_CONNECT: (state, status) => {
            console.log('socket connected', status)
        },

        setAuth (state, result) {
            state.token = result.token
            state.profile.companyName = result.profile.companyName
            state.profile.username = result.profile.username
            state.profile.role = result.profile.type
            localStorage.setItem('my-token', JSON.stringify(result))
        },

        removeAuth (state) {
            state.token = null
            state.profile = {
                companyName: '',
                username: '',
                role: null
            },
            localStorage.removeItem('my-token')
        },

        showSnackbar (state, message) {
            state.snackbar = {
                show: true,
                text: message
            }
        },

        hideSnackbar (state) {
            state.snackbar = {
                show: false,
                text: ''
            }
        },

        setCompanies (state, companies) {
            state.companies = companies
        },

        setUsers (state, users) {
            state.users = users
        },

        setTasks (state, tasks) {
            state.tasks = tasks
        },

        setUserStat (state, stat) {
            state.userStat = stat
        }
    },

    actions: {
        taskPlay (ctx, taskId) {
            console.log('start task')
            $app.$socket.emit('startTask', { token: ctx.state.token, taskId })
        },

        taskStop (ctx, taskId) {
            console.log('start task')
            $app.$socket.emit('stopTask', { token: ctx.state.token, taskId })
        },

        socket_taskStarted (ctx, msg) {
            console.log(msg.result.message)
            ctx.commit('showSnackbar', msg.result.message)
        },

        socket_errorMessage (ctx, msg) {
            console.log(msg)
        },

        signIn (ctx, { email, password }) {
            return Api.login({ email, password })
            .then(result => {
                ctx.commit('setAuth', result)
                ctx.commit('showSnackbar', 'Ok!')
            })
            .catch(e => {
                console.error(e.message)
                ctx.commit('showSnackbar', e.message)
            })
        },

        createCompany (ctx, { name, email, username }) {
            return Api.createCompany({ name, email, username }, ctx.state.token)
            .then(result => {
                console.log(result)
                ctx.commit('showSnackbar', result)
            })
            .catch(e => {
                console.error(e.message)
                ctx.commit('showSnackbar', e.message)
            })
        },

        createUser (ctx, { username, email, password, type }) {
            return Api.createUser({
                username,
                email,
                password,
                type
            }, ctx.state.token)
            .then(result => {
                console.log(result)
                ctx.commit('showSnackbar', result)
            })
            .catch(e => {
                console.error(e.message)
                ctx.commit('showSnackbar', e.message)
            })
        },

        createTask (ctx, { name }) {
            return Api.createTask({ name }, ctx.state.token)
            .then(result => {
                console.log(result)
                ctx.commit('showSnackbar', result)
            })
            .catch(e => {
                console.error(e.message)
                ctx.commit('showSnackbar', e.message)
            })
        },

        getCompanies (ctx) {
            return Api.getCompanies(ctx.state.token)
                .then(result => ctx.commit('setCompanies', result))
                .catch(e => {
                    console.error(e.message)
                    ctx.commit('showSnackbar', e.message)
                })
        },

        getCompanyUsers (ctx, companyId) {
            // if company id is null - api use token for find
            return Api.getCompanyUsers(companyId, ctx.state.token)
            .then(result => ctx.commit('setUsers', result))
            .catch(e => {
                console.error(e.message)
                ctx.commit('showSnackbar', e.message)
            })
        },

        getCompanyTasks (ctx, companyId) {
            // if company id is null - api use token for find
            return Api.getCompanyTasks(companyId, ctx.state.token)
            .then(result => ctx.commit('setTasks', result))
            .catch(e => {
                console.error(e.message)
                ctx.commit('showSnackbar', e.message)
            })
        },

        getUserStat (ctx, userId) {
             // if userId is null - api use token for find
            return Api.getStatByUser(userId, ctx.state.token)
            .then(result => ctx.commit('setUserStat', result))
            .catch(e => {
                console.error(e.message)
                ctx.commit('showSnackbar', e.message)
            })
        },


    }
})