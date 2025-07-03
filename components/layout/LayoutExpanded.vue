<template>
  <div 
    class="layout-expanded"
    :style="expandedStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  flex?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  flex: 1
})

const expandedStyles = computed(() => ({
  flex: props.flex
}))
</script>

<style scoped>
.layout-expanded {
  display: flex;
  flex-direction: column;
}
</style>