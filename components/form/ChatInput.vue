<template>
  <div 
    :class="classes"
    :style="cssVars"
  >
    <!-- Main input container -->
    <div class="chat-input-container">
      <!-- Left slot (e.g., attachments) -->
      <div v-if="$slots.left" class="chat-input-left">
        <slot name="left" />
      </div>
      
      <!-- Input wrapper -->
      <div class="chat-input-wrapper">
        <!-- Growing textarea -->
        <textarea
          ref="textareaRef"
          v-model="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxLength"
          :rows="minRows"
          :style="{ height: textareaHeight }"
          class="chat-input-textarea"
          @input="handleInput"
          @keydown="handleKeyDown"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        
        <!-- Character counter -->
        <div 
          v-if="showCounter && maxLength"
          class="chat-input-counter"
          :class="{ 'is-exceeded': characterCount > maxLength }"
        >
          {{ characterCount }}/{{ maxLength }}
        </div>
        
        <!-- Typing indicator -->
        <transition name="fade">
          <div v-if="showTypingIndicator && isTyping" class="chat-input-typing">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </transition>
      </div>
      
      <!-- Right actions -->
      <div class="chat-input-actions">
        <!-- Voice button -->
        <button
          v-if="enableVoice"
          type="button"
          class="chat-input-btn voice-btn"
          :class="{ 'is-recording': isRecording }"
          :disabled="disabled"
          @click="toggleVoiceRecording"
        >
          <svg v-if="!isRecording" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h12v12H6z"/>
          </svg>
        </button>
        
        <!-- Send button -->
        <button
          type="button"
          class="chat-input-btn send-btn"
          :class="{ 'can-send': canSend }"
          :disabled="!canSend || disabled"
          @click="handleSend"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
        
        <!-- Custom action slot -->
        <slot name="action" />
      </div>
    </div>
    
    <!-- Bottom toolbar -->
    <div v-if="$slots.toolbar" class="chat-input-toolbar">
      <slot name="toolbar" />
    </div>
    
    <!-- Suggestions -->
    <transition name="slide-up">
      <div v-if="showSuggestions && suggestions.length > 0" class="chat-input-suggestions">
        <button
          v-for="(suggestion, index) in suggestions"
          :key="index"
          type="button"
          class="suggestion-chip"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useVModel, useTextareaAutosize, useDebounceFn } from '@vueuse/core'

// Props
interface ChatInputProps {
  modelValue?: string
  placeholder?: string
  minRows?: number
  maxRows?: number
  maxLength?: number
  disabled?: boolean
  readonly?: boolean
  autoResize?: boolean
  showCounter?: boolean
  showTypingIndicator?: boolean
  enableVoice?: boolean
  suggestions?: string[]
  showSuggestions?: boolean
  sendOnEnter?: boolean
  variant?: 'default' | 'minimal' | 'rounded' | 'floating'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<ChatInputProps>(), {
  modelValue: '',
  placeholder: 'Type a message...',
  minRows: 1,
  maxRows: 5,
  disabled: false,
  readonly: false,
  autoResize: true,
  showCounter: false,
  showTypingIndicator: false,
  enableVoice: false,
  suggestions: () => [],
  showSuggestions: false,
  sendOnEnter: true,
  variant: 'default',
  size: 'md'
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'voice-start': []
  'voice-end': []
  'typing': [isTyping: boolean]
}>()

// Refs
const textareaRef = ref<HTMLTextAreaElement>()
const modelValue = useVModel(props, 'modelValue', emit)
const isFocused = ref(false)
const isTyping = ref(false)
const isRecording = ref(false)
const typingTimer = ref<NodeJS.Timeout>()

// Auto-resize textarea
const { textarea, triggerResize } = useTextareaAutosize({
  element: textareaRef,
  input: modelValue,
  styleProp: 'minHeight'
})

// Computed
const characterCount = computed(() => modelValue.value.length)

const canSend = computed(() => {
  return modelValue.value.trim().length > 0
})

const textareaHeight = computed(() => {
  if (!props.autoResize) return 'auto'
  
  const lineHeight = 24 // Approximate line height
  const padding = 16 // Top + bottom padding
  const minHeight = props.minRows * lineHeight + padding
  const maxHeight = props.maxRows * lineHeight + padding
  
  return `${Math.min(Math.max(minHeight, textarea.value?.scrollHeight || minHeight), maxHeight)}px`
})

const classes = computed(() => [
  'chat-input',
  `chat-input--${props.variant}`,
  `chat-input--${props.size}`,
  {
    'is-focused': isFocused.value,
    'is-disabled': props.disabled,
    'is-readonly': props.readonly,
    'has-value': modelValue.value.length > 0,
    'is-recording': isRecording.value
  }
])

const cssVars = computed(() => ({
  '--chat-input-min-rows': props.minRows,
  '--chat-input-max-rows': props.maxRows
}))

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  modelValue.value = target.value
  
  if (props.autoResize) {
    nextTick(() => {
      triggerResize()
    })
  }
  
  // Handle typing indicator
  if (props.showTypingIndicator) {
    handleTypingIndicator()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Send on Enter (without Shift)
  if (props.sendOnEnter && event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleSend = () => {
  if (!canSend.value) return
  
  const message = modelValue.value.trim()
  emit('send', message)
  modelValue.value = ''
  
  // Reset height
  if (props.autoResize) {
    nextTick(() => {
      triggerResize()
    })
  }
}

const selectSuggestion = (suggestion: string) => {
  modelValue.value = suggestion
  handleSend()
}

const toggleVoiceRecording = () => {
  isRecording.value = !isRecording.value
  
  if (isRecording.value) {
    emit('voice-start')
  } else {
    emit('voice-end')
  }
}

// Typing indicator logic
const handleTypingIndicator = useDebounceFn(() => {
  isTyping.value = true
  emit('typing', true)
  
  // Clear previous timer
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
  }
  
  // Stop typing after 2 seconds of inactivity
  typingTimer.value = setTimeout(() => {
    isTyping.value = false
    emit('typing', false)
  }, 2000)
}, 300)

// Focus method
const focus = () => {
  textareaRef.value?.focus()
}

// Blur method
const blur = () => {
  textareaRef.value?.blur()
}

// Lifecycle
onMounted(() => {
  if (props.autoResize) {
    triggerResize()
  }
})

onUnmounted(() => {
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
  }
})

// Expose methods
defineExpose({
  focus,
  blur
})
</script>

<style scoped>
.chat-input {
  --input-bg: var(--color-surface);
  --input-border: var(--color-border);
  --input-text: var(--color-text);
  --input-placeholder: var(--color-text-secondary);
  --input-focus: var(--color-primary);
  --btn-bg: var(--color-primary);
  --btn-text: var(--color-primary-contrast);
  --counter-text: var(--color-text-tertiary);
  --suggestion-bg: var(--color-surface-elevated);
  --suggestion-text: var(--color-text);
  
  position: relative;
  width: 100%;
}

/* Container */
.chat-input-container {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-lg);
  transition: all 0.2s var(--ease-out);
}

.chat-input--minimal .chat-input-container {
  border: none;
  background: transparent;
  padding: 0;
}

.chat-input--rounded .chat-input-container {
  border-radius: var(--radius-full);
}

.chat-input--floating .chat-input-container {
  box-shadow: var(--shadow-lg);
  border: none;
}

.chat-input.is-focused .chat-input-container {
  border-color: var(--input-focus);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}

/* Size variants */
.chat-input--sm .chat-input-container {
  padding: var(--spacing-xs);
  font-size: var(--font-size-sm);
}

.chat-input--lg .chat-input-container {
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
}

/* Input wrapper */
.chat-input-wrapper {
  flex: 1;
  position: relative;
  min-width: 0;
}

/* Textarea */
.chat-input-textarea {
  width: 100%;
  min-height: 1.5em;
  padding: 0;
  background: transparent;
  border: none;
  color: var(--input-text);
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  resize: none;
  outline: none;
  overflow-y: auto;
  scrollbar-width: thin;
}

.chat-input-textarea::placeholder {
  color: var(--input-placeholder);
}

.chat-input-textarea::-webkit-scrollbar {
  width: 4px;
}

.chat-input-textarea::-webkit-scrollbar-track {
  background: transparent;
}

.chat-input-textarea::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 2px;
}

/* Character counter */
.chat-input-counter {
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: var(--font-size-xs);
  color: var(--counter-text);
  transition: color 0.2s;
}

.chat-input-counter.is-exceeded {
  color: var(--color-error);
}

/* Typing indicator */
.chat-input-typing {
  position: absolute;
  bottom: -24px;
  left: 0;
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  background: var(--color-surface-elevated);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: var(--color-text-secondary);
  border-radius: 50%;
  animation: typing-bounce 1.4s infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing-bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* Actions */
.chat-input-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.chat-input-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.chat-input-btn:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.chat-input-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-input-btn svg {
  width: 20px;
  height: 20px;
}

/* Send button */
.send-btn.can-send {
  background: var(--btn-bg);
  color: var(--btn-text);
}

.send-btn.can-send:hover {
  transform: scale(1.05);
}

/* Voice button */
.voice-btn.is-recording {
  background: var(--color-error);
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--color-error-rgb), 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--color-error-rgb), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--color-error-rgb), 0);
  }
}

/* Toolbar */
.chat-input-toolbar {
  padding: var(--spacing-xs) 0;
  border-top: 1px solid var(--input-border);
}

/* Suggestions */
.chat-input-suggestions {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: var(--spacing-xs);
  padding: var(--spacing-xs);
  background: var(--suggestion-bg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: auto;
}

.suggestion-chip {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-primary-alpha);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.suggestion-chip:hover {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s var(--ease-out);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Dark mode adjustments */
:root.dark .chat-input {
  --input-bg: var(--color-surface);
  --input-border: var(--color-border);
}
</style>