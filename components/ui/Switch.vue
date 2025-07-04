<template>
  <label class="switch-wrapper" :class="{ 'switch-wrapper--disabled': disabled }">
    <input
      type="checkbox"
      v-model="checked"
      :disabled="disabled"
      class="switch-input"
      @change="$emit('update:modelValue', checked)"
    />
    <span class="switch-track">
      <span class="switch-thumb" />
    </span>
    <span v-if="label" class="switch-label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style scoped>
.switch-wrapper {
  @apply inline-flex items-center gap-3 cursor-pointer;
}

.switch-wrapper--disabled {
  @apply cursor-not-allowed opacity-50;
}

.switch-input {
  @apply sr-only;
}

.switch-track {
  @apply relative inline-flex h-6 w-11 items-center rounded-full
         bg-gray-200 transition-colors duration-200;
}

.switch-input:checked ~ .switch-track {
  @apply bg-primary-600;
}

.switch-thumb {
  @apply absolute left-0 inline-block h-5 w-5 transform rounded-full
         bg-white shadow-sm transition-transform duration-200
         translate-x-0.5;
}

.switch-input:checked ~ .switch-track .switch-thumb {
  @apply translate-x-5.5;
}

.switch-label {
  @apply text-sm font-medium text-gray-700;
}

.switch-wrapper--disabled .switch-label {
  @apply text-gray-400;
}
</style>