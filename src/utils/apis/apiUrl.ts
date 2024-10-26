import api from '@/utils/apis/fetchRequest';
const urlName = import.meta.env.VITE_APP_API_NAME;
// 新增api路徑
const getMenuCategory = `/${urlName}/customer/getMenuCategory` //取得菜單類別
const getMenuList = `/${urlName}/customer/getMenuItem` //取得菜單
const getProduct = `/${urlName}/customer/getProduct`//取得單一商品
const getOrderId = `/${urlName}/customer/getOrderId`//第一次加入時候，需取得guid碼 跟 id
const posteProduct = `/${urlName}/customer/addItem` //將商品加入購物車
const getCartOrder = `${urlName}/customer/getCart` //取得購物車訂單
const postEditCart = `${urlName}/customer/editCart` // 編輯商品購物車數量
const postCheckoutForm = `${urlName}/customer/goCheckout` //存入使用者輸入表單的內容
const postCheckoutCash = `${urlName}/customer/confirmOrderCash` //使用 現金方式付款
const getCompleteOrder = `${urlName}/customer/getOrder` //取得 訂單完成資訊
const postCheckoutLinePay = `${urlName}/customer/confirmOrderLinePay` //使用 linePay方式付款
const postCheckoutLinePatState = `${urlName}/customer/confirmLinePayRequest`

//匯出 api方法
export const fetchApi = {
	getMenuCategory: () => api.get(getMenuCategory),
	getMenuList: () => api.get(getMenuList),
	getProduct: (id: any) => api.get(`${getProduct}/${id}`),
	getOrderId: () => api.get(getOrderId),
	posteProduct: (data: any) => api.post(posteProduct, data),
	getCartOrder: (orderId: any, guid: any) => api.get(`${getCartOrder}/${orderId}/${guid}`),
	postEditCart: (data: any) => api.post(postEditCart, data),
	postCheckoutForm: (data: any) => api.post(postCheckoutForm, data),
	postCheckoutCash: (data: any) => api.post(postCheckoutCash, data),
	getCompleteOrder: (guid: any) => api.get(`${getCompleteOrder}/${guid}`),
	postCheckoutLinePay: (data: any) => api.post(postCheckoutLinePay, data),
	postCheckoutLinePatState: (data: any) => api.post(postCheckoutLinePatState, data),
	// ... 其他 API
}