<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})
const currentIndex = ref(0)
const intervalId = ref(null)
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

onMounted(() => {
  intervalId.value = setInterval(nextImage, 500) // Change image every 500ms
})

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})
</script>
<template>
  <div class="relative">
    <template v-for="(image, index) in images" :key="image">
      <transition name="fade">
        <img v-show="currentIndex === index" :src="image" alt="Loading animation frame" class="absolute top-0 left-0 w-full h-full object-contain" />
      </transition>
    </template>
  </div>
</template>
<style scoped></style>
