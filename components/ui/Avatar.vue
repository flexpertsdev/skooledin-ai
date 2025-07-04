<template>
  <div class="avatar" :class="[sizeClass, shapeClass]">
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="avatar-image"
      @error="handleImageError"
    />
    <span v-else-if="initials" class="avatar-initials" :style="initialsStyle">
      {{ initials }}
    </span>
    <Icon v-else name="heroicons:user" class="avatar-icon" />
    <div v-if="status" class="avatar-status" :class="`avatar-status--${status}`" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'busy' | 'away'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'circle',
  alt: 'Avatar'
})

const imageError = ref(false)

const sizeClass = computed(() => `avatar--${props.size}`)
const shapeClass = computed(() => `avatar--${props.shape}`)

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const initialsStyle = computed(() => {
  if (!props.color) return {}
  return {
    backgroundColor: props.color,
    color: '#fff'
  }
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.avatar {
  @apply relative inline-flex items-center justify-center overflow-hidden
         bg-gray-200 text-gray-600;
}

/* Shapes */
.avatar--circle {
  @apply rounded-full;
}

.avatar--square {
  @apply rounded-lg;
}

/* Sizes */
.avatar--xs {
  @apply w-6 h-6 text-xs;
}

.avatar--sm {
  @apply w-8 h-8 text-sm;
}

.avatar--md {
  @apply w-10 h-10 text-base;
}

.avatar--lg {
  @apply w-12 h-12 text-lg;
}

.avatar--xl {
  @apply w-16 h-16 text-xl;
}

.avatar-image {
  @apply w-full h-full object-cover;
}

.avatar-initials {
  @apply font-medium;
}

.avatar-icon {
  @apply w-2/3 h-2/3;
}

/* Status indicator */
.avatar-status {
  @apply absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white;
}

.avatar--xs .avatar-status,
.avatar--sm .avatar-status {
  @apply w-2 h-2;
}

.avatar-status--online {
  @apply bg-green-500;
}

.avatar-status--offline {
  @apply bg-gray-400;
}

.avatar-status--busy {
  @apply bg-red-500;
}

.avatar-status--away {
  @apply bg-yellow-500;
}
</style>