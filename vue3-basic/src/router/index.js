import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // 组件懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/doList',
    name: 'DoList',
    // 组件懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/do-list.vue')
  },
  {
    path: '/shopping',
    name: 'Shopping',
    // 组件懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/shopping.vue')
  },
  {
    path: '/parent',
    name: 'Parent',
    // 组件懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/parent.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
