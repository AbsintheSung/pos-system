<script setup></script>
<template>
  <div class="w-full max-w-screen-sm min-h-screen mx-auto bg-primary-50 relative flex flex-col">
    <header>
      <slot name="header"></slot>
    </header>
    <main class="flex flex-col flex-1">
      <slot></slot>
    </main>
    <footer class="mt-auto">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<style scoped></style>
