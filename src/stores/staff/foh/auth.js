import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { staffFetch } from '@/utils/apis/staff-foh/staffApiUrl'
const staffFohName = import.meta.env.VITE_APP_STAFF_FOH_TOKENNAME;
export const useStaffFohStore = defineStore('staff-foh-auth', () => {


  //外場員工登入-api ( 帳號 : fohemployee 密碼 : 123123 )
  const fetchAuthData = async (data) => {
    try {
      const response = await staffFetch.login(data)
      if (response.statusCode === 200) {
        const tokenValue = response.data.token
        document.cookie = `${staffFohName}=${tokenValue}`
        return response.message
      } else {
        throw response.message
      }
      // return { message: response.message, statusCode: response.statusCode }
    } catch (error) {
      console.log('外場員工登入錯誤', error)
      throw error
    }
  }

  return {
    fetchAuthData
  }
})
