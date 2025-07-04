<template>
  <Modal
    :open="open"
    @close="handleClose"
    title="Grade Submission"
    size="xl"
  >
    <div v-if="submission" class="grading-container">
      <LayoutRow gap="lg" align="start">
        <!-- Left: Submission Preview -->
        <LayoutExpanded class="submission-preview">
          <LayoutStack gap="md">
            <!-- Student Info -->
            <LayoutRow gap="md" align="center">
              <Avatar
                :src="submission.studentAvatar"
                :name="submission.studentName"
                size="lg"
              />
              <div>
                <h3 class="student-name">{{ submission.studentName }}</h3>
                <p class="submission-info">
                  {{ submission.assignmentTitle }} • {{ submission.className }}
                </p>
                <p class="submission-time">
                  Submitted {{ formatTime(submission.submittedAt) }}
                </p>
              </div>
            </LayoutRow>

            <!-- Attachments Preview -->
            <div class="attachments-section">
              <h4 class="section-title">Submitted Files</h4>
              <LayoutStack gap="sm">
                <div
                  v-for="attachment in submission.attachments"
                  :key="attachment.name"
                  class="attachment-preview"
                  @click="viewAttachment(attachment)"
                >
                  <Icon :name="getFileIcon(attachment.type)" size="24" />
                  <div class="attachment-info">
                    <p class="attachment-name">{{ attachment.name }}</p>
                    <p class="attachment-meta">Click to view</p>
                  </div>
                  <Icon name="heroicons:arrow-top-right-on-square" class="attachment-action" />
                </div>
              </LayoutStack>
            </div>

            <!-- Submission Content Preview -->
            <div class="content-preview">
              <h4 class="section-title">Preview</h4>
              <div class="preview-placeholder">
                <Icon name="heroicons:document-text" size="48" />
                <p>Document preview would appear here</p>
              </div>
            </div>
          </LayoutStack>
        </LayoutExpanded>

        <!-- Right: Grading Panel -->
        <div class="grading-panel">
          <LayoutStack gap="lg">
            <!-- Grade Input -->
            <FormField
              label="Grade"
              required
              :error="errors.grade"
            >
              <LayoutRow gap="sm" align="center">
                <Input
                  v-model.number="formData.grade"
                  type="number"
                  :min="0"
                  :max="submission.maxGrade"
                  :error="!!errors.grade"
                  class="grade-input"
                />
                <span class="grade-separator">/</span>
                <span class="max-grade">{{ submission.maxGrade }}</span>
                <Badge
                  v-if="gradePercentage !== null"
                  :variant="getGradeBadgeVariant()"
                  class="grade-percentage"
                >
                  {{ gradePercentage }}%
                </Badge>
              </LayoutRow>
            </FormField>

            <!-- Quick Grade Buttons -->
            <div>
              <p class="quick-grade-label">Quick Grade:</p>
              <LayoutRow gap="sm" wrap>
                <Button
                  v-for="percent in [100, 90, 80, 70, 60, 50]"
                  :key="percent"
                  variant="secondary"
                  size="sm"
                  @click="setQuickGrade(percent)"
                >
                  {{ percent }}%
                </Button>
              </LayoutRow>
            </div>

            <!-- Rubric (if available) -->
            <div v-if="rubric" class="rubric-section">
              <h4 class="section-title">Rubric</h4>
              <LayoutStack gap="sm">
                <div
                  v-for="criterion in rubric.criteria"
                  :key="criterion.id"
                  class="rubric-item"
                >
                  <LayoutRow justify="between" align="center">
                    <span class="criterion-name">{{ criterion.name }}</span>
                    <LayoutRow gap="xs">
                      <Button
                        v-for="level in criterion.levels"
                        :key="level.value"
                        :variant="rubricScores[criterion.id] === level.value ? 'primary' : 'secondary'"
                        size="sm"
                        @click="setRubricScore(criterion.id, level.value)"
                      >
                        {{ level.label }} ({{ level.value }})
                      </Button>
                    </LayoutRow>
                  </LayoutRow>
                </div>
              </LayoutStack>
            </div>

            <!-- Feedback -->
            <FormField label="Feedback">
              <Textarea
                v-model="formData.feedback"
                placeholder="Provide feedback for the student..."
                :rows="6"
                :maxLength="1000"
              />
              <div class="feedback-tools">
                <LayoutRow gap="sm">
                  <Button
                    variant="text"
                    size="sm"
                    @click="insertFeedbackTemplate('good')"
                  >
                    <Icon name="heroicons:face-smile" />
                    Good Work
                  </Button>
                  <Button
                    variant="text"
                    size="sm"
                    @click="insertFeedbackTemplate('improve')"
                  >
                    <Icon name="heroicons:light-bulb" />
                    Needs Improvement
                  </Button>
                  <Button
                    variant="text"
                    size="sm"
                    @click="showAIAssist = true"
                  >
                    <Icon name="heroicons:sparkles" />
                    AI Assist
                  </Button>
                </LayoutRow>
              </div>
            </FormField>

            <!-- Additional Options -->
            <LayoutColumn gap="sm">
              <label class="option-item">
                <input
                  type="checkbox"
                  v-model="formData.allowResubmission"
                  class="option-checkbox"
                />
                <span>Allow resubmission</span>
              </label>
              <label class="option-item">
                <input
                  type="checkbox"
                  v-model="formData.sendNotification"
                  class="option-checkbox"
                />
                <span>Notify student when graded</span>
              </label>
            </LayoutColumn>
          </LayoutStack>
        </div>
      </LayoutRow>
    </div>

    <template #footer>
      <LayoutRow justify="between" align="center">
        <Button
          variant="text"
          @click="saveAsDraft"
          :disabled="loading"
        >
          Save as Draft
        </Button>
        <LayoutRow gap="sm">
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
            Submit Grade
          </Button>
        </LayoutRow>
      </LayoutRow>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { useToast } from '~/composables/useToast'

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
  open: boolean
  submission: Submission | null
  rubric?: {
    criteria: Array<{
      id: string
      name: string
      levels: Array<{
        label: string
        value: number
      }>
    }>
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  submit: [data: { grade: number; feedback: string; allowResubmission: boolean }]
}>()

const { showToast } = useToast()

const formData = ref({
  grade: 0,
  feedback: '',
  allowResubmission: false,
  sendNotification: true
})

const rubricScores = ref<Record<string, number>>({})
const errors = ref<{ grade?: string }>({})
const loading = ref(false)
const showAIAssist = ref(false)

const gradePercentage = computed(() => {
  if (!formData.value.grade || !props.submission) return null
  return Math.round((formData.value.grade / props.submission.maxGrade) * 100)
})

watch(() => props.submission, (newSubmission) => {
  if (newSubmission) {
    formData.value.grade = newSubmission.grade || 0
    formData.value.feedback = newSubmission.feedback || ''
  }
}, { immediate: true })

watch(() => rubricScores.value, () => {
  if (props.rubric) {
    const total = Object.values(rubricScores.value).reduce((sum, score) => sum + score, 0)
    formData.value.grade = total
  }
}, { deep: true })

const formatTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true })
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

const getGradeBadgeVariant = (): string => {
  const percent = gradePercentage.value
  if (!percent) return 'default'
  if (percent >= 90) return 'success'
  if (percent >= 80) return 'info'
  if (percent >= 70) return 'warning'
  if (percent >= 60) return 'warning'
  return 'error'
}

const setQuickGrade = (percent: number) => {
  if (!props.submission) return
  formData.value.grade = Math.round((percent / 100) * props.submission.maxGrade)
}

const setRubricScore = (criterionId: string, value: number) => {
  rubricScores.value[criterionId] = value
}

const insertFeedbackTemplate = (type: 'good' | 'improve') => {
  const templates = {
    good: "Great work! Your submission demonstrates a strong understanding of the material. ",
    improve: "Your submission shows effort, but there are areas that need improvement. "
  }
  formData.value.feedback = templates[type] + formData.value.feedback
}

const viewAttachment = (attachment: { url: string }) => {
  window.open(attachment.url, '_blank')
}

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.grade || formData.value.grade < 0) {
    errors.value.grade = 'Grade is required'
    return false
  }
  
  if (props.submission && formData.value.grade > props.submission.maxGrade) {
    errors.value.grade = `Grade cannot exceed ${props.submission.maxGrade}`
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) {
    showToast('Please fix the errors before submitting', 'error')
    return
  }
  
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emit('submit', {
      grade: formData.value.grade,
      feedback: formData.value.feedback,
      allowResubmission: formData.value.allowResubmission
    })
    
    if (formData.value.sendNotification) {
      showToast('Grade submitted and student notified', 'success')
    } else {
      showToast('Grade submitted successfully', 'success')
    }
  } catch (error) {
    showToast('Failed to submit grade', 'error')
  } finally {
    loading.value = false
  }
}

const saveAsDraft = async () => {
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast('Grade saved as draft', 'success')
    handleClose()
  } catch (error) {
    showToast('Failed to save draft', 'error')
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
        grade: 0,
        feedback: '',
        allowResubmission: false,
        sendNotification: true
      }
      rubricScores.value = {}
      errors.value = {}
    }, 300)
  }
}
</script>

<style scoped>
.grading-container {
  min-height: 500px;
}

.submission-preview {
  min-width: 0;
}

.grading-panel {
  width: 400px;
  flex-shrink: 0;
  padding-left: var(--spacing-lg);
  border-left: 1px solid var(--border-default);
}

.student-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.submission-info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: var(--spacing-xs) 0 0;
}

.submission-time {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin: var(--spacing-xs) 0 0;
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm);
}

.attachments-section {
  padding: var(--spacing-lg) 0;
  border-top: 1px solid var(--border-default);
}

.attachment-preview {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--surface-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.attachment-preview:hover {
  background: var(--surface-hover);
}

.attachment-info {
  flex: 1;
}

.attachment-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin: 0;
}

.attachment-meta {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin: var(--spacing-xs) 0 0;
}

.attachment-action {
  color: var(--text-tertiary);
}

.content-preview {
  padding-top: var(--spacing-lg);
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  height: 300px;
  background: var(--surface-secondary);
  border-radius: var(--radius-md);
  color: var(--text-tertiary);
}

.grade-input {
  width: 100px;
  text-align: center;
}

.grade-separator {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

.max-grade {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.grade-percentage {
  margin-left: var(--spacing-sm);
}

.quick-grade-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-sm);
}

.rubric-section {
  padding: var(--spacing-lg);
  background: var(--surface-secondary);
  border-radius: var(--radius-md);
}

.rubric-item {
  padding: var(--spacing-sm) 0;
}

.criterion-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.feedback-tools {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-subtle);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.option-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .grading-container {
    flex-direction: column;
  }
  
  .grading-panel {
    width: 100%;
    padding-left: 0;
    padding-top: var(--spacing-lg);
    border-left: none;
    border-top: 1px solid var(--border-default);
  }
}

/* Dark mode adjustments */
.dark-mode .grading-panel {
  border-left-color: var(--border-elevated);
}

.dark-mode .attachment-preview {
  background: var(--surface-elevated);
}

.dark-mode .preview-placeholder {
  background: var(--surface-elevated);
}

.dark-mode .rubric-section {
  background: var(--surface-elevated);
}

.dark-mode .feedback-tools {
  border-top-color: var(--border-elevated);
}
</style>