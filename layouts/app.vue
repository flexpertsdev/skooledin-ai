<template>
  <div class="app-layout">
    <!-- Top Navigation -->
    <header class="app-header">
      <LayoutContainer>
        <div class="header-content">
          <div class="header-left">
            <NuxtLink to="/app" class="app-logo">
              <Icon name="mdi:school" class="logo-icon" />
              <span class="logo-text">Skooledin AI</span>
            </NuxtLink>
          </div>

          <div class="header-center">
            <!-- Context Switcher -->
            <button class="context-switcher">
              <Icon name="mdi:book-open-variant" class="context-icon" />
              <span class="context-label">{{ currentContext }}</span>
              <Icon name="mdi:chevron-down" class="dropdown-icon" />
            </button>
          </div>

          <div class="header-right">
            <!-- Notifications -->
            <button class="header-icon-btn">
              <Icon name="mdi:bell" />
              <span class="notification-badge">3</span>
            </button>

            <!-- User Menu -->
            <button class="user-menu-btn">
              <Avatar 
                :src="userAvatar" 
                :name="userName" 
                size="sm" 
              />
            </button>
          </div>
        </div>
      </LayoutContainer>
    </header>

    <!-- Main Content Area -->
    <main class="app-main">
      <slot />
    </main>

    <!-- Bottom Navigation (Mobile) -->
    <BottomNav 
      :items="bottomNavItems" 
      class="app-bottom-nav"
    />
  </div>
</template>

<script setup lang="ts">
// Mock data - replace with actual store/composable
const currentContext = ref('Mathematics')
const userName = ref('Student Name')
const userAvatar = ref('')

const bottomNavItems = [
  {
    id: 'chat',
    label: 'Chat',
    icon: 'mdi:message-text',
    to: '/app/chat'
  },
  {
    id: 'notebook',
    label: 'Notebook',
    icon: 'mdi:notebook',
    to: '/app/notebook'
  },
  {
    id: 'study',
    label: 'Study',
    icon: 'mdi:school',
    to: '/app/study'
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: 'mdi:chart-line',
    to: '/app/progress'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'mdi:cog',
    to: '/app/settings'
  }
]
</script>

<style scoped>
.app-layout {
  min-height: var(--viewport-height);
  display: flex;
  flex-direction: column;
  background-color: var(--surface-background);
}

/* Header */
.app-header {
  background-color: var(--surface-card);
  border-bottom: 1px solid var(--border-default);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: var(--spacing-lg);
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* Logo */
.app-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.logo-icon {
  width: 28px;
  height: 28px;
  color: var(--primary-color);
}

.logo-text {
  font-size: var(--font-size-lg);
  display: none;
}

/* Context Switcher */
.context-switcher {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--surface-default);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast) var(--easing-standard);
  cursor: pointer;
}

.context-switcher:hover {
  background-color: var(--surface-background);
  border-color: var(--primary-color);
}

.context-icon {
  width: 20px;
  height: 20px;
  color: var(--primary-color);
}

.context-label {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
}

/* Header Buttons */
.header-icon-btn,
.user-menu-btn {
  position: relative;
  padding: var(--spacing-sm);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  transition: all var(--transition-fast) var(--easing-standard);
  cursor: pointer;
  background: none;
  border: none;
}

.header-icon-btn:hover,
.user-menu-btn:hover {
  background-color: var(--surface-default);
  color: var(--text-primary);
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: var(--error-color);
  color: white;
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  padding: 2px 5px;
  border-radius: var(--radius-full);
  min-width: 16px;
  text-align: center;
}

/* Main Content */
.app-main {
  flex: 1;
  padding-bottom: calc(var(--spacing-touch) + var(--safe-area-inset-bottom) + var(--spacing-lg));
}

/* Bottom Navigation */
.app-bottom-nav {
  display: none;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .header-content {
    height: 56px;
  }

  .logo-text {
    display: none;
  }

  .context-label {
    max-width: 120px;
    font-size: var(--font-size-sm);
  }

  .app-bottom-nav {
    display: flex;
  }

  .app-main {
    padding-bottom: calc(var(--spacing-16) + var(--safe-area-inset-bottom));
  }
}

/* Tablet and up */
@media (min-width: 769px) {
  .logo-text {
    display: block;
  }

  .app-main {
    padding-bottom: var(--spacing-2xl);
  }
}

/* Dark mode adjustments */
.dark-mode .app-header {
  background-color: var(--surface-elevated);
}

.dark-mode .context-switcher {
  background-color: var(--surface-card);
}

.dark-mode .context-switcher:hover {
  background-color: var(--surface-elevated);
}
</style>