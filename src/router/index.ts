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
      path: '/customer/menu',
      name: 'CustomerMenu',
      component: () => import('@/views/CustomerMenuPage.vue'),
      children: [
        {
          path: 'italianCoffee',
          name: 'ItalianCoffee',
          component: () => import('@/views/customer-menu-page/ItalianCoffeePage.vue')
        },
        {
          path: 'tea',
          name: 'Tea',
          component: () => import('@/views/customer-menu-page/TeaPage.vue')
        },
        {
          path: 'smoothies',
          name: 'Smoothies',
          component: () => import('@/views/customer-menu-page/SmoothiesPage.vue')
        },
        {
          path: 'cake',
          name: 'Cake',
          component: () => import('@/views/customer-menu-page/CakePage.vue')
        },
        {
          path: 'otherDessert',
          name: 'OtherDessert',
          component: () => import('@/views/customer-menu-page/OtherDessert.vue')
        }
      ]
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
