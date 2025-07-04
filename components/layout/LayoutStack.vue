<template>
  <div class="layout-stack" :style="stackStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type Direction = 'vertical' | 'horizontal'
type Alignment = 'start' | 'center' | 'end' | 'stretch'

interface Props {
  spacing?: Spacing
  direction?: Direction
  align?: Alignment
  divider?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  spacing: 'md',
  direction: 'vertical',
  align: 'stretch',
  divider: false
})

const spacingValues = {
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
  '3xl': 'var(--spacing-3xl)'
}

const stackStyles = computed(
  () =>
    ({
      '--stack-spacing': spacingValues[props.spacing],
      flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
      alignItems: props.align
    }) as any
)
</script>

<style scoped>
.layout-stack {
  display: flex;
  width: 100%;
}

.layout-stack > * + * {
  margin-top: var(--stack-spacing);
}

.layout-stack[style*='flex-direction: row'] > * + * {
  margin-top: 0;
  margin-left: var(--stack-spacing);
}

/* Divider styles */
.layout-stack[style*='divider'] > * + *::before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--border-default);
  margin-bottom: var(--stack-spacing);
}

.layout-stack[style*='flex-direction: row'][style*='divider'] > * + *::before {
  width: 1px;
  height: 100%;
  margin-bottom: 0;
  margin-right: var(--stack-spacing);
}
</style>
