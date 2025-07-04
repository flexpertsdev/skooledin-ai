# Skooledin AI Layout System Documentation

## Overview

The Skooledin AI project uses a Flutter-inspired layout system built with Vue 3 components. This system provides a set of composable layout primitives that handle responsive design, spacing, and alignment in a consistent and predictable way.

## Core Layout Components

### LayoutContainer
Constrains content to a maximum width with responsive breakpoints.

```vue
<LayoutContainer size="lg" padding="md">
  <!-- Content is constrained and centered -->
</LayoutContainer>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'xl')
- `padding`: boolean | spacing value
- `fluid`: boolean (full width)

**Max-widths:**
- sm: 640px
- md: 768px  
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### LayoutRow
Horizontal flexbox layout with responsive collapsing.

```vue
<LayoutRow gap="md" align="center" justify="between" wrap>
  <div>Item 1</div>
  <div>Item 2</div>
</LayoutRow>
```

**Props:**
- `gap`: spacing value
- `align`: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
- `wrap`: boolean
- `reverse`: boolean
- `responsive`: boolean (collapses to column on mobile <768px)

### LayoutColumn
Vertical flexbox layout.

```vue
<LayoutColumn gap="lg" align="stretch">
  <Header />
  <Content />
  <Footer />
</LayoutColumn>
```

**Props:**
- `gap`: spacing value
- `align`: 'start' | 'center' | 'end' | 'stretch'
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
- `reverse`: boolean

### LayoutGrid
Responsive CSS Grid layout with auto-fit capabilities.

```vue
<LayoutGrid cols="1" md="2" lg="3" gap="lg" autoFit minWidth="250px">
  <Card v-for="item in items" :key="item.id" />
</LayoutGrid>
```

**Props:**
- `cols`: number | responsive object
- `rows`: number | responsive object  
- `gap`: spacing value | { row: spacing, col: spacing }
- `autoFit`: boolean
- `autoFill`: boolean
- `minWidth`: string (for auto-fit/fill)
- `align`: grid alignment
- `justify`: grid justification

**Responsive columns:**
```vue
<!-- Single value -->
<LayoutGrid cols="3" />

<!-- Responsive object -->
<LayoutGrid :cols="{ mobile: 1, tablet: 2, laptop: 3 }" />

<!-- Shorthand responsive props -->
<LayoutGrid cols="1" sm="2" md="3" lg="4" />
```

### LayoutStack
Overlapping layout for creating depth and layers.

```vue
<LayoutStack>
  <img src="background.jpg" />
  <LayoutAligned alignment="bottomRight" :offset="16">
    <Button>Action</Button>
  </LayoutAligned>
</LayoutStack>
```

**Props:**
- `spacing`: spacing between children
- `inline`: boolean (inline-flex)

### LayoutWrap
Flex-wrap layout for flowing items.

```vue
<LayoutWrap gap="sm">
  <Chip v-for="tag in tags" :key="tag" :label="tag" />
</LayoutWrap>
```

**Props:**
- `gap`: spacing value
- `align`: flex alignment
- `justify`: flex justification

### LayoutExpanded
Fills available space in a flex container.

```vue
<LayoutRow>
  <Sidebar />
  <LayoutExpanded>
    <MainContent />
  </LayoutExpanded>
</LayoutRow>
```

**Props:**
- `flex`: number (default: 1)

### LayoutAligned
Positions content within its parent container.

```vue
<LayoutAligned alignment="center">
  <LoadingSpinner />
</LayoutAligned>
```

**Props:**
- `alignment`: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
- `offset`: number | { x: number, y: number }

### LayoutSafeArea
Handles device safe areas (notches, status bars).

```vue
<LayoutSafeArea top bottom>
  <AppContent />
</LayoutSafeArea>
```

**Props:**
- `top`: boolean
- `bottom`: boolean
- `left`: boolean
- `right`: boolean

## Responsive System

### Breakpoints
```typescript
{
  mobile: 320,    // Small phones
  tablet: 768,    // Tablets & large phones
  laptop: 1024,   // Small laptops
  desktop: 1440,  // Desktop monitors
  ultrawide: 1920 // Large monitors
}
```

### useResponsive Composable
```vue
<script setup>
const { breakpoint, isMobile, isTablet, match } = useResponsive()

const columns = match({
  mobile: 1,
  tablet: 2,
  laptop: 3,
  default: 4
})
</script>
```

## Design Tokens

### Spacing Scale
```css
--spacing-0: 0px;
--spacing-0.5: 2px;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
--spacing-32: 128px;

/* Aliases */
--spacing-xs: var(--spacing-2);   /* 8px */
--spacing-sm: var(--spacing-3);   /* 12px */
--spacing-md: var(--spacing-4);   /* 16px */
--spacing-lg: var(--spacing-6);   /* 24px */
--spacing-xl: var(--spacing-8);   /* 32px */
--spacing-2xl: var(--spacing-12); /* 48px */
--spacing-3xl: var(--spacing-16); /* 64px */
```

### Typography Scale
```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 30px;
--font-size-4xl: 36px;
--font-size-5xl: 48px;
--font-size-6xl: 60px;
--font-size-7xl: 64px;
```

### Colors
Primary colors use the Skooledin purple (#7c3aed) with a full palette of shades. Additional semantic colors for success, warning, error, and info states.

### Shadows (Elevation)
```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

## Usage Examples

### Basic Page Layout
```vue
<template>
  <LayoutSafeArea top>
    <NavBar />
    <LayoutContainer>
      <LayoutStack gap="xl">
        <PageHeader />
        <MainContent />
      </LayoutStack>
    </LayoutContainer>
  </LayoutSafeArea>
</template>
```

### Responsive Card Grid
```vue
<template>
  <LayoutGrid 
    cols="1" 
    sm="2" 
    md="3" 
    lg="4" 
    gap="lg"
    autoFit
    minWidth="280px"
  >
    <Card v-for="item in items" :key="item.id">
      {{ item.title }}
    </Card>
  </LayoutGrid>
</template>
```

### Complex Form Layout
```vue
<template>
  <LayoutColumn gap="lg">
    <LayoutRow gap="md" responsive>
      <LayoutExpanded>
        <FormField label="First Name">
          <Input v-model="firstName" />
        </FormField>
      </LayoutExpanded>
      <LayoutExpanded>
        <FormField label="Last Name">
          <Input v-model="lastName" />
        </FormField>
      </LayoutExpanded>
    </LayoutRow>
    
    <FormField label="Email">
      <Input v-model="email" type="email" />
    </FormField>
    
    <LayoutRow gap="md" justify="end">
      <Button variant="secondary">Cancel</Button>
      <Button>Submit</Button>
    </LayoutRow>
  </LayoutColumn>
</template>
```

### Mobile-First Component
```vue
<template>
  <div class="feature-card">
    <LayoutColumn gap="md">
      <Icon :name="icon" class="feature-icon" />
      <h3 class="feature-title">{{ title }}</h3>
      <p class="feature-description">{{ description }}</p>
    </LayoutColumn>
  </div>
</template>

<style scoped>
.feature-card {
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

/* Mobile first */
.feature-icon {
  width: 48px;
  height: 48px;
}

.feature-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

/* Tablet and up */
@media (min-width: 768px) {
  .feature-card {
    padding: var(--spacing-lg);
  }
  
  .feature-icon {
    width: 64px;
    height: 64px;
  }
  
  .feature-title {
    font-size: var(--font-size-xl);
  }
}
```

## Best Practices

1. **Always use layout components** - Don't create custom flex/grid layouts
2. **Use design tokens** - Never hardcode spacing, colors, or typography values
3. **Mobile-first approach** - Design for mobile, enhance for larger screens
4. **Semantic spacing** - Use aliases (sm, md, lg) instead of numeric values
5. **Responsive props** - Use responsive objects for different breakpoints
6. **Safe areas** - Wrap top-level layouts in LayoutSafeArea
7. **Container sizing** - Use LayoutContainer to constrain content width
8. **Consistent gaps** - Use the same gap value throughout a component

## Common Patterns

### Dashboard Layout
```vue
<LayoutSafeArea top bottom>
  <LayoutColumn class="min-h-screen">
    <NavBar />
    <LayoutExpanded>
      <LayoutRow class="h-full">
        <Sidebar />
        <LayoutExpanded>
          <LayoutContainer padding="lg">
            <RouterView />
          </LayoutContainer>
        </LayoutExpanded>
      </LayoutRow>
    </LayoutExpanded>
  </LayoutColumn>
</LayoutSafeArea>
```

### Card Grid with Filters
```vue
<LayoutContainer>
  <LayoutStack gap="lg">
    <LayoutRow justify="between" align="center" responsive>
      <h1>Products</h1>
      <LayoutRow gap="sm">
        <FilterButton />
        <SortDropdown />
      </LayoutRow>
    </LayoutRow>
    
    <LayoutGrid cols="1" sm="2" lg="3" xl="4" gap="lg">
      <ProductCard v-for="product in products" :key="product.id" />
    </LayoutGrid>
  </LayoutStack>
</LayoutContainer>
```

This layout system provides a robust foundation for building responsive, accessible, and maintainable user interfaces in the Skooledin AI application.