import { createRouter, createWebHistory } from 'vue-router'
import CustomerPage from '@/views/CustomerPage.vue'
import CustomerMenuPage from '@/views/CustomerMenuPage.vue'
import CustomerProductPage from '@/views/CustomerProductPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/customer'
    },
    {
      path: '/customer',
      name: 'Customer',
      component: CustomerPage
    },
    {
      path: '/customer/menu',
      name: 'CustomerMenu',
      component: CustomerMenuPage,
    },
    {
      path: '/customer/product/:id',
      name: 'CustomerProduct',
      component: CustomerProductPage,
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
