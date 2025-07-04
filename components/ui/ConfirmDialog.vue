<template>
  <Modal
    v-model="isOpen"
    :title="title"
    size="sm"
    :show-close="false"
    :close-on-overlay="false"
    :close-on-escape="!loading"
  >
    <div class="confirm-dialog">
      <div v-if="icon" class="confirm-icon" :class="`confirm-icon--${variant}`">
        <Icon :name="icon" />
      </div>
      
      <p class="confirm-message">{{ message }}</p>
      
      <p v-if="description" class="confirm-description">{{ description }}</p>
    </div>
    
    <template #footer>
      <div class="confirm-actions">
        <Button
          variant="secondary"
          @click="handleCancel"
          :disabled="loading"
        >
          {{ cancelText }}
        </Button>
        <Button
          :variant="confirmVariant"
          @click="handleConfirm"
          :loading="loading"
        >
          {{ confirmText }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
type DialogVariant = 'info' | 'warning' | 'error' | 'success'
type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface Props {
  modelValue: boolean
  title: string
  message: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: DialogVariant
  confirmVariant?: ButtonVariant
  icon?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'info',
  confirmVariant: 'primary',
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Default icons based on variant
const defaultIcon = computed(() => {
  if (props.icon) return props.icon
  
  const icons: Record<DialogVariant, string> = {
    info: 'heroicons:information-circle',
    warning: 'heroicons:exclamation-triangle',
    error: 'heroicons:x-circle',
    success: 'heroicons:check-circle'
  }
  
  return icons[props.variant]
})

const icon = computed(() => props.icon || defaultIcon.value)

// Confirm button variant based on dialog variant
const confirmVariant = computed(() => {
  if (props.confirmVariant !== 'primary') return props.confirmVariant
  
  if (props.variant === 'error' || props.variant === 'warning') {
    return 'danger'
  }
  
  return 'primary'
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
    isOpen.value = false
  }
}
</script>

<style scoped>
.confirm-dialog {
  @apply text-center space-y-4;
}

.confirm-icon {
  @apply w-16 h-16 mx-auto rounded-full flex items-center justify-center;
}

.confirm-icon Icon {
  @apply w-8 h-8;
}

.confirm-icon--info {
  @apply bg-blue-100 text-blue-600;
}

.confirm-icon--warning {
  @apply bg-yellow-100 text-yellow-600;
}

.confirm-icon--error {
  @apply bg-red-100 text-red-600;
}

.confirm-icon--success {
  @apply bg-green-100 text-green-600;
}

.confirm-message {
  @apply text-base font-medium text-gray-900;
}

.confirm-description {
  @apply text-sm text-gray-600;
}

.confirm-actions {
  @apply flex gap-3 justify-end;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .confirm-actions {
    @apply flex-col-reverse;
  }
  
  .confirm-actions > * {
    @apply w-full;
  }
}
</style>