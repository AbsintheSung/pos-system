import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/apis/apiUrl'
import { ref, computed } from 'vue'
import { deepClone } from '@/utils/deepClone.ts';
export const useProductStore = defineStore('product', () => {
	const productData = ref({})
	const customization = ref([])
	const dessertOptions = ref([])
	const checkBoxOptions = ref([{
		id: 1,
		label: '冰塊',
		// options: ['正常冰', '少冰', '微冰', '去冰', '熱飲']
		options: [{ name: '正常冰', value: '正常冰' }, { name: '少冰', value: '少冰' }, { name: '微冰', value: '微冰' }, { name: '去冰', value: '去冰' }, { name: '熱飲', value: '熱飲' }]
	},
	{
		id: 2,//(限冷飲)
		label: '冰塊',
		// options: ['正常冰', '少冰', '微冰', '去冰']
		options: [{ name: '正常冰', value: '正常冰' }, { name: '少冰', value: '少冰' }, { name: '微冰', value: '微冰' }, { name: '去冰', value: '去冰' }]
	},
	{
		id: 3,
		label: '甜度',
		// options: ['無糖', '微糖', '少糖', '半糖', '全糖']
		options: [{ name: '無糖', value: '無糖' }, { name: '微糖', value: '微糖' }, { name: '少糖', value: '少糖' }, { name: '半糖', value: '半糖' }, { name: '全糖', value: '全糖' }]
	},
	{
		id: 4,
		label: '更換燕麥奶',
		// options: ['否', '是']
		options: [{ name: '更換燕麥奶', value: '是' }, { name: '不要更換燕麥奶', value: '否' }]
	},
	{
		id: 5,
		label: '要不要鮮奶油',
		// options: ['否', '是']
		options: [{ name: '要鮮奶油', value: '是' }, { name: '不要鮮奶油', value: '否' }]
	},
	{
		id: 6,
		label: '加購點心'
	}])

	const getProductData = computed(() => deepClone(productData.value))
	const getDessertOptions = computed(() => deepClone(dessertOptions.value))
	const getCustomization = computed(() => customization.value)
	const getCustomizationOptions = computed(() => {
		return checkBoxOptions.value.filter(option => {
			return customization.value.includes(option.id);
		});
	});

	const fetchProductData = async (id) => {
		try {
			const response = await fetchApi.getProduct(id)
			productData.value = response.data
			customization.value = response.data.customization
			console.log(checkBoxOptions.value)
		} catch (error) {
			console.log(error)
		}
	}


	const filterCategoryOptions = (fetchData, categoryName) => {
		const foundCategory = fetchData.find(category => category.categoryName === categoryName)
		if (!foundCategory) {
			return []
		}
		const categoryItems = foundCategory.categoryItem
		const filteredItems = categoryItems.map(item => {
			return {
				name: item.name,
				price: item.price
			}
		})
		return filteredItems
	}

	const addDessertOptions = (fetchData, categoryName) => {
		const dessertItems = filterCategoryOptions(fetchData, categoryName)
		const dessertData = checkBoxOptions.value.find(option => option.id === 6)
		if (dessertData) {
			dessertOptions.value = dessertItems.map(item => item)
			dessertData.options = dessertItems.map(item => item)
		}
	}


	return {
		getProductData,
		getCustomization,
		getCustomizationOptions,
		getDessertOptions,
		addDessertOptions,
		fetchProductData,
	}
})
