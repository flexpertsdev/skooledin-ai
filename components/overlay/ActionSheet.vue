<template>
  <Teleport to="body">
    <Transition name="action-sheet">
      <div
        v-if="modelValue"
        class="action-sheet-wrapper"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="action-sheet-backdrop" />

        <!-- Sheet -->
        <div
          ref="sheetRef"
          class="action-sheet"
          role="dialog"
          :aria-modal="true"
          :aria-label="ariaLabel"
          :aria-describedby="descriptionId"
        >
          <!-- Header -->
          <div v-if="title || description" class="action-sheet-header">
            <h3 v-if="title" class="action-sheet-title">{{ title }}</h3>
            <p v-if="description" :id="descriptionId" class="action-sheet-description">
              {{ description }}
            </p>
          </div>

          <!-- Actions -->
          <div class="action-sheet-actions">
            <button
              v-for="(action, index) in actions"
              :key="action.id || index"
              @click="handleAction(action)"
              class="action-sheet-item"
              :class="{
                'action-sheet-item-destructive': action.destructive,
                'action-sheet-item-disabled': action.disabled
              }"
              :disabled="action.disabled"
              type="button"
            >
              <span v-if="action.icon" class="action-sheet-icon">
                <component :is="action.icon" v-if="typeof action.icon !== 'string'" />
                <span v-else v-html="action.icon" />
              </span>
              <span class="action-sheet-label">{{ action.label }}</span>
            </button>
          </div>

          <!-- Cancel -->
          <div v-if="showCancel" class="action-sheet-cancel">
            <button
              @click="cancel"
              class="action-sheet-item action-sheet-item-cancel"
              type="button"
            >
              {{ cancelLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
// useFocusTrap is imported from our custom composable

interface ActionItem {
  id?: string
  label: string
  icon?: any
  destructive?: boolean
  disabled?: boolean
  action?: () => void | Promise<void>
}

interface Props {
  modelValue: boolean
  actions: ActionItem[]
  title?: string
  description?: string
  showCancel?: boolean
  cancelLabel?: string
  persistent?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  showCancel: true,
  cancelLabel: 'Cancel',
  persistent: false,
  ariaLabel: 'Action menu'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'action': [action: ActionItem]
  'cancel': []
}>()

const sheetRef = ref<HTMLElement>()
const descriptionId = `action-sheet-desc-${Math.random().toString(36).substr(2, 9)}`
const { isMobile } = useResponsive()

// Handle action click
const handleAction = async (action: ActionItem) => {
  if (action.disabled) return

  emit('action', action)
  
  // Execute action if provided
  if (action.action) {
    try {
      await action.action()
    } catch (error) {
      console.error('Action sheet action error:', error)
    }
  }
  
  // Close sheet after action
  close()
}

// Handle backdrop click
const handleBackdropClick = (e: Event) => {
  if (e.target === e.currentTarget && !props.persistent) {
    cancel()
  }
}

// Cancel action
const cancel = () => {
  emit('cancel')
  close()
}

// Close sheet
const close = () => {
  emit('update:modelValue', false)
}

// Focus trap
const { activate, deactivate } = useFocusTrap(sheetRef, {
  immediate: false,
  escapeDeactivates: false,
  allowOutsideClick: true
})

// Lock body scroll when open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      sheetRef.value?.focus()
      activate()
    })
  } else {
    document.body.style.overflow = ''
    deactivate()
  }
})

// Keyboard handling
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!props.modelValue) return
    
    if (e.key === 'Escape' && !props.persistent) {
      e.preventDefault()
      cancel()
    }
  }
  
  window.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})

// Cleanup
onUnmounted(() => {
  document.body.style.overflow = ''
  deactivate()
})
</script>

<style scoped>
/* Wrapper */
.action-sheet-wrapper {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-modal);
  display: flex;
  align-items: flex-end;
  padding: var(--spacing-md);
}

/* Backdrop */
.action-sheet-backdrop {
  position: absolute;
  inset: 0;
  background-color: var(--surface-overlay);
  backdrop-filter: blur(2px);
}

/* Sheet */
.action-sheet {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  outline: none;
  z-index: 1;
}

/* Header */
.action-sheet-header {
  background-color: var(--surface-background);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  text-align: center;
}

.action-sheet-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  margin: 0;
}

.action-sheet-description {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  margin: var(--spacing-xs) 0 0;
}

/* Actions */
.action-sheet-actions {
  background-color: var(--surface-background);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

/* Action Item */
.action-sheet-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-lg);
  background: none;
  border: none;
  border-bottom: 1px solid var(--border-default);
  color: var(--primary-color);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color var(--transition-fast) var(--easing-standard);
  -webkit-tap-highlight-color: transparent;
}

.action-sheet-item:last-child {
  border-bottom: none;
}

.action-sheet-item:hover {
  background-color: var(--surface-default);
}

.action-sheet-item:active {
  background-color: var(--surface-default);
  transform: scale(0.98);
}

.action-sheet-item:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

/* Destructive action */
.action-sheet-item-destructive {
  color: var(--error-color);
}

/* Disabled action */
.action-sheet-item-disabled {
  color: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.5;
}

.action-sheet-item-disabled:hover,
.action-sheet-item-disabled:active {
  background-color: transparent;
  transform: none;
}

/* Icon */
.action-sheet-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 24px;
}

/* Cancel */
.action-sheet-cancel {
  background-color: var(--surface-background);
  border-radius: var(--radius-xl);
}

.action-sheet-item-cancel {
  font-weight: var(--font-weight-semibold);
}

/* Transitions */
.action-sheet-enter-active,
.action-sheet-leave-active {
  transition: opacity var(--transition-normal) var(--easing-standard);
}

.action-sheet-enter-active .action-sheet,
.action-sheet-leave-active .action-sheet {
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

.action-sheet-enter-from {
  opacity: 0;
}

.action-sheet-enter-from .action-sheet {
  transform: translateY(100%);
}

.action-sheet-leave-to {
  opacity: 0;
}

.action-sheet-leave-to .action-sheet {
  transform: translateY(100%);
}

/* Desktop adjustments */
@media (min-width: 768px) {
  .action-sheet-wrapper {
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
  }
  
  .action-sheet {
    max-width: 400px;
  }
}

/* Dark mode adjustments */
.dark-mode .action-sheet-header,
.dark-mode .action-sheet-actions,
.dark-mode .action-sheet-cancel {
  background-color: var(--surface-card);
}

.dark-mode .action-sheet-item {
  border-bottom-color: var(--border-subtle);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .action-sheet-enter-active,
  .action-sheet-leave-active,
  .action-sheet-enter-active .action-sheet,
  .action-sheet-leave-active .action-sheet {
    transition: opacity var(--transition-fast) var(--easing-standard);
  }
  
  .action-sheet-enter-from .action-sheet,
  .action-sheet-leave-to .action-sheet {
    transform: none;
  }
  
  .action-sheet-item:active {
    transform: none;
  }
}

/* Safe area */
.action-sheet-wrapper {
  padding-bottom: max(var(--spacing-md), var(--safe-area-inset-bottom));
}
</style>