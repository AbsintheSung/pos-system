import { createRouter, createWebHistory } from 'vue-router'
import CarouselPage from '@/views/CarouselPage.vue'
// import CustomerMenuPage from '@/views/customer/CustomerMenuPage.vue'
// import CustomerIndex from '@/views/customer/CustomerIndex.vue'
// import CustomerProductPage from '@/views/customer/CustomerProductPage.vue'
// import CustomerCheckoutPage from '@/views/customer/CustomerCheckoutPage.vue'

import CustomerIndex from "@customer/CustomerIndex.vue"
import CustomerMenu from '@customer/menu/CustomerMenu.vue'
import CustomerProduct from '@customer/product/CustomerProduct.vue'
import CustomerCheckout from '@customer/checkout/CustomerCheckout.vue'
import CheckoutOrder from '@customer/checkout/views/CheckoutOrder.vue'
import CheckoutPayment from '@customer/checkout/views/CheckoutPayment.vue'
import CheckoutCompleted from '@customer/checkout/views/CheckoutCompleted.vue'
import CheckoutLine from '@customer/checkout/views/CheckoutLine.vue'
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
          component: CustomerMenu
        },
        {
          path: 'product/:id',
          name: 'CustomerProduct',
          component: CustomerProduct
        },
        {
          path: 'checkout',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
          redirect: { name: 'CustomerOrderInfo' },
          children: [
            {
              path: 'orderinfo',
              name: 'CustomerOrderInfo',
              component: CheckoutOrder
            },
            {
              path: 'payment',
              name: 'CheckoutPayment',
              component: CheckoutPayment
            },
            {
              path: 'completed',
              name: 'CheckoutCompleted',
              component: CheckoutCompleted
            },
            {
              path: 'linepay',
              name: 'LinePayCheckout',
              component: CheckoutLine
            },
          ]
        }
      ],
      redirect: { name: 'CustomerMenu' }
    },

  ]
})

export default router
