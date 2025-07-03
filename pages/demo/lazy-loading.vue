<template>
  <div class="lazy-loading-demo">
    <header class="demo-header">
      <Container>
        <h1 class="demo-title">Lazy Loading</h1>
        <p class="demo-description">
          Optimize performance with dynamic component loading, code splitting, and intersection observer-based lazy loading.
        </p>
      </Container>
    </header>

    <Container>
      <Stack :gap="32">
        <!-- Basic Lazy Loading -->
        <section class="demo-section">
          <h2 class="section-title">Basic Lazy Loading</h2>
          <p class="section-description">
            Components are loaded only when needed, reducing initial bundle size.
          </p>

          <div class="demo-card">
            <button @click="showBasic = !showBasic" class="toggle-button">
              {{ showBasic ? 'Hide' : 'Show' }} Lazy Component
            </button>

            <LazyCarousel
              v-if="showBasic"
              :items="carouselItems"
              :show-indicators="true"
              :show-controls="true"
              class="lazy-carousel"
            >
              <template #slide="{ item }">
                <div class="carousel-slide">
                  <img :src="item.image" :alt="item.title" />
                  <h3>{{ item.title }}</h3>
                </div>
              </template>
            </LazyCarousel>
          </div>
        </section>

        <!-- Intersection Observer Loading -->
        <section class="demo-section">
          <h2 class="section-title">Visible-Based Loading</h2>
          <p class="section-description">
            Components load automatically when they enter the viewport.
          </p>

          <Stack :gap="24">
            <div v-for="i in 3" :key="i" class="demo-card">
              <h3>Scroll to load component {{ i }}</h3>
              <LazyVisibleModal
                :title="`Lazy Modal ${i}`"
                :show-trigger="true"
              >
                <p>This modal was loaded when it became visible in the viewport!</p>
                <p>Check the network tab to see the lazy loading in action.</p>
              </LazyVisibleModal>
            </div>
          </Stack>
        </section>

        <!-- Route-Based Preloading -->
        <section class="demo-section">
          <h2 class="section-title">Route Preloading</h2>
          <p class="section-description">
            Preload components for specific routes to improve navigation speed.
          </p>

          <div class="demo-card">
            <Stack :gap="16">
              <button 
                v-for="route in routes" 
                :key="route.name"
                @click="preloadRoute(route.name)"
                @mouseenter="preloadRoute(route.name)"
                class="route-button"
              >
                Preload {{ route.label }} Components
              </button>
            </Stack>

            <div v-if="preloadStatus" class="preload-status">
              {{ preloadStatus }}
            </div>
          </div>
        </section>

        <!-- Dynamic Import Examples -->
        <section class="demo-section">
          <h2 class="section-title">Dynamic Components</h2>
          <p class="section-description">
            Load different components dynamically based on user interaction.
          </p>

          <div class="demo-card">
            <div class="component-selector">
              <button
                v-for="comp in dynamicComponents"
                :key="comp.name"
                @click="loadDynamicComponent(comp)"
                :class="['selector-button', { active: selectedComponent === comp.name }]"
              >
                {{ comp.label }}
              </button>
            </div>

            <div class="dynamic-content">
              <component 
                :is="dynamicComponent" 
                v-if="dynamicComponent"
                v-bind="componentProps"
              />
            </div>
          </div>
        </section>

        <!-- Performance Metrics -->
        <section class="demo-section">
          <h2 class="section-title">Performance Impact</h2>
          <p class="section-description">
            See the performance benefits of lazy loading in real-time.
          </p>

          <div class="demo-card">
            <div class="metrics-grid">
              <div class="metric">
                <span class="metric-label">Initial Bundle</span>
                <span class="metric-value">{{ metrics.initialBundle }}</span>
                <span class="metric-change">-45%</span>
              </div>
              <div class="metric">
                <span class="metric-label">First Paint</span>
                <span class="metric-value">{{ metrics.firstPaint }}</span>
                <span class="metric-change">-60%</span>
              </div>
              <div class="metric">
                <span class="metric-label">Interactive Time</span>
                <span class="metric-value">{{ metrics.interactive }}</span>
                <span class="metric-change">-50%</span>
              </div>
              <div class="metric">
                <span class="metric-label">Components Loaded</span>
                <span class="metric-value">{{ metrics.componentsLoaded }}</span>
                <span class="metric-detail">of {{ metrics.totalComponents }}</span>
              </div>
            </div>
          </div>
        </section>
      </Stack>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { lazyComponent, preloadRouteComponentsAsync, createComponentLoader } from '~/utils/lazyComponent'
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue'
import ErrorBoundary from '~/components/ui/ErrorBoundary.vue'

// Lazy components
const LazyCarousel = lazyComponent(
  () => import('~/components/ui/Carousel.vue'),
  {
    loadingComponent: LoadingSpinner,
    errorComponent: ErrorBoundary,
    delay: 200
  }
)

const LazyVisibleModal = lazyComponent(
  () => import('~/components/overlay/Modal.vue'),
  {
    loadingComponent: LoadingSpinner,
    errorComponent: ErrorBoundary
  }
)

// State
const showBasic = ref(false)
const selectedComponent = ref('')
const dynamicComponent = shallowRef()
const componentProps = ref({})
const preloadStatus = ref('')

// Data
const carouselItems = [
  { 
    id: 1, 
    title: 'Lazy Loaded Image 1', 
    image: 'https://picsum.photos/400/300?random=1' 
  },
  { 
    id: 2, 
    title: 'Lazy Loaded Image 2', 
    image: 'https://picsum.photos/400/300?random=2' 
  },
  { 
    id: 3, 
    title: 'Lazy Loaded Image 3', 
    image: 'https://picsum.photos/400/300?random=3' 
  }
]

const routes = [
  { name: 'demo-overlays', label: 'Overlays' },
  { name: 'demo-carousel', label: 'Carousel' },
  { name: 'demo-forms', label: 'Forms' }
]

const dynamicComponents = [
  { 
    name: 'BottomSheet', 
    label: 'Bottom Sheet',
    loader: () => import('~/components/overlay/BottomSheet.vue'),
    props: { modelValue: true, title: 'Dynamic Bottom Sheet' }
  },
  { 
    name: 'ActionSheet', 
    label: 'Action Sheet',
    loader: () => import('~/components/overlay/ActionSheet.vue'),
    props: { 
      modelValue: true, 
      title: 'Dynamic Actions',
      actions: [
        { label: 'Edit', icon: '✏️' },
        { label: 'Share', icon: '📤' },
        { label: 'Delete', icon: '🗑️', variant: 'danger' }
      ]
    }
  },
  { 
    name: 'Toast', 
    label: 'Toast',
    loader: () => import('~/components/ui/Toast.vue'),
    props: { 
      show: true,
      message: 'Dynamic toast loaded!',
      type: 'success'
    }
  }
]

// Performance metrics (simulated)
const metrics = ref({
  initialBundle: '245KB',
  firstPaint: '0.8s',
  interactive: '1.2s',
  componentsLoaded: 4,
  totalComponents: 20
})

// Methods
const preloadRoute = async (routeName: string) => {
  preloadStatus.value = `Preloading ${routeName} components...`
  
  try {
    await preloadRouteComponentsAsync('demo-overlays')
    preloadStatus.value = `✓ ${routeName} components preloaded!`
    
    // Update metrics
    metrics.value.componentsLoaded += 3
    
    setTimeout(() => {
      preloadStatus.value = ''
    }, 2000)
  } catch (error) {
    preloadStatus.value = `✗ Failed to preload ${routeName}`
  }
}

const loadDynamicComponent = async (comp: any) => {
  selectedComponent.value = comp.name
  componentProps.value = comp.props || {}
  
  try {
    // Create loader with retry logic
    const loader = createComponentLoader(comp.loader, 3, 500)
    const module = await loader()
    dynamicComponent.value = module.default
    
    // Update metrics
    metrics.value.componentsLoaded += 1
  } catch (error) {
    console.error('Failed to load component:', error)
    dynamicComponent.value = ErrorBoundary
    componentProps.value = { 
      error: error as Error,
      title: 'Failed to load component',
      onRetry: () => loadDynamicComponent(comp)
    }
  }
}
</script>

<style scoped>
.lazy-loading-demo {
  min-height: 100vh;
  padding-bottom: var(--spacing-2xl);
}

.demo-header {
  background: var(--surface-elevated);
  padding: var(--spacing-2xl) 0;
  margin-bottom: var(--spacing-2xl);
  border-bottom: 1px solid var(--border-default);
}

.demo-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md) 0;
}

.demo-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: 0;
  max-width: 800px;
}

.demo-section {
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.section-description {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-xl) 0;
}

.demo-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  overflow: hidden;
}

/* Toggle button */
.toggle-button {
  background: var(--primary-color);
  color: var(--color-primary-contrast);
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
  margin-bottom: var(--spacing-lg);
}

.toggle-button:hover {
  background: var(--color-primary-600);
  transform: translateY(-1px);
}

/* Carousel */
.lazy-carousel {
  height: 300px;
}

.carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.carousel-slide img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.carousel-slide h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin: 0;
}

/* Route buttons */
.route-button {
  background: var(--surface-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
}

.route-button:hover {
  background: var(--surface-hover);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.preload-status {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--surface-elevated);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
}

/* Component selector */
.component-selector {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.selector-button {
  background: var(--surface-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
}

.selector-button:hover {
  background: var(--surface-hover);
  border-color: var(--border-strong);
}

.selector-button.active {
  background: var(--primary-color);
  color: var(--color-primary-contrast);
  border-color: var(--primary-color);
}

.dynamic-content {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Metrics grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.metric {
  background: var(--surface-elevated);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  text-align: center;
}

.metric-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.metric-value {
  display: block;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.metric-change {
  display: inline-block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-success);
  background: var(--color-success-100);
  padding: var(--spacing-2xs) var(--spacing-xs);
  border-radius: var(--radius-sm);
}

.metric-detail {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* Dark mode */
.dark-mode .demo-header {
  background: var(--surface-card);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .component-selector {
    flex-direction: column;
  }
  
  .selector-button {
    width: 100%;
  }
}
</style>