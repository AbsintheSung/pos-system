<script setup>
import { useTemplateRef } from 'vue'
const infoDom = useTemplateRef('infoDom')
defineExpose({
  infoDom: infoDom
})
</script>
<template>
  <div class="p-3 flex flex-col gap-y-2" ref="infoDom">
    <h1 class="font-bold text-2xl">BUY咖</h1>
    <p class="text-neutral-400">高雄市苓雅區四維三路217號</p>
  </div>
</template>
<style scoped></style>
