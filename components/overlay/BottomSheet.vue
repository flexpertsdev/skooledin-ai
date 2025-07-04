<template>
  <Teleport to="body">
    <div v-if="modelValue || isAnimating" class="bottom-sheet-wrapper" @click="handleBackdropClick">
      <!-- Backdrop -->
      <Transition name="backdrop">
        <div
          v-if="modelValue && backdrop"
          class="bottom-sheet-backdrop"
          :style="{ opacity: backdropOpacity }"
        />
      </Transition>

      <!-- Sheet -->
      <div
        ref="sheetRef"
        class="bottom-sheet"
        :class="{
          'bottom-sheet-dragging': isDragging,
          'bottom-sheet-open': modelValue
        }"
        :style="sheetStyles"
        role="dialog"
        :aria-modal="true"
        :aria-label="ariaLabel"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleMouseDown"
      >
        <!-- Drag Handle -->
        <div v-if="showHandle" class="bottom-sheet-handle-container">
          <div class="bottom-sheet-handle" />
        </div>

        <!-- Header -->
        <div v-if="$slots.header || title" class="bottom-sheet-header">
          <slot name="header">
            <h2 class="bottom-sheet-title">{{ title }}</h2>
          </slot>
          <button
            v-if="showCloseButton"
            class="bottom-sheet-close"
            aria-label="Close bottom sheet"
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
        <div ref="contentRef" class="bottom-sheet-content" @scroll="handleContentScroll">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// useFocusTrap is imported from our custom composable

interface SnapPoint {
  height: number | string
  label?: string
}

interface Props {
  modelValue: boolean
  snapPoints?: (number | string | SnapPoint)[]
  defaultSnapPoint?: number
  backdrop?: boolean
  persistent?: boolean
  showHandle?: boolean
  showCloseButton?: boolean
  swipeToClose?: boolean
  preventExpand?: boolean
  title?: string
  ariaLabel?: string
  maxHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  snapPoints: () => ['25%', '50%', '90%'],
  defaultSnapPoint: 1,
  backdrop: true,
  persistent: false,
  showHandle: true,
  showCloseButton: true,
  swipeToClose: true,
  preventExpand: false,
  ariaLabel: 'Bottom sheet'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'snap-point-change': [index: number]
  open: []
  close: []
}>()

const sheetRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const isDragging = ref(false)
const isAnimating = ref(false)
const currentSnapIndex = ref(props.defaultSnapPoint)
const dragStartY = ref(0)
const currentY = ref(0)
const sheetHeight = ref(0)
const windowHeight = ref(0)
const contentScrollTop = ref(0)
const velocityY = ref(0)
const lastY = ref(0)
const lastTime = ref(0)

// Parse snap points
const normalizedSnapPoints = computed(() => {
  return props.snapPoints.map(point => {
    if (typeof point === 'object') {
      return point
    }
    return { height: point }
  })
})

// Calculate actual heights for snap points
const snapPointHeights = computed(() => {
  return normalizedSnapPoints.value.map(point => {
    const height = point.height
    if (typeof height === 'string' && height.endsWith('%')) {
      return (parseInt(height) / 100) * windowHeight.value
    }
    return typeof height === 'string' ? parseInt(height) : height
  })
})

// Current snap height
const currentSnapHeight = computed(() => {
  return snapPointHeights.value[currentSnapIndex.value] || snapPointHeights.value[0]
})

// Sheet styles
const sheetStyles = computed(() => {
  const translateY = isDragging.value
    ? windowHeight.value - sheetHeight.value + currentY.value
    : windowHeight.value - currentSnapHeight.value

  return {
    transform: `translateY(${Math.max(0, translateY)}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.3s var(--easing-decelerate)',
    maxHeight: props.maxHeight || '95vh'
  }
})

// Backdrop opacity based on sheet position
const backdropOpacity = computed(() => {
  if (!props.backdrop) return 0
  const progress = currentSnapHeight.value / windowHeight.value
  return Math.min(0.5, progress * 0.6)
})

// Initialize
onMounted(() => {
  windowHeight.value = window.innerHeight
  window.addEventListener('resize', updateWindowHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowHeight)
})

const updateWindowHeight = () => {
  windowHeight.value = window.innerHeight
}

// Open/close handlers
watch(
  () => props.modelValue,
  isOpen => {
    if (isOpen) {
      isAnimating.value = true
      document.body.style.overflow = 'hidden'
      currentSnapIndex.value = props.defaultSnapPoint
      emit('open')
      nextTick(() => {
        sheetHeight.value = sheetRef.value?.offsetHeight || 0
      })
    } else {
      document.body.style.overflow = ''
      emit('close')
      setTimeout(() => {
        isAnimating.value = false
      }, 300)
    }
  }
)

// Touch handlers
const handleTouchStart = (e: TouchEvent) => {
  if (!props.swipeToClose || contentScrollTop.value > 0) return
  handleDragStart(e.touches[0].clientY)
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  handleDragMove(e.touches[0].clientY)
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  handleDragEnd()
}

// Mouse handlers
const handleMouseDown = (e: MouseEvent) => {
  if (!props.swipeToClose || contentScrollTop.value > 0) return
  handleDragStart(e.clientY)

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientY)
  }

  const handleMouseUp = () => {
    handleDragEnd()
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
}

// Drag logic
const handleDragStart = (y: number) => {
  isDragging.value = true
  dragStartY.value = y
  currentY.value = 0
  sheetHeight.value = sheetRef.value?.offsetHeight || 0
  lastY.value = y
  lastTime.value = Date.now()
  velocityY.value = 0
}

const handleDragMove = (y: number) => {
  currentY.value = y - dragStartY.value

  // Calculate velocity
  const now = Date.now()
  const dt = now - lastTime.value
  if (dt > 0) {
    velocityY.value = (y - lastY.value) / dt
  }
  lastY.value = y
  lastTime.value = now
}

const handleDragEnd = () => {
  isDragging.value = false

  const threshold = 50
  const swipeVelocityThreshold = 0.5

  // Check for swipe to close
  if (currentY.value > threshold || velocityY.value > swipeVelocityThreshold) {
    // If at lowest snap point and swiping down, close
    if (currentSnapIndex.value === 0) {
      close()
      return
    }
    // Otherwise snap to lower point
    snapTo(currentSnapIndex.value - 1)
  } else if (currentY.value < -threshold || velocityY.value < -swipeVelocityThreshold) {
    // Snap to higher point if not at max and not prevented
    if (!props.preventExpand && currentSnapIndex.value < snapPointHeights.value.length - 1) {
      snapTo(currentSnapIndex.value + 1)
    }
  } else {
    // Return to current snap point
    currentY.value = 0
  }
}

// Snap to specific point
const snapTo = (index: number) => {
  if (index < 0 || index >= snapPointHeights.value.length) return

  currentSnapIndex.value = index
  currentY.value = 0
  emit('snap-point-change', index)
}

// Handle backdrop click
const handleBackdropClick = (e: Event) => {
  if (e.target === e.currentTarget && !props.persistent) {
    close()
  }
}

// Handle content scroll
const handleContentScroll = (e: Event) => {
  contentScrollTop.value = (e.target as HTMLElement).scrollTop
}

// Close sheet
const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
  }
}

// Focus trap
const { activate, deactivate } = useFocusTrap(sheetRef, {
  immediate: false,
  escapeDeactivates: false,
  allowOutsideClick: true
})

watch(
  () => props.modelValue,
  isOpen => {
    if (isOpen) {
      nextTick(() => activate())
    } else {
      deactivate()
    }
  }
)

// Cleanup
onUnmounted(() => {
  document.body.style.overflow = ''
  deactivate()
})
</script>

<style scoped>
/* Wrapper */
.bottom-sheet-wrapper {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-modal);
  pointer-events: none;
}

/* Backdrop */
.bottom-sheet-backdrop {
  position: absolute;
  inset: 0;
  background-color: black;
  pointer-events: auto;
}

/* Sheet */
.bottom-sheet {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--surface-background);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
  touch-action: none;
  will-change: transform;
}

.bottom-sheet-dragging {
  cursor: grabbing;
}

/* Handle */
.bottom-sheet-handle-container {
  display: flex;
  justify-content: center;
  padding: var(--spacing-sm) 0;
  cursor: grab;
}

.bottom-sheet-handle {
  width: 48px;
  height: 4px;
  background-color: var(--border-emphasis);
  border-radius: var(--radius-full);
}

/* Header */
.bottom-sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
}

.bottom-sheet-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.bottom-sheet-close {
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

.bottom-sheet-close:hover {
  background-color: var(--surface-default);
  color: var(--text-primary);
}

/* Content */
.bottom-sheet-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-lg);
  overscroll-behavior: contain;
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

/* Dark mode adjustments */
.dark-mode .bottom-sheet {
  background-color: var(--surface-card);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .bottom-sheet {
    transition: none !important;
  }
}

/* Safe area adjustments */
.bottom-sheet-content {
  padding-bottom: max(var(--spacing-lg), var(--safe-area-inset-bottom));
}
</style>
