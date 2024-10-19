import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/apis/apiUrl'
import { ref, computed } from 'vue'
import { setGuidAndOrderId, checkGuidAndOrderIdExist, getCookie } from '@/utils/cookies/guidOrder';
const guidIdCode = import.meta.env.VITE_APP_GUID_NAME;
const orderIdCode = import.meta.env.VITE_APP_ORDERID_NAME;
export const useOrderStore = defineStore('order', () => {
  const orderId = ref('') //訂單Id，int
  const guidId = ref('') //訂單識別碼

  const getOrderId = computed(() => orderId.value)
  const getGuidId = computed(() => guidId.value)

  const fetchOrderId = async () => {
    const isCookieExist = checkGuidAndOrderIdExist()
    if (isCookieExist) {
      console.log('無須請求')
      setOrderCookie()
    } else {
      console.log('請求')
      try {
        const response = await fetchApi.getOrderId()
        guidId.value = response.data.guid
        orderId.value = response.data.orderId
        setGuidAndOrderId(guidId.value, orderId.value)
      } catch (error) {
        console.log(error)
      }
    }
  }



  const setOrderCookie = () => {
    guidId.value = getCookie(guidIdCode)
    orderId.value = getCookie(orderIdCode)
  }
  return {
    getOrderId,
    getGuidId,
    fetchOrderId,
    setOrderCookie,
  }
})
