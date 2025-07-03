import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useFocusTrap, useEventListener } from '@vueuse/core'

// Types
export interface FormNavigationOptions {
  // Focus behavior
  autoFocus?: boolean
  focusFirst?: boolean
  trapFocus?: boolean
  restoreFocus?: boolean
  
  // Navigation
  wrapNavigation?: boolean
  skipDisabled?: boolean
  skipHidden?: boolean
  
  // Keyboard shortcuts
  submitOnEnter?: boolean
  resetOnEscape?: boolean
  
  // Mobile
  hideKeyboardOnSubmit?: boolean
  scrollIntoView?: boolean
}

export interface FormField {
  element: HTMLElement
  name: string
  type: string
  required: boolean
  disabled: boolean
  visible: boolean
  tabIndex: number
}

const defaultOptions: FormNavigationOptions = {
  autoFocus: true,
  focusFirst: true,
  trapFocus: false,
  restoreFocus: true,
  wrapNavigation: true,
  skipDisabled: true,
  skipHidden: true,
  submitOnEnter: true,
  resetOnEscape: false,
  hideKeyboardOnSubmit: true,
  scrollIntoView: true
}

export const useFormNavigation = (
  formRef: Ref<HTMLFormElement | undefined>,
  options: FormNavigationOptions = {}
) => {
  const opts = { ...defaultOptions, ...options }
  
  // State
  const fields = ref<FormField[]>([])
  const currentFieldIndex = ref(0)
  const lastFocusedElement = ref<HTMLElement | null>(null)
  const isNavigating = ref(false)
  
  // Focus trap
  const { activate, deactivate } = opts.trapFocus && formRef.value
    ? useFocusTrap(formRef as Ref<HTMLElement>)
    : { activate: () => {}, deactivate: () => {} }
  
  // Computed
  const navigableFields = computed(() => {
    return fields.value.filter(field => {
      if (opts.skipDisabled && field.disabled) return false
      if (opts.skipHidden && !field.visible) return false
      return true
    })
  })
  
  const currentField = computed(() => {
    return navigableFields.value[currentFieldIndex.value]
  })
  
  const isFirstField = computed(() => {
    return currentFieldIndex.value === 0
  })
  
  const isLastField = computed(() => {
    return currentFieldIndex.value === navigableFields.value.length - 1
  })
  
  // Methods
  const collectFields = () => {
    if (!formRef.value) return
    
    const formElements = formRef.value.querySelectorAll<HTMLElement>(
      'input, textarea, select, button, [tabindex]:not([tabindex="-1"])'
    )
    
    fields.value = Array.from(formElements).map((element, index) => ({
      element,
      name: element.getAttribute('name') || '',
      type: element.getAttribute('type') || element.tagName.toLowerCase(),
      required: element.hasAttribute('required'),
      disabled: element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true',
      visible: isElementVisible(element),
      tabIndex: parseInt(element.getAttribute('tabindex') || '0', 10)
    }))
    
    // Sort by tabindex
    fields.value.sort((a, b) => {
      if (a.tabIndex === 0 && b.tabIndex === 0) return 0
      if (a.tabIndex === 0) return 1
      if (b.tabIndex === 0) return -1
      return a.tabIndex - b.tabIndex
    })
  }
  
  const isElementVisible = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()
    const style = window.getComputedStyle(element)
    
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none' &&
      style.opacity !== '0'
    )
  }
  
  const focusField = (index: number) => {
    const field = navigableFields.value[index]
    if (!field) return
    
    isNavigating.value = true
    currentFieldIndex.value = index
    
    // Focus the element
    field.element.focus()
    
    // Scroll into view on mobile
    if (opts.scrollIntoView && isMobileDevice()) {
      setTimeout(() => {
        field.element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
      }, 100)
    }
    
    // Announce for screen readers
    announceField(field)
    
    setTimeout(() => {
      isNavigating.value = false
    }, 100)
  }
  
  const focusNext = () => {
    let nextIndex = currentFieldIndex.value + 1
    
    if (nextIndex >= navigableFields.value.length) {
      if (opts.wrapNavigation) {
        nextIndex = 0
      } else {
        return
      }
    }
    
    focusField(nextIndex)
  }
  
  const focusPrevious = () => {
    let prevIndex = currentFieldIndex.value - 1
    
    if (prevIndex < 0) {
      if (opts.wrapNavigation) {
        prevIndex = navigableFields.value.length - 1
      } else {
        return
      }
    }
    
    focusField(prevIndex)
  }
  
  const focusFirst = () => {
    if (navigableFields.value.length > 0) {
      focusField(0)
    }
  }
  
  const focusLast = () => {
    if (navigableFields.value.length > 0) {
      focusField(navigableFields.value.length - 1)
    }
  }
  
  const focusByName = (name: string) => {
    const index = navigableFields.value.findIndex(field => field.name === name)
    if (index >= 0) {
      focusField(index)
    }
  }
  
  const announceField = (field: FormField) => {
    // Create announcement for screen readers
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    
    // Build announcement text
    const parts = []
    const label = getFieldLabel(field.element)
    if (label) parts.push(label)
    parts.push(field.type)
    if (field.required) parts.push('required')
    
    const currentValue = getFieldValue(field.element)
    if (currentValue) parts.push(`current value: ${currentValue}`)
    
    const error = getFieldError(field.element)
    if (error) parts.push(`error: ${error}`)
    
    announcement.textContent = parts.join(', ')
    
    document.body.appendChild(announcement)
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }
  
  const getFieldLabel = (element: HTMLElement): string => {
    // Check for aria-label
    const ariaLabel = element.getAttribute('aria-label')
    if (ariaLabel) return ariaLabel
    
    // Check for associated label
    const id = element.id
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`)
      if (label) return label.textContent || ''
    }
    
    // Check for parent label
    const parentLabel = element.closest('label')
    if (parentLabel) {
      return Array.from(parentLabel.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent)
        .join(' ')
        .trim()
    }
    
    // Check for aria-labelledby
    const labelledBy = element.getAttribute('aria-labelledby')
    if (labelledBy) {
      const labelElement = document.getElementById(labelledBy)
      if (labelElement) return labelElement.textContent || ''
    }
    
    // Use placeholder as fallback
    return element.getAttribute('placeholder') || ''
  }
  
  const getFieldValue = (element: HTMLElement): string => {
    if (element instanceof HTMLInputElement) {
      if (element.type === 'checkbox' || element.type === 'radio') {
        return element.checked ? 'checked' : 'not checked'
      }
      return element.value
    }
    
    if (element instanceof HTMLTextAreaElement) {
      return element.value
    }
    
    if (element instanceof HTMLSelectElement) {
      const selectedOption = element.options[element.selectedIndex]
      return selectedOption ? selectedOption.text : ''
    }
    
    return ''
  }
  
  const getFieldError = (element: HTMLElement): string => {
    // Check for aria-describedby error message
    const describedBy = element.getAttribute('aria-describedby')
    if (describedBy) {
      const errorElement = document.getElementById(describedBy)
      if (errorElement && errorElement.getAttribute('role') === 'alert') {
        return errorElement.textContent || ''
      }
    }
    
    // Check for aria-invalid
    if (element.getAttribute('aria-invalid') === 'true') {
      return 'Invalid value'
    }
    
    return ''
  }
  
  const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }
  
  const hideKeyboard = () => {
    if (isMobileDevice() && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }
  
  // Event handlers
  const handleKeydown = (event: KeyboardEvent) => {
    if (!formRef.value) return
    
    // Tab navigation
    if (event.key === 'Tab') {
      if (opts.trapFocus) {
        event.preventDefault()
        if (event.shiftKey) {
          focusPrevious()
        } else {
          focusNext()
        }
      }
    }
    
    // Arrow key navigation for radio groups and selects
    const target = event.target as HTMLElement
    if (target instanceof HTMLInputElement && target.type === 'radio') {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        focusNext()
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        focusPrevious()
      }
    }
    
    // Enter to submit
    if (opts.submitOnEnter && event.key === 'Enter') {
      if (target.tagName !== 'TEXTAREA' && target.tagName !== 'BUTTON') {
        event.preventDefault()
        const submitButton = formRef.value.querySelector<HTMLButtonElement>(
          'button[type="submit"], input[type="submit"]'
        )
        if (submitButton) {
          submitButton.click()
          if (opts.hideKeyboardOnSubmit) {
            hideKeyboard()
          }
        }
      }
    }
    
    // Escape to reset
    if (opts.resetOnEscape && event.key === 'Escape') {
      event.preventDefault()
      const resetButton = formRef.value.querySelector<HTMLButtonElement>(
        'button[type="reset"], input[type="reset"]'
      )
      if (resetButton) {
        resetButton.click()
      } else {
        formRef.value.reset()
      }
      focusFirst()
    }
  }
  
  const handleFocus = (event: FocusEvent) => {
    if (isNavigating.value) return
    
    const target = event.target as HTMLElement
    const fieldIndex = navigableFields.value.findIndex(
      field => field.element === target
    )
    
    if (fieldIndex >= 0) {
      currentFieldIndex.value = fieldIndex
    }
  }
  
  // Setup and cleanup
  const setup = () => {
    if (!formRef.value) return
    
    collectFields()
    
    // Store current focus
    lastFocusedElement.value = document.activeElement as HTMLElement
    
    // Setup event listeners
    useEventListener(formRef, 'keydown', handleKeydown)
    useEventListener(formRef, 'focusin', handleFocus)
    
    // Auto focus
    if (opts.autoFocus && opts.focusFirst) {
      setTimeout(() => {
        focusFirst()
      }, 100)
    }
    
    // Activate focus trap
    if (opts.trapFocus) {
      activate()
    }
  }
  
  const cleanup = () => {
    // Deactivate focus trap
    if (opts.trapFocus) {
      deactivate()
    }
    
    // Restore focus
    if (opts.restoreFocus && lastFocusedElement.value) {
      lastFocusedElement.value.focus()
    }
  }
  
  // Lifecycle
  onMounted(() => {
    if (formRef.value) {
      setup()
    }
  })
  
  onUnmounted(() => {
    cleanup()
  })
  
  // Watch for form changes
  if (formRef) {
    watch(formRef, (newForm) => {
      if (newForm) {
        setup()
      }
    })
  }
  
  return {
    // State
    fields: computed(() => fields.value),
    navigableFields,
    currentField,
    currentFieldIndex: computed(() => currentFieldIndex.value),
    isFirstField,
    isLastField,
    
    // Methods
    collectFields,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    focusByName,
    focusField,
    hideKeyboard,
    
    // Utilities
    getFieldLabel,
    getFieldValue,
    getFieldError
  }
}