<template>
  <div class="message-bubble" :class="`message-bubble--${sender}`">
    <Avatar
      v-if="showAvatar"
      :src="avatar"
      :name="name"
      size="sm"
      class="message-avatar"
    />
    <div class="message-content-wrapper">
      <div v-if="showName" class="message-name">{{ name }}</div>
      <div class="message-content" :class="{ 'message-content--thinking': isThinking }">
        <div v-if="isThinking" class="thinking-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div v-else class="message-text">
          <slot>{{ content }}</slot>
        </div>
        <div v-if="attachments && attachments.length > 0" class="message-attachments">
          <div v-for="(attachment, index) in attachments" :key="index" class="message-attachment">
            <Icon :name="getAttachmentIcon(attachment.type)" />
            <span>{{ attachment.name }}</span>
          </div>
        </div>
      </div>
      <div class="message-meta">
        <span class="message-time">{{ formattedTime }}</span>
        <Icon v-if="status" :name="getStatusIcon(status)" class="message-status" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Attachment {
  type: string
  name: string
  url?: string
}

interface Props {
  sender: 'user' | 'ai' | 'system'
  content?: string
  name?: string
  avatar?: string
  timestamp?: Date | string
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error'
  attachments?: Attachment[]
  isThinking?: boolean
  showAvatar?: boolean
  showName?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showAvatar: true,
  showName: false,
  isThinking: false
})

const formattedTime = computed(() => {
  if (!props.timestamp) return ''
  
  const date = props.timestamp instanceof Date ? props.timestamp : new Date(props.timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // Less than 1 minute
  if (diff < 60000) return 'Just now'
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes}m ago`
  }
  
  // Same day
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  
  // Different day
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

const getStatusIcon = (status: string) => {
  const icons = {
    sending: 'heroicons:clock',
    sent: 'heroicons:check',
    delivered: 'heroicons:check-double',
    read: 'heroicons:check-double',
    error: 'heroicons:exclamation-circle'
  }
  return icons[status as keyof typeof icons] || 'heroicons:check'
}

const getAttachmentIcon = (type: string) => {
  if (type.startsWith('image/')) return 'heroicons:photo'
  if (type.startsWith('video/')) return 'heroicons:video-camera'
  if (type.includes('pdf')) return 'heroicons:document-text'
  return 'heroicons:paper-clip'
}
</script>

<style scoped>
.message-bubble {
  @apply flex gap-2 mb-4;
}

.message-bubble--user {
  @apply flex-row-reverse;
}

.message-bubble--system {
  @apply justify-center;
}

.message-avatar {
  @apply flex-shrink-0;
}

.message-content-wrapper {
  @apply flex flex-col gap-1 max-w-[70%];
}

.message-bubble--user .message-content-wrapper {
  @apply items-end;
}

.message-bubble--ai .message-content-wrapper {
  @apply items-start;
}

.message-bubble--system .message-content-wrapper {
  @apply items-center max-w-full;
}

.message-name {
  @apply text-xs text-gray-600 px-2;
}

.message-content {
  @apply relative px-4 py-3 rounded-2xl;
}

.message-bubble--user .message-content {
  @apply bg-primary-600 text-white rounded-br-sm;
}

.message-bubble--ai .message-content {
  @apply bg-gray-100 text-gray-900 rounded-bl-sm;
}

.message-bubble--system .message-content {
  @apply bg-gray-100 text-gray-600 text-sm rounded-lg;
}

.message-content--thinking {
  @apply min-w-[60px];
}

.message-text {
  @apply whitespace-pre-wrap break-words;
}

/* Thinking animation */
.thinking-dots {
  @apply flex gap-1;
}

.thinking-dots span {
  @apply w-2 h-2 bg-gray-400 rounded-full animate-bounce;
}

.thinking-dots span:nth-child(2) {
  animation-delay: 0.1s;
}

.thinking-dots span:nth-child(3) {
  animation-delay: 0.2s;
}

/* Attachments */
.message-attachments {
  @apply mt-2 space-y-1;
}

.message-attachment {
  @apply flex items-center gap-2 px-3 py-2 bg-black/5 rounded-lg text-sm;
}

.message-bubble--user .message-attachment {
  @apply bg-white/10;
}

.message-attachment Icon {
  @apply w-4 h-4;
}

/* Meta info */
.message-meta {
  @apply flex items-center gap-1 px-2 text-xs text-gray-500;
}

.message-bubble--user .message-meta {
  @apply flex-row-reverse;
}

.message-status {
  @apply w-4 h-4;
}

.message-bubble--user .message-status.heroicons\:check-double[data-read="true"] {
  @apply text-blue-500;
}
</style>