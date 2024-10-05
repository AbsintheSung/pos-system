import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
      redirect: '/customer'
    },
    {
      path: '/customer',
      name: 'Customer',
      component: () => import('@/views/CustomerPage.vue')
    },
    {
      path: '/employee',
      name: 'Employee',
      component: () => import('@/views/EmployeePage.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
