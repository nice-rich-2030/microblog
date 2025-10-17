# Microblog - Personal Technical Blog

A modern, fast, and elegant personal technical blog built with Next.js 15, TypeScript, and Markdown.

## 🌐 Live Demo

**Production URL**: [https://microblog-tau.vercel.app/](https://microblog-tau.vercel.app/)

**GitHub Repository**: [https://github.com/nice-rich-2030/microblog](https://github.com/nice-rich-2030/microblog)

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Content**: Markdown files with frontmatter
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Features

- ✅ Markdown-based blog posts
- ✅ Static Site Generation (SSG)
- ✅ Syntax highlighting for code blocks
- ✅ Tag-based post filtering
- ✅ Full-text search
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Dark mode ready

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd microblog
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Tech Blog
```

4. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Adding a Blog Post

1. Create a new Markdown file in `content/posts/`:
```bash
touch content/posts/my-new-post.md
```

2. Add frontmatter and content:
```markdown
---
title: "My New Post"
date: "2025-10-16"
tags: ["Next.js", "TypeScript"]
description: "A brief description of the post"
draft: false
---

## Introduction

Your content here...
```

3. Commit and push:
```bash
git add content/posts/my-new-post.md
git commit -m "feat: add new blog post"
git push origin main
```

Vercel will automatically deploy your changes.

## 🏗️ Project Structure

```
microblog/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── Layout/      # Layout components
│   ├── Post/        # Post-related components
│   └── Tag/         # Tag-related components
├── lib/             # Utility functions
├── types/           # TypeScript type definitions
├── content/         # Markdown blog posts
│   └── posts/
├── public/          # Static assets
└── docs/            # Documentation
```

## 🧪 Development

### Available Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint

# Add shadcn/ui component
pnpm dlx shadcn-ui@latest add <component-name>
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Requirements](docs/requirements.md) - Project requirements and specifications
- [Project Structure](docs/project-structure.md) - Directory structure and file organization
- [Development Guide](docs/development-guide.md) - Setup, coding standards, and workflows
- [Component Guidelines](docs/component-guidelines.md) - Component design principles
- [API Reference](docs/api-reference.md) - Internal API documentation
- [Deployment Guide](docs/deployment.md) - Deployment process and operations
- [Tasks](docs/tasks.md) - Implementation task list
- [Development Log](docs/development-log.md) - Development history and decisions

## 🚀 Deployment

### Current Deployment Status

✅ **Deployed on Vercel**
- **Production URL**: https://microblog-tau.vercel.app/
- **Build Status**: ✅ Passing
- **Framework**: Next.js 15.5.5
- **Node Version**: 20.x
- **Package Manager**: pnpm 10.18.3

### Environment Variables (Production)

Required environment variables configured on Vercel:
```env
NEXT_PUBLIC_SITE_URL=https://microblog-bub6sxb3f-nice-and-rich-2030s-projects.vercel.app
NEXT_PUBLIC_SITE_NAME=My Tech Blog
```

### Deploy to Vercel (New Setup)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Configure environment variables:
   - `NEXT_PUBLIC_SITE_URL`: Your production URL
   - `NEXT_PUBLIC_SITE_NAME`: Your blog name
4. Deploy!

Vercel will automatically:
- Build your project with `pnpm build`
- Generate static pages (SSG)
- Deploy to the edge network
- Set up automatic deployments for future pushes

### Continuous Deployment

Every push to the `main` branch triggers an automatic deployment:
1. GitHub webhook notifies Vercel
2. Vercel pulls the latest code
3. Runs `pnpm install` and `pnpm build`
4. Deploys to production (2-5 minutes)

See [docs/deployment.md](docs/deployment.md) for detailed deployment guide.

## 📄 License

[MIT License](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please read the development guide in `docs/` before submitting a pull request.

## 📧 Contact

- Website: [Your website]
- Email: [Your email]
- GitHub: [@yourusername](https://github.com/yourusername)

---

Built with ❤️ using Next.js 15
