<template>
  <div class="course-list-item" @click="handleClick">
    <LayoutRow gap="md" align="center">
      <!-- Course Image -->
      <div class="course-thumbnail">
        <img
          v-if="course.thumbnail"
          :src="course.thumbnail"
          :alt="course.title"
          class="thumbnail-image"
        >
        <div v-else class="thumbnail-placeholder" :class="`subject-${course.subject}`">
          <Icon :name="getSubjectIcon(course.subject)" size="24" />
        </div>
      </div>

      <!-- Course Info -->
      <LayoutExpanded>
        <LayoutColumn gap="xs">
          <LayoutRow justify="between" align="start">
            <div class="course-header">
              <h3 class="course-title">{{ course.title }}</h3>
              <LayoutRow gap="xs" align="center" class="course-meta">
                <span class="course-instructor">{{ course.instructor }}</span>
                <span class="separator">•</span>
                <span class="course-duration">{{ course.duration }}</span>
                <span class="separator">•</span>
                <Badge :variant="getDifficultyVariant(course.difficulty)">
                  {{ course.difficulty }}
                </Badge>
              </LayoutRow>
            </div>
            <LayoutRow gap="xs">
              <Button
                variant="secondary"
                size="sm"
                icon-only
                @click.stop="$emit('edit', course)"
                title="Edit course"
              >
                <Icon name="heroicons:pencil" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon-only
                @click.stop="$emit('delete', course)"
                title="Remove course"
              >
                <Icon name="heroicons:trash" />
              </Button>
            </LayoutRow>
          </LayoutRow>

          <p class="course-description">{{ course.description }}</p>

          <LayoutRow justify="between" align="center">
            <Progress :value="course.progress" class="course-progress" />
            <span class="progress-text">{{ course.progress }}% complete</span>
          </LayoutRow>
        </LayoutColumn>
      </LayoutExpanded>
    </LayoutRow>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/types/course'

interface Props {
  course: Course
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [course: Course]
  edit: [course: Course]
  delete: [course: Course]
}>()

const handleClick = () => {
  emit('click', props.course)
}

const getSubjectIcon = (subject: string): string => {
  const icons: Record<string, string> = {
    mathematics: 'heroicons:calculator',
    science: 'heroicons:beaker',
    english: 'heroicons:book-open',
    history: 'heroicons:clock',
    geography: 'heroicons:globe-alt',
    'computer-science': 'heroicons:computer-desktop',
    default: 'heroicons:academic-cap'
  }
  return icons[subject] || icons.default
}

const getDifficultyVariant = (difficulty: string): string => {
  const variants: Record<string, string> = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  }
  return variants[difficulty] || 'default'
}
</script>

<style scoped>
.course-list-item {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.course-list-item:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.course-thumbnail {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-secondary);
}

/* Subject colors */
.subject-mathematics {
  background: var(--color-blue-100);
  color: var(--color-blue-600);
}

.subject-science {
  background: var(--color-green-100);
  color: var(--color-green-600);
}

.subject-english {
  background: var(--color-purple-100);
  color: var(--color-purple-600);
}

.subject-history {
  background: var(--color-amber-100);
  color: var(--color-amber-600);
}

.subject-geography {
  background: var(--color-teal-100);
  color: var(--color-teal-600);
}

.subject-computer-science {
  background: var(--color-indigo-100);
  color: var(--color-indigo-600);
}

.course-header {
  flex: 1;
}

.course-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.course-meta {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.course-instructor {
  font-weight: var(--font-weight-medium);
}

.separator {
  opacity: 0.5;
}

.course-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-progress {
  flex: 1;
  max-width: 200px;
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-left: var(--spacing-md);
}

/* Dark mode adjustments */
.dark-mode .course-list-item {
  background: var(--surface-elevated);
}

.dark-mode .thumbnail-placeholder {
  background: var(--surface-card);
}

.dark-mode .subject-mathematics {
  background: var(--color-blue-900);
  color: var(--color-blue-300);
}

.dark-mode .subject-science {
  background: var(--color-green-900);
  color: var(--color-green-300);
}

.dark-mode .subject-english {
  background: var(--color-purple-900);
  color: var(--color-purple-300);
}

.dark-mode .subject-history {
  background: var(--color-amber-900);
  color: var(--color-amber-300);
}

.dark-mode .subject-geography {
  background: var(--color-teal-900);
  color: var(--color-teal-300);
}

.dark-mode .subject-computer-science {
  background: var(--color-indigo-900);
  color: var(--color-indigo-300);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .course-list-item {
    padding: var(--spacing-md);
  }

  .course-thumbnail {
    width: 80px;
    height: 60px;
  }

  .course-meta {
    flex-wrap: wrap;
  }

  .course-progress {
    max-width: 150px;
  }
}
</style>