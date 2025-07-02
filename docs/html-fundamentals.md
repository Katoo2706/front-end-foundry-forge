
# HTML Fundamentals

Master semantic HTML markup and accessibility best practices for modern web development.

## Introduction

HTML (HyperText Markup Language) is the foundation of web development. Modern HTML emphasizes semantic meaning, accessibility, and clean document structure.

## Core Concepts

### Semantic Elements

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Example</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <header>
                <h1>Article Title</h1>
                <time datetime="2024-01-15">January 15, 2024</time>
            </header>
            <section>
                <h2>Section Heading</h2>
                <p>Content goes here...</p>
            </section>
        </article>
        
        <aside>
            <h3>Related Links</h3>
            <ul>
                <li><a href="#link1">Related Article 1</a></li>
                <li><a href="#link2">Related Article 2</a></li>
            </ul>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2024 Your Website</p>
    </footer>
</body>
</html>
```

**Explanation**: Semantic elements like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>` provide meaning and structure that both browsers and screen readers can understand.

### Forms and Input Elements

```html
<form action="/submit" method="POST">
    <fieldset>
        <legend>Contact Information</legend>
        
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone">
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" cols="50"></textarea>
        
        <button type="submit">Send Message</button>
    </fieldset>
</form>
```

**Explanation**: Proper form structure with labels, input types, and validation attributes ensures accessibility and better user experience.

## Accessibility Best Practices

### ARIA Attributes

```html
<button aria-label="Close dialog" aria-expanded="false" onclick="toggleDialog()">
    ×
</button>

<div role="dialog" aria-labelledby="dialog-title" aria-hidden="true">
    <h2 id="dialog-title">Confirmation</h2>
    <p>Are you sure you want to delete this item?</p>
    <button>Yes</button>
    <button>Cancel</button>
</div>
```

### Skip Navigation

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<nav>...</nav>
<main id="main-content">...</main>
```

## Common Pitfalls

### ❌ Non-semantic markup
```html
<div class="header">
    <div class="nav">...</div>
</div>
```

### ✅ Semantic markup
```html
<header>
    <nav>...</nav>
</header>
```

### ❌ Missing alt attributes
```html
<img src="chart.png">
```

### ✅ Descriptive alt text
```html
<img src="chart.png" alt="Sales revenue increased 25% from Q1 to Q2">
```

## Best Practices

1. **Always use semantic HTML elements** - They provide meaning and improve accessibility
2. **Include proper meta tags** - Essential for SEO and responsive design
3. **Use heading hierarchy correctly** - H1 → H2 → H3 in logical order
4. **Add alt text to images** - Describe the content or purpose
5. **Label form inputs properly** - Use `<label>` elements with `for` attributes
6. **Validate your HTML** - Use W3C validator to catch errors
7. **Test with screen readers** - Ensure your content is accessible

## Quick Reference

| Element | Purpose | Example |
|---------|---------|---------|
| `<header>` | Page/section header | Site header, article header |
| `<nav>` | Navigation links | Main menu, breadcrumbs |
| `<main>` | Primary content | Main page content |
| `<article>` | Standalone content | Blog post, news article |
| `<section>` | Thematic grouping | Chapters, topics |
| `<aside>` | Sidebar content | Related links, ads |
| `<footer>` | Page/section footer | Copyright, contact info |

Remember: Good HTML is the foundation of accessible, maintainable web applications! 🏗️
