<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import MainModal from './components/MainModal.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <MainHeader />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
    <MainModal />
  </div>
</template>
