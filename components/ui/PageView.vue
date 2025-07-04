<template>
  <div
    ref="pageViewRef"
    class="page-view"
    :class="[`page-view--${orientation}`, isTransitioning && 'page-view--transitioning']"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
  >
    <!-- Pages Container -->
    <div ref="containerRef" class="page-view__container" :style="containerStyle">
      <div
        v-for="(page, index) in pages"
        :key="`page-${index}`"
        class="page-view__page"
        :class="{
          'page-view__page--active': index === currentIndex,
          'page-view__page--prev': index === currentIndex - 1,
          'page-view__page--next': index === currentIndex + 1
        }"
        :style="getPageStyle(index)"
        :aria-hidden="index !== currentIndex"
      >
        <slot name="page" :page="page" :index="index" :is-active="index === currentIndex">
          <div class="page-view__content">
            {{ page }}
          </div>
        </slot>
      </div>
    </div>

    <!-- Page Indicators -->
    <div v-if="showIndicators" class="page-view__indicators">
      <span
        v-for="(_, index) in pages"
        :key="`indicator-${index}`"
        class="page-view__indicator"
        :class="{ 'page-view__indicator--active': index === currentIndex }"
        @click="goToPage(index)"
      />
    </div>

    <!-- Navigation Arrows (desktop only) -->
    <template v-if="showArrows">
      <button
        v-if="canGoPrevious"
        class="page-view__arrow page-view__arrow--prev"
        :aria-label="orientation === 'horizontal' ? 'Previous page' : 'Previous section'"
        @click="previousPage"
      >
        <slot name="prevArrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </slot>
      </button>

      <button
        v-if="canGoNext"
        class="page-view__arrow page-view__arrow--next"
        :aria-label="orientation === 'horizontal' ? 'Next page' : 'Next section'"
        @click="nextPage"
      >
        <slot name="nextArrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </slot>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'

interface PageViewProps {
  pages: any[]
  modelValue?: number
  orientation?: 'horizontal' | 'vertical'
  showIndicators?: boolean
  showArrows?: boolean
  loop?: boolean
  threshold?: number
  transitionDuration?: number
  parallaxEffect?: boolean
  scaleEffect?: boolean
  fadeEffect?: boolean
  keyboard?: boolean
  mouseWheel?: boolean
  autoHeight?: boolean
}

const props = withDefaults(defineProps<PageViewProps>(), {
  modelValue: 0,
  orientation: 'horizontal',
  showIndicators: true,
  showArrows: true,
  loop: false,
  threshold: 50,
  transitionDuration: 300,
  parallaxEffect: false,
  scaleEffect: false,
  fadeEffect: false,
  keyboard: true,
  mouseWheel: true,
  autoHeight: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [index: number]
  transitionStart: [from: number, to: number]
  transitionEnd: [index: number]
}>()

// Refs
const pageViewRef = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()

// State
const currentIndex = ref(props.modelValue)
const offset = ref(0)
const isDragging = ref(false)
const isTransitioning = ref(false)
const startPosition = ref({ x: 0, y: 0 })
const currentPosition = ref({ x: 0, y: 0 })
const velocity = ref(0)
const lastTimestamp = ref(0)

// Computed
const isHorizontal = computed(() => props.orientation === 'horizontal')
const totalPages = computed(() => props.pages.length)
const canGoPrevious = computed(() => props.loop || currentIndex.value > 0)
const canGoNext = computed(() => props.loop || currentIndex.value < totalPages.value - 1)

const containerStyle = computed(() => {
  const translate = isHorizontal.value
    ? `translateX(${-currentIndex.value * 100 + offset.value}%)`
    : `translateY(${-currentIndex.value * 100 + offset.value}%)`

  return {
    transform: translate,
    transition: isTransitioning.value
      ? `transform ${props.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      : 'none',
    height: props.autoHeight && !isHorizontal.value ? 'auto' : '100%'
  }
})

// Methods
const getPageStyle = (index: number) => {
  const style: any = {}

  // Parallax effect
  if (props.parallaxEffect && index !== currentIndex.value) {
    const diff = index - currentIndex.value
    const parallaxOffset = diff * 20
    style.transform = isHorizontal.value
      ? `translateX(${parallaxOffset}%)`
      : `translateY(${parallaxOffset}%)`
  }

  // Scale effect
  if (props.scaleEffect && index !== currentIndex.value) {
    const scale = 0.9
    style.transform = (style.transform || '') + ` scale(${scale})`
  }

  // Fade effect
  if (props.fadeEffect) {
    style.opacity = index === currentIndex.value ? 1 : 0.3
  }

  return style
}

const goToPage = (index: number, animate = true) => {
  if (index === currentIndex.value) return

  let targetIndex = index

  if (props.loop) {
    if (index < 0) targetIndex = totalPages.value - 1
    else if (index >= totalPages.value) targetIndex = 0
  } else {
    targetIndex = Math.max(0, Math.min(totalPages.value - 1, index))
  }

  if (animate) {
    isTransitioning.value = true
    emit('transitionStart', currentIndex.value, targetIndex)
  }

  currentIndex.value = targetIndex
  offset.value = 0

  emit('update:modelValue', targetIndex)
  emit('change', targetIndex)

  if (animate) {
    setTimeout(() => {
      isTransitioning.value = false
      emit('transitionEnd', targetIndex)
    }, props.transitionDuration)
  }
}

const previousPage = () => goToPage(currentIndex.value - 1)
const nextPage = () => goToPage(currentIndex.value + 1)

// Touch/Mouse handling
const handleTouchStart = (e: TouchEvent) => {
  if (isTransitioning.value) return

  const touch = e.touches[0]
  handleStart(touch.clientX, touch.clientY)
}

const handleMouseDown = (e: MouseEvent) => {
  if (isTransitioning.value) return

  e.preventDefault()
  handleStart(e.clientX, e.clientY)

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
  const handleMouseUp = () => {
    handleEnd()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleStart = (x: number, y: number) => {
  isDragging.value = true
  startPosition.value = { x, y }
  currentPosition.value = { x, y }
  lastTimestamp.value = Date.now()
  velocity.value = 0
}

const handleMove = (x: number, y: number) => {
  if (!isDragging.value || !pageViewRef.value) return

  const now = Date.now()
  const dt = now - lastTimestamp.value

  const deltaX = x - currentPosition.value.x
  const deltaY = y - currentPosition.value.y

  currentPosition.value = { x, y }

  // Calculate velocity
  if (dt > 0) {
    const delta = isHorizontal.value ? deltaX : deltaY
    velocity.value = (delta / dt) * 1000 // pixels per second
  }

  lastTimestamp.value = now

  // Calculate offset as percentage of viewport
  const viewportSize = isHorizontal.value
    ? pageViewRef.value.offsetWidth
    : pageViewRef.value.offsetHeight

  const totalDelta = isHorizontal.value ? x - startPosition.value.x : y - startPosition.value.y

  const offsetPercent = (totalDelta / viewportSize) * 100

  // Apply rubberband effect at edges
  if (!props.loop) {
    if (currentIndex.value === 0 && offsetPercent > 0) {
      offset.value = offsetPercent * 0.3
    } else if (currentIndex.value === totalPages.value - 1 && offsetPercent < 0) {
      offset.value = offsetPercent * 0.3
    } else {
      offset.value = offsetPercent
    }
  } else {
    offset.value = offsetPercent
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return

  const touch = e.touches[0]
  handleMove(touch.clientX, touch.clientY)
}

const handleTouchEnd = () => handleEnd()

const handleEnd = () => {
  if (!isDragging.value) return

  isDragging.value = false

  // Determine if we should change page
  const threshold = props.threshold
  const shouldChange = Math.abs(offset.value) > threshold || Math.abs(velocity.value) > 300

  if (shouldChange) {
    if (offset.value > 0) {
      previousPage()
    } else {
      nextPage()
    }
  } else {
    // Snap back
    isTransitioning.value = true
    offset.value = 0

    setTimeout(() => {
      isTransitioning.value = false
    }, props.transitionDuration)
  }
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.keyboard) return

  const { key } = e

  if (isHorizontal.value) {
    if (key === 'ArrowLeft') {
      e.preventDefault()
      previousPage()
    } else if (key === 'ArrowRight') {
      e.preventDefault()
      nextPage()
    }
  } else {
    if (key === 'ArrowUp') {
      e.preventDefault()
      previousPage()
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      nextPage()
    }
  }
}

// Mouse wheel navigation
const handleWheel = useThrottleFn((e: WheelEvent) => {
  if (!props.mouseWheel || isTransitioning.value) return

  e.preventDefault()

  const delta = isHorizontal.value ? e.deltaX : e.deltaY

  if (Math.abs(delta) > 30) {
    if (delta > 0) {
      nextPage()
    } else {
      previousPage()
    }
  }
}, 100)

// Lifecycle
onMounted(() => {
  if (props.keyboard) {
    useEventListener(window, 'keydown', handleKeydown)
  }

  if (props.mouseWheel && pageViewRef.value) {
    useEventListener(pageViewRef.value, 'wheel', handleWheel, { passive: false })
  }
})

// Watchers
watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== currentIndex.value) {
      goToPage(newValue)
    }
  }
)

// Expose
defineExpose({
  nextPage,
  previousPage,
  goToPage,
  currentIndex: computed(() => currentIndex.value)
})
</script>

<style scoped>
.page-view {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  touch-action: pan-y;
}

.page-view--horizontal {
  touch-action: pan-y;
}

.page-view--vertical {
  touch-action: pan-x;
}

.page-view__container {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.page-view--vertical .page-view__container {
  flex-direction: column;
}

.page-view__page {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.page-view__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
}

/* Indicators */
.page-view__indicators {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-sm);
  z-index: 10;
  padding: var(--spacing-sm);
  background: var(--surface-overlay);
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
}

.page-view--vertical .page-view__indicators {
  right: var(--spacing-xl);
  bottom: 50%;
  left: auto;
  transform: translateY(50%);
  flex-direction: column;
}

.page-view__indicator {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--text-secondary);
  opacity: 0.3;
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
}

.page-view__indicator:hover {
  opacity: 0.5;
}

.page-view__indicator--active {
  opacity: 1;
  background: var(--primary-color);
  width: 32px;
}

.page-view--vertical .page-view__indicator--active {
  width: 8px;
  height: 32px;
}

/* Navigation Arrows */
.page-view__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: var(--surface-overlay);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all var(--transition-fast) var(--easing-standard);
  z-index: 10;
  color: var(--text-primary);
}

.page-view:hover .page-view__arrow {
  opacity: 0.8;
}

.page-view__arrow:hover {
  opacity: 1 !important;
  background: var(--surface-card);
  border-color: var(--border-strong);
}

.page-view__arrow svg {
  width: 24px;
  height: 24px;
}

.page-view__arrow--prev {
  left: var(--spacing-xl);
}

.page-view__arrow--next {
  right: var(--spacing-xl);
}

.page-view--vertical .page-view__arrow {
  left: 50%;
  transform: translateX(-50%);
}

.page-view--vertical .page-view__arrow--prev {
  top: var(--spacing-xl);
  transform: translateX(-50%) rotate(90deg);
}

.page-view--vertical .page-view__arrow--next {
  top: auto;
  bottom: var(--spacing-xl);
  transform: translateX(-50%) rotate(90deg);
}

/* Effects */
.page-view__page {
  transition:
    opacity var(--transition-base) var(--easing-standard),
    transform var(--transition-base) var(--easing-standard);
}

/* Touch feedback */
@media (hover: none) {
  .page-view__arrow {
    display: none;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .page-view__container,
  .page-view__page {
    transition: none !important;
  }
}
</style>
