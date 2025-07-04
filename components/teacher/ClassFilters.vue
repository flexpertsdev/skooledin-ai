<template>
  <LayoutStack gap="lg">
    <!-- Subject Filter -->
    <FormField label="Subject">
      <LayoutColumn gap="sm">
        <label
          v-for="subject in subjectOptions"
          :key="subject"
          class="filter-option"
        >
          <input
            type="checkbox"
            :checked="modelValue.subjects.includes(subject)"
            @change="toggleSubject(subject)"
            class="filter-checkbox"
          />
          <span>{{ subject }}</span>
        </label>
      </LayoutColumn>
    </FormField>

    <!-- Grade Filter -->
    <FormField label="Grade Level">
      <LayoutColumn gap="sm">
        <label
          v-for="grade in gradeOptions"
          :key="grade"
          class="filter-option"
        >
          <input
            type="checkbox"
            :checked="modelValue.grades.includes(grade)"
            @change="toggleGrade(grade)"
            class="filter-checkbox"
          />
          <span>{{ grade }}</span>
        </label>
      </LayoutColumn>
    </FormField>

    <!-- Status Filter -->
    <FormField label="Status">
      <LayoutColumn gap="sm">
        <label
          v-for="status in statusOptions"
          :key="status.value"
          class="filter-option"
        >
          <input
            type="radio"
            name="status"
            :value="status.value"
            :checked="modelValue.status === status.value"
            @change="updateStatus(status.value)"
            class="filter-radio"
          />
          <span>{{ status.label }}</span>
        </label>
      </LayoutColumn>
    </FormField>

    <!-- Schedule Filter -->
    <FormField label="Schedule">
      <LayoutColumn gap="sm">
        <label
          v-for="schedule in scheduleOptions"
          :key="schedule"
          class="filter-option"
        >
          <input
            type="checkbox"
            :checked="modelValue.schedule.includes(schedule)"
            @change="toggleSchedule(schedule)"
            class="filter-checkbox"
          />
          <span>{{ schedule }}</span>
        </label>
      </LayoutColumn>
    </FormField>

    <!-- Action Buttons -->
    <LayoutStack gap="sm">
      <Button @click="$emit('apply')" block>
        Apply Filters
      </Button>
      <Button variant="secondary" @click="handleClear" block>
        Clear All
      </Button>
    </LayoutStack>
  </LayoutStack>
</template>

<script setup lang="ts">
interface Filters {
  subjects: string[]
  grades: string[]
  status: 'all' | 'active' | 'archived'
  schedule: string[]
}

interface Props {
  modelValue: Filters
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: Filters]
  apply: []
  clear: []
}>()

const subjectOptions = [
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
  'Art',
  'Music',
  'Physical Education'
]

const gradeOptions = [
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12'
]

const statusOptions = [
  { value: 'all', label: 'All Classes' },
  { value: 'active', label: 'Active Only' },
  { value: 'archived', label: 'Archived Only' }
]

const scheduleOptions = [
  'Morning (Before 12pm)',
  'Afternoon (12pm - 5pm)',
  'Evening (After 5pm)',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
]

const toggleSubject = (subject: string) => {
  const newSubjects = props.modelValue.subjects.includes(subject)
    ? props.modelValue.subjects.filter(s => s !== subject)
    : [...props.modelValue.subjects, subject]
  
  emit('update:modelValue', {
    ...props.modelValue,
    subjects: newSubjects
  })
}

const toggleGrade = (grade: string) => {
  const newGrades = props.modelValue.grades.includes(grade)
    ? props.modelValue.grades.filter(g => g !== grade)
    : [...props.modelValue.grades, grade]
  
  emit('update:modelValue', {
    ...props.modelValue,
    grades: newGrades
  })
}

const updateStatus = (status: 'all' | 'active' | 'archived') => {
  emit('update:modelValue', {
    ...props.modelValue,
    status
  })
}

const toggleSchedule = (schedule: string) => {
  const newSchedule = props.modelValue.schedule.includes(schedule)
    ? props.modelValue.schedule.filter(s => s !== schedule)
    : [...props.modelValue.schedule, schedule]
  
  emit('update:modelValue', {
    ...props.modelValue,
    schedule: newSchedule
  })
}

const handleClear = () => {
  emit('update:modelValue', {
    subjects: [],
    grades: [],
    status: 'all',
    schedule: []
  })
  emit('clear')
}
</script>

<style scoped>
.filter-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) 0;
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.filter-option:hover {
  color: var(--primary-color);
}

.filter-checkbox,
.filter-radio {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Dark mode adjustments */
.dark-mode .filter-option {
  color: var(--text-primary);
}

.dark-mode .filter-option:hover {
  color: var(--primary-color);
}
</style>