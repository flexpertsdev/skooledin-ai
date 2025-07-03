<template>
  <div 
    class="layout-column"
    :class="columnClasses"
    :style="columnStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type Alignment = 'start' | 'center' | 'end' | 'stretch'
type Justification = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface Props {
  gap?: Spacing
  align?: Alignment
  justify?: Justification
  reverse?: boolean
  flex?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'md',
  align: 'stretch',
  justify: 'start',
  reverse: false
})

const gapValues = {
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
  '3xl': 'var(--spacing-3xl)'
}

const columnClasses = computed(() => ({
  'column-reverse': props.reverse
}))

const columnStyles = computed(() => ({
  gap: gapValues[props.gap],
  alignItems: props.align,
  justifyContent: props.justify === 'between' ? 'space-between' : 
                 props.justify === 'around' ? 'space-around' :
                 props.justify === 'evenly' ? 'space-evenly' :
                 `flex-${props.justify}`,
  flex: props.flex !== undefined ? props.flex : undefined
}))
</script>

<style scoped>
.layout-column {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.column-reverse {
  flex-direction: column-reverse;
}
</style>