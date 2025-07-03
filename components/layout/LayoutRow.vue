<template>
  <div 
    class="layout-row"
    :class="rowClasses"
    :style="rowStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type Alignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type Justification = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface Props {
  gap?: Spacing
  align?: Alignment
  justify?: Justification
  wrap?: boolean
  reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'md',
  align: 'stretch',
  justify: 'start',
  wrap: false,
  reverse: false
})

const { match } = useResponsive()

const gapValues = {
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
  '3xl': 'var(--spacing-3xl)'
}

const rowClasses = computed(() => ({
  'row-wrap': props.wrap,
  'row-reverse': props.reverse
}))

const rowStyles = computed(() => ({
  gap: gapValues[props.gap],
  alignItems: props.align,
  justifyContent: props.justify === 'between' ? 'space-between' : 
                 props.justify === 'around' ? 'space-around' :
                 props.justify === 'evenly' ? 'space-evenly' :
                 `flex-${props.justify}`
}))
</script>

<style scoped>
.layout-row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.row-wrap {
  flex-wrap: wrap;
}

.row-reverse {
  flex-direction: row-reverse;
}

@container (max-width: 768px) {
  .layout-row {
    flex-direction: column;
  }
  
  .row-reverse {
    flex-direction: column-reverse;
  }
}
</style>