<template>
  <div 
    class="layout-grid"
    :style="gridStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Breakpoint } from '~/composables/useResponsive'

type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto'

interface Props {
  cols?: Cols | Partial<Record<Breakpoint, Cols>>
  gap?: Spacing | { row?: Spacing; col?: Spacing }
  autoFit?: boolean
  minChildWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: 1,
  gap: 'md',
  autoFit: false,
  minChildWidth: '250px'
})

const { match, current } = useResponsive()

const gapValues = {
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
  '3xl': 'var(--spacing-3xl)'
}

const currentCols = computed(() => {
  if (typeof props.cols === 'object') {
    return match(props.cols) || 1
  }
  return props.cols
})

const gridGap = computed(() => {
  if (typeof props.gap === 'string') {
    return gapValues[props.gap]
  }
  return {
    rowGap: props.gap.row ? gapValues[props.gap.row] : gapValues.md,
    columnGap: props.gap.col ? gapValues[props.gap.col] : gapValues.md
  }
})

const gridStyles = computed(() => {
  const gap = typeof gridGap.value === 'string' 
    ? { gap: gridGap.value }
    : { rowGap: gridGap.value.rowGap, columnGap: gridGap.value.columnGap }

  if (props.autoFit) {
    return {
      ...gap,
      gridTemplateColumns: `repeat(auto-fit, minmax(${props.minChildWidth}, 1fr))`
    }
  }

  const cols = currentCols.value
  return {
    ...gap,
    gridTemplateColumns: cols === 'auto' 
      ? `repeat(auto-fill, minmax(${props.minChildWidth}, 1fr))`
      : `repeat(${cols}, 1fr)`
  }
})
</script>

<style scoped>
.layout-grid {
  display: grid;
  width: 100%;
}
</style>