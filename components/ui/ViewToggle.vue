<template>
  <div class="view-toggle">
    <button
      v-for="view in views"
      :key="view.value"
      @click="$emit('update:modelValue', view.value)"
      class="view-toggle-button"
      :class="{ 'view-toggle-button--active': modelValue === view.value }"
      :aria-label="`${view.label} view`"
      :title="view.label"
    >
      <Icon :name="view.icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
type ViewType = 'grid' | 'list' | 'board' | 'calendar'

interface ViewOption {
  value: ViewType
  label: string
  icon: string
}

interface Props {
  modelValue: ViewType
  availableViews?: ViewType[]
}

const props = withDefaults(defineProps<Props>(), {
  availableViews: () => ['grid', 'list']
})

defineEmits<{
  'update:modelValue': [value: ViewType]
}>()

const allViews: ViewOption[] = [
  { value: 'grid', label: 'Grid', icon: 'heroicons:squares-2x2' },
  { value: 'list', label: 'List', icon: 'heroicons:list-bullet' },
  { value: 'board', label: 'Board', icon: 'heroicons:view-columns' },
  { value: 'calendar', label: 'Calendar', icon: 'heroicons:calendar-days' }
]

const views = computed(() => 
  allViews.filter(view => props.availableViews.includes(view.value))
)
</script>

<style scoped>
.view-toggle {
  @apply inline-flex bg-gray-100 rounded-lg p-1;
}

.view-toggle-button {
  @apply px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md
         transition-all relative;
}

.view-toggle-button Icon {
  @apply w-5 h-5;
}

.view-toggle-button--active {
  @apply bg-white text-gray-900 shadow-sm;
}

/* Smooth transition for active state */
.view-toggle-button::after {
  content: '';
  @apply absolute inset-0 rounded-md bg-white opacity-0 
         transition-opacity pointer-events-none;
}

.view-toggle-button--active::after {
  @apply opacity-100;
}
</style>