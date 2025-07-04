<template>
  <div class="textarea-wrapper">
    <textarea
      :id="id"
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxLength"
      class="textarea"
      :class="{
        'textarea--error': error,
        'textarea--disabled': disabled,
        'textarea--auto-resize': autoResize
      }"
      @input="handleInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <div v-if="showCount && maxLength" class="textarea-count">
      {{ modelValue?.length || 0 }} / {{ maxLength }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  id?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  rows?: number
  maxLength?: number
  showCount?: boolean
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  showCount: true,
  autoResize: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  
  if (props.autoResize) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 'px'
  }
}
</script>

<style scoped>
.textarea-wrapper {
  position: relative;
}

.textarea {
  @apply w-full px-4 py-3 rounded-lg border border-gray-300 
         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
         text-base text-gray-900 placeholder-gray-400
         transition-colors duration-200 resize-none;
}

.textarea--error {
  @apply border-red-500 focus:border-red-500 focus:ring-red-500/20;
}

.textarea--disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}

.textarea--auto-resize {
  @apply overflow-hidden;
}

.textarea-count {
  @apply absolute bottom-2 right-2 text-xs text-gray-400;
}
</style>