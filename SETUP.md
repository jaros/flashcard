# Neon Postgres Setup Guide

This project uses **Neon** (via Vercel Marketplace) as the database backend. Follow these steps to set up the database.

## 1. Create a Neon Postgres Database

### Setup via Vercel Marketplace (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create** > **Postgres** (under Marketplace)
5. Select **Neon** from the available providers
6. Click **Continue** and follow the Neon setup wizard
7. The connection string will be automatically added to your environment variables

Neon's free tier includes:
- 3 projects
- 512MB storage per project
- Automatic backups
- SSL encryption

## 2. Set Environment Variables

After creating the Neon database through Vercel, pull the environment variables locally:

```bash
vercel env pull .env.development.local
```

This automatically populates all required connection strings including:
- `POSTGRES_PRISMA_URL` - Full database connection string with SSL (used by this app)
- `DATABASE_URL` - Neon's native pooled connection string
- `DATABASE_URL_UNPOOLED` - Neon's non-pooling connection

No manual `.env.local` creation needed—`vercel env pull` handles it!

## 3. Initialize the Database

Run the seed script to create the `flashcards` table and populate it with sample data:

```bash
npm run db:seed
```

This will:
- Create the `flashcards` table with columns: `id`, `question`, `answer`, `created_at`, `updated_at`
- Insert 8 sample flashcards
- Set up auto-incrementing primary key

## 4. Verify the Setup

### Local Development
```bash
npm run dev
```
- Visit `http://localhost:3000` to view flashcards
- Visit `http://localhost:3000/admin` to manage flashcards

### Test the API
```bash
npm test
```
All 12 API tests should pass.

## Database Functions

The database layer is located in `app/lib/db.ts` and provides these functions:

```typescript
// Fetch all flashcards
getFlashcards(): Promise<Flashcard[]>

// Fetch a single flashcard by ID
getFlashcard(id: number): Promise<Flashcard | null>

// Create a new flashcard
createFlashcard(question: string, answer: string): Promise<Flashcard>

// Update an existing flashcard
updateFlashcard(id: number, question: string, answer: string): Promise<Flashcard | null>

// Delete a flashcard by ID
deleteFlashcard(id: number): Promise<boolean>

// Initialize the database (create tables)
initializeDatabase(): Promise<void>
```

## Deployment to Vercel

### Prerequisites
- Vercel Postgres database already created
- Environment variables configured in Vercel project settings

### Steps
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the `POSTGRES_PRISMA_URL` from your database
4. Deploy!

The `/api/flashcards` endpoint will automatically use the Vercel Postgres database in production.

## Troubleshooting

### "POSTGRES_PRISMA_URL is not set"
- Make sure you've created a Neon database via Vercel Marketplace
- Verify the environment variable is set in your `.env.local` (local) or Vercel project settings (production)

### Connection Timeout
- Verify your connection string is correct
- Check that your Neon database is active (visit [Neon Console](https://console.neon.tech) to verify)
- Ensure your firewall/network allows connections

### Table Doesn't Exist
- Run `npm run db:seed` to initialize the database
- This only needs to be done once

## Database Schema

```sql
CREATE TABLE flashcards (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Notes

- **No additional setup required for production**: Neon integrates seamlessly with Vercel deployments via the Marketplace
- **Free tier limits**: Neon free tier includes 512MB storage, 3 projects, and automated backups
- **Backups**: Neon provides automatic backups and point-in-time recovery
- **Connection pooling**: The `@vercel/postgres` client handles connection pooling automatically
- **Multi-account**: If you need more than 3 projects, consider upgrading your Neon plan or using a paid tier
