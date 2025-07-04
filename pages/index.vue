<template>
  <div class="home-page">
    <LayoutSafeArea :top="true">
      <LayoutContainer>
        <LayoutStack :spacing="'xl'">
          <!-- Hero Section -->
          <section class="hero-section">
            <LayoutAligned :alignment="'center'">
              <div class="hero-content">
                <h1>Learn Smarter with AI-Powered Education</h1>
                <p class="hero-subtitle">
                  Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations.
                </p>
                <div class="hero-actions">
                  <Button to="/auth/signup" size="lg">Start Learning Free</Button>
                  <Button to="/features" variant="secondary" size="lg">Explore Features</Button>
                </div>
              </div>
            </LayoutAligned>
          </section>

          <!-- Features Grid -->
          <section>
            <h2>Why Choose Skooledin AI?</h2>
            <LayoutGrid
              :auto-fit="true"
              :min-child-width="'300px'"
              :gap="'lg'"
              class="features-grid"
            >
              <div class="feature-card">
                <h3>🤖 AI-Powered Tutor</h3>
                <p>Conversational AI that understands your learning style and adapts to your pace</p>
              </div>
              <div class="feature-card">
                <h3>📚 Smart Notebook</h3>
                <p>AI-enhanced notes with automatic summaries, flashcards, and concept extraction</p>
              </div>
              <div class="feature-card">
                <h3>🎯 Personalized Learning</h3>
                <p>Dynamic context switching between subjects with tailored recommendations</p>
              </div>
              <div class="feature-card">
                <h3>📱 Works Offline</h3>
                <p>Full functionality even without internet - learn anywhere, anytime</p>
              </div>
              <div class="feature-card">
                <h3>🧠 Study Tools</h3>
                <p>Flashcards, quizzes, mind maps, and practice problems with spaced repetition</p>
              </div>
              <div class="feature-card">
                <h3>📊 Track Progress</h3>
                <p>Visual analytics to monitor learning progress and identify areas for improvement</p>
              </div>
            </LayoutGrid>
          </section>

          <!-- CTA Section -->
          <section class="cta-section">
            <LayoutAligned :alignment="'center'">
              <div>
                <h2>Ready to Transform Your Learning?</h2>
                <p class="cta-description">
                  Join thousands of students already learning smarter with AI
                </p>
                <Button to="/auth/signup" size="lg" class="cta-button">
                  Get Started Free
                </Button>
              </div>
            </LayoutAligned>
          </section>
        </LayoutStack>
      </LayoutContainer>
    </LayoutSafeArea>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Skooledin AI - Learn Smarter with AI-Powered Education',
  meta: [{ name: 'description', content: 'Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations, smart notebooks, and personalized study tools.' }]
})
</script>

<style scoped>
.home-page {
  min-height: var(--viewport-height);
  background-color: var(--surface-background);
}

.hero-section {
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.hero-content {
  max-width: 600px;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
}

h2 {
  margin-bottom: var(--spacing-lg);
}

.feature-card {
  background-color: var(--surface-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  transition: all var(--transition-fast) var(--easing-standard);
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.feature-card h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.feature-card p {
  color: var(--text-secondary);
  margin: 0;
}

.demo-section {
  background-color: var(--surface-default);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.demo-box {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: var(--font-weight-medium);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CTA Section */
.cta-section {
  background: var(--surface-elevated);
  padding: var(--spacing-3xl);
  border-radius: var(--radius-lg);
  text-align: center;
}

.cta-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: var(--spacing-md) 0 var(--spacing-xl);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-xl);
}

/* Dark mode adjustments */
.dark-mode .feature-card {
  background-color: var(--surface-card);
}

.dark-mode .demo-section {
  background-color: var(--surface-default);
}

.dark-mode .cta-section {
  background: var(--surface-card);
}
</style>
