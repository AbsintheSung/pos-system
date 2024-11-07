import { createRouter, createWebHistory } from 'vue-router'
import CarouselPage from '@/views/CarouselPage.vue'
import CustomerIndex from "@customer/CustomerIndex.vue"
import CustomerMenu from '@customer/menu/CustomerMenu.vue'
import CustomerProduct from '@customer/product/CustomerProduct.vue'
import CustomerCheckout from '@customer/checkout/CustomerCheckout.vue'
import CheckoutOrder from '@customer/checkout/views/CheckoutOrder.vue'
import CheckoutPayment from '@customer/checkout/views/CheckoutPayment.vue'
import CheckoutCompleted from '@customer/checkout/views/CheckoutCompleted.vue'
import CheckoutLine from '@customer/checkout/views/CheckoutLine.vue'
import StaffFohLogin from '@/views/front-of-the-staff/StaffFohLogin.vue'
// import StaffHome from '@/views/front-of-the-staff/StaffHome.vue'
// import StaffFohOrderList from '@/views/front-of-the-staff/StaffFohOrderList.vue'
import StaffHome from '@/views/front-of-the-staff/home/StaffHome.vue'
import StaffFohOrderList from '@/views/front-of-the-staff/home/views/StaffFohOrderList.vue'
import StaffFohCheckout from '@/views/front-of-the-staff/home/views/StaffFohCheck.vue'
import StaffBohLogin from '@/views/back-of-the-staff/StaffBohLogin.vue'
import StaffBohHome from '@/views/back-of-the-staff/StaffBohHome.vue'
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
    {
      path: '/staff-foh-login',
      name: 'StaffFohLogin',
      component: StaffFohLogin
    },
    // {
    //   path: '/staff-foh-home',
    //   name: 'StaffHome',
    //   component: StaffHome,
    //   redirect: { path: '/staff-foh-home/all' }, // 默認為全部訂單
    //   children: [
    //     {
    //       path: ':status',
    //       name: 'StaffFohOrder',
    //       component: StaffFohOrderList,
    //     },
    //   ],
    // }
    {
      path: '/staff-foh-home',
      name: 'StaffHome',
      component: StaffHome,
      redirect: { path: '/staff-foh-home/order/all' }, // 默認為全部訂單
      children: [
        {
          path: 'order/:status',
          name: 'StaffFohOrder',
          component: StaffFohOrderList,
        },
        {
          path: 'checkout/:orderId',
          name: 'StaffFohCheckout',
          component: StaffFohCheckout,

        }
      ],
    },
    {
      path: '/staff-boh-login',
      name: 'StaffBohLogin',
      component: StaffBohLogin
    },
    {
      path: '/staff-boh-home',
      name: 'StaffBohHome',
      component: StaffBohHome
    },

  ]
})

export default router
