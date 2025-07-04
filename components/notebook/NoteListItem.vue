<template>
  <div class="note-list-item" @click="handleClick">
    <LayoutRow gap="md" align="center">
      <!-- Note Type Icon -->
      <div class="note-icon" :class="`note-type-${note.type}`">
        <Icon :name="getNoteIcon(note.type)" size="20" />
      </div>

      <!-- Note Content -->
      <LayoutExpanded>
        <LayoutColumn gap="xs">
          <LayoutRow justify="between" align="start">
            <div class="note-header">
              <LayoutRow gap="sm" align="center">
                <h3 class="note-title">{{ note.title }}</h3>
                <Icon v-if="note.starred" name="heroicons:star-solid" class="star-icon" />
                <Icon v-if="note.shared" name="heroicons:share" class="share-icon" />
              </LayoutRow>
              <div class="note-meta">
                <span class="note-subject">{{ getSubjectLabel(note.subject) }}</span>
                <span class="separator">•</span>
                <span class="note-date">{{ formatDate(note.modifiedAt) }}</span>
                <span v-if="note.attachments?.length" class="separator">•</span>
                <span v-if="note.attachments?.length" class="note-attachments">
                  <Icon name="heroicons:paper-clip" size="14" />
                  {{ note.attachments.length }}
                </span>
              </div>
            </div>
            <LayoutRow gap="xs">
              <Button
                variant="secondary"
                size="sm"
                icon-only
                @click.stop="$emit('edit', note)"
                title="Edit note"
              >
                <Icon name="heroicons:pencil" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon-only
                @click.stop="$emit('share', note)"
                title="Share note"
              >
                <Icon name="heroicons:share" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon-only
                @click.stop="$emit('export', note)"
                title="Export note"
              >
                <Icon name="heroicons:arrow-down-tray" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon-only
                @click.stop="$emit('delete', note)"
                title="Delete note"
              >
                <Icon name="heroicons:trash" />
              </Button>
            </LayoutRow>
          </LayoutRow>

          <p class="note-excerpt">{{ note.excerpt || getExcerpt(note.content) }}</p>

          <LayoutRow gap="sm" v-if="note.tags?.length">
            <Chip
              v-for="tag in note.tags.slice(0, 5)"
              :key="tag"
              :label="tag"
              size="sm"
            />
            <span v-if="note.tags.length > 5" class="more-tags">
              +{{ note.tags.length - 5 }} more
            </span>
          </LayoutRow>
        </LayoutColumn>
      </LayoutExpanded>
    </LayoutRow>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  note: Note
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [note: Note]
  edit: [note: Note]
  delete: [note: Note]
  share: [note: Note]
  export: [note: Note]
}>()

const handleClick = () => {
  emit('click', props.note)
}

const getNoteIcon = (type: string): string => {
  const icons: Record<string, string> = {
    note: 'heroicons:document-text',
    summary: 'heroicons:document-duplicate',
    flashcard: 'heroicons:squares-2x2',
    mindmap: 'heroicons:cpu-chip',
    quiz: 'heroicons:clipboard-document-check',
    default: 'heroicons:document'
  }
  return icons[type] || icons.default
}

const getSubjectLabel = (subject: string): string => {
  const labels: Record<string, string> = {
    mathematics: 'Mathematics',
    science: 'Science',
    english: 'English',
    history: 'History',
    geography: 'Geography',
    'computer-science': 'Computer Science'
  }
  return labels[subject] || subject
}

const formatDate = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

const getExcerpt = (content: string): string => {
  if (!content) return 'No content available'
  const plainText = content.replace(/<[^>]*>/g, '').trim()
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
}
</script>

<style scoped>
.note-list-item {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.note-list-item:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.note-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Note type colors */
.note-type-note {
  background: var(--color-blue-100);
  color: var(--color-blue-600);
}

.note-type-summary {
  background: var(--color-purple-100);
  color: var(--color-purple-600);
}

.note-type-flashcard {
  background: var(--color-green-100);
  color: var(--color-green-600);
}

.note-type-mindmap {
  background: var(--color-orange-100);
  color: var(--color-orange-600);
}

.note-type-quiz {
  background: var(--color-pink-100);
  color: var(--color-pink-600);
}

.note-header {
  flex: 1;
}

.note-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.star-icon {
  color: var(--color-amber-500);
  flex-shrink: 0;
}

.share-icon {
  color: var(--color-blue-500);
  flex-shrink: 0;
}

.note-meta {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.note-subject {
  font-weight: var(--font-weight-medium);
}

.separator {
  opacity: 0.5;
}

.note-attachments {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.note-excerpt {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.more-tags {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  padding: var(--spacing-xs) 0;
}

/* Dark mode adjustments */
.dark-mode .note-list-item {
  background: var(--surface-elevated);
}

.dark-mode .note-type-note {
  background: var(--color-blue-900);
  color: var(--color-blue-300);
}

.dark-mode .note-type-summary {
  background: var(--color-purple-900);
  color: var(--color-purple-300);
}

.dark-mode .note-type-flashcard {
  background: var(--color-green-900);
  color: var(--color-green-300);
}

.dark-mode .note-type-mindmap {
  background: var(--color-orange-900);
  color: var(--color-orange-300);
}

.dark-mode .note-type-quiz {
  background: var(--color-pink-900);
  color: var(--color-pink-300);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .note-list-item {
    padding: var(--spacing-md);
  }

  .note-icon {
    width: 36px;
    height: 36px;
  }

  .note-meta {
    flex-wrap: wrap;
  }
}
</style>