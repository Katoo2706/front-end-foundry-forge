
# Frontend Testing

Master testing strategies, tools, and best practices for reliable frontend applications using Jest, Cypress, and modern testing libraries.

## Introduction

Frontend testing ensures your applications work correctly across different scenarios, browsers, and user interactions. This guide covers unit testing, integration testing, and end-to-end testing strategies.

## Testing Strategy Overview

### Testing Pyramid

```
        /\
       /  \
      / E2E \     ← Few, expensive, slow, but high confidence
     /______\
    /        \
   /Integration\ ← Some, moderate cost/speed, good confidence  
  /____________\
 /              \
/  Unit Tests    \ ← Many, cheap, fast, focused
/________________\
```

**Explanation**: The testing pyramid shows the ideal distribution of tests. Most tests should be fast unit tests, with fewer integration tests, and only essential E2E tests.

## Unit Testing with Jest and React Testing Library

### Basic Component Testing

```typescript
// components/Button.tsx
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    loading = false,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn btn-${variant} ${loading ? 'btn-loading' : ''}`}
            data-testid="button"
        >
            {loading ? 'Loading...' : children}
        </button>
    );
};
```

```typescript
// components/__tests__/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button Component', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });
    
    it('calls onClick when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        
        render(<Button onClick={handleClick}>Click me</Button>);
        
        await user.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it('applies variant classes correctly', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        expect(screen.getByRole('button')).toHaveClass('btn-primary');
        
        rerender(<Button variant="danger">Danger</Button>);
        expect(screen.getByRole('button')).toHaveClass('btn-danger');
    });
    
    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });
    
    it('shows loading state correctly', () => {
        render(<Button loading>Submit</Button>);
        const button = screen.getByRole('button');
        
        expect(button).toBeDisabled();
        expect(button).toHaveTextContent('Loading...');
        expect(button).toHaveClass('btn-loading');
    });
    
    it('does not call onClick when disabled', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        
        render(<Button onClick={handleClick} disabled>Disabled</Button>);
        
        await user.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
```

### Testing Hooks

```typescript
// hooks/useCounter.ts
import { useState, useCallback } from 'react';

export const useCounter = (initialValue: number = 0) => {
    const [count, setCount] = useState(initialValue);
    
    const increment = useCallback(() => {
        setCount(prev => prev + 1);
    }, []);
    
    const decrement = useCallback(() => {
        setCount(prev => prev - 1);
    }, []);
    
    const reset = useCallback(() => {
        setCount(initialValue);
    }, [initialValue]);
    
    return { count, increment, decrement, reset };
};
```

```typescript
// hooks/__tests__/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
    it('initializes with default value', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.count).toBe(0);
    });
    
    it('initializes with custom value', () => {
        const { result } = renderHook(() => useCounter(10));
        expect(result.current.count).toBe(10);
    });
    
    it('increments count correctly', () => {
        const { result } = renderHook(() => useCounter(0));
        
        act(() => {
            result.current.increment();
        });
        
        expect(result.current.count).toBe(1);
    });
    
    it('decrements count correctly', () => {
        const { result } = renderHook(() => useCounter(5));
        
        act(() => {
            result.current.decrement();
        });
        
        expect(result.current.count).toBe(4);
    });
    
    it('resets to initial value', () => {
        const { result } = renderHook(() => useCounter(10));
        
        act(() => {
            result.current.increment();
            result.current.increment();
        });
        
        expect(result.current.count).toBe(12);
        
        act(() => {
            result.current.reset();
        });
        
        expect(result.current.count).toBe(10);
    });
});
```

### Testing API Integration

```typescript
// services/userService.ts
export interface User {
    id: string;
    name: string;
    email: string;
}

export const userService = {
    async getUsers(): Promise<User[]> {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    },
    
    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        
        return response.json();
    },
};
```

```typescript
// services/__tests__/userService.test.ts
import { userService } from '../userService';

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('userService', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });
    
    describe('getUsers', () => {
        it('fetches users successfully', async () => {
            const mockUsers = [
                { id: '1', name: 'John Doe', email: 'john@example.com' },
                { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
            ];
            
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUsers,
            } as Response);
            
            const users = await userService.getUsers();
            
            expect(mockFetch).toHaveBeenCalledWith('/api/users');
            expect(users).toEqual(mockUsers);
        });
        
        it('throws error when fetch fails', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
            } as Response);
            
            await expect(userService.getUsers()).rejects.toThrow('Failed to fetch users');
        });
    });
    
    describe('createUser', () => {
        it('creates user successfully', async () => {
            const newUser = { name: 'Bob Wilson', email: 'bob@example.com' };
            const createdUser = { id: '3', ...newUser };
            
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => createdUser,
            } as Response);
            
            const result = await userService.createUser(newUser);
            
            expect(mockFetch).toHaveBeenCalledWith('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            expect(result).toEqual(createdUser);
        });
    });
});
```

### Testing Components with Context

```typescript
// components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService, User } from '../services/userService';

export const UserList: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const fetchedUsers = await userService.getUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        
        if (currentUser) {
            fetchUsers();
        }
    }, [currentUser]);
    
    if (!currentUser) {
        return <div>Please log in to view users</div>;
    }
    
    if (loading) {
        return <div data-testid="loading">Loading...</div>;
    }
    
    if (error) {
        return <div data-testid="error">Error: {error}</div>;
    }
    
    return (
        <div data-testid="user-list">
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} data-testid={`user-${user.id}`}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};
```

```typescript
// components/__tests__/UserList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from '../UserList';
import { AuthContext } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';

// Mock the userService
jest.mock('../../services/userService');
const mockUserService = userService as jest.Mocked<typeof userService>;

// Test utility to render with auth context
const renderWithAuth = (currentUser: any = null) => {
    const mockAuthValue = {
        user: currentUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
    };
    
    return render(
        <AuthContext.Provider value={mockAuthValue}>
            <UserList />
        </AuthContext.Provider>
    );
};

describe('UserList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('shows login message when user is not authenticated', () => {
        renderWithAuth(null);
        expect(screen.getByText('Please log in to view users')).toBeInTheDocument();
    });
    
    it('shows loading state initially', () => {
        const currentUser = { id: '1', name: 'Test User', email: 'test@example.com' };
        mockUserService.getUsers.mockImplementation(() => new Promise(() => {})); // Never resolves
        
        renderWithAuth(currentUser);
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
    
    it('displays users after successful fetch', async () => {
        const mockUsers = [
            { id: '1', name: 'John Doe', email: 'john@example.com' },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        ];
        
        const currentUser = { id: '3', name: 'Test User', email: 'test@example.com' };
        mockUserService.getUsers.mockResolvedValue(mockUsers);
        
        renderWithAuth(currentUser);
        
        await waitFor(() => {
            expect(screen.getByTestId('user-list')).toBeInTheDocument();
        });
        
        expect(screen.getByText('John Doe - john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith - jane@example.com')).toBeInTheDocument();
    });
    
    it('displays error message on fetch failure', async () => {
        const currentUser = { id: '1', name: 'Test User', email: 'test@example.com' };
        mockUserService.getUsers.mockRejectedValue(new Error('API Error'));
        
        renderWithAuth(currentUser);
        
        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeInTheDocument();
        });
        
        expect(screen.getByText('Error: API Error')).toBeInTheDocument();
    });
});
```

## End-to-End Testing with Cypress

### Basic E2E Test

```typescript
// cypress/e2e/user-authentication.cy.ts
describe('User Authentication', () => {
    beforeEach(() => {
        // Reset database or use fixtures
        cy.task('db:seed');
    });
    
    it('allows user to sign up, log in, and access dashboard', () => {
        // Visit homepage
        cy.visit('/');
        
        // Navigate to sign up
        cy.get('[data-testid="signup-link"]').click();
        cy.url().should('include', '/signup');
        
        // Fill out sign up form
        cy.get('[data-testid="name-input"]').type('John Doe');
        cy.get('[data-testid="email-input"]').type('john@example.com');
        cy.get('[data-testid="password-input"]').type('securePassword123');
        cy.get('[data-testid="confirm-password-input"]').type('securePassword123');
        
        // Submit form
        cy.get('[data-testid="signup-submit"]').click();
        
        // Should redirect to dashboard
        cy.url().should('include', '/dashboard');
        cy.get('[data-testid="welcome-message"]').should('be.visible');
        cy.get('[data-testid="user-name"]').should('contain', 'John Doe');
        
        // Log out
        cy.get('[data-testid="logout-button"]').click();
        cy.url().should('include', '/');
        
        // Log back in
        cy.get('[data-testid="login-link"]').click();
        cy.get('[data-testid="email-input"]').type('john@example.com');
        cy.get('[data-testid="password-input"]').type('securePassword123');
        cy.get('[data-testid="login-submit"]').click();
        
        // Should be back in dashboard
        cy.url().should('include', '/dashboard');
        cy.get('[data-testid="user-name"]').should('contain', 'John Doe');
    });
    
    it('shows validation errors for invalid input', () => {
        cy.visit('/signup');
        
        // Try to submit with empty fields
        cy.get('[data-testid="signup-submit"]').click();
        
        // Should show validation errors
        cy.get('[data-testid="name-error"]').should('be.visible');
        cy.get('[data-testid="email-error"]').should('be.visible');
        cy.get('[data-testid="password-error"]').should('be.visible');
        
        // Fill in invalid email
        cy.get('[data-testid="email-input"]').type('invalid-email');
        cy.get('[data-testid="signup-submit"]').click();
        cy.get('[data-testid="email-error"]').should('contain', 'valid email');
        
        // Password mismatch
        cy.get('[data-testid="password-input"]').type('password1');
        cy.get('[data-testid="confirm-password-input"]').type('password2');
        cy.get('[data-testid="signup-submit"]').click();
        cy.get('[data-testid="confirm-password-error"]').should('contain', 'match');
    });
});
```

### Advanced E2E Patterns

```typescript
// cypress/e2e/todo-management.cy.ts
describe('Todo Management', () => {
    beforeEach(() => {
        // Login before each test
        cy.login('user@example.com', 'password123');
        cy.visit('/todos');
    });
    
    it('allows CRUD operations on todos', () => {
        const todoText = 'Learn Cypress testing';
        
        // Create todo
        cy.get('[data-testid="new-todo-input"]').type(todoText);
        cy.get('[data-testid="add-todo-button"]').click();
        
        // Verify todo appears
        cy.get('[data-testid="todo-list"]')
            .should('contain', todoText)
            .within(() => {
                cy.get('[data-testid^="todo-item-"]').should('have.length', 1);
            });
        
        // Mark as complete
        cy.get('[data-testid^="todo-item-"]').first().within(() => {
            cy.get('[data-testid="todo-checkbox"]').click();
            cy.get('[data-testid="todo-text"]').should('have.class', 'completed');
        });
        
        // Edit todo
        cy.get('[data-testid^="todo-item-"]').first().within(() => {
            cy.get('[data-testid="edit-button"]').click();
            cy.get('[data-testid="edit-input"]')
                .clear()
                .type('Learn advanced Cypress testing');
            cy.get('[data-testid="save-button"]').click();
        });
        
        // Verify edit
        cy.get('[data-testid="todo-text"]').should('contain', 'Learn advanced Cypress testing');
        
        // Delete todo
        cy.get('[data-testid^="todo-item-"]').first().within(() => {
            cy.get('[data-testid="delete-button"]').click();
        });
        
        // Confirm deletion
        cy.get('[data-testid="confirm-delete"]').click();
        
        // Verify deletion
        cy.get('[data-testid="todo-list"]').should('not.contain', 'Learn advanced Cypress testing');
    });
    
    it('filters todos correctly', () => {
        // Add multiple todos
        const todos = [
            'Completed task',
            'Pending task 1',
            'Pending task 2'
        ];
        
        todos.forEach(todo => {
            cy.get('[data-testid="new-todo-input"]').type(todo);
            cy.get('[data-testid="add-todo-button"]').click();
        });
        
        // Mark first todo as complete
        cy.get('[data-testid^="todo-item-"]').first().within(() => {
            cy.get('[data-testid="todo-checkbox"]').click();
        });
        
        // Test filters
        cy.get('[data-testid="filter-all"]').click();
        cy.get('[data-testid^="todo-item-"]').should('have.length', 3);
        
        cy.get('[data-testid="filter-active"]').click();
        cy.get('[data-testid^="todo-item-"]').should('have.length', 2);
        
        cy.get('[data-testid="filter-completed"]').click();
        cy.get('[data-testid^="todo-item-"]').should('have.length', 1);
    });
});

// cypress/support/commands.ts
declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>;
            seedDatabase(): Chainable<void>;
        }
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit('/login');
        cy.get('[data-testid="email-input"]').type(email);
        cy.get('[data-testid="password-input"]').type(password);
        cy.get('[data-testid="login-submit"]').click();
        cy.url().should('include', '/dashboard');
    });
});

Cypress.Commands.add('seedDatabase', () => {
    cy.task('db:seed');
});
```

## Test Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.tsx',
        '!src/reportWebVitals.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
```

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
};
```

### Cypress Configuration

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        supportFile: 'cypress/support/e2e.ts',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        video: true,
        screenshotOnRunFailure: true,
        viewportWidth: 1280,
        viewportHeight: 720,
        setupNodeEvents(on, config) {
            // Database seeding task
            on('task', {
                'db:seed': () => {
                    // Your database seeding logic
                    return null;
                },
            });
        },
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
```

## Common Pitfalls

### ❌ Testing implementation details
```typescript
// Don't test internal state or methods
expect(component.state('count')).toBe(5);
expect(component.instance().handleClick).toHaveBeenCalled();
```

### ✅ Test user behavior
```typescript
// Test what users see and do
expect(screen.getByText('Count: 5')).toBeInTheDocument();
await user.click(screen.getByRole('button', { name: 'Increment' }));
```

### ❌ Overly specific selectors
```typescript
// Fragile - breaks when structure changes
cy.get('.container > .header > .nav > .item:nth-child(2)');
```

### ✅ Use semantic selectors
```typescript
// Stable - based on user intent
cy.get('[data-testid="navigation-about"]');
cy.get('button').contains('Submit');
```

### ❌ Not testing error states
```typescript
// Only testing happy path
it('fetches data successfully', () => {
    // Test only success case
});
```

### ✅ Test all scenarios
```typescript
// Test success, loading, and error states
describe('Data fetching', () => {
    it('shows loading state');
    it('shows data on success');
    it('shows error on failure');
});
```

## Best Practices

1. **Write tests before or alongside code** - TDD/BDD approach
2. **Test user behavior, not implementation** - Focus on what users experience
3. **Use descriptive test names** - Should read like specifications
4. **Keep tests isolated and independent** - Each test should work alone
5. **Use proper data-testid attributes** - Stable selectors for testing
6. **Mock external dependencies** - Control test environment
7. **Test edge cases and error scenarios** - Don't just test happy paths
8. **Maintain test data and fixtures** - Keep test data consistent and manageable

## Test Organization

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts
├── services/
│   ├── api.ts
│   └── api.test.ts
├── utils/
│   ├── helpers.ts
│   └── helpers.test.ts
└── __tests__/
    ├── setup.ts
    └── mocks/
        └── handlers.ts

cypress/
├── e2e/
│   ├── auth.cy.ts
│   └── todos.cy.ts
├── fixtures/
│   └── users.json
└── support/
    ├── commands.ts
    └── e2e.ts
```

Remember: Good tests are your safety net for confident development and refactoring! 🧪
