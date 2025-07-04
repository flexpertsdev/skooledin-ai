<template>
  <div class="timepicker-wrapper">
    <label v-if="label" class="timepicker-label">{{ label }}</label>
    <input
      type="time"
      v-model="timeValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :required="required"
      class="timepicker-input"
      :class="{ 'timepicker-input--disabled': disabled }"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  min?: string
  max?: string
  step?: number
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  step: 60 // Default to 1 minute intervals
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const timeValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.timepicker-wrapper {
  @apply space-y-1;
}

.timepicker-label {
  @apply block text-sm font-medium text-gray-700;
}

.timepicker-input {
  @apply w-full px-4 py-2.5 rounded-lg border border-gray-300
         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
         text-base text-gray-900 placeholder-gray-400
         transition-colors duration-200;
}

.timepicker-input--disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}

/* Custom time picker styling */
.timepicker-input::-webkit-calendar-picker-indicator {
  @apply cursor-pointer opacity-60 hover:opacity-100 transition-opacity;
}
</style>