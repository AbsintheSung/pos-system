import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/apis/apiUrl'
import { ref, computed } from 'vue'
export const useMenuStore = defineStore('menu', () => {
	const menuList = ref([])
	const menuListCategory = ref([])


	const getMenuList = computed(() => deepClone(menuList.value))
	const getMenuCategory = computed(() => menuListCategory.value.map(item => ({ ...item })))
	const getCategory = computed(() => getMenuCategory.value[0]?.category || '')

	const fetchMenuCategory = async () => {
		try {
			const response = await fetchApi.getMenuCategory()
			menuListCategory.value = response.data
		} catch (error) {
			console.log(error)
		}
	}
	const fetchMenu = async () => {
		try {
			const response = await fetchApi.getMenuList()
			menuList.value = response.data
		} catch (error) {
			console.log(error)
		}
	}

	//深拷貝
	const deepClone = (objData) => {
		if (objData === null || typeof objData !== 'object') {
			return objData;
		}
		const result = Array.isArray(objData) ? [] : {};
		for (let key in objData) {
			// if(objData.hasOwnProperty(key)){
			//     result[key] = deepClone(objData[key])
			// }
			if (Object.prototype.hasOwnProperty.call(objData, key)) {
				result[key] = deepClone(objData[key])
			}

		}
		return result;
	}

	return {
		getMenuList,
		getMenuCategory,
		getCategory,
		fetchMenu,
		fetchMenuCategory
	}
})
