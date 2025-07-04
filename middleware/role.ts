import type { UserRole } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Skip if not authenticated
  if (!authStore.isAuthenticated) return
  
  // Define role-based routes
  const roleRoutes: Record<UserRole, string[]> = {
    student: ['/app/chat', '/app/notebook', '/app/study', '/app/progress'],
    teacher: ['/app/teacher', '/app/classes', '/app/content'],
    parent: ['/app/parent', '/app/children'],
    admin: ['/app/admin']
  }
  
  // Check if current user has access to the route
  const userRole = authStore.userRole
  if (!userRole) return
  
  // Admin has access to everything
  if (userRole === 'admin') return
  
  // Check if route is role-specific
  const isRoleSpecificRoute = Object.entries(roleRoutes).some(([role, routes]) => {
    return role !== userRole && routes.some(route => to.path.startsWith(route))
  })
  
  // Redirect to appropriate dashboard if accessing unauthorized route
  if (isRoleSpecificRoute) {
    const dashboards: Record<UserRole, string> = {
      student: '/app',
      teacher: '/app/teacher',
      parent: '/app/parent',
      admin: '/app/admin'
    }
    
    return navigateTo(dashboards[userRole])
  }
})