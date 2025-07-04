<template>
  <div class="app-layout">
    <NavBar brand="Nuxtplate" :nav-items="navItems" :sticky="true" :collapse-on-scroll="true" />

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  {
    id: 'home',
    label: 'Home',
    to: '/'
  },
  {
    id: 'navigation',
    label: 'Navigation',
    to: '/demo/navigation'
  },
  {
    id: 'overlays',
    label: 'Overlays',
    to: '/demo/overlays'
  },
  {
    id: 'content',
    label: 'Content',
    to: '/demo/content'
  },
  {
    id: 'layouts',
    label: 'Layouts',
    to: '/demo/layouts'
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
</style>
