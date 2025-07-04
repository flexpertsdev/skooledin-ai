<template>
  <Popover
    v-bind="$attrs"
    :triggers="['hover', 'focus']"
    :delay="delay"
    :placement="placement"
    :offset="offset"
    :show-arrow="showArrow"
    class="tooltip-wrapper"
  >
    <template #trigger="{ toggle, isOpen }">
      <slot :toggle="toggle" :is-open="isOpen" />
    </template>

    <template #default="{ close }">
      <div class="tooltip-content">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import type { Placement } from '@floating-ui/vue'

interface Props {
  content?: string
  placement?: Placement
  delay?: number | { open?: number; close?: number }
  offset?: number
  showArrow?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  placement: 'top',
  delay: () => ({ open: 500, close: 0 }),
  offset: 8,
  showArrow: true,
  disabled: false
})
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
}

.tooltip-content {
  font-size: var(--font-size-sm);
  line-height: 1.4;
  max-width: 250px;
  word-wrap: break-word;
}

/* Dark mode adjustments */
.dark-mode :deep(.popover) {
  background-color: var(--color-gray-800);
  color: var(--color-gray-100);
  border-color: var(--color-gray-700);
}

.dark-mode :deep(.popover-arrow) {
  background-color: var(--color-gray-800);
  border-color: var(--color-gray-700);
}
</style>
