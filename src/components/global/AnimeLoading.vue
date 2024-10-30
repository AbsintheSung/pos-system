<script setup>
import BlockUI from 'primevue/blockui'
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  loadingTitle: {
    type: String,
    default: ''
  },

})
</script>
<template>
  <BlockUI :blocked="isLoading" fullScreen class="flex items-center justify-center w-full h-full absolute">
    <template v-if="isLoading">
      <div class="flex flex-col items-center justify-center bg-neutral-50 border-2 border-neutral-950 rounded-lg p-4 z-50">
        <slot></slot>
        <p>{{ loadingTitle }}</p>
      </div>
    </template>
  </BlockUI>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
