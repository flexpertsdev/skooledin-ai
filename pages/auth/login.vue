<template>
  <div class="login-page">
    <LayoutContainer class="login-container">
      <div class="login-box">
        <div class="login-header">
          <Icon name="mdi:school" class="login-logo" />
          <h1 class="login-title">Welcome Back</h1>
          <p class="login-subtitle">Sign in to continue learning</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
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
            required
          >
            <PasswordField
              v-model="formData.password"
              placeholder="Enter your password"
              :error="!!errors.password"
              autocomplete="current-password"
            />
          </FormField>

          <div class="login-options">
            <label class="login-remember">
              <input
                v-model="formData.rememberMe"
                type="checkbox"
                class="login-checkbox"
              />
              <span>Remember me</span>
            </label>
            <NuxtLink to="/auth/forgot-password" class="login-link">
              Forgot password?
            </NuxtLink>
          </div>

          <Alert v-if="error" variant="error" dismissible @dismiss="error = ''">
            {{ error }}
          </Alert>

          <Button
            type="submit"
            :loading="loading"
            :disabled="!isFormValid"
            class="login-button"
          >
            Sign In
          </Button>
        </form>

        <div class="login-divider">
          <span>or continue with</span>
        </div>

        <div class="login-oauth">
          <button
            type="button"
            @click="handleGoogleLogin"
            :disabled="loading"
            class="oauth-button"
          >
            <Icon name="logos:google-icon" />
            <span>Continue with Google</span>
          </button>
        </div>

        <p class="login-footer">
          Don't have an account?
          <NuxtLink to="/auth/signup" class="login-link">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
import { firebaseAuth } from '~/services/firebase'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const error = ref('')
const formData = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

const isFormValid = computed(() => {
  return formData.email && 
         formData.password && 
         !errors.email && 
         !errors.password
})

const validateEmail = () => {
  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email'
  } else {
    errors.email = ''
  }
}

const handleLogin = async () => {
  validateEmail()
  if (!formData.password) {
    errors.password = 'Password is required'
    return
  }
  
  if (!isFormValid.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    await firebaseAuth.signIn(formData.email, formData.password)
    
    // Auth store will handle the redirect based on role and onboarding status
    await navigateTo('/app')
  } catch (err: any) {
    console.error('Login error:', err)
    
    // Handle specific Firebase auth errors
    switch (err.code) {
      case 'auth/user-not-found':
        error.value = 'No account found with this email'
        break
      case 'auth/wrong-password':
        error.value = 'Incorrect password'
        break
      case 'auth/invalid-email':
        error.value = 'Invalid email address'
        break
      case 'auth/user-disabled':
        error.value = 'This account has been disabled'
        break
      case 'auth/too-many-requests':
        error.value = 'Too many failed attempts. Please try again later'
        break
      default:
        error.value = 'Failed to sign in. Please try again'
    }
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await firebaseAuth.signInWithGoogle()
    await navigateTo('/app')
  } catch (err: any) {
    console.error('Google login error:', err)
    
    switch (err.code) {
      case 'auth/popup-closed-by-user':
        // User cancelled, no error needed
        break
      case 'auth/popup-blocked':
        error.value = 'Please allow popups for this site'
        break
      default:
        error.value = 'Failed to sign in with Google'
    }
  } finally {
    loading.value = false
  }
}

// Auto-focus email field on mount
onMounted(() => {
  // Check if already authenticated
  if (authStore.isAuthenticated) {
    navigateTo('/app')
  }
})
</script>

<style scoped>
.login-page {
  @apply min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4;
}

.login-container {
  @apply w-full max-w-md;
}

.login-box {
  @apply bg-white rounded-2xl shadow-lg p-8 space-y-6;
}

.login-header {
  @apply text-center space-y-2;
}

.login-logo {
  @apply w-16 h-16 mx-auto text-primary-600;
}

.login-title {
  @apply text-2xl font-bold text-gray-900;
}

.login-subtitle {
  @apply text-gray-600;
}

.login-form {
  @apply space-y-4;
}

.login-options {
  @apply flex items-center justify-between;
}

.login-remember {
  @apply flex items-center gap-2 text-sm text-gray-600 cursor-pointer;
}

.login-checkbox {
  @apply w-4 h-4 text-primary-600 rounded border-gray-300
         focus:ring-primary-500;
}

.login-link {
  @apply text-sm text-primary-600 hover:text-primary-700 font-medium;
}

.login-button {
  @apply w-full;
}

.login-divider {
  @apply relative text-center;
}

.login-divider span {
  @apply bg-white px-3 text-sm text-gray-500 relative z-10;
}

.login-divider::before {
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

.login-footer {
  @apply text-center text-sm text-gray-600;
}
</style>