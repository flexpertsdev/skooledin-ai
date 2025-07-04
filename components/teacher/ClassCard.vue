<template>
  <div class="class-card" @click="$emit('click')">
    <!-- Cover Image -->
    <div class="class-cover">
      <img
        v-if="classData.coverImage"
        :src="classData.coverImage"
        :alt="classData.name"
        class="cover-image"
      />
      <div v-else class="cover-placeholder" :class="`subject-${subjectColor}`">
        <Icon :name="subjectIcon" size="48" />
      </div>
      
      <!-- Status Badge -->
      <Badge
        v-if="classData.status === 'archived'"
        class="status-badge"
        variant="warning"
      >
        Archived
      </Badge>
      
      <!-- Actions Menu -->
      <div class="actions-menu" @click.stop>
        <Button
          variant="secondary"
          size="sm"
          icon-only
          @click="showActions = !showActions"
        >
          <Icon name="heroicons:ellipsis-vertical" />
        </Button>
        
        <Popover
          :open="showActions"
          @close="showActions = false"
          placement="bottom-end"
        >
          <div class="action-list">
            <button
              class="action-item"
              @click="handleAction('edit')"
            >
              <Icon name="heroicons:pencil" />
              <span>Edit Class</span>
            </button>
            <button
              class="action-item"
              @click="handleAction('archive')"
            >
              <Icon :name="classData.status === 'active' ? 'heroicons:archive-box' : 'heroicons:archive-box-arrow-down'" />
              <span>{{ classData.status === 'active' ? 'Archive' : 'Restore' }}</span>
            </button>
            <button
              class="action-item action-danger"
              @click="handleAction('delete')"
            >
              <Icon name="heroicons:trash" />
              <span>Delete</span>
            </button>
          </div>
        </Popover>
      </div>
    </div>
    
    <!-- Content -->
    <div class="class-content">
      <LayoutColumn gap="sm">
        <!-- Title and Subject -->
        <div>
          <h3 class="class-name">{{ classData.name }}</h3>
          <LayoutRow gap="xs" align="center">
            <Badge :variant="subjectBadgeVariant" size="sm">
              {{ classData.subject }}
            </Badge>
            <span class="class-grade">{{ classData.grade }}</span>
          </LayoutRow>
        </div>
        
        <!-- Schedule -->
        <LayoutRow gap="xs" align="center" class="class-schedule">
          <Icon name="heroicons:clock" size="16" />
          <span>{{ classData.schedule }}</span>
        </LayoutRow>
        
        <!-- Stats -->
        <LayoutRow justify="between" class="class-stats">
          <div class="stat-item">
            <Icon name="heroicons:users" size="16" />
            <span>{{ classData.activeStudents }}/{{ classData.studentCount }}</span>
          </div>
          <div class="stat-item">
            <Icon name="heroicons:chart-bar" size="16" />
            <span>{{ classData.averageGrade }}%</span>
          </div>
        </LayoutRow>
        
        <!-- Next Class -->
        <div v-if="classData.nextClass && classData.status === 'active'" class="next-class">
          <span class="next-label">Next class:</span>
          <span class="next-time">{{ formatNextClass(classData.nextClass) }}</span>
        </div>
      </LayoutColumn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

interface ClassData {
  id: string
  name: string
  subject: string
  grade: string
  schedule: string
  studentCount: number
  activeStudents: number
  averageGrade: number
  nextClass?: Date
  coverImage?: string
  status: 'active' | 'archived'
}

interface Props {
  classData: ClassData
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: []
  edit: []
  archive: []
  delete: []
}>()

const showActions = ref(false)

const subjectColors: Record<string, string> = {
  'Mathematics': 'blue',
  'Science': 'green',
  'Physics': 'purple',
  'Chemistry': 'amber',
  'Biology': 'emerald',
  'English': 'red',
  'History': 'orange',
  'Geography': 'teal',
  'Art': 'pink',
  'Music': 'indigo',
  'Physical Education': 'sky'
}

const subjectIcons: Record<string, string> = {
  'Mathematics': 'heroicons:calculator',
  'Science': 'heroicons:beaker',
  'Physics': 'heroicons:bolt',
  'Chemistry': 'heroicons:beaker',
  'Biology': 'heroicons:heart',
  'English': 'heroicons:book-open',
  'History': 'heroicons:clock',
  'Geography': 'heroicons:globe-alt',
  'Art': 'heroicons:paint-brush',
  'Music': 'heroicons:musical-note',
  'Physical Education': 'heroicons:flag'
}

const subjectColor = computed(() => 
  subjectColors[props.classData.subject] || 'gray'
)

const subjectIcon = computed(() => 
  subjectIcons[props.classData.subject] || 'heroicons:academic-cap'
)

const subjectBadgeVariant = computed(() => {
  const variants: Record<string, string> = {
    'Mathematics': 'info',
    'Science': 'success',
    'English': 'error',
    'History': 'warning'
  }
  return variants[props.classData.subject] || 'default'
})

const formatNextClass = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true })
}

const handleAction = (action: 'edit' | 'archive' | 'delete') => {
  showActions.value = false
  emit(action)
}
</script>

<style scoped>
.class-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.class-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.class-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  background: var(--surface-secondary);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-secondary);
}

.subject-blue { background: var(--color-blue-100); color: var(--color-blue-600); }
.subject-green { background: var(--color-green-100); color: var(--color-green-600); }
.subject-purple { background: var(--color-purple-100); color: var(--color-purple-600); }
.subject-amber { background: var(--color-amber-100); color: var(--color-amber-600); }
.subject-emerald { background: var(--color-emerald-100); color: var(--color-emerald-600); }
.subject-red { background: var(--color-red-100); color: var(--color-red-600); }
.subject-orange { background: var(--color-orange-100); color: var(--color-orange-600); }
.subject-teal { background: var(--color-teal-100); color: var(--color-teal-600); }
.subject-pink { background: var(--color-pink-100); color: var(--color-pink-600); }
.subject-indigo { background: var(--color-indigo-100); color: var(--color-indigo-600); }
.subject-sky { background: var(--color-sky-100); color: var(--color-sky-600); }

.status-badge {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
}

.actions-menu {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
}

.action-list {
  min-width: 160px;
  padding: var(--spacing-xs);
}

.action-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: none;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color 0.2s ease;
}

.action-item:hover {
  background: var(--surface-hover);
}

.action-danger {
  color: var(--color-red-600);
}

.class-content {
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.class-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.class-grade {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.class-schedule {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.class-stats {
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-subtle);
  margin-top: auto;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.next-class {
  background: var(--surface-secondary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.next-label {
  color: var(--text-secondary);
}

.next-time {
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
}

/* Dark mode adjustments */
.dark-mode .cover-placeholder {
  background: var(--surface-elevated);
}

.dark-mode .subject-blue { background: var(--color-blue-900); color: var(--color-blue-300); }
.dark-mode .subject-green { background: var(--color-green-900); color: var(--color-green-300); }
.dark-mode .subject-purple { background: var(--color-purple-900); color: var(--color-purple-300); }
.dark-mode .subject-amber { background: var(--color-amber-900); color: var(--color-amber-300); }
.dark-mode .subject-emerald { background: var(--color-emerald-900); color: var(--color-emerald-300); }
.dark-mode .subject-red { background: var(--color-red-900); color: var(--color-red-300); }
.dark-mode .subject-orange { background: var(--color-orange-900); color: var(--color-orange-300); }
.dark-mode .subject-teal { background: var(--color-teal-900); color: var(--color-teal-300); }
.dark-mode .subject-pink { background: var(--color-pink-900); color: var(--color-pink-300); }
.dark-mode .subject-indigo { background: var(--color-indigo-900); color: var(--color-indigo-300); }
.dark-mode .subject-sky { background: var(--color-sky-900); color: var(--color-sky-300); }

.dark-mode .next-class {
  background: var(--surface-elevated);
}

.dark-mode .action-danger {
  color: var(--color-red-400);
}
</style>