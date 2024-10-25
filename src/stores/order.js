import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/apis/apiUrl'
import { ref, computed } from 'vue'
import { deepClone } from '@/utils/deepClone.ts';
// import { setGuidAndOrderId, checkGuidAndOrderIdExist, getCookie } from '@/utils/cookies/guidOrder';
import { useCookie } from '@/composables/useCookie'
const useCookies = useCookie()
// const guidIdCode = import.meta.env.VITE_APP_GUID_NAME;
// const orderIdCode = import.meta.env.VITE_APP_ORDERID_NAME;
export const useOrderStore = defineStore('order', () => {
  // const orderId = ref('') //訂單Id，int
  // const guidId = ref('') //訂單識別碼
  const cartList = ref([]) //購物車列表
  const compoleteOrder = ref({}) //單筆完成訂單明細

  // const getOrderId = computed(() => orderId.value)
  // const getGuidId = computed(() => guidId.value)
  const getCartList = computed(() => deepClone(cartList.value))
  const getCartListLength = computed(() => cartList.value.length)
  const getCartTotalPrice = computed(() => {
    console.log(cartList)
    return cartList.value.reduce((total, item) => total + item.price * item.serving, 0)
  })
  const getCompoleteOrderCount = computed(() => compoleteOrder.value.count) //訂單商品數量(int)
  const getCompoleteOrderTotalAmount = computed(() => compoleteOrder.value.totalAmount)//訂單總金額(int)
  const getCompoleteOrderList = computed(() => compoleteOrder.value.products)
  const getCompoleteOrderNote = computed(() => compoleteOrder.value.note) //顧客的其他備註
  const getCompoleteOrderStatus = computed(() => compoleteOrder.value.orderStatus) //待結帳or已結帳or待取餐or已完成
  const getCompoleteOrderNumber = computed(() => compoleteOrder.value.number) //取餐 or 外帶 號碼
  const getCompoleteOrderType = computed(() => compoleteOrder.value.type) //取餐方式
  const getCompoleteOrderTakeTime = computed(() => compoleteOrder.value.takeTime) //取餐時間
  const getCompoleteOrderTitle = computed(() => compoleteOrder.value.numberTitle) //"取餐編號" 或"內用桌號"


  //第一次加入購物車時候需要獲取唯一的 guid 跟 orderId
  const fetchOrderId = async () => {
    // const isCookieExist = checkGuidAndOrderIdExist()
    if (useCookies.checkCookiesExist()) {
      // setOrderCookie()
      console.log('存在，無須請求')
    } else {
      console.log('請求')
      try {
        const response = await fetchApi.getOrderId()
        useCookies.setGuidId(response.data.guid)
        useCookies.setOrderId(response.data.orderId)
        // guidId.value = response.data.guid
        // orderId.value = response.data.orderId
        // setGuidAndOrderId(response.data.guid, response.data.orderId)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //添加進購物車
  const fetchProductInOrder = async (data) => {
    // const setData = {
    //   guid: getCookie(guidIdCode), // 識別碼
    //   orderId: Number(getCookie(orderIdCode)), // 訂單編號
    //   ...data,
    // }
    const setData = {
      guid: useCookies.getGuidId(), // 識別碼
      orderId: Number(useCookies.getOrderId()), // 訂單編號
      ...data,
    }
    try {
      const response = await fetchApi.posteProduct(setData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  //取得購物車訂單
  const fetchCartOrder = async () => {
    try {
      // const response = await fetchApi.getCartOrder(getOrderId.value, getGuidId.value)
      const response = await fetchApi.getCartOrder(useCookies.getOrderId(), useCookies.getGuidId())
      console.log(response)
      if (response.statusCode === 200) {
        cartList.value = response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  //將購物車的品項添加數量
  const fetchPlusCart = async (data) => {
    // const setData = {
    //   orderId: getCookie(orderIdCode),
    //   ...data,
    // }
    const setData = {
      orderId: useCookies.getOrderId(),
      ...data,
    }
    try {
      // const response = await fetchApi.postEditCart(setData)
      const response = await fetchApi.postEditCart(setData)
      await fetchCartOrder()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  //將購物車的品項減少數量
  const fetchMinusCart = async (data) => {
    // const setData = {
    //   orderId: getCookie(orderIdCode),
    //   ...data,
    // }
    const setData = {
      orderId: useCookies.getOrderId(),
      ...data,
    }
    try {
      // const response = await fetchApi.postEditCart(setData)
      const response = await fetchApi.postEditCart(setData)
      await fetchCartOrder()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  //取得完成的訂單資料( 1筆 )
  const fetchOneOrder = async () => {
    try {
      // console.log(guidId.value)
      // console.log(getCookie(guidIdCode))
      const response = await fetchApi.getCompleteOrder(useCookies.getCompleteGuidId())
      if (response.statusCode === 200) {
        compoleteOrder.value = response.data
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  const resetCartList = () => {
    cartList.value = []
  }


  //在一開始取得 cookie ( 目的在於使用者發送請求後，再checkout頁面，重新整理的情況 )
  const setOrderCookie = () => {
    // guidId.value = getCookie(guidIdCode)
    // orderId.value = getCookie(orderIdCode)
  }
  return {
    // getOrderId,
    // getGuidId,
    getCartList,
    getCartTotalPrice,
    getCartListLength,
    getCompoleteOrderList,
    getCompoleteOrderCount,
    getCompoleteOrderTotalAmount,
    getCompoleteOrderNote,
    getCompoleteOrderStatus,
    getCompoleteOrderNumber,
    getCompoleteOrderType,
    getCompoleteOrderTakeTime,
    getCompoleteOrderTitle,
    fetchCartOrder,
    fetchProductInOrder,
    fetchOrderId,
    setOrderCookie,
    fetchPlusCart,
    fetchMinusCart,
    fetchOneOrder,
    resetCartList,
  }
})
