<template>
  <form
    ref="formRef"
    :class="classes"
    :novalidate="novalidate"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <!-- Screen reader announcements -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      <span v-if="isSubmitting">Submitting form...</span>
      <span v-if="submitSuccess">Form submitted successfully</span>
      <span v-if="submitError">{{ submitError }}</span>
    </div>
    
    <!-- Form content -->
    <slot 
      :fields="navigation.fields"
      :currentField="navigation.currentField"
      :focusNext="navigation.focusNext"
      :focusPrevious="navigation.focusPrevious"
      :isSubmitting="isSubmitting"
    />
    
    <!-- Default submit/reset buttons if not provided in slot -->
    <div v-if="showDefaultActions" class="form-actions">
      <button
        type="submit"
        :disabled="isSubmitting || disabled"
        :aria-busy="isSubmitting"
        class="submit-button"
      >
        <span v-if="isSubmitting">{{ submitText || 'Submitting...' }}</span>
        <span v-else>{{ submitButtonText || 'Submit' }}</span>
      </button>
      
      <button
        v-if="showResetButton"
        type="reset"
        :disabled="isSubmitting"
        class="reset-button"
      >
        {{ resetButtonText || 'Reset' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFormNavigation } from '~/composables/useFormNavigation'
import type { FormNavigationOptions } from '~/composables/useFormNavigation'

// Props
interface AccessibleFormProps {
  // Form behavior
  action?: string
  method?: 'get' | 'post'
  novalidate?: boolean
  disabled?: boolean
  
  // Navigation options
  navigationOptions?: FormNavigationOptions
  
  // Actions
  showDefaultActions?: boolean
  showResetButton?: boolean
  submitButtonText?: string
  resetButtonText?: string
  submitText?: string
  
  // Validation
  validateOnSubmit?: boolean
  validateOnChange?: boolean
  
  // Accessibility
  ariaLabel?: string
  ariaDescribedby?: string
  role?: string
}

const props = withDefaults(defineProps<AccessibleFormProps>(), {
  method: 'post',
  novalidate: true,
  disabled: false,
  showDefaultActions: true,
  showResetButton: false,
  validateOnSubmit: true,
  validateOnChange: false
})

// Emits
const emit = defineEmits<{
  'submit': [data: FormData]
  'reset': []
  'validate': [isValid: boolean]
  'field-change': [name: string, value: any]
  'navigation-change': [fieldIndex: number]
}>()

// Refs
const formRef = ref<HTMLFormElement>()

// State
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Form navigation
const navigation = useFormNavigation(formRef, props.navigationOptions)

// Computed
const classes = computed(() => [
  'accessible-form',
  {
    'is-submitting': isSubmitting.value,
    'is-disabled': props.disabled
  }
])

// Methods
const getFormData = (): FormData => {
  if (!formRef.value) return new FormData()
  return new FormData(formRef.value)
}

const validateForm = (): boolean => {
  if (!formRef.value || !props.validateOnSubmit) return true
  
  // Native HTML5 validation
  const isValid = formRef.value.checkValidity()
  
  if (!isValid) {
    // Find and focus first invalid field
    const firstInvalid = formRef.value.querySelector(':invalid') as HTMLElement
    if (firstInvalid) {
      const fieldName = navigation.getFieldLabel(firstInvalid)
      submitError.value = `Please correct the error in ${fieldName || 'the form'}`
      
      // Focus the invalid field
      const fieldIndex = navigation.fields.value.findIndex(
        field => field.element === firstInvalid
      )
      if (fieldIndex >= 0) {
        navigation.focusField(fieldIndex)
      }
    }
  }
  
  emit('validate', isValid)
  return isValid
}

const handleSubmit = async () => {
  if (isSubmitting.value || props.disabled) return
  
  // Reset states
  submitSuccess.value = false
  submitError.value = ''
  
  // Validate
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    const formData = getFormData()
    emit('submit', formData)
    
    // Show success state
    submitSuccess.value = true
    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)
  } catch (error: any) {
    submitError.value = error.message || 'An error occurred'
  } finally {
    isSubmitting.value = false
  }
}

const handleReset = () => {
  if (isSubmitting.value) return
  
  // Reset form
  formRef.value?.reset()
  
  // Reset states
  submitSuccess.value = false
  submitError.value = ''
  
  // Re-collect fields
  navigation.collectFields()
  
  // Focus first field
  navigation.focusFirst()
  
  emit('reset')
}

// Field change tracking
const setupFieldTracking = () => {
  if (!formRef.value || !props.validateOnChange) return
  
  const handleFieldChange = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target) return
    
    const name = target.getAttribute('name')
    if (!name) return
    
    let value: any
    if (target instanceof HTMLInputElement) {
      if (target.type === 'checkbox') {
        value = target.checked
      } else if (target.type === 'radio') {
        value = target.value
      } else {
        value = target.value
      }
    } else if (target instanceof HTMLTextAreaElement) {
      value = target.value
    } else if (target instanceof HTMLSelectElement) {
      value = target.value
    }
    
    emit('field-change', name, value)
    
    // Validate single field
    if (props.validateOnChange) {
      const isValid = target.checkValidity()
      if (!isValid) {
        target.setAttribute('aria-invalid', 'true')
      } else {
        target.removeAttribute('aria-invalid')
      }
    }
  }
  
  formRef.value.addEventListener('change', handleFieldChange)
  formRef.value.addEventListener('blur', handleFieldChange, true)
}

// Watch navigation changes
watch(() => navigation.currentFieldIndex.value, (index) => {
  emit('navigation-change', index)
})

// Setup
onMounted(() => {
  setupFieldTracking()
})

// Expose methods
defineExpose({
  submit: handleSubmit,
  reset: handleReset,
  validate: validateForm,
  getFormData,
  focusFirst: navigation.focusFirst,
  focusField: navigation.focusField,
  focusByName: navigation.focusByName
})
</script>

<style scoped>
.accessible-form {
  position: relative;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Form states */
.accessible-form.is-submitting {
  pointer-events: none;
  opacity: 0.7;
}

.accessible-form.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Default form actions */
.form-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

/* Default button styles */
.submit-button,
.reset-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 2px solid transparent;
}

.submit-button {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

.submit-button:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-button[aria-busy="true"] {
  position: relative;
}

.submit-button[aria-busy="true"]::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.reset-button {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.reset-button:hover:not(:disabled) {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.reset-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Focus styles */
.accessible-form :focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.accessible-form :focus:not(:focus-visible) {
  outline: none;
}

/* Invalid field styles */
.accessible-form :invalid:not(:focus) {
  border-color: var(--color-error);
}

.accessible-form [aria-invalid="true"] {
  border-color: var(--color-error);
}

/* Required field indicator */
.accessible-form [required]::after {
  content: ' *';
  color: var(--color-error);
}

/* Responsive */
@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
  }
  
  .submit-button,
  .reset-button {
    width: 100%;
  }
}
</style>