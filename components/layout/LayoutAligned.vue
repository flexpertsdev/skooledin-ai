<template>
  <div class="layout-aligned" :style="alignedStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
type Alignment =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'centerLeft'
  | 'center'
  | 'centerRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

interface Props {
  alignment?: Alignment
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alignment: 'center',
  inline: false
})

const alignmentMap = {
  topLeft: { alignItems: 'flex-start', justifyContent: 'flex-start' },
  topCenter: { alignItems: 'flex-start', justifyContent: 'center' },
  topRight: { alignItems: 'flex-start', justifyContent: 'flex-end' },
  centerLeft: { alignItems: 'center', justifyContent: 'flex-start' },
  center: { alignItems: 'center', justifyContent: 'center' },
  centerRight: { alignItems: 'center', justifyContent: 'flex-end' },
  bottomLeft: { alignItems: 'flex-end', justifyContent: 'flex-start' },
  bottomCenter: { alignItems: 'flex-end', justifyContent: 'center' },
  bottomRight: { alignItems: 'flex-end', justifyContent: 'flex-end' }
}

const alignedStyles = computed(() => ({
  ...alignmentMap[props.alignment],
  display: props.inline ? 'inline-flex' : 'flex'
}))
</script>

<style scoped>
.layout-aligned {
  width: 100%;
  height: 100%;
}
</style>
