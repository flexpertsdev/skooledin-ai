<template>
  <button
    @click="$emit('click')"
    class="filter-button"
    :class="{ 'filter-button--active': activeCount > 0 }"
  >
    <Icon name="heroicons:funnel" />
    <span>{{ label }}</span>
    <Badge
      v-if="activeCount > 0"
      :label="String(activeCount)"
      size="sm"
      variant="primary"
    />
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  activeCount?: number
}

withDefaults(defineProps<Props>(), {
  label: 'Filters',
  activeCount: 0
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.filter-button {
  @apply inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
         text-gray-700 bg-white border border-gray-300 rounded-lg
         hover:bg-gray-50 transition-all;
}

.filter-button Icon {
  @apply w-4 h-4 text-gray-400;
}

.filter-button--active {
  @apply border-primary-300 bg-primary-50 text-primary-700;
}

.filter-button--active Icon {
  @apply text-primary-600;
}
</style>