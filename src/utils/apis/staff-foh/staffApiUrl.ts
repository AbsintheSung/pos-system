import api from '@/utils/apis/staff-foh/staffRequest'
const urlName = import.meta.env.VITE_APP_API_NAME;
// 新增api路徑
const staffFohLogin = `/${urlName}/employee/login` //外場人員登入

//匯出 api方法
export const staffFetch = {
  login: (data: any) => api.post(staffFohLogin, data),
  // ... 其他 API
}