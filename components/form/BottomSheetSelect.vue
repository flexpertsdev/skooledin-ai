<template>
  <div class="bottom-sheet-select">
    <!-- Trigger -->
    <div 
      class="select-trigger"
      :class="triggerClasses"
      @click="openSheet"
    >
      <div class="select-content">
        <span v-if="label" class="select-label">{{ label }}</span>
        <span class="select-value" :class="{ 'is-placeholder': !hasValue }">
          {{ displayValue }}
        </span>
      </div>
      <svg class="select-arrow" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5H7z"/>
      </svg>
    </div>
    
    <!-- Bottom Sheet -->
    <BottomSheet
      v-model="isOpen"
      :title="sheetTitle || label"
      :snap-points="[0.7, 0.9]"
      :initial-snap="0.7"
      :backdrop-close="true"
      :swipe-to-close="true"
    >
      <!-- Search -->
      <div v-if="searchable" class="select-search">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="search-input"
          @input="handleSearch"
        >
        <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
      
      <!-- Groups/Options -->
      <div class="select-options" :class="{ 'has-search': searchable }">
        <template v-if="grouped">
          <div
            v-for="group in filteredGroups"
            :key="group.label"
            class="option-group"
          >
            <div class="group-header">{{ group.label }}</div>
            <div
              v-for="option in group.options"
              :key="getOptionValue(option)"
              class="select-option"
              :class="{
                'is-selected': isSelected(option),
                'is-disabled': isDisabled(option)
              }"
              @click="selectOption(option)"
            >
              <div class="option-content">
                <span class="option-label">{{ getOptionLabel(option) }}</span>
                <span v-if="getOptionDescription(option)" class="option-description">
                  {{ getOptionDescription(option) }}
                </span>
              </div>
              <svg v-if="isSelected(option)" class="option-check" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </div>
          </div>
        </template>
        
        <template v-else>
          <div
            v-for="option in filteredOptions"
            :key="getOptionValue(option)"
            class="select-option"
            :class="{
              'is-selected': isSelected(option),
              'is-disabled': isDisabled(option)
            }"
            @click="selectOption(option)"
          >
            <div class="option-content">
              <span class="option-label">{{ getOptionLabel(option) }}</span>
              <span v-if="getOptionDescription(option)" class="option-description">
                {{ getOptionDescription(option) }}
              </span>
            </div>
            <svg v-if="isSelected(option)" class="option-check" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.2L4.8 12l-1.4-1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
          </div>
        </template>
        
        <!-- Empty state -->
        <div v-if="filteredOptions.length === 0" class="select-empty">
          <slot name="empty">
            <p>{{ emptyText }}</p>
          </slot>
        </div>
      </div>
      
      <!-- Actions -->
      <div v-if="showActions" class="select-actions">
        <button
          v-if="clearable && hasValue"
          type="button"
          class="action-btn clear-btn"
          @click="clearSelection"
        >
          Clear
        </button>
        <button
          type="button"
          class="action-btn done-btn"
          @click="closeSheet"
        >
          Done
        </button>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import BottomSheet from '../overlay/BottomSheet.vue'

// Types
export interface SelectOption {
  label: string
  value: any
  description?: string
  disabled?: boolean
  [key: string]: any
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

// Props
interface BottomSheetSelectProps {
  modelValue?: any
  options?: SelectOption[] | any[]
  groups?: SelectGroup[]
  label?: string
  placeholder?: string
  sheetTitle?: string
  disabled?: boolean
  clearable?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
  showActions?: boolean
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  labelKey?: string
  valueKey?: string
  descriptionKey?: string
  disabledKey?: string
}

const props = withDefaults(defineProps<BottomSheetSelectProps>(), {
  modelValue: undefined,
  options: () => [],
  groups: () => [],
  placeholder: 'Select an option',
  searchPlaceholder: 'Search...',
  emptyText: 'No options found',
  disabled: false,
  clearable: false,
  searchable: false,
  showActions: true,
  variant: 'default',
  size: 'md',
  labelKey: 'label',
  valueKey: 'value',
  descriptionKey: 'description',
  disabledKey: 'disabled'
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
  'open': []
  'close': []
}>()

// State
const modelValue = useVModel(props, 'modelValue', emit)
const isOpen = ref(false)
const searchQuery = ref('')

// Computed
const grouped = computed(() => props.groups.length > 0)

const hasValue = computed(() => {
  return modelValue.value !== undefined && modelValue.value !== null && modelValue.value !== ''
})

const selectedOption = computed(() => {
  if (!hasValue.value) return null
  
  if (grouped.value) {
    for (const group of props.groups) {
      const option = group.options.find(opt => getOptionValue(opt) === modelValue.value)
      if (option) return option
    }
  } else {
    return props.options.find(opt => getOptionValue(opt) === modelValue.value)
  }
  
  return null
})

const displayValue = computed(() => {
  if (selectedOption.value) {
    return getOptionLabel(selectedOption.value)
  }
  return props.placeholder
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase()
    const description = getOptionDescription(option)?.toLowerCase() || ''
    return label.includes(query) || description.includes(query)
  })
})

const filteredGroups = computed(() => {
  if (!searchQuery.value) return props.groups
  
  const query = searchQuery.value.toLowerCase()
  return props.groups
    .map(group => ({
      ...group,
      options: group.options.filter(option => {
        const label = getOptionLabel(option).toLowerCase()
        const description = getOptionDescription(option)?.toLowerCase() || ''
        return label.includes(query) || description.includes(query)
      })
    }))
    .filter(group => group.options.length > 0)
})

const triggerClasses = computed(() => [
  'select-trigger',
  `select-trigger--${props.variant}`,
  `select-trigger--${props.size}`,
  {
    'is-disabled': props.disabled,
    'has-value': hasValue.value
  }
])

// Methods
const getOptionLabel = (option: any): string => {
  if (typeof option === 'string') return option
  return option[props.labelKey] || String(option)
}

const getOptionValue = (option: any): any => {
  if (typeof option === 'string') return option
  return option[props.valueKey] ?? option
}

const getOptionDescription = (option: any): string | undefined => {
  if (typeof option === 'object' && option !== null) {
    return option[props.descriptionKey]
  }
  return undefined
}

const isDisabled = (option: any): boolean => {
  if (typeof option === 'object' && option !== null) {
    return option[props.disabledKey] || false
  }
  return false
}

const isSelected = (option: any): boolean => {
  return getOptionValue(option) === modelValue.value
}

const selectOption = (option: any) => {
  if (isDisabled(option)) return
  
  const value = getOptionValue(option)
  modelValue.value = value
  emit('change', value)
  
  if (!props.showActions) {
    closeSheet()
  }
}

const clearSelection = () => {
  modelValue.value = undefined
  emit('change', undefined)
}

const openSheet = () => {
  if (props.disabled) return
  isOpen.value = true
  emit('open')
}

const closeSheet = () => {
  isOpen.value = false
  searchQuery.value = ''
  emit('close')
}

const handleSearch = () => {
  // Search is handled reactively through computed properties
}

// Clear search when sheet closes
watch(isOpen, (open) => {
  if (!open) {
    searchQuery.value = ''
  }
})
</script>

<style scoped>
.bottom-sheet-select {
  width: 100%;
}

/* Trigger */
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.select-trigger:hover:not(.is-disabled) {
  border-color: var(--color-border-hover);
}

.select-trigger:active:not(.is-disabled) {
  transform: scale(0.98);
}

.select-trigger.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.select-trigger--filled {
  background: var(--color-surface-elevated);
  border-color: transparent;
}

.select-trigger--outlined {
  background: transparent;
  border-width: 2px;
}

/* Sizes */
.select-trigger--sm {
  min-height: 36px;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.select-trigger--lg {
  min-height: 56px;
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
}

/* Content */
.select-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
}

.select-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.select-value {
  color: var(--color-text);
}

.select-value.is-placeholder {
  color: var(--color-text-tertiary);
}

.select-arrow {
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  transition: transform 0.2s;
}

/* Search */
.select-search {
  position: relative;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.search-input {
  width: 100%;
  height: 44px;
  padding: 0 var(--spacing-md) 0 44px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}

.search-icon {
  position: absolute;
  left: calc(var(--spacing-md) + 12px);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
}

/* Options */
.select-options {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-sm) 0;
}

.select-options.has-search {
  max-height: calc(70vh - 120px);
}

/* Option Group */
.option-group:not(:last-child) {
  margin-bottom: var(--spacing-md);
}

.group-header {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Option */
.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all 0.15s;
}

.select-option:hover:not(.is-disabled) {
  background: var(--color-surface-hover);
}

.select-option:active:not(.is-disabled) {
  background: var(--color-surface-active);
}

.select-option.is-selected {
  background: var(--color-primary-alpha);
  color: var(--color-primary);
}

.select-option.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-label {
  font-size: var(--font-size-md);
  color: var(--color-text);
}

.option-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.option-check {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
}

/* Empty state */
.select-empty {
  padding: var(--spacing-xl) var(--spacing-md);
  text-align: center;
  color: var(--color-text-secondary);
}

/* Actions */
.select-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.action-btn {
  flex: 1;
  height: 44px;
  padding: 0 var(--spacing-md);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--color-surface-hover);
}

.done-btn {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-contrast);
}

.done-btn:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

/* Dark mode adjustments */
:root.dark .select-trigger {
  background: var(--color-surface);
  border-color: var(--color-border);
}

:root.dark .search-input {
  background: var(--color-surface-elevated);
}
</style>