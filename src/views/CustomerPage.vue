<script setup>
import { ref, watch } from 'vue'
import Carousel from 'primevue/carousel'
import carouselImgOne from '@/assets/images/carousel/carousel-1.jpg'
import carouselImgTwo from '@/assets/images/carousel/carousel-2.jpg'
import carouselImgThree from '@/assets/images/carousel/carousel-3.jpg'
import CustomerContainer from '@/layout/CustomerContainer.vue'
const carousel = ref(null)
const homeCarouselImg = ref([
  { imgUrl: carouselImgOne, imgAlt: '輪播圖-藍莓塔' },
  { imgUrl: carouselImgTwo, imgAlt: '輪播圖-coffee-and-chill' },
  { imgUrl: carouselImgThree, imgAlt: '輪播圖-夏日好椰' }
])
watch(
  () => carousel.value?.allowAutoplay,
  (val) => {
    if (val === false) {
      carousel.value.stopAutoplay()
      carousel.value.allowAutoplay = true
      carousel.value.startAutoplay()
    }
  }
)
</script>
<template>
  <CustomerContainer>
    <template #header>
      <header class="flex justify-center absolute bottom-14 left-0 right-0 z-50">
        <RouterLink
          to="/customer/menu"
          class="bg-primary-700 border-none rounded-3xl py-2 px-20 text-neutral-50"
        >
          查看菜單
        </RouterLink>
      </header>
    </template>
    <template #default>
      <Carousel
        ref="carousel"
        :value="homeCarouselImg"
        :numVisible="1"
        :numScroll="1"
        :showNavigators="false"
        :autoplayInterval="4000"
        :circular="true"
        class="-mx-3"
        pt:indicatorList:class="absolute bottom-0 left-0 right-0 gap-x-4"
        pt:indicatorButton:class="rounded-full  w-3 h-3"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.data.imgUrl"
            :alt="slotProps.data.imgAlt"
            class="w-full min-h-screen"
          />
        </template>
      </Carousel>
    </template>
  </CustomerContainer>
  <!-- <main class="w-full max-w-screen-sm min-h-screen mx-auto bg-white px-3 relative">
    <div class="flex justify-center absolute bottom-14 left-0 right-0 z-50">
      <RouterLink
        to="/customer/menu"
        class="bg-primary-700 border-none rounded-3xl py-2 px-20 text-neutral-50"
      >
        查看菜單
      </RouterLink>
    </div>
    <Carousel
      ref="carousel"
      :value="homeCarouselImg"
      :numVisible="1"
      :numScroll="1"
      :showNavigators="false"
      :autoplayInterval="4000"
      :circular="true"
      class="-mx-3"
      pt:indicatorList:class="absolute bottom-0 left-0 right-0 gap-x-4"
      pt:indicatorButton:class="rounded-full  w-3 h-3"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.data.imgUrl"
          :alt="slotProps.data.imgAlt"
          class="w-full min-h-screen"
        />
      </template>
    </Carousel>
  </main> -->
</template>
<style scoped></style>
