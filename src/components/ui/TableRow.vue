<template>
  <tr
    :class="[
      'border-b border-gray-700 transition-colors',
      hover ? 'hover:bg-gray-800/50' : '',
      striped && index % 2 === 1 ? 'bg-gray-800/30' : ''
    ]"
  >
    <slot />
  </tr>
</template>

<script setup lang="ts">
interface Props {
  index?: number
  hover?: boolean
  striped?: boolean
}

withDefaults(defineProps<Props>(), {
  index: 0,
  hover: true,
  striped: true
})
</script>

