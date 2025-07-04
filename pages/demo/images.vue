<template>
  <div class="images-demo">
    <header class="demo-header">
      <Container>
        <h1 class="demo-title">Image Optimization</h1>
        <p class="demo-description">
          Responsive images with lazy loading, progressive enhancement, and optimal formats.
        </p>
      </Container>
    </header>

    <Container>
      <Stack :gap="32">
        <!-- Responsive Image -->
        <section class="demo-section">
          <h2 class="section-title">Responsive Images</h2>
          <p class="section-description">
            Automatically serve the right image size for each device and screen resolution.
          </p>

          <Grid :cols="{ mobile: 1, tablet: 2, desktop: 3 }" :gap="24">
            <div class="demo-card">
              <h3>Cover Fit</h3>
              <ResponsiveImage
                src="https://picsum.photos/800/600?random=1"
                alt="Cover fit example"
                :width="800"
                :height="600"
                fit="cover"
                :responsive-sizes="{
                  mobile: '100vw',
                  tablet: '50vw',
                  desktop: '33vw',
                  default: '300px'
                }"
              />
            </div>

            <div class="demo-card">
              <h3>Contain Fit</h3>
              <ResponsiveImage
                src="https://picsum.photos/600/800?random=2"
                alt="Contain fit example"
                :width="600"
                :height="800"
                fit="contain"
                placeholder="blur"
                style="background: #f3f4f6; height: 300px"
              />
            </div>

            <div class="demo-card">
              <h3>With Caption</h3>
              <ResponsiveImage
                src="https://picsum.photos/800/600?random=3"
                alt="Image with caption"
                :width="800"
                :height="600"
                caption="This image includes a descriptive caption"
                fit="cover"
              />
            </div>
          </Grid>
        </section>

        <!-- Progressive Loading -->
        <section class="demo-section">
          <h2 class="section-title">Progressive Loading</h2>
          <p class="section-description">
            Images load with blur placeholders and fade in smoothly when ready.
          </p>

          <div class="progressive-grid">
            <div v-for="i in 6" :key="i" class="demo-card">
              <ResponsiveImage
                :src="`https://picsum.photos/400/300?random=${i + 10}`"
                :alt="`Progressive loading example ${i}`"
                :width="400"
                :height="300"
                placeholder="blur"
                :placeholder-color="placeholderColors[i % placeholderColors.length]"
                :loading="i <= 2 ? 'eager' : 'lazy'"
                :priority="i === 1"
                fade-in
              />
              <p class="image-label">{{ i <= 2 ? 'Eager loaded' : 'Lazy loaded' }}</p>
            </div>
          </div>
        </section>

        <!-- Image Gallery -->
        <section class="demo-section">
          <h2 class="section-title">Image Gallery</h2>
          <p class="section-description">Grid and masonry layouts with lightbox support.</p>

          <Tabs>
            <Tab label="Grid Layout">
              <ImageGallery
                :images="galleryImages"
                layout="grid"
                :columns="{ mobile: 1, tablet: 2, desktop: 3 }"
                :gap="16"
                aspect-ratio="16:9"
                enable-lightbox
              />
            </Tab>

            <Tab label="Masonry Layout">
              <ImageGallery
                :images="masonryImages"
                layout="masonry"
                :columns="3"
                :gap="16"
                enable-lightbox
              />
            </Tab>

            <Tab label="Featured Grid">
              <ImageGallery
                :images="featuredImages"
                layout="grid"
                :columns="4"
                :gap="8"
                enable-lightbox
              />
            </Tab>
          </Tabs>
        </section>

        <!-- Error States -->
        <section class="demo-section">
          <h2 class="section-title">Error Handling</h2>
          <p class="section-description">Graceful error states when images fail to load.</p>

          <Grid :cols="{ mobile: 1, tablet: 3 }" :gap="24">
            <div class="demo-card">
              <h3>Failed Image</h3>
              <ResponsiveImage
                src="https://invalid-url.com/image.jpg"
                alt="Failed image example"
                :width="400"
                :height="300"
                error-text="Failed to load image"
              />
            </div>

            <div class="demo-card">
              <h3>With Spinner</h3>
              <ResponsiveImage
                :src="slowLoadingImage"
                alt="Loading with spinner"
                :width="400"
                :height="300"
                show-spinner
                placeholder="empty"
              />
            </div>

            <div class="demo-card">
              <h3>No Placeholder</h3>
              <ResponsiveImage
                src="https://picsum.photos/400/300?random=50"
                alt="No placeholder example"
                :width="400"
                :height="300"
                placeholder="none"
              />
            </div>
          </Grid>
        </section>

        <!-- Performance Metrics -->
        <section class="demo-section">
          <h2 class="section-title">Performance Impact</h2>
          <p class="section-description">
            See how image optimization improves loading performance.
          </p>

          <div class="metrics-comparison">
            <div class="metric-card">
              <h3>Without Optimization</h3>
              <div class="metric-item">
                <span class="metric-label">Average Size</span>
                <span class="metric-value">2.5 MB</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Load Time</span>
                <span class="metric-value">3.2s</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Format</span>
                <span class="metric-value">JPEG only</span>
              </div>
            </div>

            <div class="metric-card optimized">
              <h3>With Optimization</h3>
              <div class="metric-item">
                <span class="metric-label">Average Size</span>
                <span class="metric-value">180 KB</span>
                <span class="metric-improvement">-93%</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Load Time</span>
                <span class="metric-value">0.8s</span>
                <span class="metric-improvement">-75%</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Format</span>
                <span class="metric-value">WebP/AVIF</span>
                <span class="metric-improvement">✓</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Usage Examples -->
        <section class="demo-section">
          <h2 class="section-title">Usage Examples</h2>
          <p class="section-description">Code examples for common image optimization patterns.</p>

          <div class="code-examples">
            <div class="example-card">
              <h3>Basic Responsive Image</h3>
              <pre><code>&lt;ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  :width="1920"
  :height="1080"
  :responsive-sizes="{
    mobile: '100vw',
    tablet: '80vw',
    desktop: '60vw',
    default: '1200px'
  }"
/&gt;</code></pre>
            </div>

            <div class="example-card">
              <h3>Gallery with Lightbox</h3>
              <pre><code>&lt;ImageGallery
  :images="galleryImages"
  layout="masonry"
  :columns="3"
  enable-lightbox
  placeholder="blur"
/&gt;</code></pre>
            </div>

            <div class="example-card">
              <h3>Priority Loading</h3>
              <pre><code>&lt;ResponsiveImage
  src="/images/lcp-image.jpg"
  alt="Largest Contentful Paint"
  :priority="true"
  loading="eager"
  :srcset-widths="[640, 1024, 1920]"
/&gt;</code></pre>
            </div>
          </div>
        </section>
      </Stack>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Demo data
const placeholderColors = ['#FEE2E2', '#DBEAFE', '#D1FAE5', '#FEF3C7', '#E9D5FF', '#FECACA']

const galleryImages = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/800/600?random=${i + 100}`,
  alt: `Gallery image ${i + 1}`,
  title: `Image ${i + 1}`,
  description: 'Beautiful landscape photography',
  width: 800,
  height: 600
}))

const masonryImages = [
  {
    id: 1,
    src: 'https://picsum.photos/400/600?random=201',
    alt: 'Tall image',
    title: 'Portrait',
    width: 400,
    height: 600
  },
  {
    id: 2,
    src: 'https://picsum.photos/400/300?random=202',
    alt: 'Wide image',
    title: 'Landscape',
    width: 400,
    height: 300
  },
  {
    id: 3,
    src: 'https://picsum.photos/400/400?random=203',
    alt: 'Square image',
    title: 'Square',
    width: 400,
    height: 400
  },
  {
    id: 4,
    src: 'https://picsum.photos/400/500?random=204',
    alt: 'Medium tall',
    width: 400,
    height: 500
  },
  {
    id: 5,
    src: 'https://picsum.photos/400/350?random=205',
    alt: 'Medium wide',
    width: 400,
    height: 350
  },
  {
    id: 6,
    src: 'https://picsum.photos/400/700?random=206',
    alt: 'Extra tall',
    width: 400,
    height: 700
  }
]

const featuredImages = [
  {
    id: 1,
    src: 'https://picsum.photos/800/600?random=301',
    alt: 'Featured image',
    title: 'Featured Content',
    featured: true,
    width: 800,
    height: 600
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 2,
    src: `https://picsum.photos/400/400?random=${i + 302}`,
    alt: `Grid image ${i + 1}`,
    width: 400,
    height: 400
  }))
]

// Simulate slow loading
const slowLoadingImage = ref('')
onMounted(() => {
  setTimeout(() => {
    slowLoadingImage.value = 'https://picsum.photos/400/300?random=99'
  }, 3000)
})
</script>

<style scoped>
.images-demo {
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
  padding: var(--spacing-lg);
  overflow: hidden;
}

.demo-card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-md) 0;
}

.progressive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.image-label {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
}

/* Metrics */
.metrics-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.metric-card {
  background: var(--surface-card);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.metric-card.optimized {
  border-color: var(--color-success);
  background: var(--color-success-50);
}

.metric-card h3 {
  font-size: var(--font-size-lg);
  margin: 0 0 var(--spacing-lg) 0;
  text-align: center;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-subtle);
}

.metric-item:last-child {
  border-bottom: none;
}

.metric-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.metric-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.metric-improvement {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-success);
  background: var(--color-success-100);
  padding: var(--spacing-2xs) var(--spacing-xs);
  border-radius: var(--radius-sm);
  margin-left: var(--spacing-xs);
}

/* Code examples */
.code-examples {
  display: grid;
  gap: var(--spacing-lg);
}

.example-card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.example-card h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-md) 0;
}

.example-card pre {
  margin: 0;
  padding: var(--spacing-md);
  background: var(--surface-default);
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.example-card code {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

/* Dark mode */
.dark-mode .demo-header {
  background: var(--surface-card);
}

.dark-mode .metric-card.optimized {
  background: rgba(var(--color-success-rgb), 0.1);
}

.dark-mode .example-card pre {
  background: var(--surface-card);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .progressive-grid {
    grid-template-columns: 1fr;
  }

  .metrics-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
