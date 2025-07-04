export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Initialize auth state listener
  await authStore.initializeAuth()
})