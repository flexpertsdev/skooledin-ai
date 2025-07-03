<template>
  <div class="demo-page">
    <LayoutContainer>
      <h1>Accessible Form Navigation</h1>
      <p class="subtitle">Keyboard-friendly forms with screen reader support</p>
      
      <!-- Basic Accessible Form -->
      <section class="demo-section">
        <h2>Basic Accessible Form</h2>
        <p>Navigate with Tab, Shift+Tab, or arrow keys. Press Enter to submit.</p>
        
        <AccessibleForm
          ref="basicForm"
          aria-label="Basic contact form"
          @submit="handleBasicSubmit"
          @field-change="handleFieldChange"
          @navigation-change="handleNavigationChange"
        >
          <template #default="{ currentField }">
            <div class="form-grid">
              <div class="form-field">
                <label for="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  :class="{ 'is-current': currentField?.name === 'name' }"
                />
                <span id="name-error" role="alert" class="field-error"></span>
              </div>
              
              <div class="form-field">
                <label for="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  :class="{ 'is-current': currentField?.name === 'email' }"
                />
                <span id="email-error" role="alert" class="field-error"></span>
              </div>
              
              <div class="form-field full-width">
                <label for="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your message..."
                  :class="{ 'is-current': currentField?.name === 'message' }"
                ></textarea>
              </div>
              
              <div class="form-field full-width">
                <label>
                  <input
                    type="checkbox"
                    name="subscribe"
                    value="yes"
                  />
                  Subscribe to newsletter
                </label>
              </div>
            </div>
          </template>
        </AccessibleForm>
        
        <div class="field-info" v-if="currentFieldInfo">
          <p><strong>Current field:</strong> {{ currentFieldInfo }}</p>
        </div>
      </section>
      
      <!-- Complex Form with Progressive Components -->
      <section class="demo-section">
        <h2>Complex Form with Focus Management</h2>
        <p>Combines our progressive form components with accessible navigation</p>
        
        <AccessibleForm
          ref="complexForm"
          aria-label="User registration form"
          :navigation-options="{
            trapFocus: true,
            scrollIntoView: true,
            submitOnEnter: false
          }"
          :show-reset-button="true"
          @submit="handleComplexSubmit"
        >
          <div class="form-sections">
            <fieldset>
              <legend>Account Information</legend>
              
              <div class="form-field">
                <label for="username">Username *</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  pattern="[a-zA-Z0-9_]+"
                  aria-describedby="username-hint"
                  placeholder="Choose a username"
                />
                <span id="username-hint" class="field-hint">
                  Letters, numbers, and underscores only
                </span>
              </div>
              
              <div class="form-field">
                <label for="password">Password *</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minlength="8"
                  aria-describedby="password-hint"
                />
                <span id="password-hint" class="field-hint">
                  Minimum 8 characters
                </span>
              </div>
              
              <BottomSheetSelect
                v-model="selectedCountry"
                :options="countries"
                label="Country *"
                name="country"
                required
                aria-describedby="country-hint"
              />
              <span id="country-hint" class="field-hint">
                Select your country of residence
              </span>
            </fieldset>
            
            <fieldset>
              <legend>Preferences</legend>
              
              <ChoiceButtons
                v-model="selectedTheme"
                :options="themeOptions"
                label="Theme Preference"
                name="theme"
                layout="horizontal"
              />
              
              <ChoiceButtons
                v-model="selectedNotifications"
                :options="notificationOptions"
                label="Email Notifications"
                name="notifications"
                :multiple="true"
                layout="vertical"
                helper-text="Select which notifications you'd like to receive"
              />
            </fieldset>
            
            <fieldset>
              <legend>Additional Information</legend>
              
              <ChatInput
                v-model="bio"
                placeholder="Tell us about yourself..."
                label="Bio"
                name="bio"
                :max-length="200"
                :show-counter="true"
              />
              
              <div class="form-field">
                <label>
                  <input
                    type="checkbox"
                    name="terms"
                    value="accepted"
                    required
                  />
                  I accept the <a href="#" @click.prevent>terms and conditions</a> *
                </label>
              </div>
            </fieldset>
          </div>
        </AccessibleForm>
      </section>
      
      <!-- Keyboard Shortcuts Guide -->
      <section class="demo-section">
        <h2>Keyboard Navigation Guide</h2>
        <div class="keyboard-guide">
          <div class="shortcut">
            <kbd>Tab</kbd>
            <span>Move to next field</span>
          </div>
          <div class="shortcut">
            <kbd>Shift + Tab</kbd>
            <span>Move to previous field</span>
          </div>
          <div class="shortcut">
            <kbd>Enter</kbd>
            <span>Submit form (when not in textarea)</span>
          </div>
          <div class="shortcut">
            <kbd>Escape</kbd>
            <span>Reset form (when enabled)</span>
          </div>
          <div class="shortcut">
            <kbd>Space</kbd>
            <span>Toggle checkbox/radio</span>
          </div>
          <div class="shortcut">
            <kbd>↑ ↓</kbd>
            <span>Navigate radio group options</span>
          </div>
        </div>
      </section>
      
      <!-- Screen Reader Testing -->
      <section class="demo-section">
        <h2>Screen Reader Features</h2>
        <ul class="feature-list">
          <li>✓ Proper labeling for all form controls</li>
          <li>✓ Live region announcements for form state</li>
          <li>✓ Error messages linked with aria-describedby</li>
          <li>✓ Required fields announced</li>
          <li>✓ Field type and current value announced on focus</li>
          <li>✓ Form submission status announced</li>
          <li>✓ Fieldset grouping for related fields</li>
        </ul>
      </section>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

const toast = useToast()

// Refs
const basicForm = ref()
const complexForm = ref()

// State
const currentFieldInfo = ref('')
const selectedCountry = ref('')
const selectedTheme = ref('system')
const selectedNotifications = ref<string[]>([])
const bio = ref('')

// Data
const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' }
]

const themeOptions = [
  { label: 'Light', value: 'light', icon: '☀️' },
  { label: 'Dark', value: 'dark', icon: '🌙' },
  { label: 'System', value: 'system', icon: '💻' }
]

const notificationOptions = [
  { label: 'Product updates', value: 'updates' },
  { label: 'Security alerts', value: 'security' },
  { label: 'Newsletter', value: 'newsletter' },
  { label: 'Tips & tutorials', value: 'tips' }
]

// Handlers
const handleBasicSubmit = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries())
  console.log('Basic form submitted:', data)
  
  toast.success('Form submitted successfully!')
  
  // Simulate async submission
  setTimeout(() => {
    basicForm.value?.reset()
  }, 2000)
}

const handleComplexSubmit = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries())
  console.log('Complex form submitted:', data)
  
  toast.success({
    title: 'Registration Complete!',
    description: 'Welcome to our platform'
  })
}

const handleFieldChange = (name: string, value: any) => {
  console.log('Field changed:', name, value)
}

const handleNavigationChange = (fieldIndex: number) => {
  const form = basicForm.value
  if (!form) return
  
  const fields = form.$el.querySelectorAll('input, textarea, select')
  const field = fields[fieldIndex]
  
  if (field) {
    const label = field.labels?.[0]?.textContent || field.getAttribute('aria-label') || field.name
    const type = field.type || field.tagName.toLowerCase()
    currentFieldInfo = `${label} (${type})`
  }
}
</script>

<style scoped>
.demo-page {
  padding: var(--spacing-xl) 0;
  min-height: 100vh;
  background: var(--color-background);
}

h1 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.demo-section {
  margin-bottom: var(--spacing-3xl);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.demo-section h2 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.demo-section > p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

/* Form styles */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.form-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-field.full-width {
  grid-column: 1 / -1;
}

fieldset {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

legend {
  padding: 0 var(--spacing-sm);
  font-weight: 600;
  color: var(--color-text);
}

label {
  font-weight: 500;
  color: var(--color-text);
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  font-size: var(--font-size-base);
  transition: all 0.2s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}

input.is-current,
textarea.is-current {
  border-color: var(--color-primary);
  background: var(--color-primary-alpha);
}

input[type="checkbox"],
input[type="radio"] {
  margin-right: var(--spacing-xs);
}

.field-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.field-error {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  min-height: 1.2em;
}

.field-info {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-surface-elevated);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-primary);
}

/* Keyboard guide */
.keyboard-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.shortcut {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

kbd {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

/* Feature list */
.feature-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--spacing-sm);
}

.feature-list li {
  padding-left: var(--spacing-lg);
  position: relative;
}

.feature-list li::before {
  content: attr(data-before);
  position: absolute;
  left: 0;
  color: var(--color-success);
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .keyboard-guide {
    grid-template-columns: 1fr;
  }
}
</style>