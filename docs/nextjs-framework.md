
# Next.js Framework

Master Next.js for building full-stack React applications with server-side rendering, routing, and optimization.

## Introduction

Next.js is a React framework that provides production-ready features like server-side rendering, static site generation, API routes, and automatic optimization. This guide covers modern Next.js development patterns.

## Project Structure and Setup

### App Router (Next.js 13+)

```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── globals.css        # Global styles
├── about/
│   └── page.tsx       # /about route
├── blog/
│   ├── page.tsx       # /blog route
│   └── [slug]/
│       └── page.tsx   # /blog/[slug] dynamic route
├── api/
│   └── users/
│       └── route.ts   # API endpoint
└── components/
    └── ui/
```

### Root Layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: {
        template: '%s | My App',
        default: 'My App'
    },
    description: 'A modern web application built with Next.js',
    keywords: ['Next.js', 'React', 'TypeScript'],
    authors: [{ name: 'Your Name' }],
    openGraph: {
        title: 'My App',
        description: 'A modern web application',
        url: 'https://myapp.com',
        siteName: 'My App',
        images: [
            {
                url: 'https://myapp.com/og-image.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'My App',
        description: 'A modern web application',
        images: ['https://myapp.com/twitter-image.jpg'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <div className="min-h-screen bg-background font-sans">
                    <header className="border-b">
                        <nav className="container mx-auto px-4 py-4">
                            {/* Navigation component */}
                        </nav>
                    </header>
                    <main>{children}</main>
                    <footer className="border-t mt-auto">
                        <div className="container mx-auto px-4 py-8">
                            {/* Footer content */}
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
```

**Explanation**: The root layout wraps all pages and includes global metadata, styles, and structure that persists across navigation.

## Routing and Navigation

### Pages and Dynamic Routes

```tsx
// app/page.tsx - Home page
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/blog" className="block">
                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">Blog</h2>
                        <p className="text-gray-600">Read our latest articles</p>
                    </div>
                </Link>
                <Link href="/about" className="block">
                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p className="text-gray-600">Learn more about us</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

// app/blog/page.tsx - Blog listing
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Our latest blog posts and articles',
};

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    slug: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
    const res = await fetch('https://api.example.com/posts', {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch blog posts');
    }
    
    return res.json();
}

export default async function BlogPage() {
    const posts = await getBlogPosts();
    
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <div className="grid gap-6">
                {posts.map((post) => (
                    <article key={post.id} className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">
                            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                                {post.title}
                            </Link>
                        </h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <time className="text-sm text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString()}
                        </time>
                    </article>
                ))}
            </div>
        </div>
    );
}

// app/blog/[slug]/page.tsx - Dynamic blog post
interface PageProps {
    params: {
        slug: string;
    };
}

async function getBlogPost(slug: string) {
    const res = await fetch(`https://api.example.com/posts/${slug}`, {
        next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch blog post');
    }
    
    return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await getBlogPost(params.slug);
    
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const post = await getBlogPost(params.slug);
    
    return (
        <article className="container mx-auto px-4 py-16 max-w-3xl">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                    <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                </div>
            </header>
            
            {post.coverImage && (
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg mb-8"
                />
            )}
            
            <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
```

## Server Components vs Client Components

### Server Components (Default)

```tsx
// app/dashboard/page.tsx - Server Component
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function getUser() {
    const headersList = headers();
    const authorization = headersList.get('authorization');
    
    if (!authorization) {
        redirect('/login');
    }
    
    const res = await fetch('https://api.example.com/user', {
        headers: { authorization },
        next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    return res.json();
}

async function getUserStats(userId: string) {
    const res = await fetch(`https://api.example.com/users/${userId}/stats`, {
        next: { revalidate: 60 } // Cache for 1 minute
    });
    
    return res.json();
}

export default async function DashboardPage() {
    const user = await getUser();
    const stats = await getUserStats(user.id);
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">${stats.revenue}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Customers</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats.customers}</p>
                </div>
            </div>
            
            {/* Client component for interactivity */}
            <InteractiveChart data={stats.chartData} />
        </div>
    );
}
```

### Client Components

```tsx
// components/InteractiveChart.tsx - Client Component
'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

interface InteractiveChartProps {
    data: ChartData;
}

export default function InteractiveChart({ data }: InteractiveChartProps) {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
    const [filteredData, setFilteredData] = useState(data);
    
    useEffect(() => {
        // Filter data based on time range
        const filterData = () => {
            const dayCount = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
            const filtered = {
                ...data,
                labels: data.labels.slice(-dayCount),
                datasets: data.datasets.map(dataset => ({
                    ...dataset,
                    data: dataset.data.slice(-dayCount)
                }))
            };
            setFilteredData(filtered);
        };
        
        filterData();
    }, [timeRange, data]);
    
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Revenue Chart</h3>
                <div className="flex gap-2">
                    {(['7d', '30d', '90d'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 rounded text-sm ${
                                timeRange === range
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="h-64">
                <Line
                    data={filteredData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
```

## API Routes

### REST API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createUserSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    role: z.enum(['user', 'admin']).default('user'),
});

// GET /api/users
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';
        
        // Simulate database query
        const users = await getUsersFromDatabase({
            page,
            limit,
            search,
        });
        
        return NextResponse.json({
            users,
            pagination: {
                page,
                limit,
                total: users.length,
                pages: Math.ceil(users.length / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/users
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate request body
        const validatedData = createUserSchema.parse(body);
        
        // Check if user already exists
        const existingUser = await findUserByEmail(validatedData.email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }
        
        // Create user
        const newUser = await createUser(validatedData);
        
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.errors },
                { status: 400 }
            );
        }
        
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// app/api/users/[id]/route.ts
interface RouteParams {
    params: {
        id: string;
    };
}

// GET /api/users/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = params.id;
        
        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }
        
        const user = await getUserById(userId);
        
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT /api/users/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = params.id;
        const body = await request.json();
        
        const validatedData = createUserSchema.partial().parse(body);
        
        const updatedUser = await updateUser(userId, validatedData);
        
        if (!updatedUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(updatedUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.errors },
                { status: 400 }
            );
        }
        
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
```

## Data Fetching Patterns

### Static Generation vs Server-Side Rendering

```tsx
// Static Generation (SSG) - Generated at build time
export default async function StaticPage() {
    const data = await fetch('https://api.example.com/static-data', {
        next: { revalidate: false } // Never revalidate
    });
    
    return (
        <div>
            <h1>Static Content</h1>
            {/* Content rendered at build time */}
        </div>
    );
}

// Incremental Static Regeneration (ISR)
export default async function ISRPage() {
    const data = await fetch('https://api.example.com/semi-static-data', {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    
    return (
        <div>
            <h1>Semi-Static Content</h1>
            {/* Content regenerated periodically */}
        </div>
    );
}

// Server-Side Rendering (SSR) - Rendered on each request
export default async function SSRPage() {
    const data = await fetch('https://api.example.com/dynamic-data', {
        cache: 'no-store' // Always fetch fresh data
    });
    
    return (
        <div>
            <h1>Dynamic Content</h1>
            {/* Content rendered on each request */}
        </div>
    );
}
```

## Authentication and Middleware

### Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // Check if the request is for a protected route
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('auth-token')?.value;
        
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        
        try {
            const isValid = await verifyAuth(token);
            if (!isValid) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    
    // Add security headers
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
    
    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
```

## Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image';

export default function OptimizedImages() {
    return (
        <div>
            {/* Optimized image with Next.js Image component */}
            <Image
                src="/hero-image.jpg"
                alt="Hero image"
                width={1200}
                height={600}
                priority // Load immediately for above-the-fold content
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
            />
            
            {/* Responsive image */}
            <Image
                src="/responsive-image.jpg"
                alt="Responsive image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
            />
        </div>
    );
}
```

### Bundle Analysis and Code Splitting

```tsx
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
    loading: () => <div>Loading chart...</div>,
    ssr: false, // Don't render on server
});

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
    loading: () => <div>Loading admin panel...</div>,
});

export default function Dashboard({ isAdmin }: { isAdmin: boolean }) {
    return (
        <div>
            <h1>Dashboard</h1>
            
            {/* Always loaded */}
            <BasicStats />
            
            {/* Conditionally loaded */}
            {isAdmin && <AdminPanel />}
            
            {/* Lazy loaded */}
            <HeavyChart />
        </div>
    );
}
```

## Common Pitfalls

### ❌ Using client components unnecessarily
```tsx
'use client'; // Don't add this unless you need interactivity
export default function StaticContent() {
    return <div>Static content</div>;
}
```

### ✅ Use server components by default
```tsx
// No 'use client' directive needed for static content
export default function StaticContent() {
    return <div>Static content</div>;
}
```

### ❌ Not handling loading and error states
```tsx
export default async function Page() {
    const data = await fetch('/api/data');
    return <div>{data}</div>; // No error handling
}
```

### ✅ Proper error handling
```tsx
export default async function Page() {
    try {
        const data = await fetch('/api/data');
        if (!data.ok) throw new Error('Failed to fetch');
        return <div>{data}</div>;
    } catch (error) {
        return <div>Error loading data</div>;
    }
}
```

## Best Practices

1. **Use Server Components by default** - Add 'use client' only when needed
2. **Implement proper error boundaries** - Handle errors gracefully
3. **Optimize images** - Use Next.js Image component
4. **Use TypeScript** - Better development experience and type safety
5. **Implement proper SEO** - Use metadata API and structured data
6. **Cache strategically** - Use appropriate revalidation strategies
7. **Monitor performance** - Use Next.js analytics and Web Vitals
8. **Follow security best practices** - Implement proper authentication and authorization

Remember: Next.js provides the tools for building fast, scalable, and SEO-friendly React applications! ⚡
