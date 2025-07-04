<template>
  <div class="quick-action-card" @click="$emit('click')">
    <div class="action-icon">
      <Icon :name="icon" size="24" />
    </div>
    <h3 class="action-title">{{ title }}</h3>
    <p class="action-description">{{ description }}</p>
    <Icon name="heroicons:arrow-right" class="action-arrow" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.quick-action-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.quick-action-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.quick-action-card:hover .action-icon {
  background: var(--primary-color);
  color: white;
}

.quick-action-card:hover .action-arrow {
  opacity: 1;
  transform: translateX(0);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--surface-secondary);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  transition: all 0.2s ease;
}

.action-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs);
}

.action-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.action-arrow {
  position: absolute;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  color: var(--primary-color);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
}

/* Dark mode adjustments */
.dark-mode .quick-action-card {
  background: var(--surface-elevated);
}

.dark-mode .action-icon {
  background: var(--surface-card);
}

.dark-mode .quick-action-card:hover .action-icon {
  background: var(--primary-color);
}
</style>