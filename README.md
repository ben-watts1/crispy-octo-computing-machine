# NYC Hiring Startups

A curated directory of New York startups that are hiring. Built with Next.js (App Router), Prisma, Tailwind, and Supabase Postgres.

## Features
- Public gallery of companies with filters and search.
- Individual company pages with hiring status, badges, and role links.
- Listing request form with basic spam protection.
- Admin-only dashboard for approving requests and managing companies.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM
- Supabase Postgres
- NextAuth (credentials for single admin)

## Local Setup

### 1) Supabase Postgres
1. Create a Supabase project.
2. Copy the **Connection string** (URI) from the database settings.
3. Enable `pgcrypto` for UUIDs:
   ```sql
   create extension if not exists "pgcrypto";
   ```
4. Add the connection string to `.env`:
   ```bash
   DATABASE_URL="postgresql://..."
   ```

### 2) Install dependencies
```bash
npm install
```

### 3) Prisma migrations
```bash
npx prisma migrate dev
npx prisma generate
```

### 4) Seed data (optional)
```bash
npm run seed
```

### 5) Run the app
```bash
npm run dev
```

## Environment Variables
```bash
DATABASE_URL=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-password
```

## Vercel Deployment
1. Push to a Git repo.
2. Create a new Vercel project.
3. Add the environment variables above in Vercel settings.
4. Deploy.

## Admin Access
Visit `/admin/login` and sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
