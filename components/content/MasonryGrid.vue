<template>
  <div
    ref="containerRef"
    class="masonry-grid"
    :class="[
      `masonry-grid--cols-${columns}`,
      fillLastRow && 'masonry-grid--fill-last'
    ]"
    :style="containerStyle"
  >
    <div
      v-for="(column, columnIndex) in columnItems"
      :key="`column-${columnIndex}`"
      class="masonry-grid__column"
      :style="columnStyle"
    >
      <div
        v-for="(item, itemIndex) in column"
        :key="`item-${columnIndex}-${itemIndex}`"
        class="masonry-grid__item"
        :style="{ marginBottom: `${gap}px` }"
        @click="$emit('itemClick', item, item.__originalIndex)"
      >
        <slot :item="item" :index="item.__originalIndex">
          {{ item }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useResizeObserver, useElementSize } from '@vueuse/core'
import { useResponsive } from '~/composables/useResponsive'

interface MasonryGridProps {
  items: any[]
  columns?: number | Record<string, number>
  gap?: number
  fillLastRow?: boolean
  animate?: boolean
  stagger?: number
  observeImages?: boolean
}

const props = withDefaults(defineProps<MasonryGridProps>(), {
  columns: 3,
  gap: 16,
  fillLastRow: false,
  animate: true,
  stagger: 50,
  observeImages: true
})

const emit = defineEmits<{
  itemClick: [item: any, index: number]
  layoutComplete: []
}>()

// Refs
const containerRef = ref<HTMLElement>()
const itemHeights = ref<Map<number, number>>(new Map())
const imagesLoaded = ref<Set<number>>(new Set())

// Responsive columns
const { match } = useResponsive()
const responsiveColumns = computed(() => {
  if (typeof props.columns === 'number') {
    return props.columns
  }
  
  return match(props.columns as any) || 3
})

// Container size
const { width: containerWidth } = useElementSize(containerRef)

// Computed
const columns = computed(() => {
  const cols = responsiveColumns.value
  return Math.max(1, Math.min(cols as number, props.items.length))
})

const columnWidth = computed(() => {
  if (!containerWidth.value) return 0
  const totalGap = props.gap * (columns.value - 1)
  return (containerWidth.value - totalGap) / columns.value
})

const containerStyle = computed(() => ({
  '--masonry-columns': columns.value,
  '--masonry-gap': `${props.gap}px`,
  '--masonry-stagger': `${props.stagger}ms`
}))

const columnStyle = computed(() => ({
  width: `${columnWidth.value}px`,
  marginRight: `${props.gap}px`
}))

// Masonry layout calculation
const columnItems = computed(() => {
  const cols: any[][] = Array.from({ length: columns.value }, () => [])
  const heights = new Array(columns.value).fill(0)
  
  props.items.forEach((item, index) => {
    // Find shortest column
    let shortestColumn = 0
    let minHeight = heights[0]
    
    for (let i = 1; i < columns.value; i++) {
      if (heights[i] < minHeight) {
        minHeight = heights[i]
        shortestColumn = i
      }
    }
    
    // Add item to shortest column
    const itemWithIndex = { ...item, __originalIndex: index }
    cols[shortestColumn].push(itemWithIndex)
    
    // Update column height
    const itemHeight = itemHeights.value.get(index) || 200 // Default height
    heights[shortestColumn] += itemHeight + props.gap
  })
  
  // Fill last row if enabled
  if (props.fillLastRow) {
    const itemsInLastRow = props.items.length % columns.value
    if (itemsInLastRow > 0 && itemsInLastRow < columns.value) {
      const lastRowStart = props.items.length - itemsInLastRow
      const emptyColumns = columns.value - itemsInLastRow
      
      for (let i = 0; i < emptyColumns; i++) {
        const columnIndex = itemsInLastRow + i
        if (cols[columnIndex]) {
          cols[columnIndex].push({
            __placeholder: true,
            __originalIndex: lastRowStart + columnIndex
          })
        }
      }
    }
  }
  
  return cols
})

// Image loading observation
const observeImages = () => {
  if (!props.observeImages || !containerRef.value) return
  
  const images = containerRef.value.querySelectorAll('img')
  images.forEach((img, index) => {
    if (img.complete) {
      handleImageLoad(index)
    } else {
      img.addEventListener('load', () => handleImageLoad(index))
      img.addEventListener('error', () => handleImageLoad(index))
    }
  })
}

const handleImageLoad = (index: number) => {
  imagesLoaded.value.add(index)
  updateLayout()
}

// Layout measurement and update
const measureItems = async () => {
  await nextTick()
  
  if (!containerRef.value) return
  
  const items = containerRef.value.querySelectorAll('.masonry-grid__item')
  items.forEach((item, index) => {
    const height = item.getBoundingClientRect().height
    itemHeights.value.set(index, height)
  })
}

const updateLayout = async () => {
  await measureItems()
  emit('layoutComplete')
}

// Resize observer for container
useResizeObserver(containerRef, () => {
  updateLayout()
})

// Watch for item changes
watch(() => props.items, () => {
  itemHeights.value.clear()
  imagesLoaded.value.clear()
  updateLayout()
  observeImages()
}, { deep: true })

// Lifecycle
onMounted(() => {
  updateLayout()
  observeImages()
})

// Expose methods
defineExpose({
  updateLayout,
  columns: computed(() => columns.value)
})
</script>

<style scoped>
.masonry-grid {
  display: flex;
  margin-right: calc(var(--masonry-gap) * -1);
  position: relative;
  width: 100%;
}

.masonry-grid__column {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.masonry-grid__column:last-child {
  margin-right: 0;
}

.masonry-grid__item {
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
}

/* Animation */
.masonry-grid__item {
  animation: masonry-appear 0.3s ease-out backwards;
  animation-delay: calc(var(--masonry-stagger) * var(--item-index, 0));
}

@keyframes masonry-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive columns */
@container (max-width: 768px) {
  .masonry-grid--cols-4,
  .masonry-grid--cols-5,
  .masonry-grid--cols-6 {
    --masonry-columns: 2;
  }
}

@container (max-width: 480px) {
  .masonry-grid--cols-3,
  .masonry-grid--cols-4,
  .masonry-grid--cols-5,
  .masonry-grid--cols-6 {
    --masonry-columns: 1;
  }
}

/* Placeholder items for filling last row */
.masonry-grid__item:has([data-placeholder]) {
  visibility: hidden;
  pointer-events: none;
}

/* Loading state */
.masonry-grid--loading .masonry-grid__item {
  opacity: 0.5;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .masonry-grid__item {
    animation: none;
  }
}

/* Print styles */
@media print {
  .masonry-grid {
    display: block;
  }
  
  .masonry-grid__column {
    display: block;
    width: 100% !important;
    margin-right: 0 !important;
    page-break-inside: avoid;
  }
  
  .masonry-grid__item {
    page-break-inside: avoid;
    margin-bottom: var(--spacing-md) !important;
  }
}
</style>