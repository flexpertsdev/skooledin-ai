<template>
  <div class="content-demo">
    <LayoutSafeArea :top="true">
      <LayoutContainer>
        <LayoutStack :spacing="'xl'">
          <div class="demo-header">
            <h1>Content Layout Components</h1>
            <p>Responsive grids, cards, and content organization patterns</p>
          </div>

          <!-- CardGrid Demo -->
          <section>
            <h2>CardGrid Component</h2>

            <!-- Auto-fill Grid -->
            <div class="demo-section">
              <h3>Auto-fill Grid (Default)</h3>
              <p>Automatically fills available space with cards</p>
              <CardGrid :gap="'lg'">
                <Card
                  v-for="i in 6"
                  :key="`auto-${i}`"
                  :title="`Card ${i}`"
                  :subtitle="'Auto-fill grid layout'"
                  :image="`https://picsum.photos/400/300?random=${i}`"
                  variant="elevated"
                  clickable
                  @click="handleCardClick(i)"
                >
                  <p>
                    This card automatically sizes based on available space with a minimum width.
                  </p>
                </Card>
              </CardGrid>
            </div>

            <!-- Fixed Columns -->
            <div class="demo-section">
              <h3>Fixed Column Grid</h3>
              <p>Responsive column counts</p>
              <CardGrid :columns="{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }" :gap="'md'">
                <Card
                  v-for="i in 8"
                  :key="`fixed-${i}`"
                  :title="`Product ${i}`"
                  :subtitle="`$${(i * 10 + 9).toFixed(2)}`"
                  variant="outlined"
                >
                  <p>Fixed column layout adjusts based on breakpoints.</p>
                  <template #actions>
                    <button class="card-button">Add to Cart</button>
                  </template>
                </Card>
              </CardGrid>
            </div>

            <!-- Masonry Layout -->
            <div class="demo-section">
              <h3>Masonry Layout</h3>
              <p>Pinterest-style variable height layout</p>
              <CardGrid
                :columns="{ mobile: 1, tablet: 2, desktop: 3 }"
                :gap="'lg'"
                :masonry="true"
                :equal-height="false"
              >
                <Card
                  v-for="(item, i) in masonryItems"
                  :key="`masonry-${i}`"
                  :title="item.title"
                  :image="item.image"
                  variant="default"
                >
                  <p>{{ item.content }}</p>
                </Card>
              </CardGrid>
            </div>

            <!-- Different Card Variants -->
            <div class="demo-section">
              <h3>Card Variants</h3>
              <CardGrid :columns="4" :gap="'md'">
                <Card
                  v-for="variant in cardVariants"
                  :key="variant"
                  :title="capitalize(variant)"
                  :subtitle="'Card variant'"
                  :variant="variant as any"
                  :clickable="true"
                >
                  <p>This is a {{ variant }} card variant.</p>
                </Card>
              </CardGrid>
            </div>

            <!-- Cards without Images -->
            <div class="demo-section">
              <h3>Content Cards</h3>
              <CardGrid :columns="3" :gap="'lg'">
                <Card
                  v-for="feature in features"
                  :key="feature.title"
                  :title="feature.title"
                  variant="flat"
                  padding="lg"
                >
                  <div class="feature-icon">{{ feature.icon }}</div>
                  <p>{{ feature.description }}</p>
                  <template #actions>
                    <a href="#" class="card-link">Learn more →</a>
                  </template>
                </Card>
              </CardGrid>
            </div>

            <!-- Mixed Content Grid -->
            <div class="demo-section">
              <h3>Mixed Content Grid</h3>
              <CardGrid :columns="'auto-fit'" :min-child-width="'300px'">
                <!-- Featured Card -->
                <Card
                  title="Featured Article"
                  subtitle="5 min read"
                  :image="`https://picsum.photos/600/400?random=featured`"
                  variant="elevated"
                  clickable
                  style="grid-column: span 2"
                >
                  <p>This featured card spans two columns on larger screens for emphasis.</p>
                  <template #actions>
                    <button class="card-button card-button-primary">Read More</button>
                  </template>
                </Card>

                <!-- Regular Cards -->
                <Card
                  v-for="i in 4"
                  :key="`regular-${i}`"
                  :title="`Article ${i}`"
                  :subtitle="`${i + 2} min read`"
                  variant="default"
                  clickable
                >
                  <p>Regular sized cards fit alongside the featured content.</p>
                </Card>
              </CardGrid>
            </div>
          </section>

          <!-- Additional Examples -->
          <section>
            <h2>Common Patterns</h2>

            <!-- Team Grid -->
            <div class="demo-section">
              <h3>Team Members</h3>
              <CardGrid :columns="4" :gap="'md'">
                <Card
                  v-for="member in teamMembers"
                  :key="member.name"
                  :image="member.avatar"
                  variant="flat"
                  padding="sm"
                >
                  <template #header>
                    <h4 class="member-name">{{ member.name }}</h4>
                    <p class="member-role">{{ member.role }}</p>
                  </template>
                  <div class="member-links">
                    <a href="#" aria-label="Email">📧</a>
                    <a href="#" aria-label="LinkedIn">💼</a>
                  </div>
                </Card>
              </CardGrid>
            </div>

            <!-- Stats Grid -->
            <div class="demo-section">
              <h3>Dashboard Stats</h3>
              <CardGrid :columns="{ mobile: 2, tablet: 4 }" :gap="'md'">
                <Card v-for="stat in stats" :key="stat.label" variant="outlined" padding="lg">
                  <div class="stat-value" :style="{ color: stat.color }">
                    {{ stat.value }}
                  </div>
                  <div class="stat-label">{{ stat.label }}</div>
                  <div class="stat-change" :class="stat.trend">
                    {{ stat.change }}
                  </div>
                </Card>
              </CardGrid>
            </div>
          </section>
        </LayoutStack>
      </LayoutContainer>
    </LayoutSafeArea>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

// Card variants
const cardVariants = ['default', 'outlined', 'elevated', 'flat']

// Masonry items with variable content
const masonryItems = [
  {
    title: 'Mountain Vista',
    image: 'https://picsum.photos/400/300?random=m1',
    content: 'Breathtaking mountain views captured at golden hour. The perfect escape into nature.'
  },
  {
    title: 'Urban Architecture',
    image: 'https://picsum.photos/400/500?random=m2',
    content:
      'Modern design meets functionality in this stunning example of contemporary architecture. Clean lines and sustainable materials create a harmonious urban environment.'
  },
  {
    title: 'Ocean Waves',
    image: 'https://picsum.photos/400/250?random=m3',
    content: 'The endless rhythm of the sea.'
  },
  {
    title: 'Forest Path',
    image: 'https://picsum.photos/400/400?random=m4',
    content: 'A serene journey through ancient woods where sunlight filters through the canopy.'
  },
  {
    title: 'City Lights',
    image: 'https://picsum.photos/400/350?random=m5',
    content: 'The vibrant energy of the city comes alive after dark.'
  },
  {
    title: 'Desert Sunset',
    image: 'https://picsum.photos/400/450?random=m6',
    content:
      'Colors paint the sky as day transitions to night in the vast desert landscape. A moment of pure tranquility.'
  }
]

// Features for content cards
const features = [
  {
    icon: '🚀',
    title: 'Fast Performance',
    description: 'Optimized for speed with lazy loading and code splitting.'
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Designed from the ground up for mobile experiences.'
  },
  {
    icon: '🎨',
    title: 'Customizable',
    description: 'Flexible theming system with CSS custom properties.'
  }
]

// Team members
const teamMembers = [
  { name: 'Sarah Chen', role: 'CEO', avatar: 'https://picsum.photos/200/200?random=p1' },
  { name: 'Mike Johnson', role: 'CTO', avatar: 'https://picsum.photos/200/200?random=p2' },
  { name: 'Lisa Wang', role: 'Designer', avatar: 'https://picsum.photos/200/200?random=p3' },
  { name: 'Tom Davis', role: 'Developer', avatar: 'https://picsum.photos/200/200?random=p4' }
]

// Dashboard stats
const stats = [
  {
    label: 'Revenue',
    value: '$12.5K',
    change: '+12%',
    trend: 'positive',
    color: 'var(--success-color)'
  },
  { label: 'Users', value: '1,234', change: '+5%', trend: 'positive', color: 'var(--info-color)' },
  { label: 'Orders', value: '89', change: '-2%', trend: 'negative', color: 'var(--warning-color)' },
  { label: 'Bounce', value: '23%', change: '+1%', trend: 'negative', color: 'var(--error-color)' }
]

// Utility functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const handleCardClick = (index: number) => {
  toast.info(`Card ${index} clicked!`)
}

// Page meta
useHead({
  title: 'Content Layout Components - Mobile-First Nuxt',
  meta: [
    {
      name: 'description',
      content: 'Demo of content layout components including responsive grids and cards'
    }
  ]
})
</script>

<style scoped>
.content-demo {
  min-height: 100vh;
  padding-bottom: var(--spacing-5xl);
}

.demo-header {
  text-align: center;
  padding: var(--spacing-2xl) 0;
}

.demo-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
}

.demo-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

section {
  margin-bottom: var(--spacing-3xl);
}

section h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
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

/* Card styles */
.card-button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--surface-default);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
}

.card-button:hover {
  background-color: var(--surface-elevated);
  border-color: var(--border-strong);
}

.card-button-primary {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.card-button-primary:hover {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.card-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast) var(--easing-standard);
}

.card-link:hover {
  color: var(--color-primary-600);
  text-decoration: underline;
}

/* Feature cards */
.feature-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

/* Team cards */
.member-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.member-role {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: var(--spacing-xs) 0 0;
}

.member-links {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

.member-links a {
  font-size: var(--font-size-lg);
  text-decoration: none;
  opacity: 0.7;
  transition: opacity var(--transition-fast) var(--easing-standard);
}

.member-links a:hover {
  opacity: 1;
}

/* Stats cards */
.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.stat-change {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.stat-change.positive {
  color: var(--success-color);
}

.stat-change.negative {
  color: var(--error-color);
}

/* Dark mode adjustments */
.dark-mode .card-button {
  background-color: var(--surface-elevated);
  color: var(--text-primary);
}

.dark-mode .card-button:hover {
  background-color: var(--surface-card);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  [style*='grid-column: span 2'] {
    grid-column: span 1 !important;
  }
}
</style>
