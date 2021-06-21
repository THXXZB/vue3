import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // 组件懒加载
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/test.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
