
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useElementBounding } from '@vueuse/core'
export const useHeaderDomStore = defineStore('headerDom', () => {
  const headerNav = ref(null)
  const headerInput = ref(null)
  const headerInfo = ref(null)
  const customerContainer = ref(null)


  return {
    headerNav,
    headerInput,
    headerInfo,
    customerContainer,
  }
})