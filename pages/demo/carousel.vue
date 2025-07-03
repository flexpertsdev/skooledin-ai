<template>
  <div class="carousel-demo">
    <LayoutContainer>
      <div class="demo-header">
        <h1>Carousel & Swipe Components</h1>
        <p>Touch-enabled carousels, page views, and masonry layouts</p>
      </div>

      <!-- Carousel Examples -->
      <section>
        <h2>Carousel Component</h2>

        <!-- Basic Carousel -->
        <div class="demo-section">
          <h3>Basic Carousel</h3>
          <p>Single item carousel with indicators and controls</p>
          <div class="carousel-wrapper">
            <Carousel
              v-model="basicCarouselIndex"
              :items="carouselImages"
              :show-indicators="true"
              :show-controls="true"
            >
              <template #slide="{ item }">
                <div class="carousel-slide">
                  <img :src="item.src" :alt="item.alt" />
                  <div class="carousel-caption">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.description }}</p>
                  </div>
                </div>
              </template>
            </Carousel>
          </div>
        </div>

        <!-- Multi-item Carousel -->
        <div class="demo-section">
          <h3>Multi-item Carousel</h3>
          <p>Shows multiple items at once with responsive columns</p>
          <div class="carousel-wrapper">
            <Carousel
              v-model="multiCarouselIndex"
              :items="products"
              :items-to-show="3"
              :items-to-scroll="1"
              :gap="24"
              :loop="true"
            >
              <template #slide="{ item }">
                <Card clickable>
                  <img :src="item.image" :alt="item.name" class="product-image" />
                  <h4>{{ item.name }}</h4>
                  <p class="product-price">${{ item.price }}</p>
                </Card>
              </template>
            </Carousel>
          </div>
        </div>

        <!-- Vertical Carousel -->
        <div class="demo-section">
          <h3>Vertical Carousel</h3>
          <p>Vertical scrolling with autoplay</p>
          <div class="carousel-wrapper vertical">
            <Carousel
              v-model="verticalCarouselIndex"
              :items="testimonials"
              orientation="vertical"
              :autoplay="true"
              :autoplay-interval="4000"
              :show-controls="false"
            >
              <template #slide="{ item }">
                <div class="testimonial">
                  <p class="testimonial-quote">"{{ item.quote }}"</p>
                  <div class="testimonial-author">
                    <img :src="item.avatar" :alt="item.name" />
                    <div>
                      <strong>{{ item.name }}</strong>
                      <span>{{ item.role }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </Carousel>
          </div>
        </div>
      </section>

      <!-- PageView Examples -->
      <section>
        <h2>PageView Component</h2>

        <!-- Full-screen PageView -->
        <div class="demo-section">
          <h3>Full-screen Page Navigation</h3>
          <p>Swipe between full-screen pages</p>
          <button @click="showPageView = true" class="demo-button">
            Open PageView Demo
          </button>
        </div>

        <!-- Inline PageView -->
        <div class="demo-section">
          <h3>Inline PageView</h3>
          <p>Embedded page navigation with effects</p>
          <div class="pageview-wrapper">
            <PageView
              v-model="pageViewIndex"
              :pages="contentPages"
              :show-indicators="true"
              :show-arrows="true"
              :parallax-effect="true"
              :fade-effect="true"
            >
              <template #page="{ page, isActive }">
                <div class="content-page" :class="{ active: isActive }">
                  <div class="page-content">
                    <h3>{{ page.title }}</h3>
                    <p>{{ page.content }}</p>
                    <button v-if="page.action" class="page-action">
                      {{ page.action }}
                    </button>
                  </div>
                </div>
              </template>
            </PageView>
          </div>
        </div>
      </section>

      <!-- MasonryGrid Examples -->
      <section>
        <h2>MasonryGrid Component</h2>

        <!-- Basic Masonry -->
        <div class="demo-section">
          <h3>Pinterest-style Layout</h3>
          <p>Responsive masonry grid with optimal item placement</p>
          <MasonryGrid
            :items="masonryItems"
            :columns="{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }"
            :gap="16"
            :animate="true"
          >
            <template #default="{ item }">
              <div class="masonry-item" :style="{ height: item.height + 'px' }">
                <img :src="item.image" :alt="item.title" />
                <div class="masonry-content">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </template>
          </MasonryGrid>
        </div>

        <!-- Mixed Content Masonry -->
        <div class="demo-section">
          <h3>Mixed Content Types</h3>
          <p>Combining different content types in masonry layout</p>
          <MasonryGrid
            :items="mixedContent"
            :columns="3"
            :gap="24"
            :fill-last-row="true"
          >
            <template #default="{ item }">
              <Card 
                :variant="item.type === 'featured' ? 'elevated' : 'outlined'"
                clickable
              >
                <img v-if="item.image" :src="item.image" :alt="item.title" />
                <div v-if="item.type === 'quote'" class="quote-content">
                  <blockquote>{{ item.content }}</blockquote>
                  <cite>- {{ item.author }}</cite>
                </div>
                <div v-else class="card-content">
                  <span class="content-type">{{ item.type }}</span>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </div>
              </Card>
            </template>
          </MasonryGrid>
        </div>
      </section>
    </LayoutContainer>

    <!-- Full-screen PageView Modal -->
    <Teleport to="body">
      <div v-if="showPageView" class="fullscreen-pageview">
        <button @click="showPageView = false" class="close-button">
          ✕
        </button>
        <PageView
          v-model="fullscreenPageIndex"
          :pages="onboardingPages"
          :show-indicators="true"
          :keyboard="true"
          :mouse-wheel="true"
          :scale-effect="true"
        >
          <template #page="{ page, index }">
            <div class="onboarding-page">
              <div class="onboarding-content">
                <div class="onboarding-icon">{{ page.icon }}</div>
                <h2>{{ page.title }}</h2>
                <p>{{ page.description }}</p>
                <button 
                  v-if="index === onboardingPages.length - 1"
                  @click="showPageView = false"
                  class="onboarding-button"
                >
                  Get Started
                </button>
              </div>
            </div>
          </template>
        </PageView>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { lazyComponent, lazyLoadOnVisible } from '~/utils/lazyComponent'
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue'
import ErrorBoundary from '~/components/ui/ErrorBoundary.vue'

// Lazy load heavy carousel components
const Carousel = lazyComponent(
  () => import('~/components/ui/Carousel.vue'),
  { 
    loadingComponent: LoadingSpinner, 
    errorComponent: ErrorBoundary,
    delay: 200 
  }
)

const PageView = lazyLoadOnVisible(
  () => import('~/components/ui/PageView.vue'),
  { rootMargin: '100px' }
)

const MasonryGrid = lazyLoadOnVisible(
  () => import('~/components/ui/MasonryGrid.vue'),
  { rootMargin: '200px' }
)

// Import Card component normally (it's lightweight)
import Card from '~/components/ui/Card.vue'

// Carousel state
const basicCarouselIndex = ref(0)
const multiCarouselIndex = ref(0)
const verticalCarouselIndex = ref(0)

// PageView state
const showPageView = ref(false)
const pageViewIndex = ref(0)
const fullscreenPageIndex = ref(0)

// Demo data
const carouselImages = [
  {
    src: 'https://picsum.photos/800/400?random=1',
    alt: 'Slide 1',
    title: 'Beautiful Landscapes',
    description: 'Discover amazing views from around the world'
  },
  {
    src: 'https://picsum.photos/800/400?random=2',
    alt: 'Slide 2',
    title: 'Urban Architecture',
    description: 'Modern buildings and cityscapes'
  },
  {
    src: 'https://picsum.photos/800/400?random=3',
    alt: 'Slide 3',
    title: 'Nature Photography',
    description: 'Capturing the beauty of the natural world'
  }
]

const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://picsum.photos/300/200?random=11' },
  { id: 2, name: 'Product 2', price: 39.99, image: 'https://picsum.photos/300/200?random=12' },
  { id: 3, name: 'Product 3', price: 49.99, image: 'https://picsum.photos/300/200?random=13' },
  { id: 4, name: 'Product 4', price: 59.99, image: 'https://picsum.photos/300/200?random=14' },
  { id: 5, name: 'Product 5', price: 69.99, image: 'https://picsum.photos/300/200?random=15' },
  { id: 6, name: 'Product 6', price: 79.99, image: 'https://picsum.photos/300/200?random=16' }
]

const testimonials = [
  {
    quote: 'This is the best product I have ever used. Highly recommended!',
    name: 'Sarah Johnson',
    role: 'CEO, TechCorp',
    avatar: 'https://picsum.photos/60/60?random=21'
  },
  {
    quote: 'Outstanding quality and exceptional customer service.',
    name: 'Mike Chen',
    role: 'Designer, Creative Studio',
    avatar: 'https://picsum.photos/60/60?random=22'
  },
  {
    quote: 'A game-changer for our business. Simply amazing!',
    name: 'Emma Davis',
    role: 'Founder, StartupX',
    avatar: 'https://picsum.photos/60/60?random=23'
  }
]

const contentPages = [
  {
    title: 'Welcome',
    content: 'Discover our amazing features and capabilities',
    action: 'Get Started'
  },
  {
    title: 'Features',
    content: 'Powerful tools designed for modern workflows',
    action: 'Learn More'
  },
  {
    title: 'Pricing',
    content: 'Flexible plans that scale with your needs',
    action: 'View Plans'
  }
]

const onboardingPages = [
  {
    icon: '👋',
    title: 'Welcome!',
    description: 'Let\'s get you started with our app'
  },
  {
    icon: '🎯',
    title: 'Set Your Goals',
    description: 'Define what you want to achieve'
  },
  {
    icon: '🚀',
    title: 'Ready to Launch',
    description: 'You\'re all set to begin your journey'
  }
]

const masonryItems = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  image: `https://picsum.photos/300/${200 + Math.random() * 200}?random=${i + 30}`,
  height: 200 + Math.random() * 200,
  title: `Item ${i + 1}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}))

const mixedContent = [
  {
    type: 'featured',
    title: 'Featured Article',
    description: 'This is a highlighted piece of content that stands out from the rest.',
    image: 'https://picsum.photos/400/300?random=40'
  },
  {
    type: 'quote',
    content: 'Design is not just what it looks like and feels like. Design is how it works.',
    author: 'Steve Jobs'
  },
  {
    type: 'article',
    title: 'Latest News',
    description: 'Stay updated with the latest happenings in the industry.',
    image: 'https://picsum.photos/400/250?random=41'
  },
  {
    type: 'gallery',
    title: 'Photo Collection',
    description: 'A curated selection of beautiful images.',
    image: 'https://picsum.photos/400/400?random=42'
  },
  {
    type: 'quote',
    content: 'The details are not the details. They make the design.',
    author: 'Charles Eames'
  },
  {
    type: 'article',
    title: 'Design Trends',
    description: 'Exploring the latest trends in modern design.',
    image: 'https://picsum.photos/400/280?random=43'
  }
]
</script>

<style scoped>
.carousel-demo {
  min-height: 100vh;
  padding-bottom: var(--spacing-5xl);
}

.demo-header {
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.demo-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
}

.demo-header p {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
}

section {
  margin-bottom: var(--spacing-5xl);
}

section h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-2xl);
}

.demo-section {
  margin-bottom: var(--spacing-3xl);
}

.demo-section h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.demo-section > p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

/* Carousel Styles */
.carousel-wrapper {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.carousel-wrapper.vertical {
  max-width: 600px;
  height: 300px;
  margin: 0 auto var(--spacing-lg);
}

.carousel-slide {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: var(--spacing-xl);
}

.carousel-caption h4 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: var(--spacing-md);
}

.product-price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.testimonial {
  padding: var(--spacing-xl);
  text-align: center;
}

.testimonial-quote {
  font-size: var(--font-size-lg);
  font-style: italic;
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.testimonial-author img {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
}

.testimonial-author strong {
  display: block;
  margin-bottom: var(--spacing-xs);
}

.testimonial-author span {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* PageView Styles */
.pageview-wrapper {
  height: 500px;
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.content-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
}

.page-content h3 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
}

.page-content p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.page-action {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background var(--transition-fast) var(--easing-standard);
}

.page-action:hover {
  background: var(--color-primary-600);
}

/* Fullscreen PageView */
.fullscreen-pageview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: var(--background);
}

.close-button {
  position: absolute;
  top: var(--spacing-xl);
  right: var(--spacing-xl);
  z-index: 10;
  width: 48px;
  height: 48px;
  background: var(--surface-overlay);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: var(--font-size-xl);
  transition: all var(--transition-fast) var(--easing-standard);
}

.close-button:hover {
  background: var(--surface-card);
  border-color: var(--border-strong);
}

.onboarding-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.onboarding-content {
  max-width: 500px;
  padding: var(--spacing-2xl);
}

.onboarding-icon {
  font-size: 80px;
  margin-bottom: var(--spacing-xl);
}

.onboarding-content h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
}

.onboarding-content p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.onboarding-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background var(--transition-fast) var(--easing-standard);
}

.onboarding-button:hover {
  background: var(--color-primary-600);
}

/* Masonry Styles */
.masonry-item {
  background: var(--surface-card);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-fast) var(--easing-standard);
}

.masonry-item:hover {
  transform: translateY(-4px);
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
}

.masonry-content {
  padding: var(--spacing-md);
}

.masonry-content h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xs);
}

.masonry-content p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.quote-content {
  padding: var(--spacing-xl);
  text-align: center;
}

.quote-content blockquote {
  font-size: var(--font-size-lg);
  font-style: italic;
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.quote-content cite {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.card-content {
  padding: var(--spacing-md);
}

.content-type {
  display: inline-block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.demo-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background var(--transition-fast) var(--easing-standard);
}

.demo-button:hover {
  background: var(--color-primary-600);
}

/* Dark mode adjustments */
.dark-mode .carousel-wrapper,
.dark-mode .pageview-wrapper {
  background: var(--surface-card);
}
</style>