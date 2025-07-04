<template>
  <div class="form-field" :class="{ 'form-field--error': error }">
    <label v-if="label" :for="id" class="form-field-label">
      {{ label }}
      <span v-if="required" class="form-field-required">*</span>
    </label>
    <div class="form-field-input">
      <slot />
    </div>
    <p v-if="error" class="form-field-error">
      <Icon name="heroicons:exclamation-circle" class="form-field-error-icon" />
      {{ error }}
    </p>
    <p v-else-if="hint" class="form-field-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  error?: string
  hint?: string
  required?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.form-field {
  @apply space-y-1.5;
}

.form-field-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-field-required {
  @apply text-red-500 ml-0.5;
}

.form-field-input {
  @apply relative;
}

.form-field-error {
  @apply flex items-center gap-1 text-sm text-red-600;
}

.form-field-error-icon {
  @apply w-4 h-4;
}

.form-field-hint {
  @apply text-sm text-gray-500;
}

/* Error state styles for nested inputs */
.form-field--error :deep(input),
.form-field--error :deep(textarea),
.form-field--error :deep(select) {
  @apply border-red-500 focus:border-red-500 focus:ring-red-500/20;
}
</style>