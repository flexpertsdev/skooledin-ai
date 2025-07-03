<template>
  <div
    :class="classes"
    :style="cssVars"
    role="group"
    :aria-label="label"
  >
    <!-- Label -->
    <div v-if="label" class="choice-label">
      {{ label }}
      <span v-if="required" class="choice-required">*</span>
    </div>
    
    <!-- Buttons container -->
    <div class="choice-buttons-container">
      <button
        v-for="(option, index) in normalizedOptions"
        :key="getOptionValue(option)"
        type="button"
        class="choice-button"
        :class="getButtonClasses(option)"
        :disabled="isDisabled(option) || disabled"
        :aria-pressed="isSelected(option)"
        @click="handleSelect(option)"
      >
        <!-- Icon -->
        <span v-if="getOptionIcon(option)" class="button-icon">
          <component :is="getOptionIcon(option)" />
        </span>
        
        <!-- Content -->
        <span class="button-content">
          <span class="button-label">{{ getOptionLabel(option) }}</span>
          <span v-if="getOptionDescription(option)" class="button-description">
            {{ getOptionDescription(option) }}
          </span>
        </span>
        
        <!-- Check mark for selected state -->
        <transition name="scale">
          <svg 
            v-if="showCheck && isSelected(option)" 
            class="button-check"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </transition>
      </button>
    </div>
    
    <!-- Helper text -->
    <div v-if="helperText || error" class="choice-helper">
      <span :class="{ 'is-error': error }">
        {{ error || helperText }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useVModel } from '@vueuse/core'

// Types
export interface ChoiceOption {
  label: string
  value: any
  description?: string
  icon?: any
  disabled?: boolean
  color?: string
  [key: string]: any
}

// Props
interface ChoiceButtonsProps {
  modelValue?: any
  options?: ChoiceOption[] | string[] | number[]
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  min?: number
  max?: number
  variant?: 'default' | 'outlined' | 'filled' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  layout?: 'horizontal' | 'vertical' | 'grid'
  columns?: number
  fullWidth?: boolean
  showCheck?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  labelKey?: string
  valueKey?: string
  descriptionKey?: string
  iconKey?: string
  disabledKey?: string
  colorKey?: string
}

const props = withDefaults(defineProps<ChoiceButtonsProps>(), {
  modelValue: undefined,
  options: () => [],
  required: false,
  disabled: false,
  multiple: false,
  variant: 'default',
  size: 'md',
  layout: 'horizontal',
  columns: 2,
  fullWidth: false,
  showCheck: true,
  color: 'primary',
  labelKey: 'label',
  valueKey: 'value',
  descriptionKey: 'description',
  iconKey: 'icon',
  disabledKey: 'disabled',
  colorKey: 'color'
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

// State
const modelValue = useVModel(props, 'modelValue', emit)

// Computed
const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        [props.labelKey]: String(option),
        [props.valueKey]: option
      }
    }
    return option as ChoiceOption
  })
})

const selectedValues = computed(() => {
  if (!modelValue.value) return []
  return props.multiple 
    ? (Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value])
    : [modelValue.value]
})

const classes = computed(() => [
  'choice-buttons',
  `choice-buttons--${props.variant}`,
  `choice-buttons--${props.size}`,
  `choice-buttons--${props.layout}`,
  {
    'is-disabled': props.disabled,
    'is-full-width': props.fullWidth,
    'has-error': props.error
  }
])

const cssVars = computed(() => ({
  '--choice-columns': props.layout === 'grid' ? props.columns : 'auto',
  '--choice-color': `var(--color-${props.color})`
}))

// Methods
const getOptionLabel = (option: any): string => {
  return option[props.labelKey] || String(option)
}

const getOptionValue = (option: any): any => {
  return option[props.valueKey] ?? option
}

const getOptionDescription = (option: any): string | undefined => {
  return option[props.descriptionKey]
}

const getOptionIcon = (option: any): any => {
  return option[props.iconKey]
}

const isDisabled = (option: any): boolean => {
  return option[props.disabledKey] || false
}

const getOptionColor = (option: any): string | undefined => {
  return option[props.colorKey]
}

const isSelected = (option: any): boolean => {
  const value = getOptionValue(option)
  return selectedValues.value.includes(value)
}

const getButtonClasses = (option: any) => {
  const color = getOptionColor(option) || props.color
  return {
    'is-selected': isSelected(option),
    'is-disabled': isDisabled(option),
    [`color-${color}`]: true
  }
}

const handleSelect = (option: any) => {
  if (isDisabled(option) || props.disabled) return
  
  const value = getOptionValue(option)
  
  if (props.multiple) {
    let newValue = [...selectedValues.value]
    
    if (isSelected(option)) {
      // Deselect
      if (!props.min || newValue.length > props.min) {
        newValue = newValue.filter(v => v !== value)
      }
    } else {
      // Select
      if (!props.max || newValue.length < props.max) {
        newValue.push(value)
      }
    }
    
    modelValue.value = newValue
    emit('change', newValue)
  } else {
    // Single selection
    modelValue.value = isSelected(option) ? undefined : value
    emit('change', modelValue.value)
  }
}

// Validation
watch(modelValue, (value) => {
  if (props.multiple && Array.isArray(value)) {
    if (props.min && value.length < props.min) {
      console.warn(`Minimum ${props.min} selections required`)
    }
    if (props.max && value.length > props.max) {
      console.warn(`Maximum ${props.max} selections allowed`)
    }
  }
})
</script>

<style scoped>
.choice-buttons {
  --button-bg: var(--color-surface);
  --button-border: var(--color-border);
  --button-text: var(--color-text);
  --button-hover: var(--color-surface-hover);
  --button-active: var(--color-surface-active);
  --button-selected-bg: var(--choice-color, var(--color-primary));
  --button-selected-text: var(--color-primary-contrast);
  --button-selected-border: var(--choice-color, var(--color-primary));
  
  width: 100%;
}

/* Label */
.choice-label {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
}

.choice-required {
  color: var(--color-error);
  margin-left: 2px;
}

/* Container */
.choice-buttons-container {
  display: flex;
  gap: var(--spacing-sm);
}

/* Layout variants */
.choice-buttons--horizontal .choice-buttons-container {
  flex-direction: row;
  flex-wrap: wrap;
}

.choice-buttons--vertical .choice-buttons-container {
  flex-direction: column;
}

.choice-buttons--grid .choice-buttons-container {
  display: grid;
  grid-template-columns: repeat(var(--choice-columns), 1fr);
}

/* Button */
.choice-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--button-bg);
  border: 2px solid var(--button-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  position: relative;
  overflow: hidden;
}

/* Full width */
.choice-buttons.is-full-width .choice-button {
  flex: 1;
}

.choice-buttons--vertical .choice-button,
.choice-buttons--grid .choice-button {
  width: 100%;
}

/* States */
.choice-button:hover:not(.is-disabled) {
  background: var(--button-hover);
  border-color: var(--choice-color, var(--color-primary));
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.choice-button:active:not(.is-disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.choice-button.is-selected {
  background: var(--button-selected-bg);
  border-color: var(--button-selected-border);
  color: var(--button-selected-text);
}

.choice-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.choice-buttons--outlined .choice-button {
  background: transparent;
}

.choice-buttons--outlined .choice-button.is-selected {
  background: var(--color-primary-alpha);
  color: var(--choice-color, var(--color-primary));
}

.choice-buttons--filled .choice-button {
  background: var(--color-surface-elevated);
  border-color: transparent;
}

.choice-buttons--ghost .choice-button {
  background: transparent;
  border-color: transparent;
}

.choice-buttons--ghost .choice-button:hover:not(.is-disabled) {
  background: var(--button-hover);
}

/* Sizes */
.choice-buttons--sm .choice-button {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.choice-buttons--lg .choice-button {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

/* Content */
.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.button-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  text-align: left;
}

.button-label {
  font-weight: 500;
}

.button-description {
  font-size: var(--font-size-sm);
  opacity: 0.7;
}

.button-check {
  width: 20px;
  height: 20px;
  margin-left: auto;
  flex-shrink: 0;
}

/* Helper text */
.choice-helper {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.choice-helper .is-error {
  color: var(--color-error);
}

/* Color variants */
.choice-button.color-secondary {
  --button-selected-bg: var(--color-secondary);
  --button-selected-text: var(--color-secondary-contrast);
  --button-selected-border: var(--color-secondary);
}

.choice-button.color-success {
  --button-selected-bg: var(--color-success);
  --button-selected-text: var(--color-success-contrast);
  --button-selected-border: var(--color-success);
}

.choice-button.color-warning {
  --button-selected-bg: var(--color-warning);
  --button-selected-text: var(--color-warning-contrast);
  --button-selected-border: var(--color-warning);
}

.choice-button.color-error {
  --button-selected-bg: var(--color-error);
  --button-selected-text: var(--color-error-contrast);
  --button-selected-border: var(--color-error);
}

/* Transitions */
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s var(--ease-out);
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}

/* Dark mode adjustments */
:root.dark .choice-button {
  --button-bg: var(--color-surface);
  --button-border: var(--color-border);
}
</style>