import api from '@/utils/apis/fetchRequest';
const urlName = import.meta.env.VITE_APP_API_NAME;
// 新增api路徑
const getMenuCategory = `/${urlName}/customer/getMenuCategory` //取得菜單類別

//匯出 api方法
export const fetchApi = {
	getMenuCategory: () => api.get(getMenuCategory)
	// ... 其他 API
}