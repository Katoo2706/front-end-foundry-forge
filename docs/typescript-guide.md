
# TypeScript Guide

Master TypeScript for type-safe JavaScript development with React and modern web applications.

## Introduction

TypeScript adds static type checking to JavaScript, catching errors at compile time and improving code quality. This guide covers essential TypeScript concepts for frontend development.

## Basic Types and Interfaces

### Primitive Types

```typescript
// Basic types
const name: string = 'Alice';
const age: number = 30;
const isActive: boolean = true;
const tags: string[] = ['react', 'typescript', 'frontend'];
const scores: number[] = [85, 92, 78];

// Tuple types
const coordinates: [number, number] = [40.7128, -74.0060];
const nameAndAge: [string, number] = ['Bob', 25];

// Union types
type Status = 'loading' | 'success' | 'error';
const currentStatus: Status = 'loading';

// Optional and null types
let optionalValue: string | null = null;
let maybeNumber: number | undefined;
```

**Explanation**: TypeScript provides static typing while maintaining JavaScript flexibility. Union types allow values to be one of several types.

### Objects and Interfaces

```typescript
// Interface definition
interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string; // Optional property
    readonly createdAt: Date; // Read-only property
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
}

// Using the interface
const user: User = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    createdAt: new Date(),
    preferences: {
        theme: 'dark',
        notifications: true
    }
};

// Extending interfaces
interface AdminUser extends User {
    role: 'admin' | 'super-admin';
    permissions: string[];
}

const admin: AdminUser = {
    ...user,
    role: 'admin',
    permissions: ['read', 'write', 'delete']
};

// Index signatures
interface StringDictionary {
    [key: string]: string;
}

const translations: StringDictionary = {
    hello: 'Hello',
    goodbye: 'Goodbye'
};
```

### Type Aliases and Utility Types

```typescript
// Type aliases
type ID = string | number;
type EventHandler<T> = (event: T) => void;

// Generic types
type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};

type UserResponse = ApiResponse<User>;

// Utility types
type PartialUser = Partial<User>; // All properties optional
type RequiredUser = Required<User>; // All properties required
type UserEmail = Pick<User, 'email'>; // Only email property
type UserWithoutId = Omit<User, 'id'>; // All except id

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ElementType<T> = T extends (infer U)[] ? U : never;
```

## Functions and Generics

### Function Types

```typescript
// Function declarations
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Arrow functions with types
const add = (a: number, b: number): number => a + b;

// Optional and default parameters
function createUser(
    name: string,
    email: string,
    age?: number,
    isActive: boolean = true
): User {
    return {
        id: Math.random(),
        name,
        email,
        createdAt: new Date(),
        preferences: {
            theme: 'light',
            notifications: true
        },
        ...(age && { age })
    };
}

// Function overloads
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
    if (typeof input === 'string') {
        return input.toUpperCase();
    }
    return input * 2;
}

// Higher-order functions
const withLogging = <T extends any[], R>(
    fn: (...args: T) => R
) => {
    return (...args: T): R => {
        console.log('Function called with:', args);
        const result = fn(...args);
        console.log('Function returned:', result);
        return result;
    };
};

const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Logs input and output
```

### Generic Functions and Classes

```typescript
// Generic functions
function identity<T>(arg: T): T {
    return arg;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Usage
const stringId = identity<string>('hello');
const userName = getProperty(user, 'name'); // Type-safe property access

// Generic classes
class Collection<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
    
    filter(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }
    
    map<U>(transform: (item: T) => U): U[] {
        return this.items.map(transform);
    }
}

const userCollection = new Collection<User>();
userCollection.add(user);
const activeUsers = userCollection.filter(u => u.preferences.notifications);
```

## React with TypeScript

### Component Types

```typescript
import React, { useState, useEffect, ReactNode } from 'react';

// Props interface
interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Functional component with TypeScript
const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick
}) => {
    return (
        <button
            className={`btn btn--${variant} btn--${size}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// Component with state and effects
interface UserListProps {
    initialUsers?: User[];
    onUserSelect?: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ initialUsers = [], onUserSelect }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            try {
                setLoading(true);
                const response = await fetch('/api/users');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                
                const userData: User[] = await response.json();
                setUsers(userData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        
        if (users.length === 0) {
            fetchUsers();
        }
    }, [users.length]);
    
    const handleUserClick = (user: User) => (event: React.MouseEvent) => {
        event.preventDefault();
        onUserSelect?.(user);
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <ul className="user-list">
            {users.map(user => (
                <li key={user.id} onClick={handleUserClick(user)}>
                    {user.name} - {user.email}
                </li>
            ))}
        </ul>
    );
};
```

### Custom Hooks with TypeScript

```typescript
import { useState, useEffect, useCallback } from 'react';

// Custom hook with generics
function useApi<T>(url: string): {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
} {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result: T = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [url]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    return { data, loading, error, refetch: fetchData };
}

// Usage with type inference
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
    const { data: user, loading, error } = useApi<User>(`/api/users/${userId}`);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};

// Form handling hook
interface UseFormOptions<T> {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => Promise<void> | void;
}

function useForm<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit
}: UseFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const handleChange = (name: keyof T) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        setValues(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (validate) {
            const validationErrors = validate(values);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
        }
        
        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setFieldValue: (name: keyof T, value: T[keyof T]) => {
            setValues(prev => ({ ...prev, [name]: value }));
        }
    };
}
```

## Advanced TypeScript Patterns

### Mapped Types and Conditional Types

```typescript
// Mapped types
type Optional<T> = {
    [K in keyof T]?: T[K];
};

type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// Template literal types
type EventNames = 'click' | 'focus' | 'blur';
type EventHandlers = {
    [K in EventNames as `on${Capitalize<K>}`]: (event: Event) => void;
};
// Results in: { onClick: ..., onFocus: ..., onBlur: ... }

// Conditional types with infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Recursive types
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Discriminated unions
type LoadingState = {
    status: 'loading';
};

type SuccessState = {
    status: 'success';
    data: any;
};

type ErrorState = {
    status: 'error';
    error: string;
};

type State = LoadingState | SuccessState | ErrorState;

// Type guards
function isSuccessState(state: State): state is SuccessState {
    return state.status === 'success';
}

function handleState(state: State) {
    switch (state.status) {
        case 'loading':
            return 'Loading...';
        case 'success':
            return `Data: ${state.data}`;
        case 'error':
            return `Error: ${state.error}`;
        default:
            const exhaustive: never = state;
            return exhaustive;
    }
}
```

## Common Pitfalls

### ❌ Using `any` type
```typescript
const userData: any = fetchUserData(); // Loses type safety
```

### ✅ Proper typing
```typescript
const userData: User = await fetchUserData();
```

### ❌ Ignoring null/undefined
```typescript
const userName = user.name.toUpperCase(); // Might throw error
```

### ✅ Optional chaining and nullish coalescing
```typescript
const userName = user?.name?.toUpperCase() ?? 'Anonymous';
```

### ❌ Weak type definitions
```typescript
interface Props {
    data: object;
    callback: Function;
}
```

### ✅ Specific type definitions
```typescript
interface Props {
    data: { id: string; name: string };
    callback: (id: string) => void;
}
```

## Best Practices

1. **Be explicit with types** - Don't rely on `any` or overly broad types
2. **Use interfaces for object shapes** - More extensible than type aliases
3. **Leverage utility types** - `Partial`, `Pick`, `Omit`, etc.
4. **Use generic constraints** - `T extends SomeType` for better type safety
5. **Enable strict mode** - Use strict TypeScript configuration
6. **Type your APIs** - Define interfaces for API responses
7. **Use discriminated unions** - For complex state management
8. **Write type guards** - For runtime type checking

## Configuration

### tsconfig.json Example

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": ["DOM", "DOM.Iterable", "ES6"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "exactOptionalPropertyTypes": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

Remember: TypeScript provides safety, better tooling, and improved developer experience! 🔒
