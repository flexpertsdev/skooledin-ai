<template>
  <div class="auth-layout">
    <div class="auth-background">
      <div class="auth-pattern" />
    </div>
    
    <div class="auth-content">
      <nav class="auth-nav">
        <NuxtLink to="/" class="auth-brand">
          <Icon name="mdi:school" class="auth-brand-icon" />
          <span class="auth-brand-text">Skooledin AI</span>
        </NuxtLink>
      </nav>
      
      <main class="auth-main">
        <slot />
      </main>
      
      <footer class="auth-footer">
        <p class="auth-copyright">
          © {{ currentYear }} Skooledin AI. All rights reserved.
        </p>
        <div class="auth-links">
          <NuxtLink to="/terms" class="auth-link">Terms</NuxtLink>
          <span class="auth-link-separator">·</span>
          <NuxtLink to="/privacy" class="auth-link">Privacy</NuxtLink>
          <span class="auth-link-separator">·</span>
          <NuxtLink to="/help" class="auth-link">Help</NuxtLink>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.auth-layout {
  @apply relative min-h-screen bg-gray-50 flex flex-col;
}

/* Background pattern */
.auth-background {
  @apply absolute inset-0 overflow-hidden;
}

.auth-pattern {
  @apply absolute inset-0 opacity-5;
  background-image: 
    radial-gradient(circle at 1px 1px, theme('colors.primary.600') 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Content wrapper */
.auth-content {
  @apply relative z-10 flex flex-col min-h-screen;
}

/* Navigation */
.auth-nav {
  @apply px-6 py-6;
}

.auth-brand {
  @apply inline-flex items-center gap-2 text-gray-900 hover:text-primary-600
         transition-colors;
}

.auth-brand-icon {
  @apply w-8 h-8 text-primary-600;
}

.auth-brand-text {
  @apply text-xl font-bold;
}

/* Main content */
.auth-main {
  @apply flex-1 flex items-center justify-center px-4 py-8;
}

/* Footer */
.auth-footer {
  @apply px-6 py-6 text-center space-y-2;
}

.auth-copyright {
  @apply text-sm text-gray-500;
}

.auth-links {
  @apply flex items-center justify-center gap-2 text-sm;
}

.auth-link {
  @apply text-gray-600 hover:text-primary-600 transition-colors;
}

.auth-link-separator {
  @apply text-gray-300;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .auth-nav {
    @apply px-4 py-4;
  }
  
  .auth-footer {
    @apply px-4 py-4;
  }
  
  .auth-links {
    @apply flex-wrap;
  }
  
  .auth-link-separator {
    @apply hidden;
  }
}
</style>