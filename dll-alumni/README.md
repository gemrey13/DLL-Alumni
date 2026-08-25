# DLL Alumni Platform

A modern alumni management system for **Dalubhasaan ng Lungsod ng Lucena (DLL)** built with Next.js, Supabase, and Tailwind CSS.

## Tech Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **React 19**
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4**
- **Supabase** (PostgreSQL, Auth, Realtime, Storage)
- **shadcn/ui** (base-nova) for UI components
- **Zod** for validation
- **React Hook Form** for form management
- **Recharts** for analytics charts
- **Lucide React** for icons

## Features

- **Authentication** — Email/password via Supabase Auth with cookie-based sessions
- **Alumni Tracer Survey** — Multi-step admin form for recording graduate data
- **Job Board** — Alumni post jobs (pending approval), admin moderates
- **Events** — Admin creates events, alumni can join/leave
- **Announcements** — Admin publishes news, visible publicly
- **Alumni Directory** — Browse and connect with fellow graduates
- **Real-time Notifications** — Supabase Realtime for instant delivery
- **Analytics Dashboard** — Metrics, charts, and insights
- **Audit Logging** — Track all admin actions
- **Role-based Access** — Admin and Alumni roles with middleware + RLS
- **Responsive Design** — Mobile, tablet, desktop

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Supabase project (free tier works)

### Setup

1. Clone the repository and install dependencies:

```bash
cd dll-alumni
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in your Supabase credentials in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Apply database migrations:

   Go to your Supabase Dashboard → SQL Editor and run each migration file in order from `supabase/migrations/`.

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (public)/       # Landing, news, events (no auth)
│   ├── (auth)/         # Login, register, password reset
│   ├── (alumni)/       # Dashboard, jobs, events, profile, directory
│   └── (admin)/        # Admin panel with sidebar
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── shared/         # Headers, footer, page-header, etc.
│   └── admin/          # Sidebar, metric-card, etc.
├── lib/
│   ├── supabase/       # Server/client/admin/middleware utilities
│   ├── validators/     # Zod schemas
│   └── notifications/  # Notification service
├── hooks/              # Custom React hooks (useNotifications)
└── types/              # TypeScript types
```

## Database

Migrations are in `supabase/migrations/`. Apply them in order:

1. Enums + profiles + auth trigger
2. User extension tables
3. Curricula + courses
4. Alumni tracer data
5. Job board
6. Events + announcements
7. Notifications + audit logs
8. RLS policies (all tables)
9. Indexes + Realtime

## Deployment

Deploy to Vercel:

```bash
# Push to GitHub, connect to Vercel
# Set environment variables in Vercel dashboard
# Production deploys on push to main
```

## License

Private — DLL Alumni Association
