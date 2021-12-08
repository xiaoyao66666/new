import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children:[
        {
          path:"/about/NewClass",
          name:"newclass",
          component: () => import('../views/NewClass.vue')
        },
        {
          path:"/about/NewClassTime",
          name:"newclasstime",
          component: () => import('../views/NewClassTime.vue')
        },
        {
          path:"/about/NewTeach",
          name:"newteach",
          component: () => import('../views/NewTeach')
        }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
