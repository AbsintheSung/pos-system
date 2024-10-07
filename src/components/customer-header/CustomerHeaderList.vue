<script setup>
import { ref, useTemplateRef } from 'vue'
const ulDom = useTemplateRef('ulDom')
const listData = ref([
  { name: '義式咖啡', url: '/customer/menu/italianCoffee' },
  { name: '茶飲', url: '/customer/menu/tea' },
  { name: '冰沙系列', url: '/customer/menu/smoothies' },
  { name: '蛋糕', url: '/customer/menu/cake' },
  { name: '其他點心', url: '/customer/menu/otherDessert' }
])
defineProps({
  isHeaderListFixed: {
    type: String,
    default: ''
  }
})
defineExpose({
  ulDom: ulDom
})
</script>
<template>
  <ul
    ref="ulDom"
    class="flex items-center p-3 gap-x-6 transition-all overflow-x-auto whitespace-nowrap scrollbar-hide max-w-screen-sm"
    :class="isHeaderListFixed"
  >
    <li class="flex-grow" v-for="listItem in listData" :key="listItem.name">
      <RouterLink class="pb-1" :to="listItem.url" exact-active-class="link-active">
        {{ listItem.name }}
      </RouterLink>
    </li>
  </ul>
</template>
<style scoped lang="scss">
.link-active {
  border-bottom: 1px solid $primary-700;
  color: $primary-700;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
