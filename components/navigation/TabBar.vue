<template>
  <div class="tab-bar-container">
    <!-- Tab Headers -->
    <div 
      class="tab-bar"
      :class="tabBarClasses"
      role="tablist"
      :aria-label="ariaLabel"
    >
      <div ref="tabsRef" class="tab-bar-scroll">
        <div class="tab-bar-content">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            @click="selectTab(index)"
            class="tab-item"
            :class="{ active: currentIndex === index }"
            role="tab"
            :aria-selected="currentIndex === index"
            :aria-controls="`tabpanel-${tab.id}`"
            :id="`tab-${tab.id}`"
          >
            <span v-if="tab.icon" class="tab-icon">
              <component :is="tab.icon" v-if="typeof tab.icon !== 'string'" />
              <span v-else v-html="tab.icon" />
            </span>
            <span class="tab-label">{{ tab.label }}</span>
            <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
          </button>
          
          <!-- Active indicator -->
          <div 
            class="tab-indicator"
            :style="indicatorStyles"
          />
        </div>
      </div>
    </div>

    <!-- Tab Panels -->
    <div 
      ref="panelsRef"
      class="tab-panels"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div 
        class="tab-panels-wrapper"
        :style="panelsWrapperStyles"
      >
        <div
          v-for="(tab, index) in tabs"
          :key="tab.id"
          class="tab-panel"
          role="tabpanel"
          :id="`tabpanel-${tab.id}`"
          :aria-labelledby="`tab-${tab.id}`"
          :aria-hidden="currentIndex !== index"
        >
          <slot :name="`panel-${tab.id}`" :tab="tab" :index="index">
            <div class="tab-panel-default">
              {{ tab.content || `Content for ${tab.label}` }}
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'

interface Tab {
  id: string
  label: string
  icon?: any
  badge?: string | number
  content?: string
}

interface Props {
  tabs: Tab[]
  modelValue?: number
  scrollable?: boolean
  centered?: boolean
  fullWidth?: boolean
  swipeable?: boolean
  animationDuration?: number
  swipeThreshold?: number
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  scrollable: false,
  centered: false,
  fullWidth: false,
  swipeable: true,
  animationDuration: 300,
  swipeThreshold: 50,
  ariaLabel: 'Tab navigation'
})

const emit = defineEmits<{
  'update:modelValue': [index: number]
  'change': [index: number, tab: Tab]
}>()

const tabsRef = ref<HTMLElement>()
const panelsRef = ref<HTMLElement>()
const tabItemRefs = ref<HTMLElement[]>([])
const currentIndex = ref(props.modelValue)
const touchStartX = ref(0)
const touchCurrentX = ref(0)
const isDragging = ref(false)
const panelWidth = ref(0)

// Update current index when modelValue changes
watch(() => props.modelValue, (newValue) => {
  currentIndex.value = newValue
})

// Tab bar classes
const tabBarClasses = computed(() => ({
  'tab-bar-scrollable': props.scrollable,
  'tab-bar-centered': props.centered && !props.fullWidth,
  'tab-bar-full-width': props.fullWidth
}))

// Calculate indicator position and width
const indicatorStyles = computed(() => {
  if (!tabsRef.value) return {}
  
  const tabs = tabsRef.value.querySelectorAll('.tab-item')
  const activeTab = tabs[currentIndex.value] as HTMLElement
  
  if (!activeTab) return {}
  
  return {
    transform: `translateX(${activeTab.offsetLeft}px)`,
    width: `${activeTab.offsetWidth}px`
  }
})

// Panel wrapper styles for swiping
const panelsWrapperStyles = computed(() => {
  const translateX = isDragging.value
    ? -(currentIndex.value * panelWidth.value) + (touchCurrentX.value - touchStartX.value)
    : -(currentIndex.value * 100)
  
  return {
    transform: `translateX(${isDragging.value ? translateX + 'px' : translateX + '%'})`,
    transition: isDragging.value ? 'none' : `transform ${props.animationDuration}ms var(--easing-standard)`
  }
})

// Select tab
const selectTab = (index: number) => {
  if (index < 0 || index >= props.tabs.length) return
  
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('change', index, props.tabs[index])
  
  // Scroll active tab into view if scrollable
  if (props.scrollable && tabsRef.value) {
    const tabs = tabsRef.value.querySelectorAll('.tab-item')
    const activeTab = tabs[index] as HTMLElement
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }
}

// Touch handling for swipeable panels
const handleTouchStart = (e: TouchEvent) => {
  if (!props.swipeable) return
  
  touchStartX.value = e.touches[0].clientX
  touchCurrentX.value = e.touches[0].clientX
  isDragging.value = true
  panelWidth.value = panelsRef.value?.offsetWidth || 0
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || !props.swipeable) return
  
  touchCurrentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value || !props.swipeable) return
  
  const deltaX = touchCurrentX.value - touchStartX.value
  const threshold = props.swipeThreshold
  
  if (Math.abs(deltaX) > threshold) {
    if (deltaX > 0 && currentIndex.value > 0) {
      // Swipe right - go to previous tab
      selectTab(currentIndex.value - 1)
    } else if (deltaX < 0 && currentIndex.value < props.tabs.length - 1) {
      // Swipe left - go to next tab
      selectTab(currentIndex.value + 1)
    }
  }
  
  isDragging.value = false
}

// Keyboard navigation
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!tabsRef.value?.contains(e.target as Node)) return
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        selectTab(currentIndex.value - 1)
        break
      case 'ArrowRight':
        e.preventDefault()
        selectTab(currentIndex.value + 1)
        break
      case 'Home':
        e.preventDefault()
        selectTab(0)
        break
      case 'End':
        e.preventDefault()
        selectTab(props.tabs.length - 1)
        break
    }
  }
  
  tabsRef.value?.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    tabsRef.value?.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.tab-bar-container {
  width: 100%;
}

/* Tab Bar */
.tab-bar {
  position: relative;
  background-color: var(--surface-background);
  border-bottom: 1px solid var(--border-default);
  overflow: hidden;
}

.tab-bar-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tab-bar-scroll::-webkit-scrollbar {
  display: none;
}

.tab-bar-content {
  position: relative;
  display: flex;
  min-width: 100%;
}

.tab-bar-scrollable .tab-bar-content {
  width: max-content;
}

.tab-bar-centered .tab-bar-content {
  justify-content: center;
}

.tab-bar-full-width .tab-bar-content {
  width: 100%;
}

/* Tab Items */
.tab-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: none;
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  flex-shrink: 0;
}

.tab-bar-full-width .tab-item {
  flex: 1;
}

.tab-item:hover {
  color: var(--text-primary);
  background-color: var(--surface-default);
}

.tab-item.active {
  color: var(--primary-color);
}

.tab-item:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
  border-radius: var(--radius-sm);
}

/* Tab Icon */
.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 20px;
}

/* Tab Badge */
.tab-badge {
  background-color: var(--error-color);
  color: white;
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Active Indicator */
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: all var(--transition-normal) var(--easing-decelerate);
}

/* Tab Panels */
.tab-panels {
  position: relative;
  overflow: hidden;
  width: 100%;
  touch-action: pan-y;
}

.tab-panels-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.tab-panel {
  flex-shrink: 0;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.tab-panel[aria-hidden="true"] {
  visibility: hidden;
}

.tab-panel-default {
  padding: var(--spacing-lg);
  color: var(--text-secondary);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .tab-item {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
  }
  
  .tab-icon {
    width: 18px;
    height: 18px;
    font-size: 18px;
  }
}

/* Dark mode adjustments */
.dark-mode .tab-bar {
  background-color: var(--surface-card);
}

.dark-mode .tab-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .tab-indicator,
  .tab-panels-wrapper {
    transition: none !important;
  }
}
</style>