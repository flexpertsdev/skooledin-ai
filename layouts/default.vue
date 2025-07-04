<template>
  <div class="app-layout">
    <NavBar 
      brand="Skooledin AI" 
      :nav-items="navItems" 
      :sticky="true" 
      :collapse-on-scroll="true" 
    />

    <main class="main-content">
      <slot />
    </main>

    <footer class="app-footer">
      <LayoutContainer>
        <div class="footer-content">
          <p>&copy; 2024 Skooledin AI. Learn Smarter with AI.</p>
        </div>
      </LayoutContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Navigation items for public-facing pages
const navItems = [
  {
    id: 'home',
    label: 'Home',
    to: '/'
  },
  {
    id: 'features',
    label: 'Features',
    to: '/features'
  },
  {
    id: 'about',
    label: 'About',
    to: '/about'
  },
  {
    id: 'login',
    label: 'Login',
    to: '/auth/login'
  },
  {
    id: 'signup',
    label: 'Get Started',
    to: '/auth/signup',
    variant: 'primary' // Make this a CTA button
  }
]
</script>

<style scoped>
.app-layout {
  min-height: var(--viewport-height);
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
}

.app-footer {
  background-color: var(--surface-default);
  border-top: 1px solid var(--border-default);
  padding: var(--spacing-lg) 0;
  margin-top: var(--spacing-5xl);
}

.footer-content {
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .app-footer {
    padding: var(--spacing-md) 0;
    margin-top: var(--spacing-3xl);
  }
}
</style>
