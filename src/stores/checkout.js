import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { getCookie } from '@/utils/cookies/guidOrder';
import { fetchApi } from '@/utils/apis/apiUrl';
import { useOrderStore } from '@/stores/order.js'
const linePayCompleteUrl = import.meta.env.VITE_APP_CHECKOUT_LINEPAY_URL
// const guidIdCode = import.meta.env.VITE_APP_GUID_NAME;
// const orderIdCode = import.meta.env.VITE_APP_ORDERID_NAME;
import { useCookie } from '@/composables/useCookie.js'
const useCookies = useCookie()
export const useCheckoutStore = defineStore('checkout', () => {
  const orderStore = useOrderStore()
  // const isFormComplete = ref(false)
  const initialFormState = {
    orderId: 0,
    guid: "",
    phone: "",
    type: "",
    table: null,
    takeDate: null,
    takeTime: null,
    note: ""
  }

  const checkoutFormData = ref({
    "orderId": 0,
    "guid": "",
    "phone": "", //顧客電話
    "type": "",  //用餐類型 ("內用" "外帶" "預約自取")
    "table": null,  //桌號(非內用則null或空字串)
    "takeDate": null, //外帶時間(null或是api(CC-4)給你放選項的日期)
    "takeTime": null, //外帶時間(null或是api(CC-4)給你放選項的日期),
    "note": "" //顧客的其他備註
  })
  const checkoutCash = ref({
    "orderId": 0,
    "guid": '',
    "invoice": '',  //發票類型 1"載具" 2"統編" 3"捐贈發票" 4"紙本"
    "invoiceCarrier": "" //發票載具號碼or統編
  })
  const checkoutLinePay = ref({
    "orderId": 0,
    "guid": '',
    "invoice": "",  //發票類型 1"載具" 2"統編" 3"捐贈發票" 4"紙本"
    "invoiceCarrier": "", //發票載具號碼or統編
    "confirmUrl": `${linePayCompleteUrl}`, //LinePay付款成功後，Line會導向使用者去的網址
    "cancelUrl": ""   //LinePay取消付款後，Line會導向使用者去的網址
  })

  //發送 訂單資訊
  const fetchUpdateCheckout = async () => {
    checkoutFormData.value.orderId = Number(useCookies.getOrderId())
    checkoutFormData.value.guid = useCookies.getGuidId()
    console.log(checkoutFormData.value)
    try {
      const response = await fetchApi.postCheckoutForm(checkoutFormData.value)
      console.log(response)
      if (response.statusCode === 200) {
        useCookies.setOrderInfoComplete()
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }

  //發送 付款資訊( 現金 )
  const fetchUpdateCheckoutCash = async () => {
    checkoutCash.value.orderId = Number(useCookies.getOrderId())
    checkoutCash.value.guid = useCookies.getGuidId()
    try {
      const response = await fetchApi.postCheckoutCash(checkoutCash.value)
      console.log(response)
      if (response.statusCode === 200) {
        const completeGuidId = useCookies.getGuidId()
        useCookies.setCompleteGuidId(completeGuidId)
        useCookies.clearGuidCookies()
        useCookies.clearOrderCookies()
        useCookies.clearOrderInfoCookies()
        orderStore.resetCartList()
        resetForm()
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }
  //發送 付款資訊( LinePay )
  const fetchUpdateCheckoutLinePay = async () => {
    checkoutLinePay.value.orderId = Number(useCookies.getOrderId())
    checkoutLinePay.value.guid = useCookies.getGuidId()
    try {
      const response = await fetchApi.postCheckoutLinePay(checkoutLinePay.value)
      console.log(response)
      if (response.statusCode === 200) {
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCheckoutLinePayState = async () => {
    const data = {
      orderId: Number(useCookies.getOrderId()),
      guid: useCookies.getGuidId()
    }
    console.log('付款linePay頁面', data)
    try {
      const response = await fetchApi.postCheckoutLinePatState(data)
      console.log(response)
      if (response.statusCode === 200) {
        const completeGuidId = useCookies.getGuidId()
        useCookies.setCompleteGuidId(completeGuidId)
        useCookies.clearGuidCookies()
        useCookies.clearOrderCookies()
        useCookies.clearOrderInfoCookies()
        orderStore.resetCartList()
        resetForm()
        return response.data.isPayMent
      }
    } catch (error) {
      console.log(error)
    }

  }

  //初始化表單
  const resetForm = () => {
    checkoutFormData.value = { ...initialFormState }
  }
  return {
    checkoutFormData,
    checkoutCash,
    checkoutLinePay,
    resetForm,
    fetchUpdateCheckout,
    fetchUpdateCheckoutCash,
    fetchUpdateCheckoutLinePay,
    fetchCheckoutLinePayState
  }
})
