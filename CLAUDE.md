# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal technical blog system** built with:
- **Next.js 15** (App Router) + TypeScript + React 19
- **shadcn/ui** + Tailwind CSS for UI
- **Markdown files** as the content/database layer (no traditional database)
- **Vercel** for deployment

Key characteristics:
- Public blog (no authentication required for readers)
- Articles are managed via Markdown files in `content/posts/` with frontmatter metadata
- Content is added/updated through Git commits (no online editor)
- Static Site Generation (SSG) for optimal performance
- File-based CMS with version control

## Architecture

### Data Flow
1. **Markdown files** (`content/posts/*.md`) contain articles with YAML frontmatter
2. **lib/posts.ts** reads and parses Markdown files at build time
3. **lib/markdown.ts** converts Markdown to HTML with syntax highlighting
4. **Next.js SSG** pre-renders all pages at build time
5. **Vercel** auto-deploys on Git push to `main` branch

### Key Architectural Decisions
- **Server Components by default**: Only use `"use client"` when necessary (forms, interactive UI, browser APIs)
- **File-based routing**: `app/` directory follows Next.js App Router conventions
- **Component composition**: Small, single-responsibility components in `components/`
- **Business logic in lib/**: Data fetching and processing logic separated from UI

### Directory Structure
```
microblog/
├── app/              # Next.js App Router (pages, layouts)
├── components/       # React components (organized by domain: Post/, Tag/, Layout/)
├── lib/              # Business logic (posts.ts, markdown.ts, tags.ts, search.ts)
├── content/posts/    # Markdown articles (the "database")
├── public/           # Static assets (images, icons)
├── types/            # TypeScript type definitions
└── docs/             # Comprehensive documentation
```

## Development Commands

### Setup
```bash
# Install dependencies (requires pnpm 8.x+, Node.js 20.x+)
pnpm install

# Create environment variables file
cp .env.example .env.local
# Edit .env.local with: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SITE_NAME
```

### Development
```bash
# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server locally
pnpm start

# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint
pnpm lint --fix
```

### Adding shadcn/ui components
```bash
pnpm dlx shadcn-ui@latest add <component-name>
# Example: pnpm dlx shadcn-ui@latest add button
```

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `PostCard.tsx` |
| Pages (App Router) | lowercase | `page.tsx`, `layout.tsx` |
| Utilities/Logic | camelCase | `posts.ts`, `utils.ts` |
| Type definitions | camelCase (file), PascalCase (interface) | `post.ts` → `interface Post` |
| Markdown articles | kebab-case | `my-first-post.md` |
| Images/static files | kebab-case | `hero-image.jpg` |

## Adding a New Blog Post

1. Create a Markdown file in `content/posts/`
2. Add required frontmatter:
```yaml
---
title: "Article Title"
date: "2025-10-16"
tags: ["Next.js", "TypeScript"]
description: "Article summary (for SEO)"
draft: false
---
```
3. Write content in Markdown (supports GFM, syntax highlighting)
4. Commit and push to `main` → Vercel auto-deploys

## Component Development

### Component Structure Template
```typescript
// 1. Imports (React → external libs → internal components → utils → types)
import { FC } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Post } from '@/types';

// 2. Props interface
interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
  className?: string;
}

// 3. Component (use FC<Props> for type safety)
export const PostCard: FC<PostCardProps> = ({
  post,
  variant = 'default',
  className,
}) => {
  if (!post) return null; // Early return for edge cases

  return (
    <Card className={cn('post-card', className)}>
      {/* JSX */}
    </Card>
  );
};
```

### Server vs Client Components
- **Server Components** (default): Data fetching, static content, SEO-critical pages
- **Client Components** (`"use client"`): Interactive UI, forms, useState/useEffect, browser APIs

## Path Aliases

Use `@/` for absolute imports (configured in `tsconfig.json`):
```typescript
// ✅ Preferred
import { PostCard } from '@/components/Post/PostCard';

// ❌ Avoid
import { PostCard } from '../../../components/Post/PostCard';
```

## API Functions (lib/ directory)

Key functions available:
- `getAllPosts(options?)` - Get all published posts
- `getPostBySlug(slug)` - Get single post by slug
- `getPostsByTag(tag)` - Filter posts by tag
- `markdownToHtml(markdown)` - Convert Markdown to HTML
- `getAllTags()` - Get all tags with post counts
- `searchPosts(query, options?)` - Client-side search

See `docs/api-reference.md` for complete function signatures and usage.

## Deployment

- **Target**: Vercel
- **Trigger**: Push to `main` branch
- **Build**: Automatic via Vercel + GitHub integration
- **Environment Variables**: Set in Vercel Dashboard (Settings → Environment Variables)

To deploy:
```bash
git add .
git commit -m "feat: add new post about Next.js"
git push origin main
# Vercel automatically builds and deploys
```

## Important Files

- **`docs/requirements.md`** - Full project requirements and tech stack
- **`docs/project-structure.md`** - Detailed directory structure and file organization
- **`docs/component-guidelines.md`** - Component design principles and patterns
- **`docs/api-reference.md`** - Complete API documentation for lib/ functions
- **`docs/development-guide.md`** - Setup, coding standards, troubleshooting
- **`docs/deployment.md`** - Deployment process and operations

## Markdown Frontmatter Schema

Required fields:
```yaml
title: string       # Article title
date: string        # Publication date (YYYY-MM-DD)
tags: string[]      # Array of tags
description: string # SEO description
draft: boolean      # If true, excluded from production build
```

Optional fields:
```yaml
updated: string     # Last updated date
image: string       # Cover image path (/images/posts/xxx.jpg)
author: string      # Author name
```

## Code Style

- **TypeScript strict mode**: All code must be type-safe
- **No `any` types**: Use proper type definitions or `unknown`
- **Server Components first**: Only add `"use client"` when required
- **Single responsibility**: Each component/function does one thing
- **Semantic HTML**: Use `<article>`, `<nav>`, `<main>`, etc.
- **Accessibility**: Include ARIA labels, keyboard navigation

## Project Status

**Current Phase**: Planning complete, implementation not started yet.

When beginning implementation, follow this order:
1. Next.js 15 project setup
2. Configure TypeScript, Tailwind CSS, shadcn/ui
3. Create directory structure (app/, components/, lib/, content/posts/)
4. Implement core functions in lib/ (posts.ts, markdown.ts)
5. Build components (Layout, PostCard, PostList)
6. Create pages (home, post detail, tags)
7. Deploy to Vercel

## Notes for AI Development

- Refer to `docs/` extensively - comprehensive documentation exists for all aspects
- Follow established patterns in `docs/component-guidelines.md` when creating components
- Use API functions from `docs/api-reference.md` rather than reimplementing
- Maintain consistency with naming conventions and directory structure
- No database migrations needed - just add/edit Markdown files in `content/posts/`
