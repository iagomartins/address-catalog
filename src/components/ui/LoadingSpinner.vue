<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 backdrop-blur-sm">
    <div class="flex flex-col items-center gap-4">
      <div class="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      <p v-if="message" class="text-white text-sm font-medium">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: undefined
})
</script>

