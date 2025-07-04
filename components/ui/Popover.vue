<template>
  <div ref="triggerRef" class="popover-trigger">
    <slot name="trigger" :toggle="toggle" :is-open="isOpen" />

    <Teleport to="body">
      <Transition name="popover">
        <div
          v-if="isOpen"
          ref="popoverRef"
          class="popover"
          :class="popoverClasses"
          :style="popoverStyles"
          role="tooltip"
          :aria-hidden="!isOpen"
        >
          <!-- Arrow -->
          <div
            v-if="showArrow"
            class="popover-arrow"
            :class="`popover-arrow-${arrowPlacement}`"
            :style="arrowStyles"
          />

          <!-- Content -->
          <div class="popover-content">
            <slot :close="close" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
  type Strategy,
  type Middleware
} from '@floating-ui/vue'
import { onClickOutside, useEventListener } from '@vueuse/core'

interface Props {
  modelValue?: boolean
  placement?: Placement
  strategy?: Strategy
  offsetValue?: number
  showArrow?: boolean
  triggers?: Array<'click' | 'hover' | 'focus'>
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  delay?: number | { open?: number; close?: number }
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
  strategy: 'absolute',
  offsetValue: 8,
  showArrow: true,
  triggers: () => ['click'],
  closeOnClickOutside: true,
  closeOnEscape: true,
  delay: 0,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

// Refs
const triggerRef = ref<HTMLElement>()
const popoverRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

// State
const internalOpen = ref(false)
const hoverTimeout = ref<number>()

// Computed
const isOpen = computed({
  get: () => props.modelValue ?? internalOpen.value,
  set: value => {
    internalOpen.value = value
    emit('update:modelValue', value)
  }
})

const popoverClasses = computed(() => ({
  [`popover-${props.placement.split('-')[0]}`]: true,
  'popover-open': isOpen.value
}))

const arrowPlacement = computed(() => {
  const [side] = props.placement.split('-')
  const oppositeSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }
  return oppositeSide[side as keyof typeof oppositeSide]
})

const openDelay = computed(() =>
  typeof props.delay === 'number' ? props.delay : (props.delay.open ?? 0)
)

const closeDelay = computed(() =>
  typeof props.delay === 'number' ? props.delay : (props.delay.close ?? 0)
)

// Floating UI setup
const middleware = computed<Middleware[]>(() => [
  offset(props.offsetValue),
  flip({
    fallbackPlacements: ['top', 'bottom', 'left', 'right']
  }),
  shift({
    padding: 16
  }),
  ...(props.showArrow && arrowRef.value ? [arrow({ element: arrowRef.value })] : [])
])

const { floatingStyles, middlewareData } = useFloating(triggerRef, popoverRef, {
  placement: props.placement,
  strategy: props.strategy,
  middleware,
  whileElementsMounted: autoUpdate
})

// Popover styles
const popoverStyles = computed(() => ({
  ...floatingStyles.value,
  zIndex: 'var(--z-index-popover)'
}))

// Arrow styles
const arrowStyles = computed(() => {
  if (!middlewareData.value.arrow) return {}

  const { x, y } = middlewareData.value.arrow
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[props.placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left']

  return {
    left: x != null ? `${x}px` : '',
    top: y != null ? `${y}px` : '',
    [staticSide]: '-4px'
  }
})

// Methods
const open = () => {
  if (!props.disabled && !isOpen.value) {
    clearTimeout(hoverTimeout.value)
    if (openDelay.value > 0) {
      hoverTimeout.value = window.setTimeout(() => {
        isOpen.value = true
        emit('open')
      }, openDelay.value)
    } else {
      isOpen.value = true
      emit('open')
    }
  }
}

const close = () => {
  clearTimeout(hoverTimeout.value)
  if (closeDelay.value > 0) {
    hoverTimeout.value = window.setTimeout(() => {
      isOpen.value = false
      emit('close')
    }, closeDelay.value)
  } else {
    isOpen.value = false
    emit('close')
  }
}

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

// Event handlers
const handleClick = () => {
  if (props.triggers.includes('click')) {
    toggle()
  }
}

const handleMouseEnter = () => {
  if (props.triggers.includes('hover')) {
    open()
  }
}

const handleMouseLeave = () => {
  if (props.triggers.includes('hover')) {
    close()
  }
}

const handleFocus = () => {
  if (props.triggers.includes('focus')) {
    open()
  }
}

const handleBlur = () => {
  if (props.triggers.includes('focus')) {
    close()
  }
}

// Setup event listeners
onMounted(() => {
  if (!triggerRef.value) return

  const trigger = triggerRef.value.children[0] as HTMLElement
  if (!trigger) return

  if (props.triggers.includes('click')) {
    trigger.addEventListener('click', handleClick)
  }

  if (props.triggers.includes('hover')) {
    trigger.addEventListener('mouseenter', handleMouseEnter)
    trigger.addEventListener('mouseleave', handleMouseLeave)
    popoverRef.value?.addEventListener('mouseenter', handleMouseEnter)
    popoverRef.value?.addEventListener('mouseleave', handleMouseLeave)
  }

  if (props.triggers.includes('focus')) {
    trigger.addEventListener('focus', handleFocus)
    trigger.addEventListener('blur', handleBlur)
  }
})

// Click outside
if (props.closeOnClickOutside) {
  onClickOutside(
    popoverRef,
    () => {
      if (isOpen.value) {
        close()
      }
    },
    { ignore: [triggerRef] }
  )
}

// Escape key
if (props.closeOnEscape) {
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      close()
    }
  })
}

// Cleanup
onUnmounted(() => {
  clearTimeout(hoverTimeout.value)
})

// Expose
defineExpose({
  open,
  close,
  toggle
})
</script>

<style scoped>
/* Trigger */
.popover-trigger {
  display: inline-block;
}

/* Popover */
.popover {
  position: absolute;
  background-color: var(--surface-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-default);
  max-width: 320px;
  min-width: 200px;
  overflow: hidden;
}

/* Arrow */
.popover-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: inherit;
  transform: rotate(45deg);
  border: 1px solid var(--border-default);
}

.popover-arrow-top {
  border-bottom: none;
  border-right: none;
}

.popover-arrow-right {
  border-bottom: none;
  border-left: none;
}

.popover-arrow-bottom {
  border-top: none;
  border-left: none;
}

.popover-arrow-left {
  border-top: none;
  border-right: none;
}

/* Content */
.popover-content {
  position: relative;
  z-index: 1;
  padding: var(--spacing-md);
  background-color: inherit;
  border-radius: inherit;
}

/* Transitions */
.popover-enter-active {
  transition: all var(--transition-fast) var(--easing-decelerate);
}

.popover-leave-active {
  transition: all var(--transition-fast) var(--easing-accelerate);
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Dark mode */
.dark-mode .popover {
  background-color: var(--surface-elevated);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .popover {
    max-width: calc(100vw - var(--spacing-xl));
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .popover-enter-active,
  .popover-leave-active {
    transition: opacity var(--transition-fast) var(--easing-standard);
  }

  .popover-enter-from,
  .popover-leave-to {
    transform: none;
  }
}
</style>
