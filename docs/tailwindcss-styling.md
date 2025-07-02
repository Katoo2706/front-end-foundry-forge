
# TailwindCSS Styling

Master utility-first CSS with Tailwind for rapid, maintainable, and responsive design.

## Introduction

TailwindCSS is a utility-first CSS framework that provides low-level utility classes to build custom designs quickly. This guide covers essential concepts, patterns, and best practices.

## Core Concepts

### Utility Classes

```html
<!-- Basic styling -->
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
    Basic card with background, text color, padding, rounded corners, and shadow
</div>

<!-- Responsive design -->
<div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
    Responsive width: full on mobile, half on tablet, third on desktop, quarter on xl
</div>

<!-- Flexbox layout -->
<div class="flex items-center justify-between p-4">
    <span class="text-lg font-semibold">Title</span>
    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Action
    </button>
</div>

<!-- Grid layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded-lg shadow">Card 1</div>
    <div class="bg-white p-6 rounded-lg shadow">Card 2</div>
    <div class="bg-white p-6 rounded-lg shadow">Card 3</div>
</div>
```

**Explanation**: Utility classes provide granular control over styling. Each class serves a single purpose, making designs predictable and maintainable.

### Responsive Design

```html
<!-- Mobile-first responsive approach -->
<div class="
    text-sm          /* Small text on mobile */
    md:text-base     /* Normal text on tablet+ */
    lg:text-lg       /* Large text on desktop+ */
    
    p-2              /* Small padding on mobile */
    md:p-4           /* Medium padding on tablet+ */
    lg:p-6           /* Large padding on desktop+ */
    
    bg-gray-100      /* Light background on mobile */
    md:bg-white      /* White background on tablet+ */
    
    shadow-none      /* No shadow on mobile */
    md:shadow-md     /* Shadow on tablet+ */
">
    Responsive content
</div>

<!-- Container with responsive behavior -->
<div class="
    container        /* Center container */
    mx-auto          /* Center horizontally */
    px-4             /* Horizontal padding */
    max-w-screen-xl  /* Maximum width */
">
    <header class="
        flex             /* Flexbox layout */
        flex-col         /* Stack on mobile */
        md:flex-row      /* Side-by-side on tablet+ */
        items-center     /* Center align items */
        justify-between  /* Space between on desktop */
        py-4             /* Vertical padding */
        gap-4            /* Gap between items */
    ">
        <h1 class="text-2xl md:text-3xl font-bold">Logo</h1>
        <nav class="
            flex 
            flex-col md:flex-row 
            gap-2 md:gap-6
            w-full md:w-auto
        ">
            <a href="#" class="hover:text-blue-600 transition-colors">Home</a>
            <a href="#" class="hover:text-blue-600 transition-colors">About</a>
            <a href="#" class="hover:text-blue-600 transition-colors">Contact</a>
        </nav>
    </header>
</div>
```

## Component Patterns

### Card Components

```html
<!-- Basic card -->
<div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img src="image.jpg" alt="Card image" class="w-full h-48 object-cover">
    <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">Card Title</h3>
        <p class="text-gray-600 mb-4">Card description text goes here.</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
            Read More
        </button>
    </div>
</div>

<!-- Advanced card with hover effects -->
<div class="
    group                    /* Group for hover effects */
    bg-white 
    rounded-xl 
    shadow-lg 
    hover:shadow-xl         /* Enhanced shadow on hover */
    transition-all 
    duration-300 
    overflow-hidden
    transform 
    hover:-translate-y-1    /* Lift effect on hover */
">
    <div class="relative overflow-hidden">
        <img 
            src="image.jpg" 
            alt="Card image" 
            class="
                w-full h-48 object-cover 
                group-hover:scale-105   /* Scale image on card hover */
                transition-transform 
                duration-300
            "
        >
        <div class="
            absolute inset-0 
            bg-black bg-opacity-0 
            group-hover:bg-opacity-20 
            transition-all duration-300
        "></div>
    </div>
    <div class="p-6">
        <span class="
            inline-block 
            bg-blue-100 text-blue-800 
            text-xs font-semibold 
            px-2 py-1 rounded-full 
            mb-2
        ">Category</span>
        <h3 class="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            Card Title
        </h3>
        <p class="text-gray-600 mb-4">Card description text goes here.</p>
        <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">Jan 15, 2024</span>
            <button class="
                bg-blue-500 hover:bg-blue-600 
                text-white px-4 py-2 rounded-lg
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ">
                Read More
            </button>
        </div>
    </div>
</div>
```

### Form Components

```html
<!-- Modern form with validation states -->
<form class="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Contact Form</h2>
    
    <!-- Input with label -->
    <div class="space-y-2">
        <label for="name" class="block text-sm font-medium text-gray-700">
            Full Name
        </label>
        <input 
            type="text" 
            id="name" 
            name="name"
            class="
                w-full px-3 py-2 
                border border-gray-300 
                rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500
                transition-colors duration-200
            "
            placeholder="Enter your full name"
        >
    </div>
    
    <!-- Input with error state -->
    <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700">
            Email Address
        </label>
        <input 
            type="email" 
            id="email" 
            name="email"
            class="
                w-full px-3 py-2 
                border border-red-300     /* Error border */
                rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-red-500 
                focus:border-red-500
                bg-red-50                 /* Error background */
                transition-colors duration-200
            "
            placeholder="Enter your email"
        >
        <p class="text-sm text-red-600">Please enter a valid email address.</p>
    </div>
    
    <!-- Select dropdown -->
    <div class="space-y-2">
        <label for="subject" class="block text-sm font-medium text-gray-700">
            Subject
        </label>
        <select 
            id="subject" 
            name="subject"
            class="
                w-full px-3 py-2 
                border border-gray-300 
                rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500
                bg-white
                transition-colors duration-200
            "
        >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="billing">Billing Question</option>
        </select>
    </div>
    
    <!-- Textarea -->
    <div class="space-y-2">
        <label for="message" class="block text-sm font-medium text-gray-700">
            Message
        </label>
        <textarea 
            id="message" 
            name="message" 
            rows="4"
            class="
                w-full px-3 py-2 
                border border-gray-300 
                rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500
                resize-vertical
                transition-colors duration-200
            "
            placeholder="Enter your message"
        ></textarea>
    </div>
    
    <!-- Checkbox -->
    <div class="flex items-start space-x-3">
        <input 
            type="checkbox" 
            id="newsletter" 
            name="newsletter"
            class="
                mt-1 h-4 w-4 
                text-blue-600 
                border-gray-300 
                rounded 
                focus:ring-blue-500 
                focus:ring-2
            "
        >
        <label for="newsletter" class="text-sm text-gray-700">
            Subscribe to our newsletter for updates and special offers.
        </label>
    </div>
    
    <!-- Submit button -->
    <button 
        type="submit"
        class="
            w-full bg-blue-600 hover:bg-blue-700 
            disabled:bg-gray-400 disabled:cursor-not-allowed
            text-white font-medium py-2 px-4 
            rounded-md shadow-sm
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        "
    >
        Send Message
    </button>
</form>
```

### Navigation Components

```html
<!-- Mobile-responsive navigation -->
<nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
            <!-- Logo -->
            <div class="flex items-center space-x-2">
                <img src="logo.svg" alt="Logo" class="h-8 w-8">
                <span class="text-xl font-bold text-gray-800">Brand</span>
            </div>
            
            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="#" class="
                    text-gray-600 hover:text-blue-600 
                    font-medium transition-colors duration-200
                    relative
                    after:absolute after:bottom-0 after:left-0 
                    after:w-0 after:h-0.5 after:bg-blue-600
                    hover:after:w-full after:transition-all after:duration-300
                ">Home</a>
                <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
                <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors">Services</a>
                <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </div>
            
            <!-- CTA Button -->
            <div class="hidden md:block">
                <button class="
                    bg-blue-600 hover:bg-blue-700 
                    text-white px-6 py-2 
                    rounded-lg font-medium
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ">
                    Get Started
                </button>
            </div>
            
            <!-- Mobile menu button -->
            <button class="md:hidden text-gray-600 hover:text-gray-900">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        
        <!-- Mobile Navigation (hidden by default) -->
        <div class="md:hidden border-t border-gray-200">
            <div class="py-2 space-y-1">
                <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600">Home</a>
                <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600">About</a>
                <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600">Services</a>
                <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600">Contact</a>
                <div class="px-4 py-2">
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </div>
</nav>
```

## Advanced Patterns

### Custom Component Classes

```css
/* In your CSS file or Tailwind components layer */
@layer components {
    .btn {
        @apply px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
    }
    
    .btn-primary {
        @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
    }
    
    .btn-secondary {
        @apply bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500;
    }
    
    .btn-danger {
        @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
    }
    
    .card {
        @apply bg-white rounded-lg shadow-md overflow-hidden;
    }
    
    .card-header {
        @apply px-6 py-4 border-b border-gray-200;
    }
    
    .card-body {
        @apply p-6;
    }
    
    .form-input {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200;
    }
    
    .form-input-error {
        @apply border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50;
    }
}
```

### Dark Mode Support

```html
<!-- Configure dark mode in tailwind.config.js -->
<!-- darkMode: 'class' -->

<div class="
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-white
    border border-gray-200 dark:border-gray-700
    p-6 rounded-lg
    transition-colors duration-200
">
    <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Dark Mode Support
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
        This content adapts to both light and dark themes.
    </p>
    <button class="
        bg-blue-600 hover:bg-blue-700 
        dark:bg-blue-500 dark:hover:bg-blue-600
        text-white px-4 py-2 rounded
        transition-colors duration-200
    ">
        Action Button
    </button>
</div>

<!-- Theme toggle button -->
<button 
    onclick="toggleDarkMode()"
    class="
        p-2 rounded-lg
        bg-gray-200 hover:bg-gray-300
        dark:bg-gray-700 dark:hover:bg-gray-600
        text-gray-800 dark:text-gray-200
        transition-colors duration-200
    "
>
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <!-- Sun/Moon icon -->
    </svg>
</button>
```

### Animation and Transitions

```html
<!-- Loading states -->
<div class="animate-pulse">
    <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-5/6"></div>
</div>

<!-- Hover animations -->
<div class="
    transform transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl
    hover:-translate-y-2
">
    <img src="image.jpg" alt="Animated image" class="
        w-full h-48 object-cover rounded-lg
        filter transition-all duration-300
        hover:brightness-110 hover:contrast-110
    ">
</div>

<!-- Fade in animation -->
<div class="
    opacity-0 translate-y-4
    animate-fade-in
    transition-all duration-500 ease-out
">
    Content fades in from bottom
</div>

<!-- Custom keyframes in tailwind.config.js -->
/*
animation: {
    'fade-in': 'fadeIn 0.5s ease-out forwards',
    'slide-up': 'slideUp 0.3s ease-out forwards',
    'bounce-slow': 'bounce 2s infinite',
},
keyframes: {
    fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(16px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    slideUp: {
        '0%': { transform: 'translateY(100%)' },
        '100%': { transform: 'translateY(0)' },
    },
}
*/
```

## Common Pitfalls

### ❌ Overusing arbitrary values
```html
<div class="w-[347px] h-[123px] bg-[#ff6b35]">
    Specific values that can't be reused
</div>
```

### ✅ Use design tokens
```html
<div class="w-80 h-32 bg-orange-500">
    Using consistent design system values
</div>
```

### ❌ Not using responsive design
```html
<div class="text-2xl p-8">
    Same size on all devices
</div>
```

### ✅ Mobile-first responsive
```html
<div class="text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8">
    Scales appropriately across devices
</div>
```

### ❌ Repeating complex class combinations
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">Button 1</button>
<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">Button 2</button>
```

### ✅ Extract to components
```html
<button class="btn btn-primary">Button 1</button>
<button class="btn btn-primary">Button 2</button>
```

## Best Practices

1. **Follow mobile-first approach** - Start with mobile, enhance for larger screens
2. **Use consistent spacing scale** - Stick to Tailwind's spacing system
3. **Leverage design tokens** - Use predefined colors, fonts, and sizes
4. **Extract reusable patterns** - Create component classes for common patterns
5. **Use semantic color names** - `bg-red-500` not `bg-[#ef4444]`
6. **Implement proper focus states** - Ensure accessibility with focus styles
7. **Use transitions wisely** - Add smooth interactions without overdoing it
8. **Test across breakpoints** - Ensure responsive behavior works correctly

## Configuration Example

```javascript
// tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    900: '#1e3a8a',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.3s ease-out forwards',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
```

Remember: TailwindCSS enables rapid development with consistent, maintainable styles! 🎨
