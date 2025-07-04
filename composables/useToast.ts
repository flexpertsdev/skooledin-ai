import { reactive } from 'vue'
import type { Component } from 'vue'

type ToastType = 'info' | 'success' | 'warning' | 'error'
type ToastPosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'

interface ToastAction {
  label: string
  action: () => void
}

interface ToastOptions {
  type?: ToastType
  title?: string
  description?: string
  icon?: Component | string
  duration?: number
  closable?: boolean
  action?: ToastAction
  showProgress?: boolean
  position?: ToastPosition
  onClick?: () => void
}

interface Toast extends ToastOptions {
  id: string
}

// Global toast state
const toastState = reactive<{
  toasts: Toast[]
}>({
  toasts: []
})

export const useToast = () => {
  const show = (options: ToastOptions | string): string => {
    const id = Math.random().toString(36).substr(2, 9)

    // Allow simple string usage
    const toastOptions = typeof options === 'string' ? { description: options } : options

    const toast: Toast = {
      id,
      type: 'info',
      duration: 5000,
      closable: true,
      showProgress: true,
      position: 'bottom-right',
      ...toastOptions
    }

    // Add to state
    toastState.toasts.unshift(toast)

    // Auto remove after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = toastState.toasts.findIndex(t => t.id === id)
    if (index > -1) {
      toastState.toasts.splice(index, 1)
    }
  }

  const clear = () => {
    toastState.toasts = []
  }

  // Convenience methods
  const info = (options: Omit<ToastOptions, 'type'> | string) => {
    const opts = typeof options === 'string' ? { description: options } : options
    return show({ ...opts, type: 'info' })
  }

  const success = (options: Omit<ToastOptions, 'type'> | string) => {
    const opts = typeof options === 'string' ? { description: options } : options
    return show({ ...opts, type: 'success' })
  }

  const warning = (options: Omit<ToastOptions, 'type'> | string) => {
    const opts = typeof options === 'string' ? { description: options } : options
    return show({ ...opts, type: 'warning' })
  }

  const error = (options: Omit<ToastOptions, 'type'> | string) => {
    const opts = typeof options === 'string' ? { description: options } : options
    return show({ ...opts, type: 'error' })
  }

  return {
    toasts: toastState.toasts,
    show,
    remove,
    clear,
    info,
    success,
    warning,
    error
  }
}
