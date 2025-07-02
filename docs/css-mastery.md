
# CSS Mastery

Master modern CSS techniques, layouts, and responsive design patterns.

## Introduction

CSS (Cascading Style Sheets) controls the presentation and layout of web pages. Modern CSS includes powerful features like Flexbox, Grid, Custom Properties, and advanced selectors.

## Layout Systems

### Flexbox Layout

```css
/* Flex Container */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

/* Flex Items */
.flex-item {
    flex: 1 1 300px; /* grow, shrink, basis */
}

.flex-item--fixed {
    flex: 0 0 200px; /* fixed width item */
}
```

**Explanation**: Flexbox is perfect for one-dimensional layouts. Use `justify-content` for main axis alignment and `align-items` for cross-axis alignment.

### CSS Grid Layout

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    gap: 1rem;
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

**Explanation**: CSS Grid excels at two-dimensional layouts. Use `grid-template-areas` for semantic layout definitions.

## Modern CSS Features

### Custom Properties (CSS Variables)

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #64748b;
    --font-size-base: 1rem;
    --spacing-unit: 0.5rem;
    --border-radius: 0.375rem;
}

.button {
    background-color: var(--primary-color);
    color: white;
    padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.button:hover {
    background-color: color-mix(in srgb, var(--primary-color) 80%, black);
}
```

### Container Queries

```css
.card-container {
    container-type: inline-size;
    container-name: card;
}

.card {
    padding: 1rem;
}

@container card (min-width: 400px) {
    .card {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
        padding: 2rem;
    }
}
```

## Responsive Design

### Mobile-First Approach

```css
/* Base styles (mobile) */
.navigation {
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.nav-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
}

/* Tablet and up */
@media (min-width: 768px) {
    .navigation {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .nav-item {
        border-bottom: none;
        margin-left: 2rem;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .navigation {
        padding: 2rem 4rem;
    }
}
```

### Fluid Typography

```css
.heading {
    font-size: clamp(1.5rem, 4vw, 3rem);
    line-height: 1.2;
}

.body-text {
    font-size: clamp(0.875rem, 2.5vw, 1.125rem);
    line-height: 1.6;
}
```

## Advanced Selectors

### Pseudo-classes and Pseudo-elements

```css
/* Pseudo-classes */
.button:hover,
.button:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.input:invalid {
    border-color: #ef4444;
    background-color: #fef2f2;
}

.list-item:nth-child(odd) {
    background-color: #f9fafb;
}

/* Pseudo-elements */
.quote::before {
    content: '"';
    font-size: 2em;
    color: var(--primary-color);
}

.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    background: #1f2937;
    color: white;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    white-space: nowrap;
}
```

## Animations and Transitions

### CSS Transitions

```css
.card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### CSS Animations

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.loading {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## Common Pitfalls

### ❌ Not using CSS Reset/Normalize
```css
/* Browser default styles cause inconsistencies */
```

### ✅ Use a CSS reset
```css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

### ❌ Overusing !important
```css
.text { color: red !important; }
```

### ✅ Use specificity properly
```css
.component .text { color: red; }
```

### ❌ Hardcoded values everywhere
```css
.button { padding: 12px 24px; margin: 16px; }
```

### ✅ Use custom properties
```css
.button { 
    padding: var(--padding-md) var(--padding-lg); 
    margin: var(--margin-md); 
}
```

## Best Practices

1. **Use a consistent methodology** - BEM, OOCSS, or similar
2. **Embrace CSS custom properties** - Better maintainability
3. **Mobile-first responsive design** - Start small, enhance up
4. **Use semantic class names** - `.card-title` not `.red-text`
5. **Minimize nesting** - Keep specificity low
6. **Use modern layout methods** - Flexbox and Grid over floats
7. **Optimize for performance** - Minimize repaints and reflows
8. **Test across browsers** - Use autoprefixer for vendor prefixes

## CSS Architecture Example

```css
/* Base styles */
:root {
    --color-primary: #3b82f6;
    --color-gray-50: #f9fafb;
    --color-gray-900: #111827;
    --font-family-sans: system-ui, sans-serif;
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
}

/* Layout */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

/* Components */
.card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: var(--spacing-lg);
}

.card__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
}

.card__content {
    color: var(--color-gray-600);
    line-height: 1.6;
}
```

Remember: Great CSS is maintainable, performant, and accessible! 🎨
