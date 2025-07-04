<template>
  <div class="card-grid" :class="gridClasses" :style="gridStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Breakpoint } from '~/composables/useResponsive'

type Columns = number | 'auto-fit' | 'auto-fill'
type ResponsiveColumns = Partial<Record<Breakpoint, Columns>>

interface Props {
  columns?: Columns | ResponsiveColumns
  gap?: string | number
  minChildWidth?: string
  maxChildWidth?: string
  equalHeight?: boolean
  masonry?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: 'auto-fill',
  gap: 'var(--spacing-lg)',
  minChildWidth: '280px',
  maxChildWidth: '1fr',
  equalHeight: true,
  masonry: false
})

const { match } = useResponsive()

// Normalize gap value
const normalizedGap = computed(() => {
  if (typeof props.gap === 'number') {
    return `${props.gap}px`
  }
  return props.gap
})

// Get responsive columns
const responsiveColumns = computed(() => {
  if (typeof props.columns === 'object') {
    return match(props.columns) ?? 'auto-fill'
  }
  return props.columns
})

// Grid classes
const gridClasses = computed(() => ({
  'card-grid-equal-height': props.equalHeight && !props.masonry,
  'card-grid-masonry': props.masonry
}))

// Grid styles
const gridStyles = computed(() => {
  const styles: Record<string, string> = {
    '--card-grid-gap': normalizedGap.value
  }

  if (props.masonry) {
    // Masonry layout using columns
    const cols = typeof responsiveColumns.value === 'number' ? responsiveColumns.value : 3 // Default for auto layouts
    styles['column-count'] = String(cols)
    styles['column-gap'] = normalizedGap.value
  } else {
    // CSS Grid layout
    const cols = responsiveColumns.value
    if (typeof cols === 'number') {
      styles['grid-template-columns'] = `repeat(${cols}, 1fr)`
    } else {
      styles['grid-template-columns'] =
        `repeat(${cols}, minmax(${props.minChildWidth}, ${props.maxChildWidth}))`
    }
    styles['gap'] = normalizedGap.value
  }

  return styles
})
</script>

<style scoped>
/* Base grid */
.card-grid {
  display: grid;
  width: 100%;
}

/* Equal height cards */
.card-grid-equal-height > :deep(*) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Masonry layout */
.card-grid-masonry {
  display: block;
  column-fill: balance;
}

.card-grid-masonry > :deep(*) {
  break-inside: avoid;
  margin-bottom: var(--card-grid-gap);
  display: inline-block;
  width: 100%;
}

/* Ensure proper spacing in masonry */
.card-grid-masonry > :deep(*:last-child) {
  margin-bottom: 0;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .card-grid:not(.card-grid-masonry) {
    grid-template-columns: 1fr !important;
  }

  .card-grid-masonry {
    column-count: 1 !important;
  }
}

/* Tablet adjustments */
@media (min-width: 769px) and (max-width: 1024px) {
  .card-grid-masonry {
    column-count: 2 !important;
  }
}
</style>
