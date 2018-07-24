import VueRouter from 'vue-router'


const route = (path, component) => ({
    path,
    component: () => import(`../components/${component}`)
})

export default new VueRouter({
    routes: [
        route('/', 'IndexPage'),
        route('/superadmin', 'SuperAdminPage'),
        route('/admin', 'AdminPage'),
        route('/user', 'UserPage')
    ]
})