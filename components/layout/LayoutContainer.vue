<template>
  <div 
    class="layout-container"
    :class="containerClasses"
    :style="containerStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  fluid?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean | 'sm' | 'md' | 'lg'
  center?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fluid: false,
  maxWidth: 'xl',
  padding: true,
  center: true
})

const maxWidthValues = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%'
}

const paddingValues = {
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  true: 'var(--spacing-md)'
}

const containerClasses = computed(() => ({
  'container-fluid': props.fluid,
  'container-center': props.center && !props.fluid
}))

const containerStyles = computed(() => ({
  maxWidth: props.fluid ? '100%' : maxWidthValues[props.maxWidth],
  paddingLeft: props.padding ? (typeof props.padding === 'string' ? paddingValues[props.padding] : paddingValues.true) : '0',
  paddingRight: props.padding ? (typeof props.padding === 'string' ? paddingValues[props.padding] : paddingValues.true) : '0'
}))
</script>

<style scoped>
.layout-container {
  width: 100%;
  box-sizing: border-box;
}

.container-center {
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .layout-container {
    padding-left: var(--spacing-lg);
    padding-right: var(--spacing-lg);
  }
}
</style>