<template>
  <article
    class="note-card"
    :class="{ 'note-card--selected': selected }"
    @click="$emit('click')"
  >
    <div class="note-card-header">
      <div class="note-card-icon" :class="`note-card-icon--${type}`">
        <Icon :name="getNoteIcon(type)" />
      </div>
      <div class="note-card-meta">
        <h3 class="note-card-title">{{ title }}</h3>
        <time class="note-card-time">{{ formattedTime }}</time>
      </div>
      <LayoutRow class="note-card-actions">
        <button
          v-if="isFavorite"
          @click.stop="$emit('toggleFavorite')"
          class="note-card-action"
        >
          <Icon name="heroicons:star-solid" class="text-yellow-500" />
        </button>
        <Popover>
          <template #trigger>
            <button @click.stop class="note-card-action">
              <Icon name="heroicons:ellipsis-vertical" />
            </button>
          </template>
          <div class="note-card-menu">
            <button @click="$emit('edit')" class="note-card-menu-item">
              <Icon name="heroicons:pencil" />
              Edit
            </button>
            <button @click="$emit('share')" class="note-card-menu-item">
              <Icon name="heroicons:share" />
              Share
            </button>
            <button @click="$emit('duplicate')" class="note-card-menu-item">
              <Icon name="heroicons:document-duplicate" />
              Duplicate
            </button>
            <button @click="$emit('delete')" class="note-card-menu-item note-card-menu-item--danger">
              <Icon name="heroicons:trash" />
              Delete
            </button>
          </div>
        </Popover>
      </LayoutRow>
    </div>
    
    <p v-if="preview" class="note-card-preview">{{ preview }}</p>
    
    <div v-if="tags && tags.length > 0" class="note-card-tags">
      <Chip
        v-for="tag in tags"
        :key="tag"
        :label="tag"
        size="sm"
        variant="default"
      />
    </div>
    
    <div v-if="attachmentCount > 0" class="note-card-attachments">
      <Icon name="heroicons:paper-clip" />
      <span>{{ attachmentCount }} attachment{{ attachmentCount > 1 ? 's' : '' }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
type NoteType = 'summary' | 'flashcard' | 'quiz' | 'mindmap' | 'essay' | 'math' | 'code' | 'general'

interface Props {
  type: NoteType
  title: string
  preview?: string
  tags?: string[]
  lastModified: Date | string
  isFavorite?: boolean
  selected?: boolean
  attachmentCount?: number
}

const props = defineProps<Props>()

defineEmits<{
  click: []
  edit: []
  share: []
  duplicate: []
  delete: []
  toggleFavorite: []
}>()

const formattedTime = computed(() => {
  const date = props.lastModified instanceof Date ? props.lastModified : new Date(props.lastModified)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return minutes === 0 ? 'Just now' : `${minutes}m ago`
  }
  
  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}h ago`
  }
  
  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000)
    return `${days}d ago`
  }
  
  // Show date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

const getNoteIcon = (type: NoteType) => {
  const icons: Record<NoteType, string> = {
    summary: 'heroicons:document-text',
    flashcard: 'heroicons:square-2-stack',
    quiz: 'heroicons:clipboard-document-check',
    mindmap: 'heroicons:share',
    essay: 'heroicons:document',
    math: 'heroicons:calculator',
    code: 'heroicons:code-bracket',
    general: 'heroicons:document'
  }
  return icons[type]
}
</script>

<style scoped>
.note-card {
  @apply bg-white rounded-lg border border-gray-200 p-4 space-y-3
         hover:shadow-md transition-shadow cursor-pointer;
}

.note-card--selected {
  @apply ring-2 ring-primary-500 border-primary-500;
}

.note-card-header {
  @apply flex items-start gap-3;
}

.note-card-icon {
  @apply w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0;
}

.note-card-icon Icon {
  @apply w-5 h-5;
}

/* Note type colors */
.note-card-icon--summary {
  @apply bg-blue-100 text-blue-600;
}

.note-card-icon--flashcard {
  @apply bg-purple-100 text-purple-600;
}

.note-card-icon--quiz {
  @apply bg-green-100 text-green-600;
}

.note-card-icon--mindmap {
  @apply bg-indigo-100 text-indigo-600;
}

.note-card-icon--essay {
  @apply bg-orange-100 text-orange-600;
}

.note-card-icon--math {
  @apply bg-red-100 text-red-600;
}

.note-card-icon--code {
  @apply bg-gray-100 text-gray-600;
}

.note-card-icon--general {
  @apply bg-gray-100 text-gray-600;
}

.note-card-meta {
  @apply flex-1 min-w-0;
}

.note-card-title {
  @apply font-medium text-gray-900 truncate;
}

.note-card-time {
  @apply text-xs text-gray-500;
}

.note-card-actions {
  @apply gap-1;
}

.note-card-action {
  @apply p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors;
}

.note-card-menu {
  @apply py-1 min-w-[160px];
}

.note-card-menu-item {
  @apply flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700
         hover:bg-gray-100 transition-colors;
}

.note-card-menu-item Icon {
  @apply w-4 h-4;
}

.note-card-menu-item--danger {
  @apply text-red-600 hover:bg-red-50;
}

.note-card-preview {
  @apply text-sm text-gray-600 line-clamp-2;
}

.note-card-tags {
  @apply flex flex-wrap gap-1.5;
}

.note-card-attachments {
  @apply flex items-center gap-1 text-xs text-gray-500;
}

.note-card-attachments Icon {
  @apply w-3.5 h-3.5;
}
</style>