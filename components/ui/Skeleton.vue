<template>
  <div
    class="skeleton"
    :class="[variantClass, { 'skeleton--animated': animated }]"
    :style="customStyle"
  />
</template>

<script setup lang="ts">
interface Props {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  animated: true
})

const variantClass = computed(() => `skeleton--${props.variant}`)

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return style
})
</script>

<style scoped>
.skeleton {
  @apply bg-gray-200;
}

/* Variants */
.skeleton--text {
  @apply h-4 rounded;
  width: 100%;
}

.skeleton--circular {
  @apply w-10 h-10 rounded-full;
}

.skeleton--rectangular {
  @apply w-full h-32;
}

.skeleton--rounded {
  @apply w-full h-32 rounded-lg;
}

/* Animation */
.skeleton--animated {
  @apply relative overflow-hidden;
}

.skeleton--animated::after {
  content: '';
  @apply absolute inset-0 -translate-x-full
         bg-gradient-to-r from-transparent via-white/20 to-transparent;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>