# Skooledin AI Design Patterns

## 🎯 Overview

This document outlines the design patterns and UX principles that guide Skooledin AI's user interface. Our patterns are optimized for educational mobile experiences, drawing inspiration from familiar messaging apps while adding learning-specific innovations.

## 📱 Mobile-First Patterns

### 1. WhatsApp-Style Chat Interface

**Pattern**: Conversational learning through familiar messaging UI

**Implementation**:
```vue
<!-- Chat container with virtual scrolling -->
<div class="chat-container" ref="chatRef">
  <VirtualList
    :items="messages"
    :item-height="estimateMessageHeight"
    :buffer="5"
  >
    <template #default="{ item }">
      <ChatMessage
        :message="item"
        :is-user="item.role === 'user'"
        :show-thinking="item.isThinking"
      />
    </template>
  </VirtualList>
</div>
```

**Key Features**:
- Message bubbles with sender alignment
- Read receipts for learning progress
- Typing indicators during AI processing
- Voice message support for accessibility
- Quick reply suggestions

### 2. Bottom Navigation Pattern

**Pattern**: Primary navigation anchored at thumb-reach

**Implementation**:
```vue
<nav class="bottom-nav">
  <button 
    v-for="tab in tabs" 
    :key="tab.id"
    class="bottom-nav__tab"
    :class="{ 'active': activeTab === tab.id }"
    @click="navigateTo(tab)"
  >
    <Icon :name="tab.icon" />
    <span>{{ tab.label }}</span>
  </button>
</nav>
```

**Specifications**:
- 64px height with safe area padding
- Maximum 5 items (Chat, Notebook, Study, Progress, Profile)
- Active state with color and scale
- Badge for notifications

### 3. Pull-to-Refresh Pattern

**Pattern**: Natural gesture for content updates

**Implementation**:
```typescript
const { distance, isActive } = useSwipe(containerRef, {
  onSwipeDown: async () => {
    if (scrollTop.value === 0) {
      await refreshContent()
    }
  }
})
```

**States**:
1. Pull threshold (40px): "Pull to refresh"
2. Release threshold (80px): "Release to refresh"
3. Refreshing: Loading spinner
4. Complete: Success feedback

## 🎓 Educational Patterns

### 1. Progressive Disclosure

**Pattern**: Information revealed based on learning progress

**Example**: Math Problem Solving
```vue
<div class="problem-solver">
  <!-- Step 1: Show problem -->
  <div class="problem">{{ problemText }}</div>
  
  <!-- Step 2: Reveal hint after attempt -->
  <Transition name="slide-down">
    <div v-if="showHint" class="hint">
      💡 Try using the quadratic formula
    </div>
  </Transition>
  
  <!-- Step 3: Show solution after second attempt -->
  <Transition name="slide-down">
    <div v-if="showSolution" class="solution">
      <StepByStep :steps="solutionSteps" />
    </div>
  </Transition>
</div>
```

### 2. Spaced Repetition UI

**Pattern**: Visual indicators for review scheduling

**Implementation**:
```vue
<div class="flashcard" :data-strength="card.strength">
  <div class="flashcard__front">{{ card.question }}</div>
  <div class="flashcard__back">{{ card.answer }}</div>
  <div class="flashcard__indicator">
    <ProgressRing :value="card.retention" />
    <span>Review in {{ card.nextReview }}</span>
  </div>
</div>
```

**Strength Levels**:
- New: Purple border
- Learning: Yellow border
- Review: Blue border
- Mastered: Green border

### 3. Adaptive Difficulty

**Pattern**: UI responds to student performance

**Visual Feedback**:
```css
.difficulty-indicator {
  --difficulty-color: var(--color-success-500);
}

.difficulty-indicator[data-level="easy"] {
  --difficulty-color: var(--color-success-500);
}

.difficulty-indicator[data-level="medium"] {
  --difficulty-color: var(--color-warning-500);
}

.difficulty-indicator[data-level="hard"] {
  --difficulty-color: var(--color-error-500);
}
```

## 🤖 AI Interaction Patterns

### 1. Thinking States

**Pattern**: Transparent AI processing visualization

**Implementation**:
```vue
<div v-if="isThinking" class="ai-thinking">
  <div class="ai-thinking__dots">
    <span></span><span></span><span></span>
  </div>
  <p class="ai-thinking__status">{{ thinkingStatus }}</p>
</div>
```

**Status Messages**:
- "Understanding your question..."
- "Searching for relevant information..."
- "Formulating response..."
- "Double-checking my answer..."

### 2. Confidence Indicators

**Pattern**: Visual representation of AI certainty

```vue
<div class="ai-response">
  <div class="confidence-bar" :style="`--confidence: ${confidence}%`">
    <span class="confidence-label">
      {{ confidence > 80 ? '✓ High confidence' : '~ Moderate confidence' }}
    </span>
  </div>
  <div class="response-content">{{ response }}</div>
</div>
```

### 3. Context Switching

**Pattern**: Clear subject/topic transitions

```vue
<TransitionGroup name="context-switch">
  <div
    v-for="context in activeContexts"
    :key="context.id"
    class="context-badge"
    :style="`--context-color: var(--color-subject-${context.subject})`"
  >
    {{ context.label }}
  </div>
</TransitionGroup>
```

## 🎨 Visual Patterns

### 1. Color-Coded Learning

**Pattern**: Consistent color mapping for subjects

```typescript
const subjectColors = {
  math: { icon: '🔢', color: 'blue' },
  science: { icon: '🔬', color: 'green' },
  language: { icon: '📚', color: 'amber' },
  history: { icon: '📜', color: 'purple' },
  arts: { icon: '🎨', color: 'pink' },
  sports: { icon: '⚽', color: 'teal' }
}
```

### 2. Progress Visualization

**Pattern**: Multiple progress representations

```vue
<!-- Linear Progress -->
<div class="progress-bar">
  <div class="progress-fill" :style="`width: ${progress}%`" />
</div>

<!-- Circular Progress -->
<svg class="progress-ring">
  <circle
    :stroke-dasharray="`${circumference} ${circumference}`"
    :stroke-dashoffset="circumference - (progress / 100) * circumference"
  />
</svg>

<!-- Milestone Progress -->
<div class="milestones">
  <div 
    v-for="(milestone, i) in milestones"
    :key="i"
    class="milestone"
    :class="{ completed: progress >= milestone.threshold }"
  />
</div>
```

### 3. Empty States

**Pattern**: Encouraging empty state messages

```vue
<div class="empty-state">
  <Icon name="notebook" class="empty-state__icon" />
  <h3>No notes yet!</h3>
  <p>Start a conversation with AI to create your first study note</p>
  <Button @click="startChat">Start Learning</Button>
</div>
```

## 🔄 Interaction Patterns

### 1. Gesture Navigation

**Pattern**: Natural swipe gestures

```typescript
// Swipe between subjects
const { direction } = useSwipe(element, {
  threshold: 50,
  onSwipeLeft: () => nextSubject(),
  onSwipeRight: () => previousSubject()
})

// Pull down to dismiss
const { distanceY } = useSwipe(modal, {
  onSwipeDown: () => {
    if (distanceY.value > 100) {
      closeModal()
    }
  }
})
```

### 2. Long Press Actions

**Pattern**: Context menus on long press

```vue
<div
  v-long-press="showContextMenu"
  class="message"
>
  {{ message.content }}
</div>

<!-- Context Menu -->
<ContextMenu v-if="showMenu" :position="menuPosition">
  <MenuItem @click="copyMessage">Copy</MenuItem>
  <MenuItem @click="saveToNotebook">Save to Notebook</MenuItem>
  <MenuItem @click="createFlashcard">Create Flashcard</MenuItem>
</ContextMenu>
```

### 3. Smart Input

**Pattern**: Context-aware input suggestions

```vue
<div class="smart-input">
  <textarea
    v-model="input"
    @input="updateSuggestions"
    placeholder="Ask me anything..."
  />
  <div v-if="suggestions.length" class="suggestions">
    <button
      v-for="suggestion in suggestions"
      :key="suggestion"
      @click="selectSuggestion(suggestion)"
    >
      {{ suggestion }}
    </button>
  </div>
</div>
```

## 📊 Data Visualization Patterns

### 1. Learning Analytics

**Pattern**: Digestible progress metrics

```vue
<div class="analytics-card">
  <div class="metric">
    <span class="metric__value">{{ streak }}</span>
    <span class="metric__label">Day Streak</span>
  </div>
  <WeeklyChart :data="weeklyProgress" />
</div>
```

### 2. Performance Trends

**Pattern**: Simple, actionable insights

```vue
<div class="trend-indicator" :class="trendClass">
  <Icon :name="trendIcon" />
  <span>{{ trendText }}</span>
</div>
```

## 🚀 Performance Patterns

### 1. Optimistic Updates

**Pattern**: Immediate UI feedback

```typescript
// Update UI immediately
const optimisticMessage = {
  id: generateTempId(),
  content: userInput,
  status: 'sending'
}
messages.value.push(optimisticMessage)

// Then sync with server
try {
  const response = await sendMessage(userInput)
  updateMessage(optimisticMessage.id, response)
} catch (error) {
  markMessageFailed(optimisticMessage.id)
}
```

### 2. Skeleton Loading

**Pattern**: Content-aware loading states

```vue
<template v-if="loading">
  <div class="skeleton-message">
    <div class="skeleton-avatar" />
    <div class="skeleton-content">
      <div class="skeleton-line" style="width: 80%" />
      <div class="skeleton-line" style="width: 60%" />
    </div>
  </div>
</template>
```

### 3. Lazy Loading

**Pattern**: Progressive content loading

```vue
<IntersectionObserver @intersect="loadMore">
  <StudyCard
    v-for="card in visibleCards"
    :key="card.id"
    :card="card"
  />
  <div class="load-trigger" />
</IntersectionObserver>
```

## 🎯 Error Handling Patterns

### 1. Inline Validation

**Pattern**: Real-time feedback

```vue
<div class="input-group">
  <input
    v-model="answer"
    :class="{ error: hasError }"
    @blur="validateAnswer"
  />
  <Transition name="slide">
    <span v-if="hasError" class="error-message">
      {{ errorMessage }}
    </span>
  </Transition>
</div>
```

### 2. Graceful Degradation

**Pattern**: Offline-first with sync indicators

```vue
<div class="sync-status" :class="syncStatus">
  <Icon :name="syncIcon" />
  <span>{{ syncMessage }}</span>
</div>
```

### 3. Recovery Actions

**Pattern**: Clear next steps for errors

```vue
<div class="error-state">
  <Icon name="alert-circle" />
  <h3>Connection Lost</h3>
  <p>Don't worry, your progress is saved locally</p>
  <Button @click="retry">Try Again</Button>
  <Button variant="ghost" @click="continueOffline">
    Continue Offline
  </Button>
</div>
```

## 📋 Best Practices

1. **Touch Targets**: Minimum 44x44px
2. **Loading States**: Show within 100ms
3. **Animation Duration**: 200-300ms
4. **Error Messages**: Clear, actionable, and encouraging
5. **Offline Support**: All core features work offline
6. **Accessibility**: Screen reader friendly
7. **Performance**: 60fps animations
8. **Feedback**: Immediate visual response to all interactions