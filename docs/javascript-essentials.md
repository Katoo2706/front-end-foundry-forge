
# JavaScript Essentials

Master modern JavaScript features, patterns, and best practices for frontend development.

## Introduction

Modern JavaScript (ES6+) provides powerful features for building interactive web applications. This guide covers essential concepts every frontend developer should master.

## Modern JavaScript Features

### Variables and Scope

```javascript
// Use const by default, let when reassignment needed
const API_URL = 'https://api.example.com';
let userCount = 0;

// Block scope
if (true) {
    const blockScoped = 'only available here';
    let alsoBlockScoped = 'me too';
}

// Destructuring
const user = { name: 'Alice', age: 30, email: 'alice@example.com' };
const { name, age, ...rest } = user;

const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;
```

**Explanation**: `const` and `let` provide block scope, preventing common variable hoisting issues. Destructuring allows clean extraction of values from objects and arrays.

### Arrow Functions and Methods

```javascript
// Arrow functions
const add = (a, b) => a + b;
const multiply = (a, b) => {
    console.log(`Multiplying ${a} by ${b}`);
    return a * b;
};

// Array methods
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Method chaining
const result = numbers
    .filter(n => n > 2)
    .map(n => n * 2)
    .reduce((acc, n) => acc + n, 0);

console.log(result); // 18
```

### Promises and Async/Await

```javascript
// Promise-based API calls
const fetchUser = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

// Multiple async operations
const fetchUserData = async (userId) => {
    try {
        const [user, posts, comments] = await Promise.all([
            fetchUser(userId),
            fetch(`/api/users/${userId}/posts`).then(r => r.json()),
            fetch(`/api/users/${userId}/comments`).then(r => r.json())
        ]);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};
```

## Object-Oriented Patterns

### Classes and Inheritance

```javascript
class Component {
    constructor(element) {
        this.element = element;
        this.isVisible = true;
    }
    
    show() {
        this.element.style.display = 'block';
        this.isVisible = true;
        this.onVisibilityChange();
    }
    
    hide() {
        this.element.style.display = 'none';
        this.isVisible = false;
        this.onVisibilityChange();
    }
    
    // Protected method (convention)
    onVisibilityChange() {
        // Override in subclasses
    }
}

class Modal extends Component {
    constructor(element) {
        super(element);
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.setupEventListeners();
    }
    
    show() {
        document.body.appendChild(this.overlay);
        super.show();
        document.body.style.overflow = 'hidden';
    }
    
    hide() {
        document.body.removeChild(this.overlay);
        super.hide();
        document.body.style.overflow = '';
    }
    
    setupEventListeners() {
        this.overlay.addEventListener('click', () => this.hide());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
}
```

### Module Patterns

```javascript
// ES6 Modules

// utils.js
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export default class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        return response.json();
    }
    
    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
}

// main.js
import ApiClient, { formatDate, debounce } from './utils.js';

const api = new ApiClient('https://api.example.com');
const formattedDate = formatDate(new Date());
```

## DOM Manipulation

### Modern DOM APIs

```javascript
// Query selectors
const button = document.querySelector('.submit-btn');
const inputs = document.querySelectorAll('input[required]');

// Event delegation
document.addEventListener('click', (event) => {
    if (event.target.matches('.delete-btn')) {
        handleDelete(event.target.closest('.item'));
    }
    
    if (event.target.matches('.edit-btn')) {
        handleEdit(event.target.closest('.item'));
    }
});

// Creating elements
const createCard = (data) => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <img src="${data.image}" alt="${data.title}" class="card__image">
        <div class="card__content">
            <h3 class="card__title">${data.title}</h3>
            <p class="card__description">${data.description}</p>
            <button class="card__action" data-id="${data.id}">
                Learn More
            </button>
        </div>
    `;
    
    return card;
};

// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

## Error Handling

### Try-Catch and Error Types

```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'NetworkError';
        this.status = status;
    }
}

const validateForm = (formData) => {
    if (!formData.email) {
        throw new ValidationError('Email is required', 'email');
    }
    
    if (!formData.email.includes('@')) {
        throw new ValidationError('Invalid email format', 'email');
    }
};

const submitForm = async (formData) => {
    try {
        validateForm(formData);
        
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
            throw new NetworkError('Submission failed', response.status);
        }
        
        return await response.json();
        
    } catch (error) {
        if (error instanceof ValidationError) {
            showFieldError(error.field, error.message);
        } else if (error instanceof NetworkError) {
            showNotification('Network error. Please try again.', 'error');
        } else {
            console.error('Unexpected error:', error);
            showNotification('Something went wrong.', 'error');
        }
        throw error;
    }
};
```

## Performance Patterns

### Memoization and Caching

```javascript
// Memoization
const memoize = (fn) => {
    const cache = new Map();
    
    return (...args) => {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

const expensiveCalculation = memoize((n) => {
    console.log(`Calculating for ${n}`);
    return n * n * n;
});

// Throttling
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Usage
const handleScroll = throttle(() => {
    console.log('Scroll event handled');
}, 100);

window.addEventListener('scroll', handleScroll);
```

## Common Pitfalls

### ❌ Callback Hell
```javascript
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            // Nested callbacks are hard to read
        });
    });
});
```

### ✅ Use async/await
```javascript
const processData = async () => {
    try {
        const a = await getData();
        const b = await getMoreData(a);
        const c = await getEvenMoreData(b);
        return c;
    } catch (error) {
        console.error('Error processing data:', error);
    }
};
```

### ❌ Mutating arrays/objects directly
```javascript
const addItem = (items, newItem) => {
    items.push(newItem); // Mutates original array
    return items;
};
```

### ✅ Use immutable patterns
```javascript
const addItem = (items, newItem) => {
    return [...items, newItem]; // Returns new array
};
```

## Best Practices

1. **Use const by default** - Only use let when reassignment is needed
2. **Prefer async/await over Promises** - More readable async code
3. **Use array methods over loops** - map, filter, reduce are more declarative
4. **Handle errors explicitly** - Don't let errors fail silently
5. **Use meaningful variable names** - Code should be self-documenting
6. **Keep functions small and pure** - Easier to test and debug
7. **Use modern DOM APIs** - querySelector over getElementById
8. **Implement proper error boundaries** - Graceful degradation

## Quick Reference

| Feature | Use Case | Example |
|---------|----------|---------|
| `const`/`let` | Variable declaration | `const users = []` |
| Arrow functions | Concise functions | `const add = (a, b) => a + b` |
| Destructuring | Extract values | `const {name} = user` |
| Template literals | String interpolation | `` `Hello ${name}` `` |
| Async/await | Handle promises | `const data = await fetch(url)` |
| Spread operator | Copy/merge | `[...array1, ...array2]` |

Remember: Modern JavaScript is powerful, readable, and maintainable! 🚀
