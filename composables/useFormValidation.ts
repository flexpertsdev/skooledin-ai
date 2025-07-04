import { ref, computed, watch, reactive } from 'vue'
import type { Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

// Validation rule types
export type ValidationRule<T = any> = (value: T) => string | boolean | Promise<string | boolean>

export interface ValidationRules {
  [key: string]: ValidationRule | ValidationRule[]
}

export interface ValidationErrors {
  [key: string]: string[]
}

export interface ValidationState {
  isDirty: boolean
  isTouched: boolean
  isValidating: boolean
  isValid: boolean
  errors: string[]
}

export interface FormValidationState {
  [key: string]: ValidationState
}

export interface UseFormValidationOptions {
  mode?: 'blur' | 'change' | 'submit' | 'manual'
  revalidateMode?: 'blur' | 'change' | 'submit'
  debounceTime?: number
  validateOnMount?: boolean
}

// Built-in validation rules
export const validators = {
  required: (message = 'This field is required'): ValidationRule => {
    return (value: any) => {
      if (value === null || value === undefined || value === '') return message
      if (Array.isArray(value) && value.length === 0) return message
      if (typeof value === 'string' && value.trim() === '') return message
      return true
    }
  },

  minLength: (min: number, message?: string): ValidationRule => {
    return (value: any) => {
      const msg = message || `Minimum length is ${min}`
      if (!value) return true
      if (typeof value === 'string' && value.length < min) return msg
      if (Array.isArray(value) && value.length < min) return msg
      return true
    }
  },

  maxLength: (max: number, message?: string): ValidationRule => {
    return (value: any) => {
      const msg = message || `Maximum length is ${max}`
      if (!value) return true
      if (typeof value === 'string' && value.length > max) return msg
      if (Array.isArray(value) && value.length > max) return msg
      return true
    }
  },

  min: (min: number, message?: string): ValidationRule => {
    return (value: any) => {
      const msg = message || `Minimum value is ${min}`
      if (value === null || value === undefined || value === '') return true
      if (Number(value) < min) return msg
      return true
    }
  },

  max: (max: number, message?: string): ValidationRule => {
    return (value: any) => {
      const msg = message || `Maximum value is ${max}`
      if (value === null || value === undefined || value === '') return true
      if (Number(value) > max) return msg
      return true
    }
  },

  email: (message = 'Invalid email address'): ValidationRule => {
    return (value: any) => {
      if (!value) return true
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) || message
    }
  },

  url: (message = 'Invalid URL'): ValidationRule => {
    return (value: any) => {
      if (!value) return true
      try {
        new URL(value)
        return true
      } catch {
        return message
      }
    }
  },

  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => {
    return (value: any) => {
      if (!value) return true
      return regex.test(String(value)) || message
    }
  },

  match: (fieldName: string, message?: string): ValidationRule => {
    return (value: any, formValues?: any) => {
      const msg = message || `Must match ${fieldName}`
      if (!formValues || !formValues[fieldName]) return true
      return value === formValues[fieldName] || msg
    }
  },

  custom: (fn: (value: any) => boolean, message = 'Invalid value'): ValidationRule => {
    return (value: any) => {
      return fn(value) || message
    }
  },

  async: (fn: (value: any) => Promise<boolean>, message = 'Invalid value'): ValidationRule => {
    return async (value: any) => {
      const result = await fn(value)
      return result || message
    }
  }
}

export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  rules: ValidationRules,
  options: UseFormValidationOptions = {}
) => {
  const {
    mode = 'blur',
    revalidateMode = 'change',
    debounceTime = 300,
    validateOnMount = false
  } = options

  // Form values
  const values = reactive<T>({ ...initialValues })

  // Validation state for each field
  const validationState = reactive<FormValidationState>({})

  // Overall form state
  const isValidating = ref(false)
  const isSubmitting = ref(false)
  const submitCount = ref(0)

  // Initialize validation state for each field
  Object.keys(rules).forEach(field => {
    validationState[field] = {
      isDirty: false,
      isTouched: false,
      isValidating: false,
      isValid: true,
      errors: []
    }
  })

  // Get all errors
  const errors = computed(() => {
    const allErrors: ValidationErrors = {}
    Object.entries(validationState).forEach(([field, state]) => {
      if (state.errors.length > 0) {
        allErrors[field] = state.errors
      }
    })
    return allErrors
  })

  // Check if form is valid
  const isValid = computed(() => {
    return Object.values(validationState).every(state => state.isValid)
  })

  // Check if form is dirty
  const isDirty = computed(() => {
    return Object.values(validationState).some(state => state.isDirty)
  })

  // Check if form is touched
  const isTouched = computed(() => {
    return Object.values(validationState).some(state => state.isTouched)
  })

  // Validate a single field
  const validateField = async (field: string, formValues?: any): Promise<boolean> => {
    if (!rules[field]) return true

    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]]
    const value = (values as any)[field]

    validationState[field].isValidating = true
    validationState[field].errors = []

    try {
      for (const rule of fieldRules) {
        const result = await rule(value)
        if (result !== true) {
          validationState[field].errors.push(result as string)
        }
      }

      validationState[field].isValid = validationState[field].errors.length === 0
      return validationState[field].isValid
    } finally {
      validationState[field].isValidating = false
    }
  }

  // Validate all fields
  const validate = async (): Promise<boolean> => {
    isValidating.value = true
    const results = await Promise.all(Object.keys(rules).map(field => validateField(field)))
    isValidating.value = false
    return results.every(result => result)
  }

  // Clear errors for a field
  const clearFieldErrors = (field: string) => {
    if (validationState[field]) {
      validationState[field].errors = []
      validationState[field].isValid = true
    }
  }

  // Clear all errors
  const clearErrors = () => {
    Object.keys(validationState).forEach(field => {
      clearFieldErrors(field)
    })
  }

  // Reset a field
  const resetField = (field: string) => {
    ;(values as any)[field] = (initialValues as any)[field]
    validationState[field] = {
      isDirty: false,
      isTouched: false,
      isValidating: false,
      isValid: true,
      errors: []
    }
  }

  // Reset form
  const reset = () => {
    Object.keys(initialValues).forEach(field => {
      ;(values as any)[field] = (initialValues as any)[field]
    })
    Object.keys(validationState).forEach(field => {
      validationState[field] = {
        isDirty: false,
        isTouched: false,
        isValidating: false,
        isValid: true,
        errors: []
      }
    })
    submitCount.value = 0
  }

  // Handle field change
  const handleFieldChange = useDebounceFn(async (field: string) => {
    validationState[field].isDirty = true

    if (mode === 'change' || (validationState[field].isTouched && revalidateMode === 'change')) {
      await validateField(field)
    }
  }, debounceTime)

  // Handle field blur
  const handleFieldBlur = async (field: string) => {
    validationState[field].isTouched = true

    if (mode === 'blur' || (validationState[field].isDirty && revalidateMode === 'blur')) {
      await validateField(field)
    }
  }

  // Handle form submit
  const handleSubmit = async (onValid: (values: T) => void | Promise<void>) => {
    isSubmitting.value = true
    submitCount.value++

    // Mark all fields as touched
    Object.keys(validationState).forEach(field => {
      validationState[field].isTouched = true
    })

    const isFormValid = await validate()

    if (isFormValid) {
      try {
        await onValid(values as T)
      } finally {
        isSubmitting.value = false
      }
    } else {
      isSubmitting.value = false
    }
  }

  // Field helpers
  const field = (name: string) => ({
    value: computed({
      get: () => (values as any)[name],
      set: (val: any) => {
        ;(values as any)[name] = val
        handleFieldChange(name)
      }
    }),
    error: computed(() => validationState[name]?.errors[0] || ''),
    errors: computed(() => validationState[name]?.errors || []),
    isDirty: computed(() => validationState[name]?.isDirty || false),
    isTouched: computed(() => validationState[name]?.isTouched || false),
    isValidating: computed(() => validationState[name]?.isValidating || false),
    isValid: computed(() => validationState[name]?.isValid ?? true),
    validate: () => validateField(name),
    clear: () => clearFieldErrors(name),
    reset: () => resetField(name),
    blur: () => handleFieldBlur(name)
  })

  // Watch for changes
  watch(
    values,
    () => {
      if (mode === 'change') {
        validate()
      }
    },
    { deep: true }
  )

  // Validate on mount if enabled
  if (validateOnMount) {
    validate()
  }

  return {
    // Values
    values,

    // State
    errors,
    isValid,
    isDirty,
    isTouched,
    isValidating,
    isSubmitting,
    submitCount,

    // Methods
    validate,
    validateField,
    clearErrors,
    clearFieldErrors,
    reset,
    resetField,
    handleSubmit,
    field,

    // Direct field access
    fields: new Proxy({} as Record<string, ReturnType<typeof field>>, {
      get(target, prop: string) {
        return field(prop)
      }
    })
  }
}

// Helper to create typed form validation
export function createFormValidation<T extends Record<string, any>>() {
  return (initialValues: T, rules: ValidationRules, options?: UseFormValidationOptions) =>
    useFormValidation(initialValues, rules, options)
}
