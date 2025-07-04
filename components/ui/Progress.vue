<template>
  <div class="progress-wrapper">
    <div v-if="label || showValue" class="progress-header">
      <span v-if="label" class="progress-label">{{ label }}</span>
      <span v-if="showValue" class="progress-value">{{ displayValue }}</span>
    </div>
    
    <div v-if="variant === 'linear'" class="progress-linear">
      <div
        class="progress-linear-fill"
        :class="colorClass"
        :style="{ width: `${clampedValue}%` }"
      />
    </div>
    
    <div v-else class="progress-circular" :class="sizeClass">
      <svg class="progress-circular-svg" viewBox="0 0 36 36">
        <circle
          class="progress-circular-track"
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke-width="2"
        />
        <circle
          class="progress-circular-fill"
          :class="colorClass"
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke-width="2"
          :stroke-dasharray="`${circumference} ${circumference}`"
          :stroke-dashoffset="strokeDashoffset"
        />
      </svg>
      <div v-if="showValue" class="progress-circular-value">
        {{ Math.round(clampedValue) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number
  max?: number
  label?: string
  variant?: 'linear' | 'circular'
  color?: 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showValue?: boolean
  valueFormat?: 'percent' | 'fraction'
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  variant: 'linear',
  color: 'primary',
  size: 'md',
  showValue: false,
  valueFormat: 'percent'
})

const clampedValue = computed(() => {
  const percentage = (props.value / props.max) * 100
  return Math.max(0, Math.min(100, percentage))
})

const displayValue = computed(() => {
  if (props.valueFormat === 'fraction') {
    return `${props.value} / ${props.max}`
  }
  return `${Math.round(clampedValue.value)}%`
})

const colorClass = computed(() => `progress--${props.color}`)
const sizeClass = computed(() => `progress-circular--${props.size}`)

// For circular progress
const circumference = 2 * Math.PI * 16 // radius = 16
const strokeDashoffset = computed(() => {
  return circumference * (1 - clampedValue.value / 100)
})
</script>

<style scoped>
.progress-wrapper {
  @apply space-y-2;
}

.progress-header {
  @apply flex items-center justify-between text-sm;
}

.progress-label {
  @apply font-medium text-gray-700;
}

.progress-value {
  @apply text-gray-600;
}

/* Linear Progress */
.progress-linear {
  @apply relative h-2 bg-gray-200 rounded-full overflow-hidden;
}

.progress-linear-fill {
  @apply absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out;
}

/* Circular Progress */
.progress-circular {
  @apply relative inline-flex;
}

.progress-circular--sm {
  @apply w-8 h-8;
}

.progress-circular--md {
  @apply w-12 h-12;
}

.progress-circular--lg {
  @apply w-16 h-16;
}

.progress-circular--xl {
  @apply w-20 h-20;
}

.progress-circular-svg {
  @apply transform -rotate-90;
}

.progress-circular-track {
  @apply stroke-gray-200;
}

.progress-circular-fill {
  @apply transition-all duration-300 ease-out;
  stroke-linecap: round;
}

.progress-circular-value {
  @apply absolute inset-0 flex items-center justify-center text-xs font-medium;
}

/* Colors */
.progress--primary {
  @apply bg-primary-600 stroke-primary-600;
}

.progress--success {
  @apply bg-green-600 stroke-green-600;
}

.progress--warning {
  @apply bg-yellow-600 stroke-yellow-600;
}

.progress--error {
  @apply bg-red-600 stroke-red-600;
}
</style>