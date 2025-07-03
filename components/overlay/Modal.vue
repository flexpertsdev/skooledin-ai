<template>
  <Teleport to="body">
    <Transition :name="transitionName">
      <div
        v-if="modelValue"
        class="modal-wrapper"
        @click.self="handleBackdropClick"
        @keydown.escape="handleEscape"
      >
        <div
          ref="modalRef"
          class="modal"
          :class="modalClasses"
          :style="modalStyles"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="descriptionId"
          tabindex="-1"
        >
          <!-- Header -->
          <div v-if="$slots.header || title" class="modal-header">
            <slot name="header">
              <h2 :id="titleId" class="modal-title">{{ title }}</h2>
            </slot>
            <button
              v-if="showCloseButton"
              @click="close"
              class="modal-close"
              :aria-label="closeAriaLabel"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div :id="descriptionId" class="modal-content">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
// useFocusTrap is imported from our custom composable

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type Transition = 'fade' | 'scale' | 'slide-up' | 'slide-down'

interface Props {
  modelValue: boolean
  title?: string
  size?: Size
  persistent?: boolean
  showCloseButton?: boolean
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
  transition?: Transition
  centered?: boolean
  fullscreen?: boolean
  closeAriaLabel?: string
  maxWidth?: string
  maxHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  persistent: false,
  showCloseButton: true,
  closeOnEscape: true,
  closeOnBackdrop: true,
  transition: 'scale',
  centered: true,
  fullscreen: false,
  closeAriaLabel: 'Close modal'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'open': []
  'close': []
  'after-open': []
  'after-close': []
}>()

const modalRef = ref<HTMLElement>()
const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`
const descriptionId = `modal-description-${Math.random().toString(36).substr(2, 9)}`

// Size mapping
const sizeMap = {
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  full: '100%'
}

// Modal classes
const modalClasses = computed(() => ({
  [`modal-${props.size}`]: true,
  'modal-centered': props.centered,
  'modal-fullscreen': props.fullscreen
}))

// Modal styles
const modalStyles = computed(() => ({
  maxWidth: props.maxWidth || (props.fullscreen ? '100%' : sizeMap[props.size]),
  maxHeight: props.maxHeight || (props.fullscreen ? '100%' : '90vh')
}))

// Transition name
const transitionName = computed(() => `modal-${props.transition}`)

// Close modal
const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
    emit('close')
  }
}

// Handle backdrop click
const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}

// Handle escape key
const handleEscape = () => {
  if (props.closeOnEscape) {
    close()
  }
}

// Focus trap
const { activate, deactivate } = useFocusTrap(modalRef, {
  immediate: false,
  escapeDeactivates: false,
  allowOutsideClick: true
})

// Lock body scroll when open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    emit('open')
    nextTick(() => {
      modalRef.value?.focus()
      activate()
      emit('after-open')
    })
  } else {
    document.body.style.overflow = ''
    deactivate()
    nextTick(() => {
      emit('after-close')
    })
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
  deactivate()
})
</script>

<style scoped>
/* Wrapper */
.modal-wrapper {
  position: fixed;
  inset: 0;
  background-color: var(--surface-overlay);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  z-index: var(--z-index-modal);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Modal */
.modal {
  position: relative;
  background-color: var(--surface-background);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 90vh;
  margin: auto;
  overflow: hidden;
  outline: none;
}

.modal-centered {
  margin: auto;
}

.modal-fullscreen {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 0;
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  padding-right: var(--spacing-md);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
  flex-shrink: 0;
}

.modal-close:hover {
  background-color: var(--surface-default);
  color: var(--text-primary);
}

.modal-close:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

/* Content */
.modal-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-lg);
}

/* Footer */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-default);
  flex-shrink: 0;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .modal-wrapper {
    padding: var(--spacing-md);
  }
  
  .modal:not(.modal-fullscreen) {
    max-width: calc(100vw - var(--spacing-xl));
    max-height: calc(100vh - var(--spacing-xl));
  }
  
  .modal-header,
  .modal-content,
  .modal-footer {
    padding: var(--spacing-md);
  }
}

/* Transitions */
/* Fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--transition-normal) var(--easing-standard);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Scale */
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all var(--transition-normal) var(--easing-decelerate);
}

.modal-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-scale-enter-active .modal,
.modal-scale-leave-active .modal {
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

/* Slide Up */
.modal-slide-up-enter-active,
.modal-slide-up-leave-active {
  transition: all var(--transition-normal) var(--easing-decelerate);
}

.modal-slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.modal-slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Slide Down */
.modal-slide-down-enter-active,
.modal-slide-down-leave-active {
  transition: all var(--transition-normal) var(--easing-decelerate);
}

.modal-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Dark mode adjustments */
.dark-mode .modal {
  background-color: var(--surface-card);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal-fade-enter-active,
  .modal-fade-leave-active,
  .modal-scale-enter-active,
  .modal-scale-leave-active,
  .modal-slide-up-enter-active,
  .modal-slide-up-leave-active,
  .modal-slide-down-enter-active,
  .modal-slide-down-leave-active {
    transition: opacity var(--transition-fast) var(--easing-standard);
  }
  
  .modal-scale-enter-from,
  .modal-scale-leave-to,
  .modal-slide-up-enter-from,
  .modal-slide-up-leave-to,
  .modal-slide-down-enter-from,
  .modal-slide-down-leave-to {
    transform: none;
  }
}
</style>