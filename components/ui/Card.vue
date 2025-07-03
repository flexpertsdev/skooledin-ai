<template>
  <article 
    class="card" 
    :class="cardClasses"
    @click="handleClick"
  >
    <!-- Image -->
    <div v-if="$slots.image || image" class="card-image">
      <slot name="image">
        <img 
          v-if="image" 
          :src="image" 
          :alt="imageAlt || title"
          :loading="loading"
        />
      </slot>
    </div>

    <!-- Header -->
    <header v-if="$slots.header || title || subtitle" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </slot>
    </header>

    <!-- Content -->
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>

    <!-- Actions -->
    <footer v-if="$slots.actions" class="card-actions">
      <slot name="actions" />
    </footer>
  </article>
</template>

<script setup lang="ts">
type Variant = 'default' | 'outlined' | 'elevated' | 'flat'
type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  title?: string
  subtitle?: string
  image?: string
  imageAlt?: string
  variant?: Variant
  padding?: Padding
  clickable?: boolean
  disabled?: boolean
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  clickable: false,
  disabled: false,
  loading: 'lazy'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Card classes
const cardClasses = computed(() => ({
  [`card-${props.variant}`]: true,
  [`card-padding-${props.padding}`]: true,
  'card-clickable': props.clickable && !props.disabled,
  'card-disabled': props.disabled
}))

// Handle click
const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Base card */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-fast) var(--easing-standard);
}

/* Variants */
.card-default {
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-default);
}

.card-outlined {
  border: 1px solid var(--border-strong);
}

.card-elevated {
  box-shadow: var(--shadow-md);
}

.card-flat {
  background-color: var(--surface-default);
}

/* Clickable state */
.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  transform: translateY(-2px);
}

.card-default.card-clickable:hover {
  box-shadow: var(--shadow-md);
}

.card-elevated.card-clickable:hover {
  box-shadow: var(--shadow-lg);
}

.card-outlined.card-clickable:hover {
  border-color: var(--primary-color);
}

.card-clickable:active {
  transform: translateY(0);
}

/* Disabled state */
.card-disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Image */
.card-image {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  background-color: var(--surface-default);
}

.card-image img,
.card-image > :deep(img) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Header */
.card-header {
  padding: var(--spacing-lg);
  padding-bottom: 0;
}

.card-padding-none .card-header {
  padding: var(--spacing-lg);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--text-primary);
  margin: 0;
}

.card-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: var(--spacing-xs) 0 0;
}

/* Content */
.card-content {
  flex: 1;
  padding: var(--spacing-lg);
}

.card-header + .card-content {
  padding-top: var(--spacing-md);
}

/* Padding variants */
.card-padding-none .card-content {
  padding: 0;
}

.card-padding-sm .card-header,
.card-padding-sm .card-content,
.card-padding-sm .card-actions {
  padding: var(--spacing-sm);
}

.card-padding-lg .card-header,
.card-padding-lg .card-content,
.card-padding-lg .card-actions {
  padding: var(--spacing-lg);
}

.card-padding-xl .card-header,
.card-padding-xl .card-content,
.card-padding-xl .card-actions {
  padding: var(--spacing-xl);
}

/* Actions */
.card-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  padding-top: 0;
  margin-top: auto;
}

.card-padding-none .card-actions {
  padding: var(--spacing-lg);
}

.card-content:last-child,
.card-actions:last-child {
  padding-bottom: var(--spacing-lg);
}

/* Dark mode */
.dark-mode .card-flat {
  background-color: var(--surface-elevated);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  
  .card-clickable:hover {
    transform: none;
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .card-padding-lg .card-header,
  .card-padding-lg .card-content,
  .card-padding-lg .card-actions,
  .card-padding-xl .card-header,
  .card-padding-xl .card-content,
  .card-padding-xl .card-actions {
    padding: var(--spacing-md);
  }
}
</style>