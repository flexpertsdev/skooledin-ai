<template>
  <div class="password-field">
    <div class="password-field-wrapper">
      <input
        :id="id"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :minlength="minLength"
        :autocomplete="autocomplete"
        class="password-field-input"
        :class="{ 'password-field-input--error': error }"
        @input="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <button
        type="button"
        @click="togglePassword"
        class="password-field-toggle"
        :disabled="disabled"
      >
        <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" />
      </button>
    </div>
    <div v-if="showStrength && password" class="password-strength">
      <div class="password-strength-bar">
        <div
          class="password-strength-fill"
          :class="`password-strength-fill--${strength.level}`"
          :style="{ width: `${strength.score * 25}%` }"
        />
      </div>
      <span class="password-strength-label">{{ strength.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  id?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: boolean
  minLength?: number
  showStrength?: boolean
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter password',
  minLength: 8,
  showStrength: false,
  autocomplete: 'current-password'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const showPassword = ref(false)
const password = ref(props.modelValue)

const strength = computed(() => {
  const pwd = password.value
  let score = 0
  
  if (!pwd) return { score: 0, level: 'weak', label: 'Too weak' }
  
  // Length
  if (pwd.length >= 8) score++
  if (pwd.length >= 12) score++
  
  // Character variety
  if (/[a-z]/.test(pwd)) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  
  // Adjust score to 0-4 range
  score = Math.min(4, Math.floor(score * 0.67))
  
  const levels = [
    { score: 0, level: 'weak', label: 'Too weak' },
    { score: 1, level: 'weak', label: 'Weak' },
    { score: 2, level: 'fair', label: 'Fair' },
    { score: 3, level: 'good', label: 'Good' },
    { score: 4, level: 'strong', label: 'Strong' }
  ]
  
  return levels[score]
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  password.value = target.value
  emit('update:modelValue', target.value)
}

watch(() => props.modelValue, (newValue) => {
  password.value = newValue
})
</script>

<style scoped>
.password-field {
  @apply space-y-2;
}

.password-field-wrapper {
  @apply relative;
}

.password-field-input {
  @apply w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-300
         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
         text-base text-gray-900 placeholder-gray-400
         transition-colors duration-200;
}

.password-field-input--error {
  @apply border-red-500 focus:border-red-500 focus:ring-red-500/20;
}

.password-field-toggle {
  @apply absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400
         hover:text-gray-600 transition-colors;
}

.password-field-toggle:disabled {
  @apply cursor-not-allowed opacity-50;
}

/* Password strength indicator */
.password-strength {
  @apply space-y-1;
}

.password-strength-bar {
  @apply h-1 bg-gray-200 rounded-full overflow-hidden;
}

.password-strength-fill {
  @apply h-full transition-all duration-300;
}

.password-strength-fill--weak {
  @apply bg-red-500;
}

.password-strength-fill--fair {
  @apply bg-yellow-500;
}

.password-strength-fill--good {
  @apply bg-blue-500;
}

.password-strength-fill--strong {
  @apply bg-green-500;
}

.password-strength-label {
  @apply text-xs font-medium;
}

.password-strength-fill--weak + .password-strength-label {
  @apply text-red-600;
}

.password-strength-fill--fair + .password-strength-label {
  @apply text-yellow-600;
}

.password-strength-fill--good + .password-strength-label {
  @apply text-blue-600;
}

.password-strength-fill--strong + .password-strength-label {
  @apply text-green-600;
}
</style>