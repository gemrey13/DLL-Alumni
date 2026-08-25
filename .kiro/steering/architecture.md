---
inclusion: always
---

# Architecture — DLL Alumni Platform

## Overview

Single Next.js 15 application using the App Router with Supabase as the complete backend platform. No separate Express or Django backend.

```
Next.js App Router
    │
    ├── Server Components (data fetching)
    ├── Server Actions (mutations)
    ├── Route Handlers (webhooks, callbacks)
    └── Client Components (interactivity, realtime)
           │
           ▼
        Supabase
           │
     ┌─────┼──────────┬──────────┐
     ▼     ▼          ▼          ▼
  Postgres Auth     Realtime   Storage
```

## Rendering Strategy

- **Server Components** (default): All data fetching, page rendering, and layout logic
- **Client Components**: Only when needed for interactivity (forms, realtime subscriptions, dropdowns, modals, charts)
- **Server Actions**: All data mutations (create, update, delete operations)
- **Route Handlers**: Only for auth callbacks, webhooks, or external integrations

## Supabase Client Usage

- **Server-side** (`src/lib/supabase/server.ts`): Cookie-based client for Server Components and Server Actions. Uses `@supabase/ssr` with Next.js cookie helpers.
- **Browser-side** (`src/lib/supabase/client.ts`): Browser client for Client Components, primarily for Realtime subscriptions.
- **Admin** (`src/lib/supabase/admin.ts`): Service role client for operations that bypass RLS (used only in server-side code for admin batch operations like bulk notifications).

## Route Groups

```
src/app/
  (public)/              # No auth required
    page.tsx             # Landing page
    news/                # News listing and detail
    events/              # Events listing and detail
    layout.tsx           # Public layout (dark navbar, footer)

  (auth)/                # Auth pages (redirect if already logged in)
    login/
    register/
    forgot-password/
    reset-password/
    auth/callback/       # Route handler for auth callbacks
    layout.tsx           # Auth layout (centered card on dark bg)

  (alumni)/              # Requires authenticated user (any role)
    dashboard/           # Alumni home, jobs, events, profile, directory, notifications
    layout.tsx           # Alumni layout (header with nav, light bg)

  (admin)/               # Requires admin role
    admin/               # Admin dashboard, alumni management, CRUD, analytics
    layout.tsx           # Admin layout (sidebar + header)
```

## Middleware

`src/middleware.ts` handles:
1. Supabase session refresh on every request
2. Route protection:
   - `/admin/*` → requires admin role, redirects to `/dashboard` if alumni or `/login` if unauthenticated
   - `/dashboard/*` → requires authentication, redirects to `/login` if unauthenticated
   - `/login`, `/register` → redirects to appropriate dashboard if already authenticated
3. Does NOT protect public routes (`/`, `/news/*`, `/events/*`)

## File Structure

```
src/
  app/
    (public)/
      page.tsx                    # Landing page
      news/
        page.tsx                  # News listing
        [id]/page.tsx             # News detail
      events/
        page.tsx                  # Events listing
        [id]/page.tsx             # Event detail
      layout.tsx
    (auth)/
      login/page.tsx
      register/page.tsx
      forgot-password/page.tsx
      reset-password/page.tsx
      auth/callback/route.ts      # Auth callback handler
      layout.tsx
    (alumni)/
      dashboard/
        page.tsx                  # Alumni home (recommendations)
        jobs/
          page.tsx                # Job listing
          [id]/page.tsx           # Job detail
          post/page.tsx           # Post new job
        saved-jobs/page.tsx
        applications/page.tsx
        events/
          page.tsx                # Alumni events view
          [id]/page.tsx           # Event detail with join/leave
        profile/page.tsx          # Own profile view
        directory/
          page.tsx                # Alumni directory
          [id]/page.tsx           # Other alumni profile
        settings/page.tsx         # Edit profile, preferences
        notifications/page.tsx    # Full notifications list
      layout.tsx
    (admin)/
      admin/
        page.tsx                  # Analytics dashboard
        trace-alumni/page.tsx     # Alumni table
        alumni/[id]/page.tsx      # Alumni profile detail
        survey-form/page.tsx      # Tracer survey form
        curricula/page.tsx        # Curriculum management
        courses/page.tsx          # Course management
        jobs/page.tsx             # Job moderation
        events/page.tsx           # Event management
        announcements/page.tsx    # Announcement management
        users/page.tsx            # User management
        audit-log/page.tsx        # Audit log viewer
        notifications/page.tsx    # Admin notifications
        settings/page.tsx         # Admin settings
      layout.tsx
    layout.tsx                    # Root layout
    globals.css                   # Global styles + Tailwind
  components/
    ui/                           # shadcn/ui components
    shared/                       # Cross-cutting components
      header.tsx
      footer.tsx
      notification-bell.tsx
      page-header.tsx
      empty-state.tsx
      loading-state.tsx
      error-state.tsx
      confirm-dialog.tsx
      data-table.tsx
      image-upload.tsx
    alumni/                       # Alumni-specific components
    admin/                        # Admin-specific components
      sidebar.tsx
      admin-header.tsx
      chart-card.tsx
      metric-card.tsx
  lib/
    supabase/
      server.ts                   # Server-side Supabase client
      client.ts                   # Browser-side Supabase client
      admin.ts                    # Service role client (server only)
      middleware.ts               # Middleware helper
    validators/                   # Zod schemas
      auth.ts
      alumni.ts
      jobs.ts
      events.ts
      announcements.ts
    notifications/
      service.ts                  # Notification creation functions
      types.ts                    # Notification type definitions
    storage.ts                    # File upload utilities
    audit.ts                      # Audit logging utility
    utils.ts                      # General helpers
  hooks/
    use-notifications.ts          # Realtime notification subscription
    use-user.ts                   # Current user hook
  types/
    database.ts                   # Supabase database types
    index.ts                      # Shared application types
  middleware.ts                   # Next.js middleware (root)
```

## Data Flow Patterns

### Reading Data (Server Component)
```
Page (Server Component)
  → createServerClient(cookies)
  → supabase.from('table').select()
  → RLS filters results automatically
  → Render data directly in RSC
```

### Mutating Data (Server Action)
```
Client Component (form submit)
  → Server Action
  → Validate with Zod
  → createServerClient(cookies)
  → Verify authorization (check role)
  → supabase.from('table').insert/update/delete()
  → revalidatePath() if needed
  → Return { success, data?, error? }
```

### Real-time (Client Component)
```
Client Component mounts
  → createBrowserClient()
  → supabase.channel('notifications').on('postgres_changes', ...)
  → Handle INSERT events → update local state
  → On reconnect → fetch unread from DB
  → Cleanup subscription on unmount
```

## Key Decisions

- No API routes for proxying — Server Components and Server Actions talk directly to Supabase
- No global state management library — use Server Components for data, React state for UI state, Supabase Realtime for live data
- No separate backend service — Supabase handles DB, auth, realtime, and storage
- Streaming/Suspense used for data-heavy pages (analytics dashboard, alumni table)
- `revalidatePath` / `revalidateTag` for cache invalidation after mutations
