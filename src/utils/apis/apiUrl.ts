import api from '@/utils/apis/fetchRequest';
const urlName = import.meta.env.VITE_APP_API_NAME;
// 新增api路徑
const getMenuCategory = `/${urlName}/customer/getMenuCategory` //取得菜單類別
const getMenuList = `/${urlName}/customer/getMenuItem` //取得菜單
const getProduct = `/${urlName}/customer/getProduct`//取得單一商品
const getOrderId = `/${urlName}/customer/getOrderId`

//匯出 api方法
export const fetchApi = {
	getMenuCategory: () => api.get(getMenuCategory),
	getMenuList: () => api.get(getMenuList),
	getProduct: (id: any) => api.get(`${getProduct}/${id}`),
	getOrderId: () => api.get(getOrderId),
	// ... 其他 API
}