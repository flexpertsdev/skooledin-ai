<template>
  <Teleport to="body">
    <div class="sidebar-wrapper" :class="{ open: modelValue }">
      <!-- Backdrop -->
      <Transition name="backdrop">
        <div
          v-if="modelValue && backdrop"
          class="sidebar-backdrop"
          :aria-hidden="!modelValue"
          @click="close"
        />
      </Transition>

      <!-- Sidebar -->
      <Transition :name="`sidebar-${position}`">
        <aside
          v-if="modelValue"
          class="sidebar"
          :class="sidebarClasses"
          :style="sidebarStyles"
          role="navigation"
          :aria-label="ariaLabel"
          @keydown.escape="close"
        >
          <!-- Header -->
          <div v-if="$slots.header || title" class="sidebar-header">
            <slot name="header">
              <h2 class="sidebar-title">{{ title }}</h2>
            </slot>
            <button
              v-if="showCloseButton"
              class="sidebar-close"
              aria-label="Close sidebar"
              @click="close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="sidebar-content">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="sidebar-footer">
            <slot name="footer" />
          </div>
        </aside>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside, useSwipe } from '@vueuse/core'

type Position = 'left' | 'right'
type Size = 'sm' | 'md' | 'lg' | 'full'

interface Props {
  modelValue: boolean
  position?: Position
  size?: Size
  backdrop?: boolean
  persistent?: boolean
  showCloseButton?: boolean
  title?: string
  ariaLabel?: string
  swipeToClose?: boolean
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
  size: 'md',
  backdrop: true,
  persistent: false,
  showCloseButton: true,
  ariaLabel: 'Sidebar navigation',
  swipeToClose: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const sidebarRef = ref<HTMLElement>()
const { isMobile } = useResponsive()

const sizeMap = {
  sm: '280px',
  md: '320px',
  lg: '400px',
  full: '100%'
}

const sidebarClasses = computed(() => ({
  [`sidebar-${props.position}`]: true,
  [`sidebar-${props.size}`]: true,
  'sidebar-mobile': isMobile.value
}))

const sidebarStyles = computed(() => ({
  width: props.width || (isMobile.value ? '85%' : sizeMap[props.size]),
  maxWidth: isMobile.value ? '400px' : 'none'
}))

const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
  }
}

// Swipe to close on mobile
if (props.swipeToClose && isMobile.value && sidebarRef.value) {
  const { lengthX, direction } = useSwipe(sidebarRef, {
    threshold: 50,
    onSwipeEnd() {
      if (
        (props.position === 'left' && direction.value === 'left' && lengthX.value > 100) ||
        (props.position === 'right' && direction.value === 'right' && lengthX.value > 100)
      ) {
        close()
      }
    }
  })
}

// Lock body scroll when open
watch(
  () => props.modelValue,
  isOpen => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})

// Focus management
const focusTrap = () => {
  if (!props.modelValue || !sidebarRef.value) return

  const focusableElements = sidebarRef.value.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  )
  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable?.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable?.focus()
      }
    }
  }

  sidebarRef.value.addEventListener('keydown', handleTab)
  firstFocusable?.focus()

  return () => {
    sidebarRef.value?.removeEventListener('keydown', handleTab)
  }
}

watch(
  () => props.modelValue,
  isOpen => {
    if (isOpen) {
      nextTick(() => {
        const cleanup = focusTrap()
        onUnmounted(cleanup)
      })
    }
  }
)
</script>

<style scoped>
.sidebar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: var(--z-index-modal);
}

.sidebar-wrapper.open {
  pointer-events: auto;
}

/* Backdrop */
.sidebar-backdrop {
  position: absolute;
  inset: 0;
  background-color: var(--surface-overlay);
  backdrop-filter: blur(2px);
}

/* Sidebar */
.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: var(--surface-background);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-left {
  left: 0;
}

.sidebar-right {
  right: 0;
}

/* Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
}

.sidebar-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.sidebar-close {
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

.sidebar-close:hover {
  background-color: var(--surface-default);
  color: var(--text-primary);
}

/* Content */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-lg);
}

/* Footer */
.sidebar-footer {
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

.sidebar-left-enter-active,
.sidebar-left-leave-active,
.sidebar-right-enter-active,
.sidebar-right-leave-active {
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

.sidebar-left-enter-from,
.sidebar-left-leave-to {
  transform: translateX(-100%);
}

.sidebar-right-enter-from,
.sidebar-right-leave-to {
  transform: translateX(100%);
}

/* Mobile adjustments */
.sidebar-mobile {
  max-width: calc(100vw - var(--spacing-xl));
}

.sidebar-mobile .sidebar-content {
  padding: var(--spacing-md);
}

/* Dark mode adjustments */
.dark-mode .sidebar {
  background-color: var(--surface-card);
}
</style>
