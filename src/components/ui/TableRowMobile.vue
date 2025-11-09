<template>
  <div class="border-b border-gray-700 bg-background">
    <button
      @click="isExpanded = !isExpanded"
      class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
    >
      <div class="flex-1 text-left">
        <slot name="summary" />
      </div>
      <div class="ml-4 flex-shrink-0">
        <svg
          :class="[
            'h-5 w-5 text-gray-400 transition-transform',
            isExpanded ? 'transform rotate-180' : ''
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    <div
      v-show="isExpanded"
      class="px-4 pb-3 pt-0 border-t border-gray-700 bg-gray-800/30"
    >
      <slot name="details" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)
</script>

