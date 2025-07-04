<template>
  <div class="schedule-item" @click="$emit('click', schedule)">
    <LayoutRow gap="md" align="center">
      <div class="time-block">
        <div class="time-start">{{ formatTime(schedule.startTime) }}</div>
        <div class="time-duration">{{ schedule.duration }} min</div>
      </div>
      
      <div class="schedule-divider"></div>
      
      <LayoutExpanded>
        <LayoutColumn gap="xs">
          <LayoutRow justify="between" align="start">
            <div>
              <h4 class="schedule-title">{{ schedule.className }}</h4>
              <p class="schedule-subject">{{ schedule.subject }}</p>
            </div>
            <Badge :variant="getStatusVariant(schedule.status)">
              {{ schedule.status }}
            </Badge>
          </LayoutRow>
          
          <LayoutRow gap="sm" align="center" class="schedule-meta">
            <span class="meta-item">
              <Icon name="heroicons:users" size="14" />
              {{ schedule.studentCount }} students
            </span>
            <span class="meta-item">
              <Icon name="heroicons:map-pin" size="14" />
              {{ schedule.location }}
            </span>
            <span v-if="schedule.isOnline" class="meta-item">
              <Icon name="heroicons:video-camera" size="14" />
              Online
            </span>
          </LayoutRow>
        </LayoutColumn>
      </LayoutExpanded>
      
      <Icon name="heroicons:chevron-right" class="schedule-arrow" />
    </LayoutRow>
  </div>
</template>

<script setup lang="ts">
interface ScheduleItem {
  id: string
  classId: string
  className: string
  subject: string
  startTime: Date
  duration: number
  studentCount: number
  location: string
  isOnline?: boolean
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
}

interface Props {
  schedule: ScheduleItem
}

defineProps<Props>()

defineEmits<{
  click: [schedule: ScheduleItem]
}>()

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

const getStatusVariant = (status: string): string => {
  const variants: Record<string, string> = {
    'upcoming': 'info',
    'in-progress': 'success',
    'completed': 'default',
    'cancelled': 'error'
  }
  return variants[status] || 'default'
}
</script>

<style scoped>
.schedule-item {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.schedule-item:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-sm);
}

.time-block {
  text-align: center;
  min-width: 60px;
}

.time-start {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.time-duration {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}

.schedule-divider {
  width: 2px;
  height: 40px;
  background: var(--border-default);
  flex-shrink: 0;
}

.schedule-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.schedule-subject {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.schedule-meta {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.schedule-arrow {
  color: var(--text-tertiary);
  flex-shrink: 0;
}

/* Dark mode adjustments */
.dark-mode .schedule-item {
  background: transparent;
}

.dark-mode .schedule-divider {
  background: var(--border-elevated);
}
</style>