<template>
  <Modal
    v-model="isOpen"
    title="Share Content"
    size="md"
  >
    <div class="share-modal">
      <div class="share-options">
        <h3 class="share-subtitle">Share with</h3>
        
        <div class="share-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="share-tab"
            :class="{ 'share-tab--active': activeTab === tab.id }"
          >
            <Icon :name="tab.icon" />
            {{ tab.label }}
          </button>
        </div>
        
        <div v-if="activeTab === 'users'" class="share-users">
          <SearchBar
            v-model="searchQuery"
            placeholder="Search students, teachers, or parents..."
            @search="handleSearch"
            class="mb-4"
          />
          
          <div class="share-user-list">
            <label
              v-for="user in filteredUsers"
              :key="user.id"
              class="share-user"
            >
              <input
                v-model="selectedUsers"
                :value="user.id"
                type="checkbox"
                class="share-checkbox"
              />
              <Avatar
                :src="user.avatar"
                :name="user.name"
                size="sm"
              />
              <div class="share-user-info">
                <p class="share-user-name">{{ user.name }}</p>
                <p class="share-user-role">{{ user.role }}</p>
              </div>
            </label>
          </div>
        </div>
        
        <div v-else-if="activeTab === 'classes'" class="share-classes">
          <div class="share-class-list">
            <label
              v-for="classItem in classes"
              :key="classItem.id"
              class="share-class"
            >
              <input
                v-model="selectedClasses"
                :value="classItem.id"
                type="checkbox"
                class="share-checkbox"
              />
              <div class="share-class-icon">
                <Icon name="heroicons:user-group" />
              </div>
              <div class="share-class-info">
                <p class="share-class-name">{{ classItem.name }}</p>
                <p class="share-class-count">{{ classItem.studentCount }} students</p>
              </div>
            </label>
          </div>
        </div>
        
        <div v-else-if="activeTab === 'link'" class="share-link">
          <p class="share-link-desc">Anyone with the link can view this content</p>
          
          <div class="share-link-input">
            <Input
              v-model="shareLink"
              readonly
              @focus="$event.target.select()"
            />
            <Button
              @click="copyLink"
              variant="secondary"
              :icon="copied ? 'heroicons:check' : 'heroicons:clipboard'"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </Button>
          </div>
          
          <div class="share-link-options">
            <label class="share-option">
              <input
                v-model="linkSettings.allowComments"
                type="checkbox"
                class="share-checkbox"
              />
              <span>Allow comments</span>
            </label>
            <label class="share-option">
              <input
                v-model="linkSettings.allowDownload"
                type="checkbox"
                class="share-checkbox"
              />
              <span>Allow download</span>
            </label>
            <label class="share-option">
              <input
                v-model="linkSettings.requireAuth"
                type="checkbox"
                class="share-checkbox"
              />
              <span>Require sign-in</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="share-permissions">
        <h3 class="share-subtitle">Permissions</h3>
        <Select v-model="permission" :options="permissionOptions" />
      </div>
      
      <FormField
        label="Add a message (optional)"
        class="share-message"
      >
        <Textarea
          v-model="message"
          placeholder="Let them know why you're sharing this..."
          :rows="3"
        />
      </FormField>
    </div>
    
    <template #footer>
      <div class="share-footer">
        <Button variant="secondary" @click="isOpen = false">
          Cancel
        </Button>
        <Button
          @click="handleShare"
          :loading="loading"
          :disabled="!canShare"
        >
          Share
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface User {
  id: string
  name: string
  role: string
  avatar?: string
}

interface Class {
  id: string
  name: string
  studentCount: number
}

interface Props {
  modelValue: boolean
  contentType: string
  contentId: string
  contentTitle: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  share: [data: {
    users?: string[]
    classes?: string[]
    permission: string
    message: string
    linkSettings?: any
  }]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const tabs = [
  { id: 'users', label: 'People', icon: 'heroicons:user' },
  { id: 'classes', label: 'Classes', icon: 'heroicons:user-group' },
  { id: 'link', label: 'Link', icon: 'heroicons:link' }
]

const activeTab = ref('users')
const searchQuery = ref('')
const selectedUsers = ref<string[]>([])
const selectedClasses = ref<string[]>([])
const permission = ref('view')
const message = ref('')
const loading = ref(false)

const linkSettings = reactive({
  allowComments: true,
  allowDownload: false,
  requireAuth: true
})

const permissionOptions = [
  { value: 'view', label: 'Can view' },
  { value: 'comment', label: 'Can comment' },
  { value: 'edit', label: 'Can edit' }
]

// Mock data - replace with actual data
const users = ref<User[]>([
  { id: '1', name: 'John Doe', role: 'Student', avatar: '' },
  { id: '2', name: 'Jane Smith', role: 'Teacher', avatar: '' },
  { id: '3', name: 'Bob Johnson', role: 'Parent', avatar: '' }
])

const classes = ref<Class[]>([
  { id: '1', name: 'Math 101', studentCount: 25 },
  { id: '2', name: 'Science 202', studentCount: 30 }
])

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  )
})

const shareLink = computed(() => {
  return `${window.location.origin}/shared/${props.contentType}/${props.contentId}`
})

const canShare = computed(() => {
  if (activeTab.value === 'users') return selectedUsers.value.length > 0
  if (activeTab.value === 'classes') return selectedClasses.value.length > 0
  return true // Link sharing is always available
})

// Copy link functionality
const { copy, copied } = useClipboard({ source: shareLink })

const copyLink = async () => {
  await copy()
}

const handleSearch = (query: string) => {
  // Implement search logic
}

const handleShare = async () => {
  loading.value = true
  
  try {
    const shareData: any = {
      permission: permission.value,
      message: message.value
    }
    
    if (activeTab.value === 'users') {
      shareData.users = selectedUsers.value
    } else if (activeTab.value === 'classes') {
      shareData.classes = selectedClasses.value
    } else {
      shareData.linkSettings = linkSettings
    }
    
    emit('share', shareData)
    isOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.share-modal {
  @apply space-y-6;
}

.share-subtitle {
  @apply text-sm font-medium text-gray-700 mb-3;
}

.share-tabs {
  @apply flex gap-1 p-1 bg-gray-100 rounded-lg mb-4;
}

.share-tab {
  @apply flex-1 flex items-center justify-center gap-2 px-3 py-2
         text-sm font-medium text-gray-600 rounded-md
         hover:text-gray-900 transition-all;
}

.share-tab--active {
  @apply bg-white text-gray-900 shadow-sm;
}

.share-tab Icon {
  @apply w-4 h-4;
}

/* Users list */
.share-user-list {
  @apply space-y-2 max-h-48 overflow-y-auto;
}

.share-user {
  @apply flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50
         cursor-pointer transition-colors;
}

.share-checkbox {
  @apply w-4 h-4 text-primary-600 rounded border-gray-300
         focus:ring-primary-500;
}

.share-user-info {
  @apply flex-1 min-w-0;
}

.share-user-name {
  @apply text-sm font-medium text-gray-900;
}

.share-user-role {
  @apply text-xs text-gray-500;
}

/* Classes list */
.share-class-list {
  @apply space-y-2 max-h-48 overflow-y-auto;
}

.share-class {
  @apply flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50
         cursor-pointer transition-colors;
}

.share-class-icon {
  @apply w-10 h-10 bg-primary-100 text-primary-600 rounded-lg
         flex items-center justify-center;
}

.share-class-icon Icon {
  @apply w-5 h-5;
}

.share-class-info {
  @apply flex-1;
}

.share-class-name {
  @apply text-sm font-medium text-gray-900;
}

.share-class-count {
  @apply text-xs text-gray-500;
}

/* Link sharing */
.share-link {
  @apply space-y-4;
}

.share-link-desc {
  @apply text-sm text-gray-600;
}

.share-link-input {
  @apply flex gap-2;
}

.share-link-options {
  @apply space-y-2;
}

.share-option {
  @apply flex items-center gap-2 text-sm text-gray-700 cursor-pointer;
}

.share-permissions {
  @apply border-t border-gray-200 pt-6;
}

.share-message {
  @apply border-t border-gray-200 pt-6;
}

.share-footer {
  @apply flex justify-end gap-3;
}
</style>