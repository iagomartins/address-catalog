<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-4 py-3 border-b border-gray-700">
      <slot name="header" />
    </div>
    <div :class="bodyClasses">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-4 py-3 border-t border-gray-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: true,
  hover: false
})

const cardClasses = computed(() => {
  const base = 'bg-background rounded-lg border border-gray-700'
  const shadowClass = props.shadow ? 'shadow-lg' : ''
  const hoverClass = props.hover ? 'transition-shadow hover:shadow-xl cursor-pointer' : ''
  return `${base} ${shadowClass} ${hoverClass}`
})

const bodyClasses = computed(() => {
  const paddings = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  }
  return paddings[props.padding]
})
</script>

