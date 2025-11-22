# Flashcard Repository

## Overview

Flashcard is a Next.js web application bootstrapped with `create-next-app`. It's a modern TypeScript-based project using React 19 and the latest Next.js framework.

## Tech Stack

- **Framework**: Next.js 16.0.3
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **Linting**: ESLint 9

## Project Structure

```
flashcard/
├── app/
│   ├── api/
│   │   └── flashcards/
│   │       ├── route.ts                    # API endpoints for CRUD operations
│   │       └── __tests__/
│   │           └── route.test.ts           # API route tests
│   ├── components/
│   │   └── FlashcardComponent.tsx          # Reusable flashcard display with flip animation
│   ├── data/
│   │   ├── flashcards.ts                   # TypeScript interface and types
│   │   └── flashcards.json                 # Legacy JSON data (kept for reference)
│   ├── hooks/
│   │   └── useFlashcards.ts                # Custom hook for flashcard data management
│   ├── lib/
│   │   └── db.ts                           # Database functions (Vercel Postgres)
│   ├── admin/
│   │   └── page.tsx                        # Admin panel for managing flashcards
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                            # Home page with flashcard viewer
├── public/                                  # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── scripts/
│   └── seed-db.ts                          # Database seeding script
├── jest.config.js                          # Jest configuration
├── jest.setup.js                           # Jest setup file
├── .zencoder/                              # Zencoder configuration
├── .idea/                                  # IDE configuration
├── package.json                            # Project dependencies and scripts
├── tsconfig.json                           # TypeScript configuration
├── next.config.ts                          # Next.js configuration
├── postcss.config.mjs                      # PostCSS configuration
├── eslint.config.mjs                       # ESLint configuration
├── SETUP.md                                # Vercel Postgres setup guide
└── README.md                               # Project documentation
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The page auto-updates as you edit files.

### Production

Build and start the production server:

```bash
npm run build
npm start
```

## Available Scripts

- **`npm run dev`** - Start the development server with hot reload
- **`npm run build`** - Build the application for production
- **`npm start`** - Start the production server
- **`npm run lint`** - Run ESLint to check code quality
- **`npm test`** - Run Jest tests
- **`npm test:watch`** - Run Jest in watch mode

## Dependencies

### Production
- `next` - React framework for production
- `react` - UI library
- `react-dom` - React DOM bindings

### Development
- `@tailwindcss/postcss` - Tailwind CSS PostCSS plugin
- `@types/node` - TypeScript types for Node.js
- `@types/react` - TypeScript types for React
- `@types/react-dom` - TypeScript types for React DOM
- `eslint` - JavaScript linter
- `eslint-config-next` - ESLint configuration for Next.js
- `tailwindcss` - Utility-first CSS framework
- `typescript` - TypeScript compiler

## Configuration Files

- **tsconfig.json** - TypeScript compiler options with path aliases (`@/*` maps to root)
- **next.config.ts** - Next.js configuration
- **postcss.config.mjs** - PostCSS configuration for Tailwind CSS
- **eslint.config.mjs** - ESLint rules and configuration

## Features

### Flashcard Viewer
- Interactive 3D flip animation on click
- Navigate between cards with Previous/Next buttons
- Jump to specific cards using numbered buttons
- Progress indicator showing current card position
- Questions displayed on front (blue), answers on back (green)
- New cards always show the question first

### Admin Panel
- **Create**: Add new flashcards with question and answer
- **Read**: View all flashcards in a scrollable list
- **Update**: Edit existing flashcards
- **Delete**: Remove flashcards from the deck
- Changes are persisted to `app/data/flashcards.json`
- Accessible from `/admin` with link in home page footer

### Technical Features
- Server-side rendering with Next.js
- TypeScript support with strict mode
- Tailwind CSS for styling
- Dark mode support (using dark class utilities)
- RESTful API routes for data management
- **Vercel Postgres** for persistent data storage (free tier available)
- Custom `useFlashcards` hook for client-side state management
- Jest testing framework with 12+ tests
- ESLint for code quality
- Database seeding script for initial setup

## API Endpoints

- **GET** `/api/flashcards` - Fetch all flashcards
- **POST** `/api/flashcards` - Create a new flashcard
- **PUT** `/api/flashcards` - Update a flashcard
- **DELETE** `/api/flashcards` - Delete a flashcard

## Pages

- **`/`** - Home page with flashcard viewer and navigation
- **`/admin`** - Admin panel for managing flashcards

## Database

This project uses **Vercel Postgres** for persistent data storage, which works seamlessly with Vercel deployments.

### Setup

1. Create a Vercel Postgres database in your Vercel project
2. Set `POSTGRES_PRISMA_URL` environment variable (auto-configured by Vercel)
3. Run `npm run db:seed` to initialize the database with sample flashcards
4. For detailed setup instructions, see [SETUP.md](./SETUP.md)

### Database Layer

Located in `app/lib/db.ts`, provides functions for:
- Creating, reading, updating, and deleting flashcards
- Database initialization and table creation
- Full error handling and type safety

## Testing

Run all tests:
```bash
npm test
```

Watch mode:
```bash
npm test:watch
```

Test coverage includes:
- API endpoint tests (GET, POST, PUT, DELETE)
- Input validation
- Error handling
- Database integration (mocked)

## Hosting on Vercel

Flashcard is optimized for deployment on **Vercel**, the platform created by the makers of Next.js.

### Deployment Steps

1. **Push your repository to GitHub** (or GitLab/Bitbucket)
   - Vercel integrates directly with Git providers

2. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel automatically detects Next.js and applies optimized settings

3. **Configure environment variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `POSTGRES_PRISMA_URL` for Vercel Postgres (see Database section)
   - Vercel auto-populates this when you create a Postgres database in your project

4. **Deploy**
   - Click "Deploy" - Vercel automatically builds and deploys your app
   - Each push to your main branch triggers an automatic deployment

### Setting Up Vercel Postgres

1. In your Vercel project dashboard, click **"Storage"** tab
2. Click **"Create New"** → **"Postgres"**
3. Vercel automatically sets the `POSTGRES_PRISMA_URL` environment variable
4. Run migrations/seeding from the "Connect" modal in Vercel Dashboard

### Environment Variables

In Vercel Dashboard, set the following for production:

- `POSTGRES_PRISMA_URL` - Automatically set when creating Vercel Postgres
- Other environment-specific variables as needed

Development environment variables are configured in `.env.local` (not committed to git).

### Custom Domain

1. Go to project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. HTTPS is automatically provided via Let's Encrypt

### Monitoring and Logs

- **Real-time logs**: View deployment logs in Vercel Dashboard
- **Performance**: Check Analytics tab for Core Web Vitals and performance metrics
- **Error tracking**: Failed deployments show detailed error messages
- **Function logs**: Server-side logs visible in project Dashboard

### CI/CD with Vercel

- **Preview deployments**: Automatic preview URLs for pull requests
- **Production deployments**: Triggered on merges to main branch
- **Automatic rollbacks**: Easy version history and instant rollback capability
- **Git integration**: Deployment status checks in GitHub/GitLab

### Cost

- **Free tier**: Includes bandwidth, deployments, and custom domains (sufficient for most projects)
- **Vercel Postgres**: Free tier with 144 hours/month compute time and 1GB storage
- See [Vercel pricing](https://vercel.com/pricing) for more details

## Learn More

For more information about Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)
