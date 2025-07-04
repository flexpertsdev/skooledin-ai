<template>
  <div class="banner" :class="variantClass">
    <div class="banner-container">
      <div class="banner-content">
        <Icon v-if="icon" :name="icon" class="banner-icon" />
        <div class="banner-text">
          <slot>{{ message }}</slot>
        </div>
        <div v-if="$slots.actions" class="banner-actions">
          <slot name="actions" />
        </div>
      </div>
      <button
        v-if="dismissible"
        type="button"
        @click="$emit('dismiss')"
        class="banner-dismiss"
      >
        <Icon name="heroicons:x-mark" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error'
  message?: string
  icon?: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

defineEmits<{
  dismiss: []
}>()

const variantClass = computed(() => `banner--${props.variant}`)
</script>

<style scoped>
.banner {
  @apply w-full py-3 px-4;
}

/* Variants */
.banner--default {
  @apply bg-gray-100 text-gray-800;
}

.banner--info {
  @apply bg-blue-600 text-white;
}

.banner--success {
  @apply bg-green-600 text-white;
}

.banner--warning {
  @apply bg-yellow-500 text-yellow-900;
}

.banner--error {
  @apply bg-red-600 text-white;
}

.banner-container {
  @apply max-w-7xl mx-auto flex items-center justify-between;
}

.banner-content {
  @apply flex items-center gap-3 flex-1;
}

.banner-icon {
  @apply flex-shrink-0 w-5 h-5;
}

.banner-text {
  @apply text-sm font-medium;
}

.banner-actions {
  @apply flex items-center gap-2 ml-4;
}

.banner-dismiss {
  @apply p-1 -m-1 rounded hover:bg-white/10 transition-colors;
}

.banner-dismiss Icon {
  @apply w-5 h-5;
}
</style>