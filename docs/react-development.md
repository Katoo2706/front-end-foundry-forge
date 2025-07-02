
# React Development

Master React components, hooks, state management, and modern patterns for building interactive UIs.

## Introduction

React is a powerful library for building user interfaces through reusable components. This guide covers modern React development patterns, hooks, and best practices.

## Components and JSX

### Functional Components

```jsx
import React from 'react';

// Basic functional component
const Welcome = ({ name, isLoggedIn }) => {
    return (
        <div className="welcome">
            <h1>Hello, {name}!</h1>
            {isLoggedIn && (
                <p>Welcome back to your dashboard.</p>
            )}
        </div>
    );
};

// Component with conditional rendering
const UserStatus = ({ user }) => {
    if (!user) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="user-status">
            <img 
                src={user.avatar} 
                alt={`${user.name}'s avatar`}
                className="avatar"
            />
            <div>
                <h3>{user.name}</h3>
                <span className={`status ${user.isOnline ? 'online' : 'offline'}`}>
                    {user.isOnline ? 'Online' : 'Offline'}
                </span>
            </div>
        </div>
    );
};

export default Welcome;
```

**Explanation**: Functional components are the modern standard. Use destructuring for props, conditional rendering with `&&`, and proper JSX attributes.

### Lists and Keys

```jsx
const TodoList = ({ todos, onToggle, onDelete }) => {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id} // Always use unique keys
                    todo={todo}
                    onToggle={() => onToggle(todo.id)}
                    onDelete={() => onDelete(todo.id)}
                />
            ))}
        </ul>
    );
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={onDelete} className="delete-btn">
                Delete
            </button>
        </li>
    );
};
```

## React Hooks

### useState Hook

```jsx
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    
    // Complex state
    const [user, setUser] = useState({
        name: '',
        email: '',
        preferences: {
            theme: 'light',
            notifications: true
        }
    });
    
    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => prev - 1);
    
    const updateUserPreference = (key, value) => {
        setUser(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));
    };
    
    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
        </div>
    );
};
```

### useEffect Hook

```jsx
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Effect with dependency array
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (userId) {
            fetchUser();
        }
    }, [userId]); // Dependency array
    
    // Cleanup effect
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Timer tick');
        }, 1000);
        
        return () => {
            clearInterval(timer); // Cleanup
        };
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found</div>;
    
    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};
```

### Custom Hooks

```jsx
import { useState, useEffect } from 'react';

// Custom hook for API calls
const useApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (url) fetchData();
    }, [url]);
    
    return { data, loading, error };
};

// Custom hook for local storage
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });
    
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };
    
    return [storedValue, setValue];
};

// Usage
const App = () => {
    const { data: users, loading, error } = useApi('/api/users');
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    
    return (
        <div className={`app theme-${theme}`}>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
            </button>
            
            {loading && <div>Loading users...</div>}
            {error && <div>Error: {error}</div>}
            {users && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
```

## State Management Patterns

### Context API

```jsx
import React, { createContext, useContext, useReducer } from 'react';

// Create context
const AppContext = createContext();

// Reducer for complex state
const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== action.payload)
            };
        default:
            return state;
    }
};

// Provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, {
        user: null,
        theme: 'light',
        notifications: []
    });
    
    const value = {
        ...state,
        setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
        setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
        addNotification: (notification) => dispatch({ 
            type: 'ADD_NOTIFICATION', 
            payload: { ...notification, id: Date.now() }
        }),
        removeNotification: (id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
    };
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use context
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

// Usage in components
const Header = () => {
    const { user, theme, setTheme } = useApp();
    
    return (
        <header className={`header theme-${theme}`}>
            <h1>My App</h1>
            {user && <span>Welcome, {user.name}!</span>}
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
            </button>
        </header>
    );
};
```

## Form Handling

### Controlled Components

```jsx
import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        category: 'general'
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        return newErrors;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            await onSubmit(formData);
            setFormData({ name: '', email: '', message: '', category: 'general' });
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="general">General</option>
                    <option value="support">Support</option>
                    <option value="billing">Billing</option>
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
};
```

## Common Pitfalls

### ❌ Direct state mutation
```jsx
const addItem = () => {
    items.push(newItem); // Mutates state directly
    setItems(items);
};
```

### ✅ Immutable updates
```jsx
const addItem = () => {
    setItems(prev => [...prev, newItem]);
};
```

### ❌ Missing dependency arrays
```jsx
useEffect(() => {
    fetchData(userId);
}); // Runs on every render
```

### ✅ Proper dependencies
```jsx
useEffect(() => {
    fetchData(userId);
}, [userId]); // Only runs when userId changes
```

### ❌ Inline objects in JSX
```jsx
<Component style={{ margin: 10 }} /> // Creates new object every render
```

### ✅ Memoized objects
```jsx
const style = useMemo(() => ({ margin: 10 }), []);
<Component style={style} />
```

## Best Practices

1. **Use functional components** - They're the modern standard
2. **Keep components small and focused** - Single responsibility principle
3. **Use custom hooks for logic reuse** - Extract common patterns
4. **Properly manage side effects** - Use useEffect correctly
5. **Avoid unnecessary re-renders** - Use React.memo, useMemo, useCallback
6. **Handle loading and error states** - Provide good user feedback
7. **Use proper key props** - For list items and dynamic content
8. **Follow naming conventions** - PascalCase for components, camelCase for functions

## Performance Optimization

```jsx
import React, { memo, useMemo, useCallback } from 'react';

// Memoized component
const ExpensiveComponent = memo(({ data, onUpdate }) => {
    const processedData = useMemo(() => {
        return data.map(item => ({
            ...item,
            processed: true,
            timestamp: Date.now()
        }));
    }, [data]);
    
    const handleClick = useCallback((id) => {
        onUpdate(id);
    }, [onUpdate]);
    
    return (
        <div>
            {processedData.map(item => (
                <div key={item.id} onClick={() => handleClick(item.id)}>
                    {item.name}
                </div>
            ))}
        </div>
    );
});
```

Remember: React is declarative, component-based, and powerful for building interactive UIs! ⚛️
