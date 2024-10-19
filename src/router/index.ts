import { createRouter, createWebHistory } from 'vue-router'
import CarouselPage from '@/views/CarouselPage.vue'
import CustomerMenuPage from '@/views/customer-page/CustomerMenuPage.vue'
import CustomerIndex from '@/views/customer-page/CustomerIndex.vue'
import CustomerProductPage from '@/views/customer-page/CustomerProductPage.vue'
import CustomerCheckoutPage from '@/views/customer-page/CustomerCheckoutPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: CarouselPage
    },
    {
      path: '/customer',
      name: 'CustomerIndex',
      component: CustomerIndex,
      children: [
        {
          path: 'menu',
          name: 'CustomerMenu',
          component: CustomerMenuPage
        },
        {
          path: 'product/:id',
          name: 'CustomerProduct',
          component: CustomerProductPage
        },
        {
          path: 'checkout',
          name: 'CustomerCheckout',
          component: CustomerCheckoutPage,
        }
      ],
      redirect: { name: 'CustomerMenu' }
    },
    // {
    //   path: '/customer',
    //   name: 'Customer',
    //   component: CustomerPage
    // },
    // {
    //   path: '/customer/menu',
    //   name: 'CustomerMenu',
    //   component: CustomerMenuPage,
    // },
    // {
    //   path: '/customer/product/:id',
    //   name: 'CustomerProduct',
    //   component: CustomerProductPage,
    // },
    // {
    //   path: '/customer/checkout',
    //   name: 'CustomerCheckout',
    //   component: CustomerCheckoutPage,
    // },
    // {
    //   path: '/employee',
    //   name: 'Employee',
    //   component: () => import('@/views/EmployeePage.vue')
    // }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
