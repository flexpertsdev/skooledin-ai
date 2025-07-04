export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  
  // Skip if not authenticated
  if (!authStore.isAuthenticated) return
  
  // Skip if already on onboarding page
  if (useRoute().path.startsWith('/onboarding')) return
  
  // Redirect to onboarding if not completed
  if (!authStore.isOnboarded) {
    return navigateTo('/onboarding')
  }
})