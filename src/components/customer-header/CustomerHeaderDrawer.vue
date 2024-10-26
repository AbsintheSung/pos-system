<script setup>
import { computed, ref } from 'vue'
import Drawer from 'primevue/drawer'
const MenuListData = ref([
  { name: '會員中心', url: '/' },
  { name: '歷史訂單', url: '/' },
  { name: '進度查詢', url: '/' },
  { name: '店家公告', url: '/' },
  { name: '店家地址', url: '/' }
])
const props = defineProps({
  navHeight: {
    type: Number,
    default: 0
  },
  isDrawerOpen: {
    type: Boolean,
    default: false
  },
  handleDrawerClose: {
    type: Function,
    default: () => {}
  },
  maskleft: {
    type: Number,
    default: 0
  },
  maskwidth: {
    type: Number
  }
})
const visible = computed({
  get: () => props.isDrawerOpen,
  set: () => props.handleDrawerClose()
})
const navHeightStyle = computed(() => `${props.navHeight}px`)
</script>
<template>
  <Drawer
    v-model:visible="visible"
    :showCloseIcon="false"
    pt:header:class="hidden"
    pt:root:class="max-w-[305px] border-none"
    pt:content:class="px-0"
    :pt:mask:style="[{ left: maskleft + 'px' }, { width: maskwidth + 'px' }]"
    :style="[{ top: navHeightStyle }]"
  >
    <ul class="flex flex-col">
      <li class="p-4 border-b border-neutral-300" v-for="listItem in MenuListData" :key="listItem.name">
        <RouterLink :to="`${listItem.url}`">{{ listItem.name }}</RouterLink>
      </li>
    </ul>
  </Drawer>
</template>
<style lang="scss"></style>
