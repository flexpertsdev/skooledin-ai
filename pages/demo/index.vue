<template>
  <div class="demo-index">
    <LayoutContainer>
      <div class="demo-header">
        <h1>Component Demonstrations</h1>
        <p>Explore the complete mobile-first design system</p>
      </div>

      <div class="demo-grid">
        <NuxtLink to="/demo/navigation" class="demo-link">
          <div class="demo-card">
            <div class="demo-icon">🧭</div>
            <h3>Navigation Components</h3>
            <p>NavBar, SideBar, BottomNav, TabBar</p>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/demo/overlays" class="demo-link">
          <div class="demo-card">
            <div class="demo-icon">📋</div>
            <h3>Overlay Components</h3>
            <p>Modal, BottomSheet, Drawer, Toast</p>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/demo/layouts" class="demo-link">
          <div class="demo-card">
            <div class="demo-icon">📐</div>
            <h3>Layout Primitives</h3>
            <p>Container, Row, Column, Grid, Stack</p>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/demo/content" class="demo-link">
          <div class="demo-card">
            <div class="demo-icon">🎴</div>
            <h3>Content Components</h3>
            <p>Cards, Grids, and Content Layouts</p>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/demo/carousel" class="demo-link">
          <div class="demo-card">
            <div class="demo-icon">🎠</div>
            <h3>Carousel & Swipe</h3>
            <p>Carousel, PageView, MasonryGrid</p>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/demo/forms" class="demo-link">
          <div class="demo-card">
            <div class="demo-icon">📝</div>
            <h3>Form Components</h3>
            <p>ChatInput, BottomSheetSelect, ChoiceButtons</p>
          </div>
        </NuxtLink>
      </div>

      <div class="coming-soon">
        <h2>More Features</h2>
        <div class="coming-soon-grid">
          <div class="coming-soon-card">
            <h4>Theme System</h4>
            <p>Dynamic theming with persistence</p>
          </div>
          <div class="coming-soon-card">
            <h4>Gesture Support</h4>
            <p>Swipe, pinch, and custom gestures</p>
          </div>
          <div class="coming-soon-card">
            <h4>Performance Tools</h4>
            <p>Optimization and monitoring</p>
          </div>
        </div>
      </div>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Component Demos - Mobile-First Nuxt',
  meta: [
    { name: 'description', content: 'Explore all components in the mobile-first design system' }
  ]
})
</script>

<style scoped>
.demo-index {
  min-height: 100vh;
  padding-bottom: var(--spacing-5xl);
}

.demo-header {
  text-align: center;
  padding: var(--spacing-3xl) 0;
}

.demo-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
}

.demo-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-5xl);
}

.demo-link {
  text-decoration: none;
  color: inherit;
}

.demo-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all var(--transition-fast) var(--easing-standard);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.demo-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-md);
}

.demo-card h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.demo-card p {
  color: var(--text-secondary);
  margin: 0;
}

.coming-soon {
  margin-top: var(--spacing-5xl);
}

.coming-soon h2 {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--text-secondary);
}

.coming-soon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.coming-soon-card {
  background: var(--surface-default);
  border: 1px dashed var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  opacity: 0.7;
}

.coming-soon-card h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xs);
}

.coming-soon-card p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .demo-header h1 {
    font-size: var(--font-size-3xl);
  }
}

/* Dark mode adjustments */
.dark-mode .demo-card {
  background: var(--surface-elevated);
}

.dark-mode .coming-soon-card {
  background: var(--surface-card);
}
</style>