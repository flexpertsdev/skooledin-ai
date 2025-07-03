<template>
  <div 
    class="layout-wrap"
    :style="wrapStyles"
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
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'md',
  align: 'center',
  justify: 'start'
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

const wrapStyles = computed(() => ({
  gap: gapValues[props.gap],
  alignItems: props.align,
  justifyContent: props.justify === 'between' ? 'space-between' : 
                 props.justify === 'around' ? 'space-around' :
                 props.justify === 'evenly' ? 'space-evenly' :
                 `flex-${props.justify}`
}))
</script>

<style scoped>
.layout-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>