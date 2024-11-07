import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { staffBohFetch } from '@/utils/apis/staff-boh/staffApiUrl'
import { deepClone } from '@/utils/deepClone.ts';
const orderTypeMap = {
  all: '0',      // 全部
  dinein: '1',   // 內用
  takeout: '2'   // 外帶(含自取)
};
export const useBohOrderStore = defineStore('staff-Boh-order', () => {

  const filterBtnType = ref('all')
  const orderAllData = ref([])
  const getFilterBtnType = computed(() => filterBtnType.value)
  const getOrderAllData = computed(() => {
    return orderAllData.value.map(order => ({
      ...order,
      items: order.items.map(item => ({
        ...item,
        Customization: item.Customization ? item.Customization.split(',') : []
      }))
    }));
  });

  const fetchAllOrder = async () => {
    try {
      const response = await staffBohFetch.bohOrder('0')
      orderAllData.value = response.data
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchOrder = async () => {
    const orderType = orderTypeMap[filterBtnType.value] || '0';
    try {
      const response = await staffBohFetch.bohOrder(orderType);
      orderAllData.value = response.data;
    } catch (error) {
      console.log(error)
    }

    // if (filterBtnType.value === 'all') {
    //   const response = await staffBohFetch.bohOrder('0')//全部
    //   orderAllData.value = response.data
    // }
    // if (filterBtnType.value === 'dinein') {
    //   const response = await staffBohFetch.bohOrder('1')//內用
    //   orderAllData.value = response.data
    // }
    // if (filterBtnType.value === 'takeout') {
    //   const response = await staffBohFetch.bohOrder('2')//外帶(含自取)
    //   orderAllData.value = response.data
    // }
  }

  const fetachBohComplete = async (orderId) => {
    try {
      const response = await staffBohFetch.bohCompleted(orderId)
      if (response.statusCode === 200) {
        await fetchAllOrder()
        return response.message
      }

    } catch (error) {
      console.log(error)
    }
  }


  const setFilterBtnType = (type) => {
    filterBtnType.value = type
  }

  return {
    getFilterBtnType,
    getOrderAllData,
    fetchAllOrder,
    fetachBohComplete,
    fetchOrder,
    setFilterBtnType
  }
})