<template>
  <Teleport to="body">
    <TransitionGroup
      name="toast"
      tag="div"
      class="toast-container"
      :class="`toast-container-${position}`"
    >
      <div
        v-for="toast in visibleToasts"
        :key="toast.id"
        class="toast"
        :class="toastClasses(toast)"
        @click="handleToastClick(toast)"
        @mouseenter="pauseTimer(toast.id)"
        @mouseleave="resumeTimer(toast.id)"
      >
        <!-- Icon -->
        <div v-if="toast.icon || getDefaultIcon(toast.type)" class="toast-icon">
          <component :is="toast.icon" v-if="toast.icon && typeof toast.icon !== 'string'" />
          <span v-else-if="toast.icon" v-html="toast.icon" />
          <span v-else v-html="getDefaultIcon(toast.type)" />
        </div>

        <!-- Content -->
        <div class="toast-content">
          <h4 v-if="toast.title" class="toast-title">{{ toast.title }}</h4>
          <p v-if="toast.description" class="toast-description">{{ toast.description }}</p>
        </div>

        <!-- Actions -->
        <div v-if="toast.action || toast.closable" class="toast-actions">
          <button
            v-if="toast.action"
            class="toast-action"
            type="button"
            @click.stop="handleAction(toast)"
          >
            {{ toast.action.label }}
          </button>
          <button
            v-if="toast.closable"
            class="toast-close"
            aria-label="Close notification"
            type="button"
            @click.stop="removeToast(toast.id)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Progress bar -->
        <div
          v-if="toast.duration && toast.showProgress"
          class="toast-progress"
          :style="{ '--progress': getProgress(toast.id) }"
        />
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
type ToastType = 'info' | 'success' | 'warning' | 'error'
type ToastPosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'

interface ToastAction {
  label: string
  action: () => void
}

interface Toast {
  id: string
  type?: ToastType
  title?: string
  description?: string
  icon?: any
  duration?: number
  closable?: boolean
  action?: ToastAction
  showProgress?: boolean
  position?: ToastPosition
  onClick?: () => void
}

interface ToastTimer {
  startTime: number
  pausedTime?: number
  remainingTime: number
  intervalId?: number
}

interface Props {
  position?: ToastPosition
  maxToasts?: number
  duration?: number
  closable?: boolean
  showProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  maxToasts: 5,
  duration: 5000,
  closable: true,
  showProgress: true
})

// Toast state
const toasts = ref<Toast[]>([])
const timers = ref<Map<string, ToastTimer>>(new Map())
const progress = ref<Map<string, number>>(new Map())

// Visible toasts (limited by maxToasts)
const visibleToasts = computed(() => {
  return toasts.value.slice(0, props.maxToasts)
})

// Default icons for toast types
const getDefaultIcon = (type?: ToastType) => {
  const icons = {
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    success:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    warning:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    error:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
  }
  return type ? icons[type] : null
}

// Toast classes
const toastClasses = (toast: Toast) => ({
  [`toast-${toast.type || 'info'}`]: true,
  'toast-clickable': !!toast.onClick
})

// Progress tracking
const getProgress = (id: string) => {
  return progress.value.get(id) || 0
}

// Add toast
const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substr(2, 9)
  const newToast: Toast = {
    id,
    type: 'info',
    closable: props.closable,
    duration: props.duration,
    showProgress: props.showProgress,
    position: props.position,
    ...toast
  }

  toasts.value.unshift(newToast)

  // Start timer if duration is set
  if (newToast.duration && newToast.duration > 0) {
    startTimer(id, newToast.duration)
  }

  return id
}

// Remove toast
const removeToast = (id: string) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
    clearTimer(id)
  }
}

// Timer management
const startTimer = (id: string, duration: number) => {
  const timer: ToastTimer = {
    startTime: Date.now(),
    remainingTime: duration
  }

  timer.intervalId = window.setInterval(() => {
    const elapsed = Date.now() - timer.startTime
    const remaining = Math.max(0, duration - elapsed)
    progress.value.set(id, (duration - remaining) / duration)

    if (remaining === 0) {
      removeToast(id)
    }
  }, 50)

  timers.value.set(id, timer)
}

const pauseTimer = (id: string) => {
  const timer = timers.value.get(id)
  if (timer && timer.intervalId) {
    timer.pausedTime = Date.now()
    timer.remainingTime = timer.remainingTime - (timer.pausedTime - timer.startTime)
    window.clearInterval(timer.intervalId)
    timer.intervalId = undefined
  }
}

const resumeTimer = (id: string) => {
  const timer = timers.value.get(id)
  if (timer && !timer.intervalId && timer.remainingTime > 0) {
    timer.startTime = Date.now()
    startTimer(id, timer.remainingTime)
  }
}

const clearTimer = (id: string) => {
  const timer = timers.value.get(id)
  if (timer && timer.intervalId) {
    window.clearInterval(timer.intervalId)
  }
  timers.value.delete(id)
  progress.value.delete(id)
}

// Handle toast click
const handleToastClick = (toast: Toast) => {
  if (toast.onClick) {
    toast.onClick()
    removeToast(toast.id)
  }
}

// Handle action click
const handleAction = (toast: Toast) => {
  if (toast.action) {
    toast.action.action()
    removeToast(toast.id)
  }
}

// Expose methods for use via composable
defineExpose({
  show: addToast,
  remove: removeToast,
  clear: () => {
    toasts.value = []
    timers.value.forEach((_, id) => clearTimer(id))
  }
})
</script>

<style scoped>
/* Container */
.toast-container {
  position: fixed;
  z-index: var(--z-index-toast);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  pointer-events: none;
  padding: var(--spacing-lg);
}

.toast-container > * {
  pointer-events: auto;
}

/* Position variants */
.toast-container-top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast-container-top-left {
  top: 0;
  left: 0;
}

.toast-container-top-right {
  top: 0;
  right: 0;
}

.toast-container-bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast-container-bottom-left {
  bottom: 0;
  left: 0;
}

.toast-container-bottom-right {
  bottom: 0;
  right: 0;
}

/* Toast */
.toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  min-width: 300px;
  max-width: 500px;
  padding: var(--spacing-md);
  background-color: var(--surface-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all var(--transition-fast) var(--easing-standard);
}

.toast-clickable {
  cursor: pointer;
}

.toast-clickable:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-xl);
}

/* Type variants */
.toast-info {
  border-left: 4px solid var(--info-color);
}

.toast-success {
  border-left: 4px solid var(--success-color);
}

.toast-warning {
  border-left: 4px solid var(--warning-color);
}

.toast-error {
  border-left: 4px solid var(--error-color);
}

/* Icon */
.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-info .toast-icon {
  color: var(--info-color);
}

.toast-success .toast-icon {
  color: var(--success-color);
}

.toast-warning .toast-icon {
  color: var(--warning-color);
}

.toast-error .toast-icon {
  color: var(--error-color);
}

/* Content */
.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-xs);
  color: var(--text-primary);
}

.toast-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* Actions */
.toast-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.toast-action {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: none;
  border: none;
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast) var(--easing-standard);
}

.toast-action:hover {
  background-color: var(--surface-default);
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast) var(--easing-standard);
}

.toast-close:hover {
  background-color: var(--surface-default);
  color: var(--text-primary);
}

/* Progress bar */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--border-default);
  overflow: hidden;
}

.toast-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: currentColor;
  transform: scaleX(var(--progress));
  transform-origin: left;
  transition: transform 0.05s linear;
}

/* Transitions */
.toast-enter-active {
  transition: all var(--transition-fast) var(--easing-decelerate);
}

.toast-leave-active {
  transition: all var(--transition-fast) var(--easing-accelerate);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-container-top .toast-enter-from,
.toast-container-top .toast-leave-to,
.toast-container-top-left .toast-enter-from,
.toast-container-top-left .toast-leave-to,
.toast-container-top-right .toast-enter-from,
.toast-container-top-right .toast-leave-to {
  transform: translateY(-100%);
}

.toast-container-bottom .toast-enter-from,
.toast-container-bottom .toast-leave-to,
.toast-container-bottom-left .toast-enter-from,
.toast-container-bottom-left .toast-leave-to,
.toast-container-bottom-right .toast-enter-from,
.toast-container-bottom-right .toast-leave-to {
  transform: translateY(100%);
}

/* Dark mode */
.dark-mode .toast {
  background-color: var(--surface-card);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .toast-container {
    padding: var(--spacing-md);
  }

  .toast {
    min-width: 250px;
    max-width: calc(100vw - var(--spacing-xl));
  }
}

/* Safe area */
.toast-container-bottom,
.toast-container-bottom-left,
.toast-container-bottom-right {
  padding-bottom: max(var(--spacing-lg), var(--safe-area-inset-bottom));
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: opacity var(--transition-fast) var(--easing-standard);
  }

  .toast-enter-from,
  .toast-leave-to {
    transform: none;
  }
}
</style>
