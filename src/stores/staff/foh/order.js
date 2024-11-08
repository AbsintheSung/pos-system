import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { staffFetch } from '@/utils/apis/staff-foh/staffApiUrl'
import { deepClone } from '@/utils/deepClone.ts';
export const useFohOrderStore = defineStore('staff-foh-order', () => {
  const orderCategory = ref('all')
  const orders = ref({
    all: { data: [], totalCount: 0, totalPages: 0 },
    unpaid: { data: [], totalCount: 0, totalPages: 0 },
    preparing: { data: [], totalCount: 0, totalPages: 0 },
    ready: { data: [], totalCount: 0, totalPages: 0 },
    completed: { data: [], totalCount: 0, totalPages: 0 },
  })
  const orderListData = ref([])
  const orderDetail = ref({})

  // 狀態名稱到數字的映射表
  const statusMap = {
    all: 0,
    unpaid: 2,
    preparing: 3,
    ready: 4,
    completed: 5,
  }
  const orderCategoryMap = {
    all: '全部訂單',
    dinein: '內用',
    takeout: '外帶'
  }

  const getOrder = computed(() => deepClone(orders.value))
  const getOrderListData = computed(() => orderListData.value.map(item => item))
  const getOrderType = computed(() => orderCategory.value)
  const getOrderTypeRequest = computed(() => orderCategoryMap[orderCategory.value]) //取得要傳遞給後端Type格式 ( all-> 全部訂單 )
  const getIsDetail = computed(() => Object.keys(orderDetail.value).length === 0 ? true : false) // 判斷是否有資料，true為沒資料
  const getOrderDetail = computed(() => {
    if (Object.keys(orderDetail.value).length === 0) {
      return orderDetail.value
    } else {
      return {
        ...orderDetail.value,
        items: orderDetail.value.items.map(item => ({ ...item }))
      }
    }
  })
  const getOrderDetailStatus = computed(() => getOrderDetail.value.orderStatus)
  const getOrderDetailId = computed(() => getOrderDetail.value.orderId)
  const getDetailTotalServing = computed(() => {
    if (Object.keys(orderDetail.value).length === 0) return 0
    return getOrderDetail.value.items.reduce((total, item) => {
      return total + item.serving
    }, 0)
  })

  // 計算所有商品的總價格 (數量 * 單價的總和)
  const getDetailTotalAmount = computed(() => {
    if (Object.keys(orderDetail.value).length === 0) return 0
    return getOrderDetail.value.items.reduce((total, item) => {
      return total + (item.serving * item.price)
    }, 0)
  })


  // const fetchOrderPages = async () => {
  //   try {
  //     for (const [key, status] of Object.entries(statusMap)) {
  //       const response = await staffFetch.orderCount(status)
  //       orders.value[key].totalPages = response.data.pageCount
  //       orders.value[key].totalCount = response.data.orderCount
  //     }
  //     console.log(orders.value)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  //從後端 獲取總數量以及頁數
  const fetchOrderPages = async () => {
    try {
      const promises = Object.entries(statusMap).map(async ([key, status]) => {
        const response = await staffFetch.orderCount(status)
        return { key, data: response.data }
      })

      const results = await Promise.all(promises)
      console.log('results', results)
      results.forEach(({ key, data }) => {
        orders.value[key].totalPages = data.pageCount
        orders.value[key].totalCount = data.orderCount
      })

      console.log(orders.value)
    } catch (error) {
      console.log(error)
    }
  }

  //從後端獲取資料 ( 傳入相對應的，參數，未傳遞的話為全部資料 )
  const fetchOrderData = async (page, order, type, orderBy, search) => {
    const orderStatus = statusMap[order]
    try {
      const response = await staffFetch.orderData(page, orderStatus, type, orderBy, search)
      // const test = await staffFetch.orderAllData()
      // console.log('test', test)
      orderListData.value = response.data
      console.log('資料', response)
    } catch (error) {
      console.log(error)
    }
  }

  //從後端獲取 單一資料
  const fetchOrderDetail = async (id) => {
    try {
      const response = await staffFetch.orderDetail(id)
      orderDetail.value = response.data
      console.log(getOrderDetail.value)
      console.log(getDetailTotalServing.value)
      console.log(getDetailTotalAmount.value)
    } catch (error) {
      console.log(error)
    }
  }

  //發送 完成結帳 api
  const fetchOrderCheckout = async (data) => {
    console.log("測試data", data)
    try {
      const response = await staffFetch.orderCheck(data)
      console.log(response)
      const checkoutData = response.data
      const message = response.message
      if (response.statusCode === 200) {
        return { checkoutData, message }
      }
    } catch (error) {
      console.log(error)
    }
  }

  //發送完成訂單
  const fetchOrderComplete = async () => {
    const orderId = {
      orderId: orderDetail.value.orderId
    }
    try {
      const response = await staffFetch.orderComplete(orderId)
      console.log(response)
      if (response.statusCode === 200) {
        await fetchOrderPages()
        await fetchOrderData('', 'ready')
        resetOrderDetail()
        return response
      }
    } catch (error) {
      console.log(error)
    }
    // console.log(orderDetail.value.orderId)
  }

  //修改
  const setOrderCategory = (type) => {
    orderCategory.value = type
  }

  const resetOrderDetail = () => {
    orderDetail.value = {}
    console.log('有執行')
  }

  const handleOrderForm = () => {
    console.log('123')
  }

  return {
    // orders,
    getOrder,
    getOrderListData,
    getOrderType,
    getOrderTypeRequest,
    getIsDetail,
    getOrderDetail,
    getDetailTotalServing,
    getDetailTotalAmount,
    getOrderDetailStatus,
    getOrderDetailId,
    fetchOrderPages,
    fetchOrderData,
    fetchOrderDetail,
    setOrderCategory,
    resetOrderDetail,
    handleOrderForm,
    fetchOrderCheckout,
    fetchOrderComplete
  }
})