<script setup></script>
<template>
  <div class="w-full max-w-screen-sm min-h-screen mx-auto bg-white px-3 relative">
    <slot name="header"></slot>
    <main>
      <slot></slot>
    </main>
    <slot name="footer"></slot>
  </div>
</template>
<style scoped></style>
