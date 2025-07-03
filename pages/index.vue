<template>
  <div class="home-page">
    <LayoutSafeArea :top="true">
      <LayoutContainer>
        <LayoutStack :spacing="'xl'">
          <!-- Hero Section -->
          <section class="hero-section">
            <LayoutAligned :alignment="'center'">
              <div class="hero-content">
                <h1>Mobile-First Nuxt Project</h1>
                <p class="hero-subtitle">
                  A comprehensive design system built with Vue 3, TypeScript, and modern CSS
                </p>
              </div>
            </LayoutAligned>
          </section>

          <!-- Features Grid -->
          <section>
            <h2>Core Features</h2>
            <LayoutGrid 
              :cols="{ mobile: 1, tablet: 2, laptop: 3 }"
              :gap="'lg'"
              class="features-grid"
            >
              <div class="feature-card">
                <h3>🎨 Design Tokens</h3>
                <p>Comprehensive token system for colors, spacing, typography, and more</p>
              </div>
              <div class="feature-card">
                <h3>📱 Mobile-First</h3>
                <p>Responsive system with smooth breakpoints and container queries</p>
              </div>
              <div class="feature-card">
                <h3>🧩 Layout Primitives</h3>
                <p>Flutter-like layout components for predictable UI composition</p>
              </div>
              <div class="feature-card">
                <h3>🌓 Dark Mode</h3>
                <p>Built-in light/dark theme support with CSS custom properties</p>
              </div>
              <div class="feature-card">
                <h3>⚡ Performance</h3>
                <p>Optimized for speed with auto-imports and lazy loading</p>
              </div>
              <div class="feature-card">
                <h3>♿ Accessible</h3>
                <p>WCAG 2.1 compliant with keyboard navigation and screen reader support</p>
              </div>
            </LayoutGrid>
          </section>

          <!-- Component Demos Link -->
          <section class="demos-link-section">
            <LayoutAligned :alignment="'center'">
              <div>
                <h2>Explore Components</h2>
                <p class="demos-description">
                  Check out our comprehensive collection of mobile-first components
                </p>
                <NuxtLink to="/demo" class="demos-button">
                  View All Demos →
                </NuxtLink>
              </div>
            </LayoutAligned>
          </section>

          <!-- Demo Section -->
          <section>
            <h2>Layout Demonstrations</h2>
            <LayoutStack :spacing="'lg'">
              <!-- Row Demo -->
              <div class="demo-section">
                <h3>Responsive Row</h3>
                <LayoutRow :gap="'md'" :wrap="true">
                  <div class="demo-box" style="flex: 1">Item 1</div>
                  <div class="demo-box" style="flex: 2">Item 2 (2x)</div>
                  <div class="demo-box" style="flex: 1">Item 3</div>
                </LayoutRow>
              </div>

              <!-- Grid Demo -->
              <div class="demo-section">
                <h3>Auto-Fit Grid</h3>
                <LayoutGrid :auto-fit="true" :min-child-width="'200px'" :gap="'md'">
                  <div v-for="i in 6" :key="i" class="demo-box">
                    Grid Item {{ i }}
                  </div>
                </LayoutGrid>
              </div>
            </LayoutStack>
          </section>
        </LayoutStack>
      </LayoutContainer>
    </LayoutSafeArea>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Mobile-First Nuxt Project',
  meta: [
    { name: 'description', content: 'A comprehensive mobile-first design system for Nuxt 3' }
  ]
})
</script>

<style scoped>
.home-page {
  min-height: var(--viewport-height);
  background-color: var(--surface-background);
}

.hero-section {
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.hero-content {
  max-width: 600px;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
}

h2 {
  margin-bottom: var(--spacing-lg);
}

.feature-card {
  background-color: var(--surface-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  transition: all var(--transition-fast) var(--easing-standard);
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.feature-card h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.feature-card p {
  color: var(--text-secondary);
  margin: 0;
}

.demo-section {
  background-color: var(--surface-default);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.demo-box {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: var(--font-weight-medium);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Component Demos Link */
.demos-link-section {
  background: var(--surface-elevated);
  padding: var(--spacing-3xl);
  border-radius: var(--radius-lg);
  text-align: center;
}

.demos-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: var(--spacing-md) 0 var(--spacing-xl);
}

.demos-button {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast) var(--easing-standard);
}

.demos-button:hover {
  background: var(--color-primary-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Dark mode adjustments */
.dark-mode .feature-card {
  background-color: var(--surface-card);
}

.dark-mode .demo-section {
  background-color: var(--surface-default);
}

.dark-mode .demos-link-section {
  background: var(--surface-card);
}
</style>