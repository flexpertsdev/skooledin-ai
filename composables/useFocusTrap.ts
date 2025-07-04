import { ref, watch, nextTick, type Ref } from 'vue'

interface FocusTrapOptions {
  immediate?: boolean
  escapeDeactivates?: boolean
  allowOutsideClick?: boolean
}

export function useFocusTrap(target: Ref<HTMLElement | undefined>, options: FocusTrapOptions = {}) {
  const isActive = ref(false)
  const previousActiveElement = ref<HTMLElement | null>(null)

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ]

    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors.join(','))).filter(
      el => el.offsetParent !== null
    ) // Filter out hidden elements
  }

  const trapFocus = (e: KeyboardEvent) => {
    if (!isActive.value || !target.value) return

    const focusableElements = getFocusableElements(target.value)
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  const activate = () => {
    if (isActive.value || !target.value) return

    isActive.value = true
    previousActiveElement.value = document.activeElement as HTMLElement

    // Focus the first focusable element or the container itself
    nextTick(() => {
      if (!target.value) return

      const focusableElements = getFocusableElements(target.value)
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      } else if (target.value.tabIndex === -1) {
        target.value.tabIndex = 0
        target.value.focus()
      } else {
        target.value.focus()
      }
    })

    document.addEventListener('keydown', trapFocus)
  }

  const deactivate = () => {
    if (!isActive.value) return

    isActive.value = false
    document.removeEventListener('keydown', trapFocus)

    // Restore focus to the previously focused element
    if (previousActiveElement.value && previousActiveElement.value.focus) {
      previousActiveElement.value.focus()
    }
  }

  // Auto-activate if immediate is true
  if (options.immediate) {
    watch(
      target,
      newTarget => {
        if (newTarget) {
          activate()
        } else {
          deactivate()
        }
      },
      { immediate: true }
    )
  }

  return {
    activate,
    deactivate,
    isActive: readonly(isActive)
  }
}
