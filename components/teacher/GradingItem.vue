<template>
  <div class="grading-item" :class="{ 'grading-item--selected': selected }">
    <LayoutRow gap="md" align="center">
      <!-- Checkbox -->
      <input
        v-if="showCheckbox"
        type="checkbox"
        :checked="selected"
        @change="$emit('toggle-select')"
        class="item-checkbox"
      />
      
      <!-- Student Info -->
      <div class="student-info">
        <Avatar
          :src="submission.studentAvatar"
          :name="submission.studentName"
          size="md"
        />
      </div>
      
      <!-- Main Content -->
      <LayoutExpanded>
        <LayoutColumn gap="xs">
          <LayoutRow justify="between" align="start">
            <div>
              <h3 class="submission-title">{{ submission.assignmentTitle }}</h3>
              <LayoutRow gap="sm" align="center" class="submission-meta">
                <span class="student-name">{{ submission.studentName }}</span>
                <span class="separator">•</span>
                <span class="class-name">{{ submission.className }}</span>
                <span class="separator">•</span>
                <span class="submit-time">{{ formatSubmitTime(submission.submittedAt) }}</span>
              </LayoutRow>
            </div>
            
            <Badge
              :variant="getStatusVariant(submission)"
              size="sm"
            >
              {{ getStatusLabel(submission) }}
            </Badge>
          </LayoutRow>
          
          <!-- Due Date Warning -->
          <div v-if="isOverdue" class="overdue-warning">
            <Icon name="heroicons:exclamation-triangle" size="16" />
            <span>Overdue by {{ formatOverdue(submission.dueDate) }}</span>
          </div>
          
          <!-- Attachments -->
          <LayoutRow gap="sm" align="center" class="attachments">
            <div
              v-for="attachment in submission.attachments"
              :key="attachment.name"
              class="attachment-item"
            >
              <Icon :name="getFileIcon(attachment.type)" size="16" />
              <span>{{ attachment.name }}</span>
            </div>
          </LayoutRow>
          
          <!-- Grade Display (if graded) -->
          <div v-if="submission.status === 'graded' || submission.status === 'returned'" class="grade-display">
            <span class="grade-label">Grade:</span>
            <span class="grade-value">{{ submission.grade }}/{{ submission.maxGrade }}</span>
            <span class="grade-percentage">({{ gradePercentage }}%)</span>
          </div>
        </LayoutColumn>
      </LayoutExpanded>
      
      <!-- Actions -->
      <LayoutRow gap="xs" class="action-buttons">
        <Button
          v-if="submission.status === 'pending' || submission.status === 'in-progress'"
          variant="primary"
          size="sm"
          @click="$emit('grade')"
        >
          <Icon name="heroicons:pencil" />
          <span class="action-text">Grade</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          @click="$emit('view')"
        >
          <Icon name="heroicons:eye" />
          <span class="action-text">View</span>
        </Button>
        <Button
          v-if="submission.status === 'graded'"
          variant="secondary"
          size="sm"
          @click="$emit('return')"
        >
          <Icon name="heroicons:paper-airplane" />
          <span class="action-text">Return</span>
        </Button>
      </LayoutRow>
    </LayoutRow>
  </div>
</template>

<script setup lang="ts">
import { formatDistanceToNow, differenceInDays } from 'date-fns'

interface Submission {
  id: string
  studentId: string
  studentName: string
  studentAvatar?: string
  assignmentId: string
  assignmentTitle: string
  classId: string
  className: string
  subject: string
  submittedAt: Date
  dueDate: Date
  status: 'pending' | 'in-progress' | 'graded' | 'returned'
  grade?: number
  maxGrade: number
  feedback?: string
  attachments: Array<{
    name: string
    type: string
    url: string
  }>
}

interface Props {
  submission: Submission
  selected?: boolean
  showCheckbox?: boolean
}

const props = defineProps<Props>()

defineEmits<{
  'toggle-select': []
  grade: []
  view: []
  return: []
}>()

const isOverdue = computed(() => 
  props.submission.status === 'pending' && 
  props.submission.dueDate < new Date()
)

const gradePercentage = computed(() => {
  if (!props.submission.grade) return 0
  return Math.round((props.submission.grade / props.submission.maxGrade) * 100)
})

const formatSubmitTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true })
}

const formatOverdue = (dueDate: Date): string => {
  const days = Math.abs(differenceInDays(new Date(), dueDate))
  if (days === 0) return 'today'
  if (days === 1) return '1 day'
  return `${days} days`
}

const getStatusVariant = (submission: Submission): string => {
  if (isOverdue.value) return 'error'
  
  const variants: Record<string, string> = {
    'pending': 'warning',
    'in-progress': 'info',
    'graded': 'success',
    'returned': 'default'
  }
  return variants[submission.status] || 'default'
}

const getStatusLabel = (submission: Submission): string => {
  if (isOverdue.value) return 'Overdue'
  
  const labels: Record<string, string> = {
    'pending': 'To Grade',
    'in-progress': 'In Progress',
    'graded': 'Graded',
    'returned': 'Returned'
  }
  return labels[submission.status] || submission.status
}

const getFileIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'pdf': 'heroicons:document-text',
    'doc': 'heroicons:document',
    'docx': 'heroicons:document',
    'excel': 'heroicons:table-cells',
    'xlsx': 'heroicons:table-cells',
    'image': 'heroicons:photo',
    'video': 'heroicons:video-camera',
    'default': 'heroicons:paper-clip'
  }
  return icons[type] || icons.default
}
</script>

<style scoped>
.grading-item {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  transition: all 0.2s ease;
}

.grading-item:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-sm);
}

.grading-item--selected {
  border-color: var(--primary-color);
  background: var(--primary-color-light);
}

.item-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
}

.student-info {
  flex-shrink: 0;
}

.submission-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.submission-meta {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}

.student-name {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

.separator {
  color: var(--text-tertiary);
}

.overdue-warning {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-red-600);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.attachments {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--surface-secondary);
  border-radius: var(--radius-sm);
}

.grade-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm);
  background: var(--surface-secondary);
  border-radius: var(--radius-sm);
  width: fit-content;
}

.grade-label {
  color: var(--text-secondary);
}

.grade-value {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.grade-percentage {
  color: var(--text-secondary);
}

.action-buttons {
  flex-shrink: 0;
}

.action-text {
  display: none;
}

/* Show action text on larger screens */
@media (min-width: 1024px) {
  .action-text {
    display: inline;
  }
}

/* Dark mode adjustments */
.dark-mode .grading-item {
  background: transparent;
}

.dark-mode .grading-item--selected {
  background: rgba(var(--primary-color-rgb), 0.1);
}

.dark-mode .overdue-warning {
  color: var(--color-red-400);
}

.dark-mode .attachment-item {
  background: var(--surface-elevated);
}

.dark-mode .grade-display {
  background: var(--surface-elevated);
}
</style>