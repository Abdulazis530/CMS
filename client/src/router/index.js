import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/SignUp')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bar',
    name: 'bar',
    component: () => import('../components/Bar')
  },
  {
    path: '/line',
    name: 'line',
    component: () => import('../components/Line')
  },
  {
    path: '/pie',
    name: 'pie',
    component: () => import('../components/Pie')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../components/Map')
  },
  {
    path: '/data',
    name: 'data',
    component: () => import('../components/Data')
  },
  {
    path: '/dataDate',
    name: 'data date',
    component: () => import('../components/DataDate')
  },
  {
    path: '/maps',
    name: 'data map',
    component: () => import('../components/DataMap')
  },



]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    const token = localStorage.getItem('Authorization')
    if (!token) {
      router.push('/login')
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
