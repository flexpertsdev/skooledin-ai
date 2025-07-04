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
  position: relative;
  min-height: var(--viewport-height);
  background-color: var(--surface-background);
  display: flex;
  flex-direction: column;
}

/* Background pattern */
.auth-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.auth-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: 
    radial-gradient(circle at 1px 1px, var(--color-primary-600) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Content wrapper */
.auth-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-height: var(--viewport-height);
}

/* Navigation */
.auth-nav {
  padding: var(--spacing-lg);
}

.auth-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition-fast) var(--easing-standard);
}

.auth-brand:hover {
  color: var(--primary-color);
}

.auth-brand-icon {
  width: var(--spacing-8);
  height: var(--spacing-8);
  color: var(--primary-color);
}

.auth-brand-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

/* Main content */
.auth-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-lg);
}

/* Footer */
.auth-footer {
  padding: var(--spacing-lg);
  text-align: center;
}

.auth-copyright {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.auth-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.auth-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast) var(--easing-standard);
}

.auth-link:hover {
  color: var(--primary-color);
}

.auth-link-separator {
  color: var(--border-default);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .auth-nav {
    padding: var(--spacing-md);
  }
  
  .auth-footer {
    padding: var(--spacing-md);
  }
  
  .auth-links {
    flex-wrap: wrap;
  }
  
  .auth-link-separator {
    display: none;
  }
}

/* Dark mode adjustments */
.dark-mode .auth-pattern {
  opacity: 0.02;
}
</style>