<script setup>
import { ref } from 'vue'
import footerLogo from '@/assets/images/logo/footer-logo.png'
const footerListData = ref([
  { name: '隱私條款保護', url: '/' },
  { name: '服務條款', url: '/' },
  { name: 'Cookies Settings', url: '/' }
])
</script>
<template>
  <div class="bg-neutral-700 flex flex-col px-3 py-8 gap-y-4">
    <div>
      <img :src="footerLogo" />
    </div>
    <p class="text-neutral-300">
      <small>
        <span>&copy; 2024 SmartSync. All rights reserved.</span>
      </small>
    </p>
    <ul class="flex gap-x-4 text-neutral-50">
      <li v-for="listItem in footerListData" :key="listItem.name">
        <RouterLink :to="listItem.url">{{ listItem.name }}</RouterLink>
      </li>
    </ul>
    <p class="text-neutral-300 font-normal">
      If you are using a screen reader and are having problems using this website, please call (+123) 456-7890 for assistance.
    </p>
  </div>
</template>
<style scoped></style>
