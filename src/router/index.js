import VueRouter from 'vue-router'
import store from '../store'

const route = (path, component) => ({
    path,
    component: () => import(`../components/${component}`)
})
const router = new VueRouter({
    routes: [
        route('/', 'IndexPage'),
        route('/superadmin', 'SuperAdminPage'),
        route('/admin', 'AdminPage'),
        route('/user', 'UserPage')
    ],
})

const superAdminResolved = ['/', '/superadmin']
const adminResolved = ['/', '/admin']
const userResoldev = ['/', '/user']

router.beforeResolve((to, from, next) => {
 
    if (!store.state.token && to.fullPath !== '/') {
        next({ path: '/' })
    } else {
        const role = store.state.profile.role
  
        if (
            (role === 0 && superAdminResolved.includes(to.fullPath)) ||
            ((role === 1 || role === 2) && adminResolved.includes(to.fullPath)) ||
            (role === 3 && userResoldev.includes(to.fullPath))) {
                next()
            }
        
    }

    
})

export default router