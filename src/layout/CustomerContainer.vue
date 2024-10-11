<script setup></script>
<template>
  <div class="w-full max-w-screen-sm min-h-screen mx-auto bg-primary-50 relative">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<style scoped></style>
