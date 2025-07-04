<template>
  <div class="class-list-item" @click="$emit('click')">
    <LayoutRow gap="lg" align="center">
      <!-- Icon/Image -->
      <div class="class-icon" :class="`subject-${subjectColor}`">
        <Icon :name="subjectIcon" size="24" />
      </div>
      
      <!-- Main Content -->
      <LayoutExpanded>
        <LayoutColumn gap="xs">
          <LayoutRow justify="between" align="start">
            <div>
              <h3 class="class-name">{{ classData.name }}</h3>
              <LayoutRow gap="sm" align="center" wrap>
                <Badge :variant="subjectBadgeVariant" size="sm">
                  {{ classData.subject }}
                </Badge>
                <span class="class-grade">{{ classData.grade }}</span>
                <Badge
                  v-if="classData.status === 'archived'"
                  variant="warning"
                  size="sm"
                >
                  Archived
                </Badge>
              </LayoutRow>
            </div>
            
            <!-- Actions -->
            <LayoutRow gap="xs" class="action-buttons">
              <Button
                variant="secondary"
                size="sm"
                @click.stop="$emit('edit')"
              >
                <Icon name="heroicons:pencil" />
                <span class="action-text">Edit</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                @click.stop="$emit('archive')"
              >
                <Icon :name="classData.status === 'active' ? 'heroicons:archive-box' : 'heroicons:archive-box-arrow-down'" />
                <span class="action-text">{{ classData.status === 'active' ? 'Archive' : 'Restore' }}</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                @click.stop="showDeleteConfirm = true"
              >
                <Icon name="heroicons:trash" />
              </Button>
            </LayoutRow>
          </LayoutRow>
          
          <!-- Schedule and Stats -->
          <LayoutRow gap="lg" align="center" class="class-meta">
            <div class="meta-item">
              <Icon name="heroicons:clock" size="16" />
              <span>{{ classData.schedule }}</span>
            </div>
            <div class="meta-item">
              <Icon name="heroicons:users" size="16" />
              <span>{{ classData.activeStudents }}/{{ classData.studentCount }} students</span>
            </div>
            <div class="meta-item">
              <Icon name="heroicons:chart-bar" size="16" />
              <span>{{ classData.averageGrade }}% average</span>
            </div>
            <div v-if="classData.nextClass && classData.status === 'active'" class="meta-item next-class">
              <Icon name="heroicons:calendar" size="16" />
              <span>Next: {{ formatNextClass(classData.nextClass) }}</span>
            </div>
          </LayoutRow>
        </LayoutColumn>
      </LayoutExpanded>
    </LayoutRow>
    
    <!-- Delete Confirmation -->
    <ConfirmDialog
      :open="showDeleteConfirm"
      @close="showDeleteConfirm = false"
      @confirm="handleDelete"
      title="Delete Class"
      message="Are you sure you want to delete this class? This action cannot be undone."
      variant="error"
      confirmText="Delete"
    />
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

const showDeleteConfirm = ref(false)

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

const handleDelete = () => {
  showDeleteConfirm.value = false
  emit('delete')
}
</script>

<style scoped>
.class-list-item {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.class-list-item:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-sm);
}

.class-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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

.class-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.class-grade {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.class-meta {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.next-class {
  color: var(--primary-color);
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
.dark-mode .class-list-item {
  background: transparent;
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
</style>