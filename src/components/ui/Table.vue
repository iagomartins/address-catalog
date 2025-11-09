<template>
  <div class="w-full overflow-x-auto">
    <table :class="tableClasses">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  striped?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  striped: true,
  hover: true
})

const tableClasses = computed(() => {
  const base = 'min-w-full divide-y divide-gray-700 bg-background'
  const stripedClass = props.striped ? '' : ''
  const hoverClass = props.hover ? '' : ''
  return `${base} ${stripedClass} ${hoverClass}`
})
</script>

