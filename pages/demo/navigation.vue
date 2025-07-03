<template>
  <div class="navigation-demo">
    <!-- Main content with NavBar -->
    <LayoutSafeArea :top="true">
      <LayoutContainer>
        <LayoutStack :spacing="'xl'">
          <div class="demo-header">
            <h1>Navigation Components Demo</h1>
            <p>Mobile-first navigation patterns with responsive behavior</p>
          </div>

          <!-- NavBar Demo -->
          <section>
            <h2>NavBar Component</h2>
            <p>The NavBar is shown at the top of this page with scroll-aware behavior.</p>
            <div class="demo-controls">
              <button @click="toggleNavTransparency" class="demo-button">
                Toggle Transparency: {{ navTransparent ? 'ON' : 'OFF' }}
              </button>
            </div>
          </section>

          <!-- SideBar Demo -->
          <section>
            <h2>SideBar Component</h2>
            <LayoutRow :gap="'md'" :wrap="true">
              <button @click="leftSidebarOpen = true" class="demo-button">
                Open Left Sidebar
              </button>
              <button @click="rightSidebarOpen = true" class="demo-button">
                Open Right Sidebar
              </button>
              <button @click="persistentSidebarOpen = true" class="demo-button">
                Open Persistent Sidebar
              </button>
            </LayoutRow>
          </section>

          <!-- BottomNav Demo -->
          <section>
            <h2>BottomNav Component</h2>
            <p>{{ isMobile ? 'Check the bottom of your screen' : 'Resize to mobile view to see the bottom navigation' }}</p>
            <div class="demo-controls">
              <button @click="toggleBottomNavLabels" class="demo-button">
                Toggle Labels: {{ showBottomNavLabels ? 'ON' : 'OFF' }}
              </button>
            </div>
          </section>

          <!-- Scroll Content -->
          <section>
            <h2>Scroll Behavior</h2>
            <p>Scroll down to see how navigation components react:</p>
            <div v-for="i in 20" :key="i" class="scroll-content">
              <p>Content block {{ i }} - Keep scrolling to see navigation behavior</p>
            </div>
          </section>
        </LayoutStack>
      </LayoutContainer>
    </LayoutSafeArea>

    <!-- Sidebars -->
    <SideBar
      v-model="leftSidebarOpen"
      position="left"
      title="Left Sidebar"
      size="md"
    >
      <LayoutStack :spacing="'md'">
        <p>This is a left-aligned sidebar with default settings.</p>
        <nav>
          <LayoutStack :spacing="'sm'">
            <a href="#" class="sidebar-link">Dashboard</a>
            <a href="#" class="sidebar-link">Profile</a>
            <a href="#" class="sidebar-link">Settings</a>
            <a href="#" class="sidebar-link">Help</a>
          </LayoutStack>
        </nav>
      </LayoutStack>
    </SideBar>

    <SideBar
      v-model="rightSidebarOpen"
      position="right"
      title="Right Sidebar"
      size="lg"
    >
      <LayoutStack :spacing="'md'">
        <p>This is a right-aligned sidebar with a larger size.</p>
        <div class="sidebar-content-demo">
          <h3>Features:</h3>
          <ul>
            <li>Swipe to close on mobile</li>
            <li>Focus trap for accessibility</li>
            <li>Backdrop click to close</li>
            <li>ESC key support</li>
          </ul>
        </div>
      </LayoutStack>
    </SideBar>

    <SideBar
      v-model="persistentSidebarOpen"
      position="left"
      title="Persistent Sidebar"
      :persistent="true"
      :show-close-button="true"
    >
      <LayoutStack :spacing="'md'">
        <p>This sidebar is persistent - it can only be closed via the close button.</p>
        <p>Clicking the backdrop won't close it.</p>
      </LayoutStack>
    </SideBar>

    <!-- Mobile Bottom Navigation -->
    <BottomNav
      v-if="isMobile"
      :nav-items="bottomNavItems"
      v-model:active-id="activeNavId"
      :show-labels="showBottomNavLabels"
      :hide-on-scroll="true"
    />
  </div>
</template>

<script setup lang="ts">
const { isMobile } = useResponsive()

// NavBar state
const navTransparent = ref(false)

// SideBar states
const leftSidebarOpen = ref(false)
const rightSidebarOpen = ref(false)
const persistentSidebarOpen = ref(false)

// BottomNav state
const showBottomNavLabels = ref(true)
const activeNavId = ref('home')

// Bottom navigation items
const bottomNavItems = [
  {
    id: 'home',
    label: 'Home',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    to: '/'
  },
  {
    id: 'search',
    label: 'Search',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    action: () => console.log('Search clicked')
  },
  {
    id: 'notifications',
    label: 'Alerts',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    badge: '3',
    action: () => console.log('Notifications clicked')
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    to: '/demo/navigation'
  }
]

const toggleNavTransparency = () => {
  navTransparent.value = !navTransparent.value
  // This would typically be handled through props on the NavBar
  console.log('NavBar transparency:', navTransparent.value)
}

const toggleBottomNavLabels = () => {
  showBottomNavLabels.value = !showBottomNavLabels.value
}

// Page meta
useHead({
  title: 'Navigation Components - Mobile-First Nuxt',
  meta: [
    { name: 'description', content: 'Demo of mobile-first navigation components' }
  ]
})
</script>

<style scoped>
.navigation-demo {
  min-height: 200vh; /* Ensure scrollable content */
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
  margin-bottom: var(--spacing-2xl);
}

section h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
}

section p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.demo-controls {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.demo-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
}

.demo-button:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-1px);
}

.demo-button:active {
  transform: translateY(0);
}

.scroll-content {
  padding: var(--spacing-lg);
  background-color: var(--surface-default);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.scroll-content p {
  margin: 0;
  color: var(--text-secondary);
}

/* Sidebar content styles */
.sidebar-link {
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast) var(--easing-standard);
}

.sidebar-link:hover {
  background-color: var(--surface-default);
}

.sidebar-content-demo h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.sidebar-content-demo ul {
  list-style: none;
  padding: 0;
}

.sidebar-content-demo li {
  padding: var(--spacing-xs) 0;
  color: var(--text-secondary);
}

.sidebar-content-demo li::before {
  content: '✓ ';
  color: var(--success-color);
  font-weight: var(--font-weight-bold);
}

/* Dark mode adjustments */
.dark-mode .scroll-content {
  background-color: var(--surface-card);
}

.dark-mode .demo-button {
  background-color: var(--color-primary-600);
}

.dark-mode .demo-button:hover {
  background-color: var(--color-primary-500);
}
</style>