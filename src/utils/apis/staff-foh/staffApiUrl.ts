import api from '@/utils/apis/staff-foh/staffRequest'
const urlName = import.meta.env.VITE_APP_API_NAME;
// 新增api路徑
const staffFohLogin = `/${urlName}/employee/login` //外場人員登入
const orderAllCount = `/${urlName}/foh/getOrderCount` //取得全部訂單數量與頁數
const orderCount = `/${urlName}/foh/getOrderCount` //取得全部訂單數量與頁數
const orderData = `/${urlName}/foh/getOrder`
const orderAllData = `/${urlName}/foh/getOrderNoPaging` //取得全部訂單
const orderDetail = `/${urlName}/foh/getOrderDetail` //取得訂單單一資訊
const orderCheck = `/${urlName}/foh/checkout` //將訂單金額傳入後台，完成結帳 ( 從待結帳狀態 -> 變成 準備中狀態 )
//匯出 api方法
export const staffFetch = {
  login: (data: any) => api.post(staffFohLogin, data),
  orderAllCount: () => api.get(orderAllCount),
  orderCount: (data: any) => api.get(orderAllCount + `/${data}`),
  orderData: (page = '', orderStatus = '', type = '', orderBy = '', search = '') => api.get(orderData + `?page=${page}&orderStatus=${orderStatus}&type=${type}&orderBy=${orderBy}&search=${search}`),
  orderAllData: () => api.get(orderAllData),
  orderDetail: (orderId: any) => api.get(orderDetail + `/${orderId}`),
  orderCheck: (orderData: any) => api.post(orderCheck, orderData),
  // ... 其他 API
}

