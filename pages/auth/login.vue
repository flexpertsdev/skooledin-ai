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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 3rem 1rem;
}

.login-container {
  width: 100%;
  max-width: 28rem;
}

.login-box {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login-logo {
  width: 4rem;
  height: 4rem;
  margin-left: auto;
  margin-right: auto;
  color: var(--primary-600);
}

.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(17 24 39);
}

.login-subtitle {
  color: rgb(75 85 99);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgb(75 85 99);
  cursor: pointer;
}

.login-checkbox {
  width: 1rem;
  height: 1rem;
  color: var(--primary-600);
  border-radius: 0.25rem;
  border-color: rgb(209 213 219);
}

.login-checkbox:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--primary-500);
}

.login-link {
  font-size: 0.875rem;
  color: var(--primary-600);
  font-weight: 500;
}

.login-link:hover {
  color: var(--primary-700);
}

.login-button {
  width: 100%;
}

.login-divider {
  position: relative;
  text-align: center;
}

.login-divider span {
  background-color: #ffffff;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  color: rgb(107 114 128);
  position: relative;
  z-index: 10;
}

.login-divider::before {
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

.login-footer {
  text-align: center;
  font-size: 0.875rem;
  color: rgb(75 85 99);
}
</style>