<template>
  <Popover placement="bottom-end">
    <template #trigger>
      <button class="sort-button">
        <Icon name="heroicons:arrows-up-down" />
        <span>{{ currentOption.label }}</span>
        <Icon name="heroicons:chevron-down" class="sort-chevron" />
      </button>
    </template>
    
    <div class="sort-dropdown">
      <div class="sort-header">Sort by</div>
      <div class="sort-options">
        <button
          v-for="option in options"
          :key="option.value"
          @click="handleSort(option)"
          class="sort-option"
          :class="{ 'sort-option--active': isActive(option) }"
        >
          <span>{{ option.label }}</span>
          <Icon
            v-if="isActive(option)"
            :name="sortDirection === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'"
            class="sort-direction"
          />
        </button>
      </div>
      
      <div v-if="showDirectionToggle && currentOption.value" class="sort-direction-toggle">
        <button
          @click="toggleDirection"
          class="sort-direction-button"
        >
          <Icon :name="sortDirection === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" />
          {{ sortDirection === 'asc' ? 'Ascending' : 'Descending' }}
        </button>
      </div>
    </div>
  </Popover>
</template>

<script setup lang="ts">
type SortDirection = 'asc' | 'desc'

interface SortOption {
  value: string
  label: string
  defaultDirection?: SortDirection
}

interface Props {
  modelValue: string
  direction?: SortDirection
  options: SortOption[]
  showDirectionToggle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'desc',
  showDirectionToggle: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:direction': [direction: SortDirection]
  sort: [data: { field: string; direction: SortDirection }]
}>()

const sortDirection = computed({
  get: () => props.direction,
  set: (value) => emit('update:direction', value)
})

const currentOption = computed(() => 
  props.options.find(opt => opt.value === props.modelValue) || props.options[0]
)

const isActive = (option: SortOption) => {
  return option.value === props.modelValue
}

const handleSort = (option: SortOption) => {
  const isCurrentOption = option.value === props.modelValue
  
  if (isCurrentOption && props.showDirectionToggle) {
    // Toggle direction if clicking the same option
    toggleDirection()
  } else {
    // Set new option with its default direction
    emit('update:modelValue', option.value)
    if (option.defaultDirection) {
      sortDirection.value = option.defaultDirection
    }
  }
  
  emit('sort', {
    field: option.value,
    direction: sortDirection.value
  })
}

const toggleDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  emit('sort', {
    field: props.modelValue,
    direction: sortDirection.value
  })
}
</script>

<style scoped>
.sort-button {
  @apply inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
         text-gray-700 bg-white border border-gray-300 rounded-lg
         hover:bg-gray-50 transition-colors;
}

.sort-button Icon:first-child {
  @apply w-4 h-4 text-gray-400;
}

.sort-chevron {
  @apply w-4 h-4 text-gray-400 ml-1;
}

.sort-dropdown {
  @apply min-w-[200px] py-1;
}

.sort-header {
  @apply px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide;
}

.sort-options {
  @apply border-b border-gray-200;
}

.sort-option {
  @apply w-full flex items-center justify-between px-4 py-2 text-sm
         text-gray-700 hover:bg-gray-100 transition-colors;
}

.sort-option--active {
  @apply text-primary-600 font-medium bg-primary-50;
}

.sort-direction {
  @apply w-4 h-4;
}

.sort-direction-toggle {
  @apply p-2;
}

.sort-direction-button {
  @apply w-full flex items-center justify-center gap-2 px-3 py-2
         text-sm text-gray-600 bg-gray-50 rounded-md
         hover:bg-gray-100 transition-colors;
}

.sort-direction-button Icon {
  @apply w-4 h-4;
}
</style>