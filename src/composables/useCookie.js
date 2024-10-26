import { useCookies } from '@vueuse/integrations/useCookies'
export function useCookie() {
  const cookies = useCookies()
  // console.log(cookies)
  const guidIdCode = import.meta.env.VITE_APP_GUID_NAME
  const orderIdCode = import.meta.env.VITE_APP_ORDERID_NAME
  const completeGuidIdCode = import.meta.env.VITE_APP_COMPLETE_ORDERID_NAME
  const checkoutOrderInfo = import.meta.env.VITE_APP_CHECKOUT_ORDER_INFO_NAME

  const cookieOptions = {
    path: '/', // 確保 cookie 在所有路徑下可訪問
    // secure: true, // 只在 HTTPS 下傳輸
    // sameSite: 'Strict' // 防止 CSRF 攻擊
  }


  // Cookie 操作方法

  //設置-guid寫入cookie
  const setGuidId = (value) => {
    return cookies.set(guidIdCode, value, cookieOptions)
  }

  //設置-orderid寫入cookie
  const setOrderId = (value) => {
    return cookies.set(orderIdCode, value, cookieOptions)
  }

  //設置-CompleteGuidId寫入cookie
  const setCompleteGuidId = (value) => {
    return cookies.set(completeGuidIdCode, value, cookieOptions)
  }

  //設置-OrderInfoComplete寫入cookie
  const setOrderInfoComplete = () => {
    return cookies.set(checkoutOrderInfo, 'isCheckout', cookieOptions)
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

  // 修改清除 cookie 的方法，確保完全刪除
  const clearCookie = (cookieName) => {
    cookies.remove(cookieName, {
      path: '/',
      expires: new Date(0)
    })
  }
  const clearGuidCookies = () => {
    clearCookie(guidIdCode)
  }

  const clearOrderCookies = () => {
    clearCookie(orderIdCode)
  }

  const clearOrderInfoCookies = () => {
    clearCookie(checkoutOrderInfo)
  }

  // 新增：清除所有相關 cookies 的方法
  const clearAllCookies = () => {
    clearGuidCookies()
    clearOrderCookies()
    clearOrderInfoCookies()
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
    clearAllCookies,
    clearOrderInfoCookies,
    clearGuidCookies,
    clearOrderCookies,
    checkCookiesExist,
    checkOrderInfoExist
  }
}