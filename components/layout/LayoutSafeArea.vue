<template>
  <div 
    class="layout-safe-area"
    :class="safeAreaClasses"
    :style="safeAreaStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
  all?: boolean
  minPadding?: string
}

const props = withDefaults(defineProps<Props>(), {
  top: false,
  right: false,
  bottom: false,
  left: false,
  all: false,
  minPadding: '16px'
})

const safeAreaClasses = computed(() => ({
  'safe-area-all': props.all,
  'safe-area-top': props.top && !props.all,
  'safe-area-right': props.right && !props.all,
  'safe-area-bottom': props.bottom && !props.all,
  'safe-area-left': props.left && !props.all
}))

const safeAreaStyles = computed(() => {
  const minPad = props.minPadding
  
  if (props.all) {
    return {
      paddingTop: `max(${minPad}, var(--safe-area-inset-top))`,
      paddingRight: `max(${minPad}, var(--safe-area-inset-right))`,
      paddingBottom: `max(${minPad}, var(--safe-area-inset-bottom))`,
      paddingLeft: `max(${minPad}, var(--safe-area-inset-left))`
    }
  }
  
  const styles: Record<string, string> = {}
  
  if (props.top) styles.paddingTop = `max(${minPad}, var(--safe-area-inset-top))`
  if (props.right) styles.paddingRight = `max(${minPad}, var(--safe-area-inset-right))`
  if (props.bottom) styles.paddingBottom = `max(${minPad}, var(--safe-area-inset-bottom))`
  if (props.left) styles.paddingLeft = `max(${minPad}, var(--safe-area-inset-left))`
  
  return styles
})
</script>

<style scoped>
.layout-safe-area {
  width: 100%;
  box-sizing: border-box;
}
</style>