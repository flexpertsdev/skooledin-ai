<template>
  <div class="activity-item">
    <LayoutRow gap="md" align="start">
      <div class="activity-icon" :class="`activity-${activity.type}`">
        <Icon :name="getActivityIcon(activity.type)" size="16" />
      </div>
      
      <LayoutExpanded>
        <LayoutColumn gap="xs">
          <LayoutRow justify="between" align="start">
            <div class="activity-content">
              <p class="activity-text">
                <span class="activity-student">{{ activity.studentName }}</span>
                {{ activity.action }}
                <span v-if="activity.target" class="activity-target">{{ activity.target }}</span>
              </p>
              <p class="activity-time">{{ formatTime(activity.timestamp) }}</p>
            </div>
            
            <div v-if="activity.requiresAction" class="activity-actions">
              <Button
                v-if="activity.actions?.includes('view')"
                variant="secondary"
                size="sm"
                @click.stop="$emit('action', activity, 'view')"
              >
                View
              </Button>
              <Button
                v-if="activity.actions?.includes('grade')"
                variant="primary"
                size="sm"
                @click.stop="$emit('action', activity, 'grade')"
              >
                Grade
              </Button>
              <Button
                v-if="activity.actions?.includes('respond')"
                variant="primary"
                size="sm"
                @click.stop="$emit('action', activity, 'respond')"
              >
                Respond
              </Button>
            </div>
          </LayoutRow>
          
          <div v-if="activity.preview" class="activity-preview">
            {{ activity.preview }}
          </div>
        </LayoutColumn>
      </LayoutExpanded>
    </LayoutRow>
  </div>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

interface Activity {
  id: string
  type: 'submission' | 'message' | 'question' | 'grade' | 'attendance'
  studentName: string
  action: string
  target?: string
  timestamp: Date
  requiresAction?: boolean
  actions?: string[]
  preview?: string
}

interface Props {
  activity: Activity
}

defineProps<Props>()

defineEmits<{
  action: [activity: Activity, action: string]
}>()

const getActivityIcon = (type: string): string => {
  const icons: Record<string, string> = {
    submission: 'heroicons:document-text',
    message: 'heroicons:chat-bubble-left',
    question: 'heroicons:question-mark-circle',
    grade: 'heroicons:academic-cap',
    attendance: 'heroicons:user-group'
  }
  return icons[type] || 'heroicons:bell'
}

const formatTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true })
}
</script>

<style scoped>
.activity-item {
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-default);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-submission {
  background: var(--color-blue-100);
  color: var(--color-blue-600);
}

.activity-message {
  background: var(--color-purple-100);
  color: var(--color-purple-600);
}

.activity-question {
  background: var(--color-amber-100);
  color: var(--color-amber-600);
}

.activity-grade {
  background: var(--color-green-100);
  color: var(--color-green-600);
}

.activity-attendance {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin: 0;
  line-height: 1.5;
}

.activity-student {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.activity-target {
  font-weight: var(--font-weight-medium);
  color: var(--primary-color);
}

.activity-time {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: var(--spacing-xs);
}

.activity-actions {
  display: flex;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.activity-preview {
  background: var(--surface-secondary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-sm);
  font-style: italic;
}

/* Dark mode adjustments */
.dark-mode .activity-submission {
  background: var(--color-blue-900);
  color: var(--color-blue-300);
}

.dark-mode .activity-message {
  background: var(--color-purple-900);
  color: var(--color-purple-300);
}

.dark-mode .activity-question {
  background: var(--color-amber-900);
  color: var(--color-amber-300);
}

.dark-mode .activity-grade {
  background: var(--color-green-900);
  color: var(--color-green-300);
}

.dark-mode .activity-attendance {
  background: var(--color-gray-800);
  color: var(--color-gray-300);
}

.dark-mode .activity-preview {
  background: var(--surface-elevated);
}
</style>