<template>
  <div class="loading-spinner" :class="[`loading-spinner--${size}`, `loading-spinner--${variant}`]">
    <div class="spinner" :style="{ width: spinnerSize, height: spinnerSize }">
      <svg viewBox="0 0 50 50" class="spinner-svg">
        <circle class="spinner-track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle
          class="spinner-path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
    </div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white' | 'current'
  text?: string
  progress?: number
}

const props = withDefaults(defineProps<LoadingSpinnerProps>(), {
  size: 'md',
  variant: 'primary'
})

const spinnerSize = computed(() => {
  const sizes = {
    xs: '16px',
    sm: '24px',
    md: '32px',
    lg: '48px',
    xl: '64px'
  }
  return sizes[props.size]
})

const dashArray = computed(() => {
  const circumference = 2 * Math.PI * 20
  return circumference
})

const dashOffset = computed(() => {
  if (props.progress !== undefined) {
    const circumference = 2 * Math.PI * 20
    return circumference - (props.progress / 100) * circumference
  }
  return 0
})
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.spinner {
  position: relative;
  display: inline-block;
}

.spinner-svg {
  width: 100%;
  height: 100%;
  animation: rotate 2s linear infinite;
}

.spinner-track {
  stroke: var(--surface-elevated);
}

.spinner-path {
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

/* Variants */
.loading-spinner--primary .spinner-path {
  stroke: var(--primary-color);
}

.loading-spinner--secondary .spinner-path {
  stroke: var(--secondary-color);
}

.loading-spinner--white .spinner-path {
  stroke: white;
}

.loading-spinner--current .spinner-path {
  stroke: currentColor;
}

/* Loading text */
.loading-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
  margin: 0;
}

/* Animations */
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

/* Progress mode - no animation */
.loading-spinner[data-progress] .spinner-svg {
  animation: none;
  transform: rotate(-90deg);
}

.loading-spinner[data-progress] .spinner-path {
  animation: none;
  transition: stroke-dashoffset 0.3s ease;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .spinner-svg,
  .spinner-path {
    animation: none;
  }
}
</style>
