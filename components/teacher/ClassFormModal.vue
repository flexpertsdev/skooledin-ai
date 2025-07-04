<template>
  <Modal
    :open="open"
    @close="handleClose"
    :title="classData ? 'Edit Class' : 'Create New Class'"
    size="lg"
  >
    <form @submit.prevent="handleSubmit">
      <LayoutStack gap="lg">
        <!-- Basic Information -->
        <LayoutColumn gap="md">
          <h3 class="section-title">Basic Information</h3>
          
          <FormField
            label="Class Name"
            required
            :error="errors.name"
          >
            <Input
              v-model="formData.name"
              placeholder="e.g., Mathematics 101"
              :error="!!errors.name"
            />
          </FormField>

          <LayoutRow gap="md">
            <FormField
              label="Subject"
              required
              :error="errors.subject"
              flex="1"
            >
              <Select
                v-model="formData.subject"
                :options="subjectOptions"
                placeholder="Select subject"
                :error="!!errors.subject"
              />
            </FormField>

            <FormField
              label="Grade Level"
              required
              :error="errors.grade"
              flex="1"
            >
              <Select
                v-model="formData.grade"
                :options="gradeOptions"
                placeholder="Select grade"
                :error="!!errors.grade"
              />
            </FormField>
          </LayoutRow>
        </LayoutColumn>

        <!-- Schedule -->
        <LayoutColumn gap="md">
          <h3 class="section-title">Schedule</h3>
          
          <FormField label="Class Days" required>
            <LayoutRow gap="sm" wrap>
              <label
                v-for="day in weekDays"
                :key="day.value"
                class="day-option"
              >
                <input
                  type="checkbox"
                  v-model="formData.days"
                  :value="day.value"
                  class="day-checkbox"
                />
                <span>{{ day.label }}</span>
              </label>
            </LayoutRow>
          </FormField>

          <LayoutRow gap="md">
            <FormField
              label="Start Time"
              required
              :error="errors.startTime"
              flex="1"
            >
              <TimePicker
                v-model="formData.startTime"
                :error="!!errors.startTime"
              />
            </FormField>

            <FormField
              label="Duration (minutes)"
              required
              :error="errors.duration"
              flex="1"
            >
              <Input
                v-model.number="formData.duration"
                type="number"
                placeholder="e.g., 60"
                :min="15"
                :max="180"
                :step="15"
                :error="!!errors.duration"
              />
            </FormField>
          </LayoutRow>
        </LayoutColumn>

        <!-- Location -->
        <LayoutColumn gap="md">
          <h3 class="section-title">Location</h3>
          
          <FormField>
            <label class="location-option">
              <input
                type="checkbox"
                v-model="formData.isOnline"
                class="location-checkbox"
              />
              <span>This is an online class</span>
            </label>
          </FormField>

          <FormField
            v-if="!formData.isOnline"
            label="Room/Location"
            :error="errors.location"
          >
            <Input
              v-model="formData.location"
              placeholder="e.g., Room 301, Science Lab"
              :error="!!errors.location"
            />
          </FormField>

          <FormField
            v-else
            label="Meeting Link"
            :error="errors.meetingLink"
          >
            <Input
              v-model="formData.meetingLink"
              type="url"
              placeholder="https://zoom.us/..."
              :error="!!errors.meetingLink"
            />
          </FormField>
        </LayoutColumn>

        <!-- Additional Settings -->
        <LayoutColumn gap="md">
          <h3 class="section-title">Additional Settings</h3>
          
          <FormField
            label="Class Description"
            hint="Optional description visible to students"
          >
            <Textarea
              v-model="formData.description"
              placeholder="Describe what students will learn..."
              :rows="3"
              :maxLength="500"
            />
          </FormField>

          <FormField
            label="Maximum Students"
            hint="Leave empty for unlimited"
          >
            <Input
              v-model.number="formData.maxStudents"
              type="number"
              placeholder="e.g., 30"
              :min="1"
              :max="100"
            />
          </FormField>

          <FormField>
            <label class="setting-option">
              <input
                type="checkbox"
                v-model="formData.allowSelfEnrollment"
                class="setting-checkbox"
              />
              <span>Allow students to self-enroll</span>
            </label>
          </FormField>
        </LayoutColumn>
      </LayoutStack>
    </form>

    <template #footer>
      <LayoutRow justify="end" gap="sm">
        <Button
          variant="secondary"
          @click="handleClose"
          :disabled="loading"
        >
          Cancel
        </Button>
        <Button
          @click="handleSubmit"
          :loading="loading"
        >
          {{ classData ? 'Update Class' : 'Create Class' }}
        </Button>
      </LayoutRow>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

interface ClassData {
  id: string
  name: string
  subject: string
  grade: string
  schedule: string
  days?: string[]
  startTime?: string
  duration?: number
  isOnline?: boolean
  location?: string
  meetingLink?: string
  description?: string
  maxStudents?: number
  allowSelfEnrollment?: boolean
}

interface Props {
  open: boolean
  classData?: ClassData | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  submit: [data: Partial<ClassData>]
}>()

const { showToast } = useToast()

const formData = ref({
  name: '',
  subject: '',
  grade: '',
  days: [] as string[],
  startTime: '',
  duration: 60,
  isOnline: false,
  location: '',
  meetingLink: '',
  description: '',
  maxStudents: undefined as number | undefined,
  allowSelfEnrollment: true
})

const errors = ref<Partial<Record<keyof typeof formData.value, string>>>({})
const loading = ref(false)

const subjectOptions = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Science', label: 'Science' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Biology', label: 'Biology' },
  { value: 'English', label: 'English' },
  { value: 'History', label: 'History' },
  { value: 'Geography', label: 'Geography' },
  { value: 'Art', label: 'Art' },
  { value: 'Music', label: 'Music' },
  { value: 'Physical Education', label: 'Physical Education' }
]

const gradeOptions = [
  { value: 'Grade 9', label: 'Grade 9' },
  { value: 'Grade 10', label: 'Grade 10' },
  { value: 'Grade 11', label: 'Grade 11' },
  { value: 'Grade 12', label: 'Grade 12' }
]

const weekDays = [
  { value: 'Mon', label: 'Mon' },
  { value: 'Tue', label: 'Tue' },
  { value: 'Wed', label: 'Wed' },
  { value: 'Thu', label: 'Thu' },
  { value: 'Fri', label: 'Fri' },
  { value: 'Sat', label: 'Sat' },
  { value: 'Sun', label: 'Sun' }
]

watch(() => props.classData, (newData) => {
  if (newData) {
    formData.value = {
      name: newData.name || '',
      subject: newData.subject || '',
      grade: newData.grade || '',
      days: newData.days || [],
      startTime: newData.startTime || '',
      duration: newData.duration || 60,
      isOnline: newData.isOnline || false,
      location: newData.location || '',
      meetingLink: newData.meetingLink || '',
      description: newData.description || '',
      maxStudents: newData.maxStudents,
      allowSelfEnrollment: newData.allowSelfEnrollment ?? true
    }
  }
}, { immediate: true })

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'Class name is required'
  }
  
  if (!formData.value.subject) {
    errors.value.subject = 'Subject is required'
  }
  
  if (!formData.value.grade) {
    errors.value.grade = 'Grade level is required'
  }
  
  if (formData.value.days.length === 0) {
    errors.value.days = 'Select at least one day'
  }
  
  if (!formData.value.startTime) {
    errors.value.startTime = 'Start time is required'
  }
  
  if (!formData.value.duration || formData.value.duration < 15 || formData.value.duration > 180) {
    errors.value.duration = 'Duration must be between 15 and 180 minutes'
  }
  
  if (!formData.value.isOnline && !formData.value.location?.trim()) {
    errors.value.location = 'Location is required for in-person classes'
  }
  
  if (formData.value.isOnline && !formData.value.meetingLink?.trim()) {
    errors.value.meetingLink = 'Meeting link is required for online classes'
  }
  
  return Object.keys(errors.value).length === 0
}

const formatSchedule = (data: typeof formData.value): string => {
  const days = data.days.join(', ')
  const time = data.startTime
  return `${days} - ${time}`
}

const handleSubmit = async () => {
  if (!validateForm()) {
    showToast('Please fix the errors before submitting', 'error')
    return
  }
  
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const submitData = {
      ...formData.value,
      schedule: formatSchedule(formData.value)
    }
    
    emit('submit', submitData)
    showToast(props.classData ? 'Class updated successfully' : 'Class created successfully', 'success')
    handleClose()
  } catch (error) {
    showToast('Failed to save class. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  if (!loading.value) {
    emit('close')
    // Reset form after close animation
    setTimeout(() => {
      formData.value = {
        name: '',
        subject: '',
        grade: '',
        days: [],
        startTime: '',
        duration: 60,
        isOnline: false,
        location: '',
        meetingLink: '',
        description: '',
        maxStudents: undefined,
        allowSelfEnrollment: true
      }
      errors.value = {}
    }, 300)
  }
}
</script>

<style scoped>
.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.day-option {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.day-option:has(input:checked) {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.day-checkbox {
  display: none;
}

.location-option,
.setting-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.location-checkbox,
.setting-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Dark mode adjustments */
.dark-mode .section-title {
  color: var(--text-primary);
}

.dark-mode .day-option {
  border-color: var(--border-elevated);
}

.dark-mode .day-option:hover:not(:has(input:checked)) {
  background: var(--surface-hover);
}
</style>