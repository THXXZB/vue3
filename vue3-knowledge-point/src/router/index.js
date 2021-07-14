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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/news.vue')
  },
  {
    path: '/composition',
    name: 'Composition',
    component: () => import('../views/composition.vue')
  },
  {
    path: '/virtualList',
    name: 'VirtualList',
    component: () => import('../views/virtual-list.vue')
  },
  {
    path: '/study',
    name: 'Study',
    component: () => import('../study/home.vue'),
    children:[{
      path: 'mainTab',
      component: () => import('../study/main-tab.vue')
    },{
      path: 'table',
      component: () => import('../study/table.vue')
    },{
      path: 'iframe',
      component: () => import('../study/iframe.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
