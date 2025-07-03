<template>
  <div class="error-boundary" :class="`error-boundary--${variant}`">
    <div class="error-icon">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    
    <h3 class="error-title">{{ title || 'Oops! Something went wrong' }}</h3>
    
    <p class="error-message">{{ message || error?.message || 'An unexpected error occurred' }}</p>
    
    <div v-if="showDetails && error" class="error-details">
      <details>
        <summary>Error details</summary>
        <pre>{{ error.stack || error }}</pre>
      </details>
    </div>
    
    <div class="error-actions">
      <button v-if="onRetry" @click="handleRetry" class="error-button error-button--primary">
        {{ retryText || 'Try Again' }}
      </button>
      <button v-if="onReset" @click="handleReset" class="error-button error-button--secondary">
        {{ resetText || 'Reset' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorBoundaryProps {
  error?: Error | null
  title?: string
  message?: string
  variant?: 'inline' | 'full' | 'minimal'
  showDetails?: boolean
  onRetry?: () => void
  onReset?: () => void
  retryText?: string
  resetText?: string
}

const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  variant: 'inline',
  showDetails: false
})

const handleRetry = () => {
  props.onRetry?.()
}

const handleReset = () => {
  props.onReset?.()
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl);
  min-height: 200px;
}

/* Variants */
.error-boundary--full {
  min-height: 100vh;
  background: var(--surface-default);
}

.error-boundary--minimal {
  padding: var(--spacing-lg);
  min-height: 100px;
}

.error-boundary--minimal .error-icon {
  width: 32px;
  height: 32px;
}

.error-boundary--minimal .error-title {
  font-size: var(--font-size-base);
}

/* Icon */
.error-icon {
  color: var(--color-error);
  margin-bottom: var(--spacing-lg);
  animation: pulse 2s ease-in-out infinite;
}

/* Content */
.error-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.error-message {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-lg) 0;
  max-width: 500px;
}

/* Error details */
.error-details {
  width: 100%;
  max-width: 600px;
  margin-bottom: var(--spacing-lg);
  text-align: left;
}

.error-details summary {
  cursor: pointer;
  padding: var(--spacing-sm);
  background: var(--surface-elevated);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.error-details pre {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--surface-elevated);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: var(--text-secondary);
}

/* Actions */
.error-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

.error-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
  border: 2px solid transparent;
}

.error-button--primary {
  background: var(--primary-color);
  color: var(--color-primary-contrast);
}

.error-button--primary:hover {
  background: var(--color-primary-600);
  transform: translateY(-1px);
}

.error-button--secondary {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--border-default);
}

.error-button--secondary:hover {
  background: var(--surface-hover);
  border-color: var(--border-strong);
}

/* Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Dark mode */
.dark-mode .error-details summary,
.dark-mode .error-details pre {
  background: var(--surface-card);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .error-icon {
    animation: none;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .error-boundary {
    padding: var(--spacing-lg);
  }
  
  .error-boundary--full {
    padding: var(--spacing-xl);
  }
  
  .error-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .error-button {
    width: 100%;
  }
}
</style>