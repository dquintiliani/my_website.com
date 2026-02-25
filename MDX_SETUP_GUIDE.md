# MDX Setup Guide

Your blog is now configured to render React components inline within markdown articles!

## What Changed

1. **Updated `next.config.mjs`** - Enabled MDX support with the `@next/mdx` plugin
2. **Added `lib/mdx-components.tsx`** - Component registry for styled markdown elements
3. **Updated `lib/articles.ts`** - Added MDX import and metadata support
4. **Updated `app/blog/[slug]/page.tsx`** - Now renders MDX with React components
5. **Created example article** - `content/articles/mdx-example.mdx` showing how to use it

## Writing MDX Articles

### File Format

Save article files as `.mdx` in `content/articles/`:
- Filename becomes the slug (e.g., `my-article.mdx` → `/blog/my-article`)
- Include frontmatter with metadata at the top

### Basic Structure

```mdx
---
title: "Your Article Title"
date: "2024-01-15"
excerpt: "Brief description of the article"
tags: ["tag1", "tag2"]
readTime: 5
slug: "article-slug"
---

# Your Markdown Content

This is regular markdown that will be rendered normally.

## Using React Components

Export components at the top of the file:

export const MyButton = () => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Click me!
  </button>
)

Then use them anywhere in your article:

<MyButton />
```

## Built-in Styled Components

The MDX system automatically styles these markdown elements:
- Headings: `# H1`, `## H2`, `### H3`, `#### H4`
- Lists: `- bullet` and `1. numbered`
- Code: `` `inline` `` and ` ``` code blocks ` ```
- Blockquotes: `> quoted text`
- Tables: Standard markdown tables
- Links: `[text](url)`

## Custom Components

### Define in Your Article

```mdx
export const Card = ({ title, children }) => (
  <div className="bg-white border rounded-lg p-4 shadow">
    <h3 className="font-bold mb-2">{title}</h3>
    <p>{children}</p>
  </div>
)

<Card title="Hello">This is a reusable card component!</Card>
```

### Import from Your Codebase

```mdx
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

<Alert>
  <Button>Click me</Button>
</Alert>
```

## State and Interactivity

Components can be fully interactive with React hooks:

```mdx
export const Counter = () => {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

<Counter />
```

## Adding Global Components

To make components available in all MDX files without importing:

1. Add the component export to `lib/mdx-components.tsx`
2. Update the `mdxComponents` object

```typescript
// lib/mdx-components.tsx
export const mdxComponents: MDXComponents = {
  // ... existing components
  MyGlobalComponent: () => <div>Available everywhere!</div>,
}
```

## Styling Components

Use Tailwind CSS classes in your inline components:

```mdx
export const Highlight = ({ children, color = 'yellow' }) => (
  <span className={`bg-${color}-200 px-2 py-1 rounded`}>
    {children}
  </span>
)

This is <Highlight color="blue">highlighted text</Highlight>.
```

## Example Use Cases

1. **Interactive Demos** - Showcase your products/libraries in action
2. **Calculators/Tools** - Embed functional tools in articles
3. **Before/After Comparisons** - Toggle between views
4. **Code Sandboxes** - Embed live code editors
5. **Surveys/Polls** - Collect reader feedback
6. **Custom Visualizations** - Charts, timelines, diagrams
7. **Embedded Media** - Videos, audio, iframes

## Testing Your Setup

1. Look at `/blog/mdx-example` to see the example article
2. Edit `content/articles/mdx-example.mdx` to experiment
3. Create new `.mdx` files in `content/articles/`
4. Your new articles will appear in the blog with full MDX support

## Troubleshooting

**Components not appearing?**
- Ensure files use `.mdx` extension (not `.md`)
- Check that components are exported with `export const ComponentName = ...`
- Verify the file is in `content/articles/`

**Styling not applying?**
- Make sure Tailwind CSS classes are correct
- Check that `globals.css` includes Tailwind imports
- Use dark mode classes like `dark:bg-gray-900` for theme support

**TypeScript errors?**
- Components should be exported as constants: `export const Component = () => {}`
- Import React if using JSX: not needed in MDX files (already available)

## Next Steps

1. Modify `mdx-example.mdx` to learn MDX syntax
2. Create your first article with custom React components
3. Customize the styled components in `lib/mdx-components.tsx`
4. Import and use your own components from `lib/` or `components/`

Happy writing! 🎉
