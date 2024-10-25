import { useCookies } from '@vueuse/integrations/useCookies'
export function useCookie() {
  const cookies = useCookies()
  // console.log(cookies)
  const guidIdCode = import.meta.env.VITE_APP_GUID_NAME
  const orderIdCode = import.meta.env.VITE_APP_ORDERID_NAME
  const completeGuidIdCode = import.meta.env.VITE_APP_COMPLETE_ORDERID_NAME
  const checkoutOrderInfo = import.meta.env.VITE_APP_CHECKOUT_ORDER_INFO_NAME
  // Cookie 操作方法

  //設置-guid寫入cookie
  const setGuidId = (value) => {
    return cookies.set(guidIdCode, value)
  }

  //設置-orderid寫入cookie
  const setOrderId = (value) => {
    return cookies.set(orderIdCode, value)
  }

  //設置-CompleteGuidId寫入cookie
  const setCompleteGuidId = (value) => {
    return cookies.set(completeGuidIdCode, value)
  }

  //設置-OrderInfoComplete寫入cookie
  const setOrderInfoComplete = () => {
    return cookies.set(checkoutOrderInfo, 'isCheckout')
  }

  //取得
  const getGuidId = () => cookies.get(guidIdCode)
  const getOrderId = () => cookies.get(orderIdCode)
  const getCompleteGuidId = () => cookies.get(completeGuidIdCode)
  const getCheckOrderInfo = () => cookies.get(checkoutOrderInfo)

  //判斷  guidIdCode 跟 orderIdCode 是否存在cookie中
  const checkCookiesExist = () => {
    const hasGuidId = cookies.get(guidIdCode) !== undefined && cookies.get(guidIdCode) !== null
    const hasOrderId = cookies.get(orderIdCode) !== undefined && cookies.get(orderIdCode) !== null

    return hasGuidId && hasOrderId
  }

  const checkOrderInfoExist = () => {
    return cookies.get(checkoutOrderInfo) !== undefined && cookies.get(checkoutOrderInfo) !== null
  }

  // 清除所有相關 cookie
  const clearCookies = (cookieName) => {
    cookies.remove(cookieName,)
    // cookies.remove(orderIdCode)
    // cookies.remove(completeGuidIdCode)
  }

  const clearGuidCookies = () => {
    console.log(guidIdCode)
    cookies.remove(guidIdCode)
    // cookies.set(guidIdCode, '', { ...defaultOptions, expires: new Date(0) })
  }
  const clearOrderCookies = () => {
    console.log(orderIdCode)
    cookies.remove(orderIdCode)
    // cookies.set(orderIdCode, '', { ...defaultOptions, expires: new Date(0) })
  }
  const clearOrderInfoCookies = () => {
    cookies.remove(checkoutOrderInfo)
  }

  return {
    setGuidId,
    setOrderId,
    setCompleteGuidId,
    setOrderInfoComplete,
    getGuidId,
    getOrderId,
    getCompleteGuidId,
    getCheckOrderInfo,
    clearCookies,
    clearOrderInfoCookies,
    clearGuidCookies,
    clearOrderCookies,
    checkCookiesExist,
    checkOrderInfoExist
  }
}