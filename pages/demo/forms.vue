<template>
  <div class="demo-page">
    <LayoutContainer>
      <h1>Form Components</h1>
      <p class="subtitle">Progressive form components designed for mobile-first experiences</p>
      
      <!-- ChatInput Demo -->
      <section class="demo-section">
        <h2>ChatInput</h2>
        <p>A versatile chat input component with auto-resize, voice recording, and suggestions</p>
        
        <div class="demo-group">
          <h3>Basic Chat Input</h3>
          <ChatInput
            v-model="chatMessage"
            placeholder="Type your message..."
            @send="handleSend"
          />
          <p class="demo-value">Value: {{ chatMessage }}</p>
        </div>
        
        <div class="demo-group">
          <h3>With Character Counter</h3>
          <ChatInput
            v-model="limitedMessage"
            placeholder="Limited to 100 characters..."
            :max-length="100"
            :show-counter="true"
            @send="handleSend"
          />
        </div>
        
        <div class="demo-group">
          <h3>With Voice & Suggestions</h3>
          <ChatInput
            v-model="voiceMessage"
            placeholder="Try voice or suggestions..."
            :enable-voice="true"
            :show-suggestions="true"
            :suggestions="chatSuggestions"
            @send="handleSend"
            @voice-start="handleVoiceStart"
            @voice-end="handleVoiceEnd"
          />
        </div>
        
        <div class="demo-group">
          <h3>With Toolbar & Actions</h3>
          <ChatInput
            v-model="richMessage"
            placeholder="Rich chat input..."
            variant="rounded"
            @send="handleSend"
          >
            <template #left>
              <button class="icon-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.7 13.35L20.7 14.35L18.65 12.3L19.65 11.3C19.85 11.1 20.21 11.1 20.41 11.3L21.7 12.59C21.9 12.79 21.9 13.15 21.7 13.35M12 18.94L18.06 12.88L20.11 14.93L14.05 21H12V18.94M12 14C7.58 14 4 15.79 4 18V20H10V18.89L14 14.89C13.35 14.63 12.68 14.5 12 14M12 4C9.79 4 8 5.79 8 8S9.79 12 12 12 16 10.21 16 8 14.21 4 12 4Z"/>
                </svg>
              </button>
            </template>
            <template #toolbar>
              <div class="toolbar-actions">
                <button class="toolbar-btn">Bold</button>
                <button class="toolbar-btn">Italic</button>
                <button class="toolbar-btn">Link</button>
                <button class="toolbar-btn">Code</button>
              </div>
            </template>
          </ChatInput>
        </div>
        
        <div class="demo-group">
          <h3>Minimal Variant</h3>
          <ChatInput
            v-model="minimalMessage"
            placeholder="Minimal style..."
            variant="minimal"
            size="sm"
            @send="handleSend"
          />
        </div>
      </section>
      
      <!-- BottomSheetSelect Demo -->
      <section class="demo-section">
        <h2>BottomSheetSelect</h2>
        <p>A mobile-friendly select component that opens in a bottom sheet</p>
        
        <div class="demo-group">
          <h3>Basic Select</h3>
          <BottomSheetSelect
            v-model="selectedCountry"
            :options="countries"
            label="Country"
            placeholder="Select your country"
            @change="handleSelectChange"
          />
          <p class="demo-value">Selected: {{ selectedCountry }}</p>
        </div>
        
        <div class="demo-group">
          <h3>Searchable with Descriptions</h3>
          <BottomSheetSelect
            v-model="selectedPlan"
            :options="plans"
            label="Subscription Plan"
            placeholder="Choose a plan"
            :searchable="true"
            search-placeholder="Search plans..."
            sheet-title="Select Your Plan"
          />
          <p class="demo-value">Selected: {{ selectedPlan }}</p>
        </div>
        
        <div class="demo-group">
          <h3>Grouped Options</h3>
          <BottomSheetSelect
            v-model="selectedCity"
            :groups="cityGroups"
            label="City"
            placeholder="Select a city"
            :searchable="true"
            :clearable="true"
            variant="filled"
          />
        </div>
        
        <div class="demo-group">
          <h3>Different Variants</h3>
          <div class="demo-grid">
            <BottomSheetSelect
              v-model="variantValue1"
              :options="simpleOptions"
              label="Default"
              variant="default"
            />
            <BottomSheetSelect
              v-model="variantValue2"
              :options="simpleOptions"
              label="Filled"
              variant="filled"
            />
            <BottomSheetSelect
              v-model="variantValue3"
              :options="simpleOptions"
              label="Outlined"
              variant="outlined"
            />
          </div>
        </div>
      </section>
      
      <!-- ChoiceButtons Demo -->
      <section class="demo-section">
        <h2>ChoiceButtons</h2>
        <p>Touch-friendly choice buttons for single or multiple selection</p>
        
        <div class="demo-group">
          <h3>Single Selection</h3>
          <ChoiceButtons
            v-model="selectedSize"
            :options="sizes"
            label="Select Size"
            @change="handleChoiceChange"
          />
          <p class="demo-value">Selected: {{ selectedSize }}</p>
        </div>
        
        <div class="demo-group">
          <h3>Multiple Selection</h3>
          <ChoiceButtons
            v-model="selectedFeatures"
            :options="features"
            label="Select Features"
            helper-text="Choose up to 3 features"
            :multiple="true"
            :max="3"
            color="success"
          />
          <p class="demo-value">Selected: {{ selectedFeatures?.join(', ') }}</p>
        </div>
        
        <div class="demo-group">
          <h3>With Icons & Descriptions</h3>
          <ChoiceButtons
            v-model="selectedPayment"
            :options="paymentMethods"
            label="Payment Method"
            layout="vertical"
            variant="outlined"
            size="lg"
          />
        </div>
        
        <div class="demo-group">
          <h3>Grid Layout</h3>
          <ChoiceButtons
            v-model="selectedColor"
            :options="colorOptions"
            label="Choose Color"
            layout="grid"
            :columns="3"
            :show-check="false"
          />
        </div>
        
        <div class="demo-group">
          <h3>Different Variants</h3>
          <div class="demo-stack">
            <ChoiceButtons
              v-model="variantChoice1"
              :options="['Option A', 'Option B', 'Option C']"
              label="Default Variant"
              variant="default"
            />
            <ChoiceButtons
              v-model="variantChoice2"
              :options="['Option A', 'Option B', 'Option C']"
              label="Outlined Variant"
              variant="outlined"
            />
            <ChoiceButtons
              v-model="variantChoice3"
              :options="['Option A', 'Option B', 'Option C']"
              label="Filled Variant"
              variant="filled"
            />
            <ChoiceButtons
              v-model="variantChoice4"
              :options="['Option A', 'Option B', 'Option C']"
              label="Ghost Variant"
              variant="ghost"
            />
          </div>
        </div>
        
        <div class="demo-group">
          <h3>With Validation</h3>
          <ChoiceButtons
            v-model="requiredChoice"
            :options="agreements"
            label="Terms & Conditions"
            :required="true"
            :error="validationError"
            helper-text="You must accept to continue"
            layout="vertical"
            full-width
          />
        </div>
      </section>
      
      <!-- Combined Form Example -->
      <section class="demo-section">
        <h2>Complete Form Example</h2>
        <p>A complete form combining all components</p>
        
        <div class="demo-form">
          <ChoiceButtons
            v-model="formData.type"
            :options="['Personal', 'Business']"
            label="Account Type"
            :required="true"
            full-width
          />
          
          <BottomSheetSelect
            v-model="formData.country"
            :options="countries"
            label="Country"
            placeholder="Select your country"
            :required="true"
            variant="filled"
          />
          
          <ChoiceButtons
            v-model="formData.interests"
            :options="interestOptions"
            label="Interests"
            helper-text="Select at least 2 interests"
            :multiple="true"
            :min="2"
            layout="grid"
            :columns="2"
          />
          
          <ChatInput
            v-model="formData.message"
            placeholder="Tell us about yourself..."
            :max-length="500"
            :show-counter="true"
            :min-rows="3"
            variant="rounded"
          />
          
          <button class="submit-btn" @click="handleSubmit">
            Submit Form
          </button>
        </div>
      </section>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()

// ChatInput data
const chatMessage = ref('')
const limitedMessage = ref('')
const voiceMessage = ref('')
const richMessage = ref('')
const minimalMessage = ref('')

const chatSuggestions = [
  'Hello!',
  'How are you?',
  'What can you help me with?',
  'Thanks for your help!'
]

// BottomSheetSelect data
const selectedCountry = ref('')
const selectedPlan = ref('')
const selectedCity = ref('')
const variantValue1 = ref('')
const variantValue2 = ref('')
const variantValue3 = ref('')

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' }
]

const plans = [
  { 
    label: 'Free', 
    value: 'free', 
    description: 'Basic features for personal use' 
  },
  { 
    label: 'Pro', 
    value: 'pro', 
    description: '$9.99/month - Advanced features for professionals' 
  },
  { 
    label: 'Team', 
    value: 'team', 
    description: '$29.99/month - Collaboration features for teams' 
  },
  { 
    label: 'Enterprise', 
    value: 'enterprise', 
    description: 'Custom pricing - Full features with priority support' 
  }
]

const cityGroups = [
  {
    label: 'North America',
    options: [
      { label: 'New York', value: 'nyc' },
      { label: 'Los Angeles', value: 'la' },
      { label: 'Toronto', value: 'tor' },
      { label: 'Vancouver', value: 'van' }
    ]
  },
  {
    label: 'Europe',
    options: [
      { label: 'London', value: 'lon' },
      { label: 'Paris', value: 'par' },
      { label: 'Berlin', value: 'ber' },
      { label: 'Amsterdam', value: 'ams' }
    ]
  },
  {
    label: 'Asia',
    options: [
      { label: 'Tokyo', value: 'tok' },
      { label: 'Singapore', value: 'sin' },
      { label: 'Hong Kong', value: 'hk' },
      { label: 'Seoul', value: 'seo' }
    ]
  }
]

const simpleOptions = ['Option 1', 'Option 2', 'Option 3']

// ChoiceButtons data
const selectedSize = ref('medium')
const selectedFeatures = ref<string[]>([])
const selectedPayment = ref('')
const selectedColor = ref('')
const variantChoice1 = ref('')
const variantChoice2 = ref('')
const variantChoice3 = ref('')
const variantChoice4 = ref('')
const requiredChoice = ref('')

const sizes = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
  { label: 'Extra Large', value: 'xlarge' }
]

const features = [
  'Dark Mode',
  'Notifications',
  'Auto-sync',
  'Offline Mode',
  'Analytics',
  'Cloud Backup'
]

const paymentMethods = [
  {
    label: 'Credit Card',
    value: 'card',
    description: 'Visa, Mastercard, Amex',
    icon: '💳'
  },
  {
    label: 'PayPal',
    value: 'paypal',
    description: 'Fast and secure',
    icon: '🅿️'
  },
  {
    label: 'Bank Transfer',
    value: 'bank',
    description: '3-5 business days',
    icon: '🏦'
  },
  {
    label: 'Cryptocurrency',
    value: 'crypto',
    description: 'Bitcoin, Ethereum',
    icon: '₿',
    disabled: true
  }
]

const colorOptions = [
  { label: 'Red', value: 'red', color: 'error' },
  { label: 'Blue', value: 'blue', color: 'primary' },
  { label: 'Green', value: 'green', color: 'success' },
  { label: 'Orange', value: 'orange', color: 'warning' },
  { label: 'Purple', value: 'purple', color: 'secondary' },
  { label: 'Default', value: 'default' }
]

const agreements = [
  {
    label: 'I accept the terms and conditions',
    value: 'terms',
    description: 'You agree to our Terms of Service and Privacy Policy'
  },
  {
    label: 'I don\'t accept',
    value: 'reject',
    description: 'You cannot proceed without accepting'
  }
]

const interestOptions = [
  'Technology',
  'Design',
  'Business',
  'Marketing',
  'Development',
  'Data Science'
]

// Form data
const formData = ref({
  type: '',
  country: '',
  interests: [] as string[],
  message: ''
})

const validationError = ref('')

// Handlers
const handleSend = (message: string) => {
  showToast({
    message: `Sent: ${message}`,
    type: 'success'
  })
}

const handleVoiceStart = () => {
  showToast({
    message: 'Recording started...',
    type: 'info'
  })
}

const handleVoiceEnd = () => {
  showToast({
    message: 'Recording ended',
    type: 'info'
  })
}

const handleSelectChange = (value: any) => {
  console.log('Select changed:', value)
}

const handleChoiceChange = (value: any) => {
  console.log('Choice changed:', value)
}

const handleSubmit = () => {
  // Simple validation
  if (!formData.value.type) {
    showToast({
      message: 'Please select an account type',
      type: 'error'
    })
    return
  }
  
  if (!formData.value.country) {
    showToast({
      message: 'Please select a country',
      type: 'error'
    })
    return
  }
  
  if (formData.value.interests.length < 2) {
    showToast({
      message: 'Please select at least 2 interests',
      type: 'error'
    })
    return
  }
  
  showToast({
    message: 'Form submitted successfully!',
    type: 'success'
  })
  
  console.log('Form data:', formData.value)
}

// Validation for required choice
watch(requiredChoice, (value) => {
  if (value === 'reject') {
    validationError.value = 'You must accept the terms to continue'
  } else {
    validationError.value = ''
  }
})
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
}

.demo-section h2 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.demo-section > p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.demo-group {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.demo-group h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.demo-value {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Chat input helpers */
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}

.toolbar-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.toolbar-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Form example */
.demo-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Responsive */
@media (max-width: 768px) {
  .demo-page {
    padding: var(--spacing-lg) 0;
  }
  
  .demo-group {
    padding: var(--spacing-md);
  }
  
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>