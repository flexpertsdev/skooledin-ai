<template>
  <div class="layouts-demo">
    <LayoutSafeArea :top="true">
      <LayoutContainer>
        <LayoutStack :spacing="'xl'">
          <div class="demo-header">
            <h1>Layout Primitives</h1>
            <p>Flutter-inspired layout components for predictable UI composition</p>
          </div>

          <!-- Container Demo -->
          <section>
            <h2>LayoutContainer</h2>
            <p class="section-description">Constrains content width and centers it horizontally</p>
            <div class="demo-section demo-container">
              <LayoutContainer>
                <div class="demo-box">
                  <p>This content is constrained to a maximum width and centered</p>
                </div>
              </LayoutContainer>
            </div>
          </section>

          <!-- Row Demo -->
          <section>
            <h2>LayoutRow</h2>
            <p class="section-description">Horizontal layout with flexible spacing and alignment</p>

            <div class="demo-subsection">
              <h3>Basic Row</h3>
              <div class="demo-section">
                <LayoutRow :gap="'md'">
                  <div class="demo-box">Item 1</div>
                  <div class="demo-box">Item 2</div>
                  <div class="demo-box">Item 3</div>
                </LayoutRow>
              </div>
            </div>

            <div class="demo-subsection">
              <h3>Flexible Items</h3>
              <div class="demo-section">
                <LayoutRow :gap="'md'">
                  <div class="demo-box" style="flex: 1">Flex: 1</div>
                  <div class="demo-box" style="flex: 2">Flex: 2</div>
                  <div class="demo-box" style="flex: 1">Flex: 1</div>
                </LayoutRow>
              </div>
            </div>

            <div class="demo-subsection">
              <h3>Alignment Options</h3>
              <div class="demo-section">
                <LayoutRow :gap="'md'" :align="'center'" style="height: 100px">
                  <div class="demo-box" style="height: 40px">Short</div>
                  <div class="demo-box" style="height: 80px">Tall</div>
                  <div class="demo-box" style="height: 60px">Medium</div>
                </LayoutRow>
              </div>
            </div>
          </section>

          <!-- Column Demo -->
          <section>
            <h2>LayoutColumn</h2>
            <p class="section-description">Vertical layout with consistent spacing</p>

            <div class="demo-section">
              <LayoutColumn :gap="'md'">
                <div class="demo-box">First Item</div>
                <div class="demo-box">Second Item</div>
                <div class="demo-box">Third Item</div>
              </LayoutColumn>
            </div>
          </section>

          <!-- Grid Demo -->
          <section>
            <h2>LayoutGrid</h2>
            <p class="section-description">Responsive grid system with multiple layout options</p>

            <div class="demo-subsection">
              <h3>Fixed Columns</h3>
              <div class="demo-section">
                <LayoutGrid :cols="3" :gap="'md'">
                  <div v-for="i in 6" :key="`fixed-${i}`" class="demo-box">
                    {{ i }}
                  </div>
                </LayoutGrid>
              </div>
            </div>

            <div class="demo-subsection">
              <h3>Responsive Columns</h3>
              <div class="demo-section">
                <LayoutGrid :cols="{ mobile: 1, tablet: 2, laptop: 3, desktop: 4 }" :gap="'md'">
                  <div v-for="i in 8" :key="`responsive-${i}`" class="demo-box">
                    {{ i }}
                  </div>
                </LayoutGrid>
              </div>
            </div>

            <div class="demo-subsection">
              <h3>Auto-fit Grid</h3>
              <div class="demo-section">
                <LayoutGrid :auto-fit="true" :min-child-width="'200px'" :gap="'md'">
                  <div v-for="i in 5" :key="`autofit-${i}`" class="demo-box">Auto {{ i }}</div>
                </LayoutGrid>
              </div>
            </div>
          </section>

          <!-- Stack Demo -->
          <section>
            <h2>LayoutStack</h2>
            <p class="section-description">Overlapping layout for creating depth and layered UIs</p>

            <div class="demo-section">
              <LayoutStack style="height: 200px">
                <div class="stack-layer stack-layer-1">Background Layer</div>
                <div class="stack-layer stack-layer-2">Middle Layer</div>
                <div class="stack-layer stack-layer-3">
                  <LayoutAligned :alignment="'topRight'">
                    <div class="stack-badge">Top Layer</div>
                  </LayoutAligned>
                </div>
              </LayoutStack>
            </div>
          </section>

          <!-- Wrap Demo -->
          <section>
            <h2>LayoutWrap</h2>
            <p class="section-description">Wrapping layout that flows items to new rows</p>

            <div class="demo-section">
              <LayoutWrap :gap="'md'">
                <div v-for="i in 10" :key="`wrap-${i}`" class="demo-chip">Tag {{ i }}</div>
              </LayoutWrap>
            </div>
          </section>

          <!-- Expanded Demo -->
          <section>
            <h2>LayoutExpanded</h2>
            <p class="section-description">Expands child to fill available space</p>

            <div class="demo-section">
              <LayoutRow :gap="'md'" style="height: 100px">
                <div class="demo-box">Fixed</div>
                <LayoutExpanded>
                  <div class="demo-box demo-expanded">Expanded to fill</div>
                </LayoutExpanded>
                <div class="demo-box">Fixed</div>
              </LayoutRow>
            </div>
          </section>

          <!-- Aligned Demo -->
          <section>
            <h2>LayoutAligned</h2>
            <p class="section-description">Positions content within its parent</p>

            <div class="demo-section" style="height: 300px; position: relative">
              <LayoutAligned alignment="topLeft">
                <div class="aligned-box">Top Left</div>
              </LayoutAligned>
              <LayoutAligned alignment="topCenter">
                <div class="aligned-box">Top Center</div>
              </LayoutAligned>
              <LayoutAligned alignment="topRight">
                <div class="aligned-box">Top Right</div>
              </LayoutAligned>
              <LayoutAligned alignment="centerLeft">
                <div class="aligned-box">Center Left</div>
              </LayoutAligned>
              <LayoutAligned alignment="center">
                <div class="aligned-box aligned-box-center">Center</div>
              </LayoutAligned>
              <LayoutAligned alignment="centerRight">
                <div class="aligned-box">Center Right</div>
              </LayoutAligned>
              <LayoutAligned alignment="bottomLeft">
                <div class="aligned-box">Bottom Left</div>
              </LayoutAligned>
              <LayoutAligned alignment="bottomCenter">
                <div class="aligned-box">Bottom Center</div>
              </LayoutAligned>
              <LayoutAligned alignment="bottomRight">
                <div class="aligned-box">Bottom Right</div>
              </LayoutAligned>
            </div>
          </section>

          <!-- SafeArea Demo -->
          <section>
            <h2>LayoutSafeArea</h2>
            <p class="section-description">Ensures content avoids device notches and system UI</p>

            <div class="demo-section demo-safe-area">
              <LayoutSafeArea :all="true">
                <div class="demo-box">
                  <p>
                    This content respects safe area insets on devices with notches or rounded
                    corners
                  </p>
                </div>
              </LayoutSafeArea>
            </div>
          </section>

          <!-- Complex Example -->
          <section>
            <h2>Complex Layout Example</h2>
            <p class="section-description">Combining multiple layout primitives</p>

            <div class="demo-section">
              <LayoutContainer>
                <LayoutColumn :gap="'lg'">
                  <LayoutRow :gap="'md'" :wrap="true">
                    <LayoutExpanded>
                      <div class="complex-card">
                        <h4>Main Content</h4>
                        <p>This card expands to fill available space</p>
                      </div>
                    </LayoutExpanded>
                    <div class="complex-sidebar">
                      <h4>Sidebar</h4>
                      <LayoutColumn :gap="'sm'">
                        <div class="sidebar-item">Item 1</div>
                        <div class="sidebar-item">Item 2</div>
                        <div class="sidebar-item">Item 3</div>
                      </LayoutColumn>
                    </div>
                  </LayoutRow>

                  <LayoutGrid :cols="{ mobile: 2, tablet: 4 }" :gap="'md'">
                    <div v-for="i in 4" :key="`stat-${i}`" class="stat-card">
                      <div class="stat-value">{{ 25 * i }}%</div>
                      <div class="stat-label">Metric {{ i }}</div>
                    </div>
                  </LayoutGrid>
                </LayoutColumn>
              </LayoutContainer>
            </div>
          </section>
        </LayoutStack>
      </LayoutContainer>
    </LayoutSafeArea>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Layout Primitives - Mobile-First Nuxt',
  meta: [
    {
      name: 'description',
      content: 'Demo of Flutter-inspired layout components for predictable UI composition'
    }
  ]
})
</script>

<style scoped>
.layouts-demo {
  min-height: 100vh;
  padding-bottom: var(--spacing-5xl);
}

.demo-header {
  text-align: center;
  padding: var(--spacing-2xl) 0;
}

.demo-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
}

.demo-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

section {
  margin-bottom: var(--spacing-3xl);
}

section h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.section-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.demo-subsection {
  margin-bottom: var(--spacing-xl);
}

.demo-subsection h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
}

.demo-section {
  background-color: var(--surface-default);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-default);
}

.demo-container {
  background-color: var(--surface-card);
}

.demo-box {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.demo-box p {
  margin: 0;
}

.demo-expanded {
  height: 100%;
}

/* Stack demo */
.stack-layer {
  position: absolute;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
}

.stack-layer-1 {
  inset: 0;
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
}

.stack-layer-2 {
  inset: 20px;
  background-color: var(--color-gray-400);
  color: var(--color-gray-900);
}

.stack-layer-3 {
  inset: 40px;
}

.stack-badge {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
}

/* Wrap demo */
.demo-chip {
  background-color: var(--surface-elevated);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-default);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

/* Aligned demo */
.aligned-box {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.aligned-box-center {
  background-color: var(--color-primary-600);
  font-size: var(--font-size-base);
}

/* SafeArea demo */
.demo-safe-area {
  background-color: var(--surface-card);
  min-height: 150px;
}

/* Complex example */
.complex-card {
  background-color: var(--surface-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-default);
  min-height: 200px;
}

.complex-sidebar {
  background-color: var(--surface-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-default);
  min-width: 250px;
}

.sidebar-item {
  background-color: var(--surface-default);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  text-align: center;
}

.stat-card {
  background-color: var(--surface-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-default);
  text-align: center;
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}

/* Dark mode adjustments */
.dark-mode .demo-section {
  background-color: var(--surface-elevated);
}

.dark-mode .stack-layer-1 {
  background-color: var(--color-gray-800);
  color: var(--color-gray-300);
}

.dark-mode .stack-layer-2 {
  background-color: var(--color-gray-700);
  color: var(--color-gray-200);
}

.dark-mode .demo-chip {
  background-color: var(--surface-card);
}

.dark-mode .complex-card,
.dark-mode .complex-sidebar,
.dark-mode .stat-card {
  background-color: var(--surface-elevated);
}

.dark-mode .sidebar-item {
  background-color: var(--surface-card);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .complex-sidebar {
    min-width: 100%;
  }
}
</style>
