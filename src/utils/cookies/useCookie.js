import { useCookies } from '@vueuse/integrations/useCookies'
const guidIdCode = import.meta.env.VITE_APP_GUID_NAME; //取得 環境變數 guid碼的cookie名稱
const orderIdCode = import.meta.env.VITE_APP_ORDERID_NAME; //取得 環境變數 productId碼的cookie名稱
const completeGuidIdCode = import.meta.env.VITE_APP_COMPLETE_ORDERID_NAME
const cookie = useCookies()

//設置 guid cookie
export function setGuidId(cookieName) {
  return cookie.set(`${guidIdCode}`, cookieName)
}

//設置 orderId cookie
export function setOrderId(cookieName) {
  return cookie.set(`${orderIdCode}`, cookieName)
}

//設置 completeGuidId cookie ( 用於查詢最新的明細 )
export function setCompleteGuidId(cookieName) {
  return cookie.set(`${completeGuidIdCode}`, cookieName)
}

//取得 guid cookie
export function getGuidId() {
  return cookie.get(`${guidIdCode}`)
}

//取得 orderId cookie
export function getOrderId() {
  return cookie.get(`${orderIdCode}`)
}

//取得  completeGuidId cookie
export function getCompleteGuidId() {
  return cookie.get(`${completeGuidIdCode}`)
}