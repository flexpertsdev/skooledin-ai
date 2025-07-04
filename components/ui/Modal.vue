<template>
  <Teleport to="body">
    <Transition
      name="modal"
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click="handleOverlayClick"
      >
        <div
          ref="modalRef"
          class="modal-container"
          :class="`modal-container--${size}`"
          @click.stop
        >
          <div class="modal-header">
            <h2 class="modal-title">{{ title }}</h2>
            <button
              v-if="showClose"
              @click="close"
              class="modal-close"
              aria-label="Close modal"
            >
              <Icon name="heroicons:x-mark" />
            </button>
          </div>
          
          <div v-if="$slots.default" class="modal-body">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onKeyStroke, useFocusTrap } from '@vueuse/core'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface Props {
  modelValue: boolean
  title: string
  size?: ModalSize
  showClose?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showClose: true,
  closeOnOverlay: true,
  closeOnEscape: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalRef = ref<HTMLElement>()
const { activate, deactivate } = useFocusTrap(modalRef)

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

// Close on escape key
onKeyStroke('Escape', (e) => {
  if (props.modelValue && props.closeOnEscape) {
    e.preventDefault()
    close()
  }
})

// Lock body scroll when modal is open
const onBeforeEnter = () => {
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    activate()
  })
}

const onAfterLeave = () => {
  document.body.style.overflow = ''
  deactivate()
}

onUnmounted(() => {
  document.body.style.overflow = ''
  deactivate()
})
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4;
}

.modal-container {
  @apply bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col
         w-full max-w-lg mx-auto;
}

/* Size variants */
.modal-container--sm {
  @apply max-w-sm;
}

.modal-container--md {
  @apply max-w-lg;
}

.modal-container--lg {
  @apply max-w-2xl;
}

.modal-container--xl {
  @apply max-w-4xl;
}

.modal-container--full {
  @apply max-w-none h-full max-h-full rounded-none;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.modal-title {
  @apply text-xl font-semibold text-gray-900;
}

.modal-close {
  @apply p-2 -m-2 text-gray-400 hover:text-gray-600 transition-colors
         rounded-lg hover:bg-gray-100;
}

.modal-close Icon {
  @apply w-5 h-5;
}

.modal-body {
  @apply flex-1 p-6 overflow-y-auto;
}

.modal-footer {
  @apply p-6 border-t border-gray-200;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-300;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  @apply scale-95 translate-y-4;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .modal-overlay {
    @apply p-0;
  }
  
  .modal-container {
    @apply rounded-t-2xl rounded-b-none max-h-[100vh] h-full;
  }
  
  .modal-container--sm,
  .modal-container--md,
  .modal-container--lg,
  .modal-container--xl {
    @apply max-w-none;
  }
}
</style>