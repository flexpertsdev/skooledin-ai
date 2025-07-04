<template>
  <span class="badge" :class="[variantClass, sizeClass]">
    <Icon v-if="icon" :name="icon" class="badge-icon" />
    <slot>{{ text }}</slot>
    <button
      v-if="closable"
      type="button"
      @click="$emit('close')"
      class="badge-close"
    >
      <Icon name="heroicons:x-mark" />
    </button>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

defineEmits<{
  close: []
}>()

const variantClass = computed(() => `badge--${props.variant}`)
const sizeClass = computed(() => `badge--${props.size}`)
</script>

<style scoped>
.badge {
  @apply inline-flex items-center gap-1 font-medium rounded-full;
}

/* Sizes */
.badge--sm {
  @apply px-2 py-0.5 text-xs;
}

.badge--md {
  @apply px-2.5 py-1 text-sm;
}

.badge--lg {
  @apply px-3 py-1.5 text-base;
}

/* Variants */
.badge--primary {
  @apply bg-primary-100 text-primary-700;
}

.badge--secondary {
  @apply bg-gray-100 text-gray-700;
}

.badge--success {
  @apply bg-green-100 text-green-700;
}

.badge--warning {
  @apply bg-yellow-100 text-yellow-700;
}

.badge--error {
  @apply bg-red-100 text-red-700;
}

.badge--info {
  @apply bg-blue-100 text-blue-700;
}

/* Icons */
.badge-icon {
  @apply w-3.5 h-3.5;
}

.badge--lg .badge-icon {
  @apply w-4 h-4;
}

.badge-close {
  @apply -mr-0.5 ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors;
}

.badge-close Icon {
  @apply w-3 h-3;
}
</style>