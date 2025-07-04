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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 3rem 1rem;
}

.signup-container {
  width: 100%;
  max-width: 28rem;
}

.signup-box {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signup-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.signup-logo {
  width: 4rem;
  height: 4rem;
  margin-left: auto;
  margin-right: auto;
  color: var(--primary-600);
}

.signup-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(17 24 39);
}

.signup-subtitle {
  color: rgb(75 85 99);
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Role Selection */
.role-selection {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.role-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(17 24 39);
}

.role-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.role-option {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid rgb(229 231 235);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 150ms ease;
}

.role-option:hover {
  border-color: var(--primary-300);
}

.role-option--selected {
  border-color: var(--primary-500);
  background-color: var(--primary-50);
}

.role-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.role-icon {
  width: 2rem;
  height: 2rem;
  color: rgb(107 114 128);
}

.role-option--selected .role-icon {
  color: var(--primary-600);
}

.role-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(17 24 39);
}

.role-error {
  font-size: 0.875rem;
  color: rgb(220 38 38);
}

/* Terms */
.terms-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.terms-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgb(75 85 99);
  cursor: pointer;
}

.terms-checkbox {
  margin-top: 0.125rem;
  width: 1rem;
  height: 1rem;
  color: var(--primary-600);
  border-radius: 0.25rem;
  border-color: rgb(209 213 219);
}

.terms-checkbox:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--primary-500);
}

.terms-link {
  color: var(--primary-600);
  font-weight: 500;
}

.terms-link:hover {
  color: var(--primary-700);
}

.terms-error {
  font-size: 0.875rem;
  color: rgb(220 38 38);
}

.signup-button {
  width: 100%;
}

.signup-divider {
  position: relative;
  text-align: center;
}

.signup-divider span {
  background-color: #ffffff;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  color: rgb(107 114 128);
  position: relative;
  z-index: 10;
}

.signup-divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background-color: rgb(229 231 235);
}

.oauth-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border: 1px solid rgb(209 213 219);
  border-radius: 0.5rem;
  font-weight: 500;
  color: rgb(55 65 81);
  transition: background-color 150ms ease;
}

.oauth-button:hover {
  background-color: rgb(249 250 251);
}

.oauth-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.signup-footer {
  text-align: center;
  font-size: 0.875rem;
  color: rgb(75 85 99);
}

.signup-link {
  color: var(--primary-600);
  font-weight: 500;
}

.signup-link:hover {
  color: var(--primary-700);
}
</style>