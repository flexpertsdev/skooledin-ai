<template>
  <span
    class="chip"
    :class="[
      variantClass,
      sizeClass,
      {
        'chip--clickable': clickable,
        'chip--selected': selected
      }
    ]"
    @click="handleClick"
  >
    <Icon v-if="icon" :name="icon" class="chip-icon" />
    <span class="chip-label">
      <slot>{{ label }}</slot>
    </span>
    <button
      v-if="removable"
      type="button"
      @click.stop="$emit('remove')"
      class="chip-remove"
    >
      <Icon name="heroicons:x-mark" />
    </button>
  </span>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  removable?: boolean
  clickable?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md'
})

const emit = defineEmits<{
  click: []
  remove: []
}>()

const variantClass = computed(() => `chip--${props.variant}`)
const sizeClass = computed(() => `chip--${props.size}`)

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<style scoped>
.chip {
  @apply inline-flex items-center gap-1.5 rounded-full transition-all;
}

/* Sizes */
.chip--sm {
  @apply px-2.5 py-1 text-xs;
}

.chip--md {
  @apply px-3 py-1.5 text-sm;
}

.chip--lg {
  @apply px-4 py-2 text-base;
}

/* Variants */
.chip--default {
  @apply bg-gray-100 text-gray-700 border border-gray-200;
}

.chip--primary {
  @apply bg-primary-100 text-primary-700 border border-primary-200;
}

.chip--secondary {
  @apply bg-gray-100 text-gray-700 border border-gray-300;
}

.chip--success {
  @apply bg-green-100 text-green-700 border border-green-200;
}

.chip--warning {
  @apply bg-yellow-100 text-yellow-700 border border-yellow-200;
}

.chip--error {
  @apply bg-red-100 text-red-700 border border-red-200;
}

/* States */
.chip--clickable {
  @apply cursor-pointer hover:shadow-sm;
}

.chip--clickable:hover {
  @apply brightness-95;
}

.chip--selected {
  @apply ring-2 ring-offset-1;
}

.chip--selected.chip--primary {
  @apply ring-primary-500;
}

/* Icons */
.chip-icon {
  @apply w-4 h-4 -ml-0.5;
}

.chip--sm .chip-icon {
  @apply w-3.5 h-3.5;
}

.chip-remove {
  @apply -mr-1 ml-0.5 p-0.5 rounded-full hover:bg-black/10 transition-colors;
}

.chip-remove Icon {
  @apply w-3.5 h-3.5;
}

.chip--sm .chip-remove Icon {
  @apply w-3 h-3;
}
</style>