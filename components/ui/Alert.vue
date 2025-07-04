<template>
  <div
    class="alert"
    :class="[variantClass, { 'alert--dismissible': dismissible }]"
    role="alert"
  >
    <Icon :name="iconName" class="alert-icon" />
    <div class="alert-content">
      <h3 v-if="title" class="alert-title">{{ title }}</h3>
      <p class="alert-message">
        <slot>{{ message }}</slot>
      </p>
      <div v-if="$slots.actions" class="alert-actions">
        <slot name="actions" />
      </div>
    </div>
    <button
      v-if="dismissible"
      type="button"
      @click="$emit('dismiss')"
      class="alert-dismiss"
    >
      <Icon name="heroicons:x-mark" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message?: string
  dismissible?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info'
})

defineEmits<{
  dismiss: []
}>()

const variantClass = computed(() => `alert--${props.variant}`)

const iconName = computed(() => {
  if (props.icon) return props.icon
  
  const icons = {
    info: 'heroicons:information-circle',
    success: 'heroicons:check-circle',
    warning: 'heroicons:exclamation-triangle',
    error: 'heroicons:x-circle'
  }
  
  return icons[props.variant]
})
</script>

<style scoped>
.alert {
  @apply flex gap-3 p-4 rounded-lg border;
}

/* Variants */
.alert--info {
  @apply bg-blue-50 text-blue-800 border-blue-200;
}

.alert--success {
  @apply bg-green-50 text-green-800 border-green-200;
}

.alert--warning {
  @apply bg-yellow-50 text-yellow-800 border-yellow-200;
}

.alert--error {
  @apply bg-red-50 text-red-800 border-red-200;
}

.alert-icon {
  @apply flex-shrink-0 w-5 h-5 mt-0.5;
}

.alert--info .alert-icon {
  @apply text-blue-600;
}

.alert--success .alert-icon {
  @apply text-green-600;
}

.alert--warning .alert-icon {
  @apply text-yellow-600;
}

.alert--error .alert-icon {
  @apply text-red-600;
}

.alert-content {
  @apply flex-1 space-y-1;
}

.alert-title {
  @apply font-medium;
}

.alert-message {
  @apply text-sm;
}

.alert-actions {
  @apply mt-3 flex gap-3;
}

.alert-dismiss {
  @apply flex-shrink-0 p-1 -m-1 rounded hover:bg-black/5 transition-colors;
}

.alert-dismiss Icon {
  @apply w-4 h-4;
}
</style>