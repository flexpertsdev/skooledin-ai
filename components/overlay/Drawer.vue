<template>
  <Teleport to="body">
    <div v-if="modelValue || isAnimating" class="drawer-wrapper">
      <!-- Backdrop -->
      <Transition name="backdrop">
        <div 
          v-if="modelValue && backdrop"
          class="drawer-backdrop"
          @click="handleBackdropClick"
        />
      </Transition>

      <!-- Drawer -->
      <Transition :name="`drawer-${position}`">
        <div
          v-if="modelValue"
          ref="drawerRef"
          class="drawer"
          :class="drawerClasses"
          :style="drawerStyles"
          role="dialog"
          :aria-modal="true"
          :aria-label="ariaLabel"
          @keydown.escape="handleEscape"
        >
          <!-- Header -->
          <div v-if="$slots.header || title" class="drawer-header">
            <slot name="header">
              <h2 class="drawer-title">{{ title }}</h2>
            </slot>
            <button
              v-if="showCloseButton"
              @click="close"
              class="drawer-close"
              aria-label="Close drawer"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="drawer-content">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="drawer-footer">
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside, useSwipe } from '@vueuse/core'
// useFocusTrap is imported from our custom composable

type Position = 'left' | 'right' | 'top' | 'bottom'
type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface Props {
  modelValue: boolean
  position?: Position
  size?: Size
  backdrop?: boolean
  persistent?: boolean
  showCloseButton?: boolean
  swipeToClose?: boolean
  title?: string
  ariaLabel?: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
  size: 'md',
  backdrop: true,
  persistent: false,
  showCloseButton: true,
  swipeToClose: true,
  ariaLabel: 'Drawer'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'open': []
  'close': []
}>()

const drawerRef = ref<HTMLElement>()
const isAnimating = ref(false)
const { isMobile } = useResponsive()

// Size mappings
const sizeMap = {
  sm: { width: '280px', height: '200px' },
  md: { width: '360px', height: '300px' },
  lg: { width: '480px', height: '400px' },
  xl: { width: '640px', height: '500px' },
  full: { width: '100%', height: '100%' }
}

// Drawer classes
const drawerClasses = computed(() => ({
  [`drawer-${props.position}`]: true,
  [`drawer-${props.size}`]: true,
  'drawer-mobile': isMobile.value
}))

// Drawer styles
const drawerStyles = computed(() => {
  const isHorizontal = props.position === 'left' || props.position === 'right'
  const dimension = isHorizontal ? 'width' : 'height'
  const sizeValue = props[dimension] || sizeMap[props.size][dimension]
  
  return {
    [dimension]: props.size === 'full' ? '100%' : sizeValue
  }
})

// Handle backdrop click
const handleBackdropClick = () => {
  if (!props.persistent) {
    close()
  }
}

// Handle escape key
const handleEscape = () => {
  if (!props.persistent) {
    close()
  }
}

// Close drawer
const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Watch model value
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    isAnimating.value = true
    document.body.style.overflow = 'hidden'
    emit('open')
  } else {
    document.body.style.overflow = ''
    setTimeout(() => {
      isAnimating.value = false
    }, 300)
  }
})

// Swipe to close
if (props.swipeToClose && isMobile.value && drawerRef.value) {
  const { lengthX, lengthY, direction } = useSwipe(drawerRef, {
    threshold: 50,
    onSwipeEnd() {
      const horizontalSwipe = Math.abs(lengthX.value) > Math.abs(lengthY.value)
      const verticalSwipe = Math.abs(lengthY.value) > Math.abs(lengthX.value)
      
      if (
        (props.position === 'left' && direction.value === 'left' && lengthX.value > 100 && horizontalSwipe) ||
        (props.position === 'right' && direction.value === 'right' && lengthX.value > 100 && horizontalSwipe) ||
        (props.position === 'top' && direction.value === 'up' && lengthY.value > 100 && verticalSwipe) ||
        (props.position === 'bottom' && direction.value === 'down' && lengthY.value > 100 && verticalSwipe)
      ) {
        close()
      }
    }
  })
}

// Focus trap
const { activate, deactivate } = useFocusTrap(drawerRef, {
  immediate: false,
  escapeDeactivates: false,
  allowOutsideClick: true
})

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      drawerRef.value?.focus()
      activate()
    })
  } else {
    deactivate()
  }
})

// Cleanup
onUnmounted(() => {
  document.body.style.overflow = ''
  deactivate()
})
</script>

<style scoped>
/* Wrapper */
.drawer-wrapper {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-modal);
  pointer-events: none;
}

.drawer-wrapper > * {
  pointer-events: auto;
}

/* Backdrop */
.drawer-backdrop {
  position: absolute;
  inset: 0;
  background-color: var(--surface-overlay);
  backdrop-filter: blur(2px);
}

/* Drawer */
.drawer {
  position: absolute;
  background-color: var(--surface-background);
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  outline: none;
}

/* Position variants */
.drawer-left {
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
}

.drawer-right {
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: var(--radius-xl) 0 0 var(--radius-xl);
}

.drawer-top {
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}

.drawer-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

/* Mobile adjustments */
.drawer-mobile.drawer-left,
.drawer-mobile.drawer-right {
  max-width: calc(100vw - var(--spacing-xl));
}

.drawer-mobile.drawer-top,
.drawer-mobile.drawer-bottom {
  max-height: calc(100vh - var(--spacing-xl));
}

/* Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
}

.drawer-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.drawer-close {
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
}

.drawer-close:hover {
  background-color: var(--surface-default);
  color: var(--text-primary);
}

.drawer-close:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

/* Content */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-lg);
}

/* Footer */
.drawer-footer {
  border-top: 1px solid var(--border-default);
  padding: var(--spacing-lg);
  flex-shrink: 0;
}

/* Transitions */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity var(--transition-normal) var(--easing-standard);
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Left drawer */
.drawer-left-enter-active,
.drawer-left-leave-active {
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

.drawer-left-enter-from,
.drawer-left-leave-to {
  transform: translateX(-100%);
}

/* Right drawer */
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

.drawer-right-enter-from,
.drawer-right-leave-to {
  transform: translateX(100%);
}

/* Top drawer */
.drawer-top-enter-active,
.drawer-top-leave-active {
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

.drawer-top-enter-from,
.drawer-top-leave-to {
  transform: translateY(-100%);
}

/* Bottom drawer */
.drawer-bottom-enter-active,
.drawer-bottom-leave-active {
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

.drawer-bottom-enter-from,
.drawer-bottom-leave-to {
  transform: translateY(100%);
}

/* Dark mode adjustments */
.dark-mode .drawer {
  background-color: var(--surface-card);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .drawer-left-enter-active,
  .drawer-left-leave-active,
  .drawer-right-enter-active,
  .drawer-right-leave-active,
  .drawer-top-enter-active,
  .drawer-top-leave-active,
  .drawer-bottom-enter-active,
  .drawer-bottom-leave-active {
    transition: opacity var(--transition-fast) var(--easing-standard);
  }
  
  .drawer-left-enter-from,
  .drawer-left-leave-to,
  .drawer-right-enter-from,
  .drawer-right-leave-to,
  .drawer-top-enter-from,
  .drawer-top-leave-to,
  .drawer-bottom-enter-from,
  .drawer-bottom-leave-to {
    transform: none;
  }
}
</style>