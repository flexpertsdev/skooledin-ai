<template>
  <div 
    ref="carouselRef"
    class="carousel"
    :class="[
      orientation === 'vertical' && 'carousel--vertical',
      showIndicators && 'carousel--with-indicators',
      showControls && 'carousel--with-controls'
    ]"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
  >
    <!-- Controls -->
    <button
      v-if="showControls && canGoPrevious"
      class="carousel__control carousel__control--prev"
      :aria-label="orientation === 'horizontal' ? 'Previous slide' : 'Previous item'"
      @click="previous"
    >
      <span v-if="!$slots.prevIcon">{{ orientation === 'horizontal' ? '‹' : '↑' }}</span>
      <slot name="prevIcon" />
    </button>

    <!-- Viewport -->
    <div 
      ref="viewportRef"
      class="carousel__viewport"
      :style="viewportStyle"
    >
      <div 
        ref="trackRef"
        class="carousel__track"
        :style="trackStyle"
      >
        <div
          v-for="(item, index) in items"
          :key="`slide-${index}`"
          class="carousel__slide"
          :class="{ 'carousel__slide--active': index === currentIndex }"
          :style="slideStyle"
          :aria-hidden="index !== currentIndex"
        >
          <slot name="slide" :item="item" :index="index">
            {{ item }}
          </slot>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <button
      v-if="showControls && canGoNext"
      class="carousel__control carousel__control--next"
      :aria-label="orientation === 'horizontal' ? 'Next slide' : 'Next item'"
      @click="next"
    >
      <span v-if="!$slots.nextIcon">{{ orientation === 'horizontal' ? '›' : '↓' }}</span>
      <slot name="nextIcon" />
    </button>

    <!-- Indicators -->
    <div v-if="showIndicators" class="carousel__indicators">
      <button
        v-for="(_, index) in items"
        :key="`indicator-${index}`"
        class="carousel__indicator"
        :class="{ 'carousel__indicator--active': index === currentIndex }"
        :aria-label="`Go to slide ${index + 1}`"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useSwipe, useResizeObserver } from '@vueuse/core'

interface CarouselProps {
  items: any[]
  modelValue?: number
  orientation?: 'horizontal' | 'vertical'
  itemsToShow?: number
  itemsToScroll?: number
  gap?: number
  autoplay?: boolean
  autoplayInterval?: number
  loop?: boolean
  showIndicators?: boolean
  showControls?: boolean
  snapAlign?: 'start' | 'center' | 'end'
  freeScroll?: boolean
  momentum?: boolean
  rubberband?: boolean
  threshold?: number
}

const props = withDefaults(defineProps<CarouselProps>(), {
  modelValue: 0,
  orientation: 'horizontal',
  itemsToShow: 1,
  itemsToScroll: 1,
  gap: 16,
  autoplay: false,
  autoplayInterval: 5000,
  loop: false,
  showIndicators: true,
  showControls: true,
  snapAlign: 'start',
  freeScroll: false,
  momentum: true,
  rubberband: true,
  threshold: 50
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [index: number]
}>()

// Refs
const carouselRef = ref<HTMLElement>()
const viewportRef = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()

// State
const currentIndex = ref(props.modelValue)
const trackPosition = ref(0)
const isDragging = ref(false)
const startPosition = ref(0)
const currentTranslate = ref(0)
const prevTranslate = ref(0)
const animationId = ref<number>()
const slideWidth = ref(0)
const slideHeight = ref(0)

// Touch/mouse handling
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchEndX = ref(0)
const touchEndY = ref(0)

// Computed
const isHorizontal = computed(() => props.orientation === 'horizontal')
const totalSlides = computed(() => props.items.length)
const maxIndex = computed(() => Math.max(0, totalSlides.value - props.itemsToShow))
const canGoPrevious = computed(() => props.loop || currentIndex.value > 0)
const canGoNext = computed(() => props.loop || currentIndex.value < maxIndex.value)

const viewportStyle = computed(() => ({
  gap: `${props.gap}px`,
  cursor: isDragging.value ? 'grabbing' : 'grab'
}))

const trackStyle = computed(() => {
  const position = isDragging.value ? currentTranslate.value : trackPosition.value
  const transform = isHorizontal.value 
    ? `translateX(${position}px)`
    : `translateY(${position}px)`
  
  return {
    transform,
    transition: isDragging.value ? 'none' : 'transform 0.3s ease-out'
  }
})

const slideStyle = computed(() => {
  const dimension = isHorizontal.value ? 'width' : 'height'
  const size = isHorizontal.value ? slideWidth.value : slideHeight.value
  
  return {
    [dimension]: props.itemsToShow > 1 ? `${100 / props.itemsToShow}%` : '100%',
    flexShrink: 0
  }
})

// Methods
const updateSlideSize = () => {
  if (!viewportRef.value) return
  
  const rect = viewportRef.value.getBoundingClientRect()
  const totalGap = props.gap * (props.itemsToShow - 1)
  
  if (isHorizontal.value) {
    slideWidth.value = (rect.width - totalGap) / props.itemsToShow
  } else {
    slideHeight.value = (rect.height - totalGap) / props.itemsToShow
  }
}

const calculateTrackPosition = (index: number) => {
  const slideSize = isHorizontal.value ? slideWidth.value : slideHeight.value
  const gap = props.gap
  return -(index * (slideSize + gap))
}

const goTo = (index: number) => {
  let targetIndex = index
  
  if (props.loop) {
    if (index < 0) targetIndex = totalSlides.value - 1
    else if (index >= totalSlides.value) targetIndex = 0
  } else {
    targetIndex = Math.max(0, Math.min(maxIndex.value, index))
  }
  
  currentIndex.value = targetIndex
  trackPosition.value = calculateTrackPosition(targetIndex)
  emit('update:modelValue', targetIndex)
  emit('change', targetIndex)
}

const previous = () => {
  goTo(currentIndex.value - props.itemsToScroll)
}

const next = () => {
  goTo(currentIndex.value + props.itemsToScroll)
}

// Touch/mouse handlers
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  handleStart(e.touches[0].clientX, e.touches[0].clientY)
}

const handleMouseDown = (e: MouseEvent) => {
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

const handleStart = (clientX: number, clientY: number) => {
  isDragging.value = true
  startPosition.value = isHorizontal.value ? clientX : clientY
  prevTranslate.value = trackPosition.value
  
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
}

const handleMove = (clientX: number, clientY: number) => {
  if (!isDragging.value) return
  
  const currentPosition = isHorizontal.value ? clientX : clientY
  const diff = currentPosition - startPosition.value
  
  // Apply rubberband effect at edges
  let translate = prevTranslate.value + diff
  
  if (!props.loop && props.rubberband) {
    const minTranslate = calculateTrackPosition(maxIndex.value)
    const maxTranslate = 0
    
    if (translate > maxTranslate) {
      translate = maxTranslate + (translate - maxTranslate) * 0.15
    } else if (translate < minTranslate) {
      translate = minTranslate + (translate - minTranslate) * 0.15
    }
  }
  
  currentTranslate.value = translate
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  
  touchEndX.value = e.touches[0].clientX
  touchEndY.value = e.touches[0].clientY
  handleMove(e.touches[0].clientX, e.touches[0].clientY)
}

const handleTouchEnd = () => {
  handleEnd()
}

const handleEnd = () => {
  isDragging.value = false
  
  const diff = currentTranslate.value - prevTranslate.value
  const threshold = props.threshold
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      previous()
    } else {
      next()
    }
  } else {
    // Snap back to current position
    trackPosition.value = calculateTrackPosition(currentIndex.value)
  }
}

// Autoplay
let autoplayTimer: NodeJS.Timeout | null = null

const startAutoplay = () => {
  if (!props.autoplay) return
  
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    next()
  }, props.autoplayInterval)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// Lifecycle
onMounted(() => {
  updateSlideSize()
  trackPosition.value = calculateTrackPosition(currentIndex.value)
  
  if (props.autoplay) {
    startAutoplay()
  }
})

onUnmounted(() => {
  stopAutoplay()
})

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue !== currentIndex.value) {
    goTo(newValue)
  }
})

watch(() => props.autoplay, (newValue) => {
  if (newValue) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

// Resize observer
useResizeObserver(viewportRef, () => {
  updateSlideSize()
  trackPosition.value = calculateTrackPosition(currentIndex.value)
})

// Mouse enter/leave for autoplay pause
const handleMouseEnter = () => {
  if (props.autoplay) {
    stopAutoplay()
  }
}

const handleMouseLeave = () => {
  if (props.autoplay) {
    startAutoplay()
  }
}

// Expose methods
defineExpose({
  next,
  previous,
  goTo
})
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
}

.carousel__viewport {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel__track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.carousel--vertical .carousel__track {
  flex-direction: column;
}

.carousel__slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

/* Controls */
.carousel__control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: var(--surface-overlay);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

.carousel__control:hover {
  background: var(--surface-card);
  border-color: var(--border-strong);
}

.carousel__control--prev {
  left: var(--spacing-md);
}

.carousel__control--next {
  right: var(--spacing-md);
}

.carousel--vertical .carousel__control {
  left: 50%;
  transform: translateX(-50%);
}

.carousel--vertical .carousel__control--prev {
  top: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
}

.carousel--vertical .carousel__control--next {
  top: auto;
  bottom: var(--spacing-md);
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}

/* Indicators */
.carousel__indicators {
  position: absolute;
  bottom: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-xs);
  z-index: 2;
}

.carousel--vertical .carousel__indicators {
  right: var(--spacing-md);
  bottom: 50%;
  left: auto;
  transform: translateY(50%);
  flex-direction: column;
}

.carousel__indicator {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--text-secondary);
  opacity: 0.3;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
  padding: 0;
}

.carousel__indicator:hover {
  opacity: 0.5;
}

.carousel__indicator--active {
  opacity: 1;
  background: var(--primary-color);
  width: 24px;
}

.carousel--vertical .carousel__indicator--active {
  width: 8px;
  height: 24px;
}

/* Touch feedback */
@media (hover: none) {
  .carousel__control {
    display: none;
  }
  
  .carousel--with-controls .carousel__control {
    display: flex;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .carousel__track {
    transition: none !important;
  }
}
</style>