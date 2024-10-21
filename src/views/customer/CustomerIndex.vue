<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useMenuStore } from '@/stores/menu.js'
const menuStore = useMenuStore()
onMounted(async () => {
  await menuStore.fetchMenuCategory()
  await menuStore.fetchMenu()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
