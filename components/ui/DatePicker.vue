<template>
  <div class="datepicker-wrapper">
    <label v-if="label" class="datepicker-label">{{ label }}</label>
    <input
      type="date"
      v-model="dateValue"
      :min="min"
      :max="max"
      :disabled="disabled"
      :required="required"
      class="datepicker-input"
      :class="{ 'datepicker-input--disabled': disabled }"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | Date
  label?: string
  min?: string
  max?: string
  disabled?: boolean
  required?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const dateValue = computed({
  get: () => {
    if (!props.modelValue) return ''
    if (props.modelValue instanceof Date) {
      return props.modelValue.toISOString().split('T')[0]
    }
    return props.modelValue
  },
  set: (value) => emit('update:modelValue', value)
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.datepicker-wrapper {
  @apply space-y-1;
}

.datepicker-label {
  @apply block text-sm font-medium text-gray-700;
}

.datepicker-input {
  @apply w-full px-4 py-2.5 rounded-lg border border-gray-300
         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
         text-base text-gray-900 placeholder-gray-400
         transition-colors duration-200;
}

.datepicker-input--disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}

/* Custom calendar icon styling */
.datepicker-input::-webkit-calendar-picker-indicator {
  @apply cursor-pointer opacity-60 hover:opacity-100 transition-opacity;
}
</style>