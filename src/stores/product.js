import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/apis/apiUrl'
import { ref, computed } from 'vue'
import { deepClone } from '@/utils/deepClone.ts';
export const useProductStore = defineStore('product', () => {
	const productData = ref({})
	// const checkOptions = ref()

	const getProductData = computed(() => deepClone(productData.value))

	async function fetchProductData(id) {
		try {
			const response = await fetchApi.getProduct(id)
			productData.value = response.data
			console.log(productData.value)

		} catch (error) {
			console.log(error)
		}
	}

	return {
		getProductData,
		fetchProductData
	}
})
