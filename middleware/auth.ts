export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Skip middleware if already loading
  if (authStore.loading) return
  
  // Define protected routes
  const protectedRoutes = ['/app']
  const authRoutes = ['/auth/login', '/auth/signup']
  
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  const isAuthRoute = authRoutes.some(route => to.path === route)
  
  // Redirect to login if accessing protected route while not authenticated
  if (isProtectedRoute && !authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  
  // Redirect to app if accessing auth routes while authenticated
  if (isAuthRoute && authStore.isAuthenticated) {
    // Check if onboarding is needed
    if (!authStore.isOnboarded) {
      return navigateTo('/onboarding')
    }
    return navigateTo('/app')
  }
  
  // Check onboarding status for authenticated users
  if (authStore.isAuthenticated && !authStore.isOnboarded && !to.path.startsWith('/onboarding')) {
    return navigateTo('/onboarding')
  }
})