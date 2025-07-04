<template>
  <Modal
    :open="open"
    @close="handleClose"
    title="Create Announcement"
    size="lg"
  >
    <form @submit.prevent="handleSubmit">
      <LayoutStack gap="lg">
        <!-- Title -->
        <FormField
          label="Announcement Title"
          required
          :error="errors.title"
        >
          <Input
            v-model="formData.title"
            placeholder="Enter announcement title"
            :error="!!errors.title"
          />
        </FormField>

        <!-- Target Audience -->
        <FormField
          label="Target Audience"
          required
          :error="errors.audience"
        >
          <LayoutColumn gap="sm">
            <label
              v-for="option in audienceOptions"
              :key="option.value"
              class="audience-option"
            >
              <input
                type="checkbox"
                v-model="formData.audience"
                :value="option.value"
                class="audience-checkbox"
              />
              <span>{{ option.label }}</span>
            </label>
          </LayoutColumn>
        </FormField>

        <!-- Classes (if targeting specific classes) -->
        <FormField
          v-if="formData.audience.includes('classes')"
          label="Select Classes"
          :error="errors.classes"
        >
          <LayoutColumn gap="sm">
            <label
              v-for="cls in availableClasses"
              :key="cls.id"
              class="class-option"
            >
              <input
                type="checkbox"
                v-model="formData.classes"
                :value="cls.id"
                class="class-checkbox"
              />
              <span>{{ cls.name }} - {{ cls.subject }}</span>
            </label>
          </LayoutColumn>
        </FormField>

        <!-- Priority -->
        <FormField label="Priority">
          <LayoutRow gap="md">
            <label
              v-for="priority in priorityOptions"
              :key="priority.value"
              class="priority-option"
            >
              <input
                type="radio"
                v-model="formData.priority"
                :value="priority.value"
                name="priority"
              />
              <Badge :variant="priority.variant">
                {{ priority.label }}
              </Badge>
            </label>
          </LayoutRow>
        </FormField>

        <!-- Message -->
        <FormField
          label="Message"
          required
          :error="errors.message"
        >
          <Textarea
            v-model="formData.message"
            placeholder="Write your announcement..."
            :rows="6"
            :maxLength="1000"
            :error="!!errors.message"
          />
        </FormField>

        <!-- Attachments -->
        <FormField label="Attachments (Optional)">
          <FileInput
            v-model="formData.attachments"
            :accept="['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']"
            :maxSize="10"
            multiple
          />
        </FormField>

        <!-- Schedule Options -->
        <FormField>
          <label class="schedule-option">
            <input
              type="checkbox"
              v-model="formData.scheduled"
              class="schedule-checkbox"
            />
            <span>Schedule for later</span>
          </label>
        </FormField>

        <LayoutRow v-if="formData.scheduled" gap="md">
          <FormField label="Date" flex="1">
            <DatePicker
              v-model="formData.scheduleDate"
              :min="minDate"
            />
          </FormField>
          <FormField label="Time" flex="1">
            <TimePicker
              v-model="formData.scheduleTime"
            />
          </FormField>
        </LayoutRow>

        <!-- Send Notifications -->
        <FormField>
          <LayoutColumn gap="sm">
            <label class="notification-option">
              <input
                type="checkbox"
                v-model="formData.sendEmail"
                class="notification-checkbox"
              />
              <span>Send email notifications</span>
            </label>
            <label class="notification-option">
              <input
                type="checkbox"
                v-model="formData.sendPush"
                class="notification-checkbox"
              />
              <span>Send push notifications</span>
            </label>
          </LayoutColumn>
        </FormField>
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
          v-if="!formData.scheduled"
          @click="handleSubmit"
          :loading="loading"
        >
          Send Announcement
        </Button>
        <Button
          v-else
          @click="handleSubmit"
          :loading="loading"
        >
          Schedule Announcement
        </Button>
      </LayoutRow>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

interface Props {
  open: boolean
  availableClasses?: Array<{
    id: string
    name: string
    subject: string
  }>
}

const props = withDefaults(defineProps<Props>(), {
  availableClasses: () => []
})

const emit = defineEmits<{
  close: []
  submit: [data: AnnouncementData]
}>()

interface AnnouncementData {
  title: string
  audience: string[]
  classes: string[]
  priority: 'normal' | 'important' | 'urgent'
  message: string
  attachments: File[]
  scheduled: boolean
  scheduleDate?: Date
  scheduleTime?: string
  sendEmail: boolean
  sendPush: boolean
}

const { showToast } = useToast()

const formData = ref<AnnouncementData>({
  title: '',
  audience: [],
  classes: [],
  priority: 'normal',
  message: '',
  attachments: [],
  scheduled: false,
  scheduleDate: undefined,
  scheduleTime: undefined,
  sendEmail: true,
  sendPush: true
})

const errors = ref<Partial<Record<keyof AnnouncementData, string>>>({})
const loading = ref(false)

const audienceOptions = [
  { value: 'all-students', label: 'All Students' },
  { value: 'all-parents', label: 'All Parents' },
  { value: 'classes', label: 'Specific Classes' },
  { value: 'staff', label: 'Staff Members' }
]

const priorityOptions = [
  { value: 'normal', label: 'Normal', variant: 'default' },
  { value: 'important', label: 'Important', variant: 'warning' },
  { value: 'urgent', label: 'Urgent', variant: 'error' }
]

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }
  
  if (formData.value.audience.length === 0) {
    errors.value.audience = 'Please select at least one audience'
  }
  
  if (formData.value.audience.includes('classes') && formData.value.classes.length === 0) {
    errors.value.classes = 'Please select at least one class'
  }
  
  if (!formData.value.message.trim()) {
    errors.value.message = 'Message is required'
  }
  
  if (formData.value.scheduled) {
    if (!formData.value.scheduleDate) {
      errors.value.scheduleDate = 'Schedule date is required'
    }
    if (!formData.value.scheduleTime) {
      errors.value.scheduleTime = 'Schedule time is required'
    }
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    showToast('Please fix the errors before submitting', 'error')
    return
  }
  
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emit('submit', { ...formData.value })
    
    const action = formData.value.scheduled ? 'scheduled' : 'sent'
    showToast(`Announcement ${action} successfully!`, 'success')
    
    handleClose()
  } catch (error) {
    showToast('Failed to send announcement. Please try again.', 'error')
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
        title: '',
        audience: [],
        classes: [],
        priority: 'normal',
        message: '',
        attachments: [],
        scheduled: false,
        scheduleDate: undefined,
        scheduleTime: undefined,
        sendEmail: true,
        sendPush: true
      }
      errors.value = {}
    }, 300)
  }
}
</script>

<style scoped>
.audience-option,
.class-option,
.priority-option,
.schedule-option,
.notification-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  padding: var(--spacing-xs) 0;
}

.audience-checkbox,
.class-checkbox,
.schedule-checkbox,
.notification-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.priority-option input[type="radio"] {
  margin-right: var(--spacing-sm);
}

/* Dark mode adjustments */
.dark-mode .audience-option,
.dark-mode .class-option,
.dark-mode .priority-option,
.dark-mode .schedule-option,
.dark-mode .notification-option {
  color: var(--text-primary);
}
</style>