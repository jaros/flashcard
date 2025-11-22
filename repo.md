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
│   │       └── route.ts     # API endpoints for CRUD operations
│   ├── components/
│   │   └── FlashcardComponent.tsx  # Reusable flashcard display with flip animation
│   ├── data/
│   │   ├── flashcards.ts   # TypeScript interface and types
│   │   └── flashcards.json # Persistent storage for flashcard data
│   ├── hooks/
│   │   └── useFlashcards.ts # Custom hook for flashcard data management
│   ├── admin/
│   │   └── page.tsx        # Admin panel for managing flashcards
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Home page with flashcard viewer
├── public/                  # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .zencoder/              # Zencoder configuration
├── .idea/                  # IDE configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── eslint.config.mjs       # ESLint configuration
└── README.md               # Original Next.js README
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

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
- File-based persistence (JSON)
- Custom `useFlashcards` hook for state management
- ESLint for code quality

## API Endpoints

- **GET** `/api/flashcards` - Fetch all flashcards
- **POST** `/api/flashcards` - Create a new flashcard
- **PUT** `/api/flashcards` - Update a flashcard
- **DELETE** `/api/flashcards` - Delete a flashcard

## Pages

- **`/`** - Home page with flashcard viewer and navigation
- **`/admin`** - Admin panel for managing flashcards
