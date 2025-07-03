<template>
  <div class="overlays-demo">
    <LayoutSafeArea :top="true">
      <LayoutContainer>
        <LayoutStack :spacing="'xl'">
          <div class="demo-header">
            <h1>Overlay Components Demo</h1>
            <p>Modals, sheets, drawers, and notifications for mobile-first experiences</p>
          </div>

          <!-- Modal Demo -->
          <section>
            <h2>Modal Component</h2>
            <LayoutRow :gap="'md'" :wrap="true">
              <button @click="modalSmall = true" class="demo-button">
                Small Modal
              </button>
              <button @click="modalLarge = true" class="demo-button">
                Large Modal
              </button>
              <button @click="modalFullscreen = true" class="demo-button">
                Fullscreen Modal
              </button>
              <button @click="modalPersistent = true" class="demo-button">
                Persistent Modal
              </button>
            </LayoutRow>
          </section>

          <!-- BottomSheet Demo -->
          <section>
            <h2>BottomSheet Component</h2>
            <LayoutRow :gap="'md'" :wrap="true">
              <button @click="bottomSheetBasic = true" class="demo-button">
                Basic Bottom Sheet
              </button>
              <button @click="bottomSheetSnapPoints = true" class="demo-button">
                With Snap Points
              </button>
              <button @click="bottomSheetNoSwipe = true" class="demo-button">
                No Swipe to Close
              </button>
            </LayoutRow>
          </section>

          <!-- ActionSheet Demo -->
          <section>
            <h2>ActionSheet Component</h2>
            <LayoutRow :gap="'md'" :wrap="true">
              <button @click="actionSheetBasic = true" class="demo-button">
                Basic Actions
              </button>
              <button @click="actionSheetDestructive = true" class="demo-button">
                With Destructive Action
              </button>
              <button @click="actionSheetIcons = true" class="demo-button">
                With Icons
              </button>
            </LayoutRow>
          </section>

          <!-- Drawer Demo -->
          <section>
            <h2>Drawer Component</h2>
            <LayoutGrid :cols="{ mobile: 2, tablet: 4 }" :gap="'md'">
              <button @click="drawerLeft = true" class="demo-button">
                Left Drawer
              </button>
              <button @click="drawerRight = true" class="demo-button">
                Right Drawer
              </button>
              <button @click="drawerTop = true" class="demo-button">
                Top Drawer
              </button>
              <button @click="drawerBottom = true" class="demo-button">
                Bottom Drawer
              </button>
            </LayoutGrid>
          </section>

          <!-- Toast Demo -->
          <section>
            <h2>Toast Notifications</h2>
            <LayoutGrid :cols="{ mobile: 2, tablet: 4 }" :gap="'md'">
              <button @click="showInfoToast" class="demo-button">
                Info Toast
              </button>
              <button @click="showSuccessToast" class="demo-button">
                Success Toast
              </button>
              <button @click="showWarningToast" class="demo-button">
                Warning Toast
              </button>
              <button @click="showErrorToast" class="demo-button">
                Error Toast
              </button>
            </LayoutGrid>
            <LayoutRow :gap="'md'" :wrap="true" style="margin-top: var(--spacing-md)">
              <button @click="showActionToast" class="demo-button">
                With Action
              </button>
              <button @click="showClickableToast" class="demo-button">
                Clickable Toast
              </button>
              <button @click="showPersistentToast" class="demo-button">
                Persistent Toast
              </button>
            </LayoutRow>
          </section>

          <!-- TabBar Demo -->
          <section>
            <h2>TabBar Component</h2>
            <TabBar
              v-model="activeTab"
              :tabs="tabs"
              :swipeable="true"
            >
              <template #panel-tab1>
                <div class="tab-content">
                  <h3>Dashboard Content</h3>
                  <p>This is the dashboard tab content. You can swipe between tabs on mobile!</p>
                </div>
              </template>
              <template #panel-tab2>
                <div class="tab-content">
                  <h3>Analytics Content</h3>
                  <p>Analytics and charts would go here.</p>
                </div>
              </template>
              <template #panel-tab3>
                <div class="tab-content">
                  <h3>Reports Content</h3>
                  <p>Various reports and data exports.</p>
                </div>
              </template>
              <template #panel-tab4>
                <div class="tab-content">
                  <h3>Settings Content</h3>
                  <p>Application settings and configuration.</p>
                </div>
              </template>
            </TabBar>
          </section>

          <!-- Popover Demo -->
          <section>
            <h2>Popover Component</h2>
            <LayoutRow :gap="'md'" :wrap="true">
              <Popover placement="top">
                <template #trigger="{ toggle }">
                  <button @click="toggle" class="demo-button">
                    Click Popover
                  </button>
                </template>
                <div>
                  <h4 style="margin-top: 0">Click Triggered</h4>
                  <p>This popover appears on click. Click outside or press ESC to close.</p>
                </div>
              </Popover>

              <Popover :triggers="['hover']" placement="right">
                <template #trigger>
                  <button class="demo-button">
                    Hover Popover
                  </button>
                </template>
                <div>
                  <h4 style="margin-top: 0">Hover Triggered</h4>
                  <p>This popover appears on hover with smooth transitions.</p>
                </div>
              </Popover>

              <Popover placement="bottom" :show-arrow="false">
                <template #trigger="{ toggle }">
                  <button @click="toggle" class="demo-button">
                    No Arrow
                  </button>
                </template>
                <div>
                  <p>This popover has no arrow pointer.</p>
                </div>
              </Popover>

              <Popover placement="left">
                <template #trigger="{ toggle, isOpen }">
                  <button @click="toggle" class="demo-button" :class="{ active: isOpen }">
                    {{ isOpen ? 'Close' : 'Open' }} Menu
                  </button>
                </template>
                <template #default="{ close }">
                  <div class="popover-menu">
                    <button @click="close" class="menu-item">Profile</button>
                    <button @click="close" class="menu-item">Settings</button>
                    <button @click="close" class="menu-item">Help</button>
                    <hr />
                    <button @click="close" class="menu-item">Logout</button>
                  </div>
                </template>
              </Popover>
            </LayoutRow>
          </section>

          <!-- Tooltip Demo -->
          <section>
            <h2>Tooltip Component</h2>
            <LayoutRow :gap="'lg'" :wrap="true">
              <Tooltip content="This is a helpful tooltip" placement="top">
                <button class="demo-button">
                  Top Tooltip
                </button>
              </Tooltip>

              <Tooltip content="Appears on the right side" placement="right">
                <button class="demo-button">
                  Right Tooltip
                </button>
              </Tooltip>

              <Tooltip content="Bottom positioned tooltip" placement="bottom">
                <button class="demo-button">
                  Bottom Tooltip
                </button>
              </Tooltip>

              <Tooltip placement="left">
                <template #default>
                  <button class="demo-button">
                    Custom Content
                  </button>
                </template>
                <template #content>
                  <div>
                    <strong>Rich Content Tooltip</strong>
                    <p style="margin: 4px 0 0">You can add any content here!</p>
                  </div>
                </template>
              </Tooltip>

              <Tooltip content="This tooltip has no arrow" :show-arrow="false">
                <span class="demo-link">Hover over this link</span>
              </Tooltip>
            </LayoutRow>
          </section>
        </LayoutStack>
      </LayoutContainer>
    </LayoutSafeArea>

    <!-- Modals -->
    <Modal
      v-model="modalSmall"
      title="Small Modal"
      size="sm"
    >
      <p>This is a small modal dialog. Perfect for confirmations and simple messages.</p>
    </Modal>

    <Modal
      v-model="modalLarge"
      title="Large Modal"
      size="lg"
    >
      <LayoutStack :spacing="'md'">
        <p>This is a large modal with more content space.</p>
        <p>You can add forms, lists, or any other content here.</p>
        <div class="demo-content-box">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </LayoutStack>
    </Modal>

    <Modal
      v-model="modalFullscreen"
      title="Fullscreen Modal"
      :fullscreen="true"
    >
      <LayoutStack :spacing="'lg'">
        <p>This modal takes up the full screen.</p>
        <p>Great for immersive experiences or complex forms.</p>
      </LayoutStack>
    </Modal>

    <Modal
      v-model="modalPersistent"
      title="Persistent Modal"
      :persistent="true"
      :close-on-escape="false"
      :close-on-backdrop="false"
    >
      <p>This modal can only be closed by clicking the close button.</p>
      <p>Clicking outside or pressing ESC won't close it.</p>
    </Modal>

    <!-- Bottom Sheets -->
    <BottomSheet
      v-model="bottomSheetBasic"
      title="Basic Bottom Sheet"
    >
      <LayoutStack :spacing="'md'">
        <p>This is a basic bottom sheet. Drag down to close on mobile!</p>
        <p>It automatically adjusts its height based on content.</p>
      </LayoutStack>
    </BottomSheet>

    <BottomSheet
      v-model="bottomSheetSnapPoints"
      title="Snap Points Demo"
      :snap-points="['25%', '50%', '90%']"
      :default-snap-point="1"
    >
      <LayoutStack :spacing="'md'">
        <p>This sheet has multiple snap points: 25%, 50%, and 90% of screen height.</p>
        <p>Drag up or down to snap between different heights!</p>
        <div v-for="i in 10" :key="i" class="demo-content-box">
          <p>Content item {{ i }}</p>
        </div>
      </LayoutStack>
    </BottomSheet>

    <BottomSheet
      v-model="bottomSheetNoSwipe"
      title="No Swipe Sheet"
      :swipe-to-close="false"
      :show-handle="false"
    >
      <p>This sheet cannot be dismissed by swiping. Use the close button instead.</p>
    </BottomSheet>

    <!-- Action Sheets -->
    <ActionSheet
      v-model="actionSheetBasic"
      title="Choose an Option"
      :actions="basicActions"
    />

    <ActionSheet
      v-model="actionSheetDestructive"
      title="Are you sure?"
      description="This action cannot be undone."
      :actions="destructiveActions"
    />

    <ActionSheet
      v-model="actionSheetIcons"
      :actions="iconActions"
    />

    <!-- Drawers -->
    <Drawer
      v-model="drawerLeft"
      position="left"
      title="Left Drawer"
    >
      <LayoutStack :spacing="'md'">
        <p>This drawer slides in from the left.</p>
        <p>Swipe left to close on mobile devices.</p>
      </LayoutStack>
    </Drawer>

    <Drawer
      v-model="drawerRight"
      position="right"
      title="Right Drawer"
      size="lg"
    >
      <LayoutStack :spacing="'md'">
        <p>This drawer slides in from the right with a larger size.</p>
        <p>Perfect for filters, settings, or additional navigation.</p>
      </LayoutStack>
    </Drawer>

    <Drawer
      v-model="drawerTop"
      position="top"
      title="Top Drawer"
    >
      <p>This drawer slides down from the top. Great for notifications or alerts.</p>
    </Drawer>

    <Drawer
      v-model="drawerBottom"
      position="bottom"
      title="Bottom Drawer"
    >
      <p>This drawer slides up from the bottom. Similar to a bottom sheet but with different styling.</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

// Modal states
const modalSmall = ref(false)
const modalLarge = ref(false)
const modalFullscreen = ref(false)
const modalPersistent = ref(false)

// BottomSheet states
const bottomSheetBasic = ref(false)
const bottomSheetSnapPoints = ref(false)
const bottomSheetNoSwipe = ref(false)

// ActionSheet states
const actionSheetBasic = ref(false)
const actionSheetDestructive = ref(false)
const actionSheetIcons = ref(false)

// Drawer states
const drawerLeft = ref(false)
const drawerRight = ref(false)
const drawerTop = ref(false)
const drawerBottom = ref(false)

// TabBar state
const activeTab = ref(0)
const tabs = [
  { id: 'tab1', label: 'Dashboard' },
  { id: 'tab2', label: 'Analytics' },
  { id: 'tab3', label: 'Reports' },
  { id: 'tab4', label: 'Settings' }
]

// Action sheet actions
const basicActions = [
  { label: 'Share', action: () => console.log('Share clicked') },
  { label: 'Copy Link', action: () => console.log('Copy clicked') },
  { label: 'Edit', action: () => console.log('Edit clicked') }
]

const destructiveActions = [
  { label: 'Delete Item', destructive: true, action: () => console.log('Delete clicked') },
  { label: 'Archive', action: () => console.log('Archive clicked') }
]

const iconActions = [
  { 
    label: 'Camera',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    action: () => console.log('Camera clicked')
  },
  {
    label: 'Photo Library',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    action: () => console.log('Photo library clicked')
  },
  {
    label: 'Documents',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    action: () => console.log('Documents clicked')
  }
]

// Toast demos
const showInfoToast = () => {
  toast.info({
    title: 'Information',
    description: 'This is an informational message.'
  })
}

const showSuccessToast = () => {
  toast.success({
    title: 'Success!',
    description: 'Your changes have been saved.'
  })
}

const showWarningToast = () => {
  toast.warning({
    title: 'Warning',
    description: 'Please review your input before continuing.'
  })
}

const showErrorToast = () => {
  toast.error({
    title: 'Error',
    description: 'Something went wrong. Please try again.'
  })
}

const showActionToast = () => {
  toast.show({
    type: 'info',
    title: 'New Message',
    description: 'You have a new message from John Doe.',
    action: {
      label: 'View',
      action: () => console.log('View clicked')
    }
  })
}

const showClickableToast = () => {
  toast.show({
    type: 'success',
    title: 'File Uploaded',
    description: 'Click to view your uploaded file.',
    onClick: () => console.log('Toast clicked')
  })
}

const showPersistentToast = () => {
  toast.show({
    type: 'warning',
    title: 'Persistent Notification',
    description: 'This notification will stay until manually dismissed.',
    duration: 0,
    closable: true
  })
}

// Page meta
useHead({
  title: 'Overlay Components - Mobile-First Nuxt',
  meta: [
    { name: 'description', content: 'Demo of overlay components including modals, sheets, and toasts' }
  ]
})
</script>

<style scoped>
.overlays-demo {
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
  margin-bottom: var(--spacing-2xl);
}

section h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
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

.demo-content-box {
  padding: var(--spacing-md);
  background-color: var(--surface-default);
  border-radius: var(--radius-md);
  margin: var(--spacing-sm) 0;
}

.tab-content {
  padding: var(--spacing-lg);
  min-height: 200px;
}

.tab-content h3 {
  margin-bottom: var(--spacing-md);
}

/* Dark mode adjustments */
.dark-mode .demo-button {
  background-color: var(--color-primary-600);
}

.dark-mode .demo-button:hover {
  background-color: var(--color-primary-500);
}

.dark-mode .demo-content-box {
  background-color: var(--surface-card);
}

/* Popover styles */
.popover-menu {
  min-width: 200px;
}

.menu-item {
  display: block;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  text-align: left;
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color var(--transition-fast) var(--easing-standard);
}

.menu-item:hover {
  background-color: var(--surface-default);
}

.popover-menu hr {
  margin: var(--spacing-xs) 0;
  border: none;
  border-top: 1px solid var(--border-default);
}

.demo-button.active {
  background-color: var(--color-primary-700);
}

.demo-link {
  color: var(--primary-color);
  text-decoration: underline;
  cursor: pointer;
}
</style>