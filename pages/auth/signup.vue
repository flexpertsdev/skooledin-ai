<template>
  <div class="signup-page">
    <LayoutContainer class="signup-container">
      <div class="signup-box">
        <div class="signup-header">
          <Icon name="mdi:school" class="signup-logo" />
          <h1 class="signup-title">Create Your Account</h1>
          <p class="signup-subtitle">Start your learning journey today</p>
        </div>

        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="role-selection">
            <p class="role-label">I am a...</p>
            <div class="role-options">
              <label
                v-for="role in roles"
                :key="role.value"
                class="role-option"
                :class="{ 'role-option--selected': formData.role === role.value }"
              >
                <input
                  v-model="formData.role"
                  type="radio"
                  :value="role.value"
                  class="role-input"
                />
                <Icon :name="role.icon" class="role-icon" />
                <span class="role-name">{{ role.label }}</span>
              </label>
            </div>
            <p v-if="errors.role" class="role-error">{{ errors.role }}</p>
          </div>

          <FormField 
            label="Full Name" 
            :error="errors.name"
            required
          >
            <Input
              v-model="formData.name"
              type="text"
              placeholder="Enter your full name"
              :error="!!errors.name"
              @blur="validateName"
            />
          </FormField>

          <FormField 
            label="Email" 
            :error="errors.email"
            required
          >
            <Input
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
              :error="!!errors.email"
              @blur="validateEmail"
            />
          </FormField>

          <FormField 
            label="Password" 
            :error="errors.password"
            hint="At least 8 characters"
            required
          >
            <PasswordField
              v-model="formData.password"
              placeholder="Create a password"
              :error="!!errors.password"
              show-strength
              autocomplete="new-password"
              @blur="validatePassword"
            />
          </FormField>

          <div class="terms-section">
            <label class="terms-label">
              <input
                v-model="formData.acceptTerms"
                type="checkbox"
                class="terms-checkbox"
              />
              <span>
                I agree to the
                <a href="/terms" target="_blank" class="terms-link">Terms of Service</a>
                and
                <a href="/privacy" target="_blank" class="terms-link">Privacy Policy</a>
              </span>
            </label>
            <p v-if="errors.terms" class="terms-error">{{ errors.terms }}</p>
          </div>

          <Alert v-if="error" variant="error" dismissible @dismiss="error = ''">
            {{ error }}
          </Alert>

          <Button
            type="submit"
            :loading="loading"
            :disabled="!isFormValid"
            class="signup-button"
          >
            Create Account
          </Button>
        </form>

        <div class="signup-divider">
          <span>or sign up with</span>
        </div>

        <div class="signup-oauth">
          <button
            type="button"
            @click="handleGoogleSignup"
            :disabled="loading"
            class="oauth-button"
          >
            <Icon name="logos:google-icon" />
            <span>Continue with Google</span>
          </button>
        </div>

        <p class="signup-footer">
          Already have an account?
          <NuxtLink to="/auth/login" class="signup-link">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
import { firebaseAuth } from '~/services/firebase'
import type { UserRole } from '~/stores/auth'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

const roles = [
  { value: 'student', label: 'Student', icon: 'heroicons:academic-cap' },
  { value: 'teacher', label: 'Teacher', icon: 'heroicons:user-group' },
  { value: 'parent', label: 'Parent', icon: 'heroicons:users' }
] as const

const loading = ref(false)
const error = ref('')
const formData = reactive({
  role: '' as UserRole | '',
  name: '',
  email: '',
  password: '',
  acceptTerms: false
})

const errors = reactive({
  role: '',
  name: '',
  email: '',
  password: '',
  terms: ''
})

const isFormValid = computed(() => {
  return formData.role &&
         formData.name &&
         formData.email && 
         formData.password &&
         formData.acceptTerms &&
         !errors.role &&
         !errors.name &&
         !errors.email && 
         !errors.password &&
         !errors.terms
})

const validateRole = () => {
  if (!formData.role) {
    errors.role = 'Please select your role'
  } else {
    errors.role = ''
  }
}

const validateName = () => {
  if (!formData.name) {
    errors.name = 'Name is required'
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else {
    errors.name = ''
  }
}

const validateEmail = () => {
  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email'
  } else {
    errors.email = ''
  }
}

const validatePassword = () => {
  if (!formData.password) {
    errors.password = 'Password is required'
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else {
    errors.password = ''
  }
}

const validateTerms = () => {
  if (!formData.acceptTerms) {
    errors.terms = 'You must accept the terms to continue'
  } else {
    errors.terms = ''
  }
}

const handleSignup = async () => {
  // Validate all fields
  validateRole()
  validateName()
  validateEmail()
  validatePassword()
  validateTerms()
  
  if (!isFormValid.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    // Create account with Firebase
    await firebaseAuth.signUp(
      formData.email, 
      formData.password,
      {
        displayName: formData.name,
        role: formData.role as UserRole
      }
    )
    
    // Navigate to onboarding
    await navigateTo('/onboarding')
  } catch (err: any) {
    console.error('Signup error:', err)
    
    // Handle specific Firebase auth errors
    switch (err.code) {
      case 'auth/email-already-in-use':
        error.value = 'An account with this email already exists'
        break
      case 'auth/invalid-email':
        error.value = 'Invalid email address'
        break
      case 'auth/weak-password':
        error.value = 'Password is too weak. Please use a stronger password'
        break
      case 'auth/operation-not-allowed':
        error.value = 'Email/password accounts are not enabled'
        break
      default:
        error.value = 'Failed to create account. Please try again'
    }
  } finally {
    loading.value = false
  }
}

const handleGoogleSignup = async () => {
  // Validate role selection first
  validateRole()
  if (errors.role) return
  
  loading.value = true
  error.value = ''
  
  try {
    await firebaseAuth.signInWithGoogle(formData.role as UserRole)
    await navigateTo('/onboarding')
  } catch (err: any) {
    console.error('Google signup error:', err)
    
    switch (err.code) {
      case 'auth/popup-closed-by-user':
        // User cancelled, no error needed
        break
      case 'auth/popup-blocked':
        error.value = 'Please allow popups for this site'
        break
      default:
        error.value = 'Failed to sign up with Google'
    }
  } finally {
    loading.value = false
  }
}

// Auto-focus on mount
onMounted(() => {
  // Check if already authenticated
  if (authStore.isAuthenticated) {
    navigateTo('/app')
  }
})
</script>

<style scoped>
.signup-page {
  @apply min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4;
}

.signup-container {
  @apply w-full max-w-md;
}

.signup-box {
  @apply bg-white rounded-2xl shadow-lg p-8 space-y-6;
}

.signup-header {
  @apply text-center space-y-2;
}

.signup-logo {
  @apply w-16 h-16 mx-auto text-primary-600;
}

.signup-title {
  @apply text-2xl font-bold text-gray-900;
}

.signup-subtitle {
  @apply text-gray-600;
}

.signup-form {
  @apply space-y-4;
}

/* Role Selection */
.role-selection {
  @apply space-y-2;
}

.role-label {
  @apply text-sm font-medium text-gray-700;
}

.role-options {
  @apply grid grid-cols-3 gap-3;
}

.role-option {
  @apply relative flex flex-col items-center gap-2 p-4 
         border-2 border-gray-200 rounded-lg cursor-pointer
         hover:border-primary-300 transition-all;
}

.role-option--selected {
  @apply border-primary-500 bg-primary-50;
}

.role-input {
  @apply sr-only;
}

.role-icon {
  @apply w-8 h-8 text-gray-400;
}

.role-option--selected .role-icon {
  @apply text-primary-600;
}

.role-name {
  @apply text-sm font-medium text-gray-700;
}

.role-error {
  @apply text-sm text-red-600;
}

/* Terms */
.terms-section {
  @apply space-y-1;
}

.terms-label {
  @apply flex items-start gap-2 text-sm text-gray-600 cursor-pointer;
}

.terms-checkbox {
  @apply mt-0.5 w-4 h-4 text-primary-600 rounded border-gray-300
         focus:ring-primary-500;
}

.terms-link {
  @apply text-primary-600 hover:text-primary-700 font-medium;
}

.terms-error {
  @apply text-sm text-red-600;
}

.signup-button {
  @apply w-full;
}

.signup-divider {
  @apply relative text-center;
}

.signup-divider span {
  @apply bg-white px-3 text-sm text-gray-500 relative z-10;
}

.signup-divider::before {
  content: '';
  @apply absolute inset-x-0 top-1/2 h-px bg-gray-200;
}

.oauth-button {
  @apply w-full flex items-center justify-center gap-3 px-4 py-3
         border border-gray-300 rounded-lg hover:bg-gray-50
         transition-colors font-medium text-gray-700;
}

.oauth-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.signup-footer {
  @apply text-center text-sm text-gray-600;
}

.signup-link {
  @apply text-primary-600 hover:text-primary-700 font-medium;
}
</style>