<template>
  <div class="empty-state">
    <div class="empty-state-icon">
      <Icon :name="icon" />
    </div>
    <h3 class="empty-state-title">{{ title }}</h3>
    <p v-if="description" class="empty-state-description">{{ description }}</p>
    <div v-if="$slots.actions" class="empty-state-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'heroicons:inbox'
})
</script>

<style scoped>
.empty-state {
  @apply flex flex-col items-center justify-center text-center py-12 px-4;
}

.empty-state-icon {
  @apply w-16 h-16 mx-auto text-gray-400 mb-4;
}

.empty-state-title {
  @apply text-lg font-medium text-gray-900 mb-2;
}

.empty-state-description {
  @apply text-sm text-gray-500 max-w-sm;
}

.empty-state-actions {
  @apply mt-6;
}
</style>