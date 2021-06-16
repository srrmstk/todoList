import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: () => import('@/views/Todo')
  },
  {
    path: '/task/:id',
    name: 'EditTask',
    component: () => import('@/views/EditTask')
  },
  {
    path: '/create-task',
    name: 'CreateTask',
    component: () => import('@/views/CreateTask')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
