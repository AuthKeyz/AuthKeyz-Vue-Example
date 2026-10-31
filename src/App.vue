<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin-slow"></div>
  </div>
  <RouterView />
</template>

<style scoped>
</style>