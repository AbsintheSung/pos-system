import api from '@/utils/apis/staff-boh/staffRequest'
const urlName = import.meta.env.VITE_APP_API_NAME;
// 新增api路徑
const bohLogin = `/${urlName}/employee/login` // 內場人員登入
const bohOrder = `/${urlName}/boh/getOrder` //內場-獲取所有訂單
const bohCompleted = `/${urlName}/boh/orderCompleted` // 內場-完成備餐

//匯出 api方法
export const staffBohFetch = {
  login: (data: any) => api.post(bohLogin, data),
  bohOrder: (type = '', orderBy = '', search = '') => api.get(bohOrder + `?type=${type}&orderBy=${orderBy}&search=${search}`),
  bohCompleted: (data: any) => api.post(bohCompleted, data)
}

