<template>
  <div class="slider-wrapper">
    <div v-if="label" class="slider-label">{{ label }}</div>
    <div class="slider-container">
      <input
        type="range"
        v-model.number="value"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        class="slider"
        :class="{ 'slider--disabled': disabled }"
        @input="handleInput"
      />
      <div v-if="showValue" class="slider-value">{{ value }}</div>
    </div>
    <div v-if="showMinMax" class="slider-bounds">
      <span class="slider-min">{{ min }}</span>
      <span class="slider-max">{{ max }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
  label?: string
  disabled?: boolean
  showValue?: boolean
  showMinMax?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  showValue: true,
  showMinMax: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}
</script>

<style scoped>
.slider-wrapper {
  @apply space-y-2;
}

.slider-label {
  @apply text-sm font-medium text-gray-700;
}

.slider-container {
  @apply flex items-center gap-4;
}

.slider {
  @apply flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer;
  background-image: linear-gradient(to right, theme('colors.primary.600') var(--value-percent), transparent var(--value-percent));
  --value-percent: calc((var(--value) - var(--min)) / (var(--max) - var(--min)) * 100%);
}

.slider::-webkit-slider-thumb {
  @apply appearance-none w-5 h-5 bg-primary-600 rounded-full cursor-pointer
         shadow-md transition-transform hover:scale-110;
}

.slider::-moz-range-thumb {
  @apply w-5 h-5 bg-primary-600 rounded-full cursor-pointer border-0
         shadow-md transition-transform hover:scale-110;
}

.slider--disabled {
  @apply cursor-not-allowed opacity-50;
}

.slider--disabled::-webkit-slider-thumb {
  @apply cursor-not-allowed hover:scale-100;
}

.slider-value {
  @apply min-w-[3rem] text-sm font-medium text-gray-900 text-center;
}

.slider-bounds {
  @apply flex justify-between text-xs text-gray-500;
}
</style>