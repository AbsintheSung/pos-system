import { defineStore } from 'pinia'
import { staffBohFetch } from '@/utils/apis/staff-boh/staffApiUrl'
const staffBohName = import.meta.env.VITE_APP_STAFF_BOH_TOKENNAME;
export const useStaffBohStore = defineStore('staff-boh-auth', () => {
  //內場員工登入-api ( 帳號 : fohemployee 密碼 : 123123 )
  const fetchBohAuthData = async (data) => {
    try {
      const response = await staffBohFetch.login(data)
      if (response.statusCode === 200) {
        const tokenValue = response.data.token
        document.cookie = `${staffBohName}=${tokenValue}`
        return response.message
      } else {
        throw response.message
      }
      // return { message: response.message, statusCode: response.statusCode }
    } catch (error) {
      console.log('內場員工登入錯誤', error)
      throw error
    }
  }

  return {
    fetchBohAuthData
  }
})
