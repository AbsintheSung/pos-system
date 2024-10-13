import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/apis/apiUrl'
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/product.js'
import { deepClone } from '@/utils/deepClone.ts';
export const useMenuStore = defineStore('menu', () => {
	const productStore = useProductStore()
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
			productStore.addDessertOptions(response.data, '其他點心')
		} catch (error) {
			console.log(error)
		}
	}

	return {
		getMenuList,
		getMenuCategory,
		getCategory,
		fetchMenu,
		fetchMenuCategory
	}
})
