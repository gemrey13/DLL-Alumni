---
inclusion: always
---

# Deployment — DLL Alumni Platform

## Architecture

```
Development (local)
       ↓
Vercel Preview (PR-based)
       ↓
Vercel Production (main branch)
       │
       └──→ Supabase Cloud
              ├── PostgreSQL
              ├── Auth
              ├── Realtime
              └── Storage
```

## Vercel Configuration

### Build Settings
- **Framework**: Next.js (auto-detected)
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm ci`
- **Node.js Version**: 20.x (LTS)

### Deployment Triggers
- **Production**: push/merge to `main` branch
- **Preview**: every pull request gets a unique preview URL
- **No deploy**: commits with `[skip ci]` in message

### next.config.ts
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
```

## Environment Variables

### Required Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + .env.local | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel + .env.local | Supabase anonymous key (safe for browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel + .env.local | Service role key (server-only, bypasses RLS) |
| `NEXT_PUBLIC_APP_URL` | Vercel + .env.local | Application URL (for auth redirects) |

### .env.example (committed to repo)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### .env.local (gitignored, local development)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Vercel Environment Scoping
- **Production**: real Supabase project credentials, production APP_URL
- **Preview**: same Supabase project (or staging project if available), preview URL
- **Development**: local Supabase credentials

## Supabase Configuration

### Project Setup
1. Create Supabase project at supabase.com
2. Note project URL and keys from Settings → API
3. Run migrations: `supabase db push` or apply via Supabase Dashboard SQL editor
4. Configure Auth:
   - Enable email/password provider
   - Set site URL to production domain
   - Add redirect URLs for preview environments (`https://*.vercel.app/**`)
5. Create Storage buckets: `avatars`, `event-posters`, `announcement-covers`
6. Configure storage policies per security.md
7. Enable Realtime on `notifications` table

### Auth Configuration
- **Site URL**: `https://your-production-domain.vercel.app`
- **Redirect URLs** (allow list):
  - `http://localhost:3000/**` (development)
  - `https://*.vercel.app/**` (preview deployments)
  - `https://your-production-domain.vercel.app/**` (production)

### Realtime
- Enable Realtime for `notifications` table via SQL:
  ```sql
  ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
  ```
- Realtime connections are managed client-side, no server infrastructure needed

## Vercel Platform Constraints

### DO NOT rely on:
- **Local filesystem persistence** — Vercel functions are stateless
- **In-memory server state** — instances may be recycled at any time
- **Long-running processes** — functions have execution time limits
- **Custom WebSocket servers** — use Supabase Realtime instead
- **Server-side cron jobs** — use Vercel Cron or Supabase pg_cron

### DO use:
- **Supabase** for all persistent data, auth, realtime, and file storage
- **Edge Middleware** for session refresh and route protection (runs on every request, fast)
- **Server Actions** for mutations (stateless, per-request)
- **ISR / revalidation** for cached pages that update periodically

## Production Checklist

### Pre-Deploy
- [ ] `npm run build` succeeds with no errors
- [ ] TypeScript compilation passes (`tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] All tests pass (`npm run test`)
- [ ] No `console.log` in production code
- [ ] `.env.example` is up to date
- [ ] No secrets in `.env.example` or committed code
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is NOT in any `NEXT_PUBLIC_*` variable

### Supabase Verification
- [ ] All migrations applied to production Supabase
- [ ] RLS enabled on ALL tables
- [ ] RLS policies tested with different roles
- [ ] Auth email templates configured
- [ ] Storage buckets created with correct policies
- [ ] Realtime enabled on `notifications` table
- [ ] Database indexes created for performance

### Post-Deploy Verification
- [ ] Home page loads correctly
- [ ] Registration creates user + profile
- [ ] Login works and redirects correctly
- [ ] Admin routes protected (alumni can't access)
- [ ] Alumni dashboard loads with data
- [ ] File uploads work (avatar, event poster, announcement cover)
- [ ] Real-time notifications deliver
- [ ] Logout clears session
- [ ] Password reset email sends
- [ ] Mobile responsive on real devices
- [ ] No console errors in browser

## Monitoring

### Vercel
- Function logs (Server Actions, Route Handlers)
- Build logs
- Analytics (Web Vitals)
- Error tracking (Vercel's built-in or add Sentry later)

### Supabase
- Database logs (slow queries, errors)
- Auth logs (failed logins, rate limits)
- Realtime connections (active subscriptions)
- Storage usage

## Database Migrations

### Development
```bash
# Create a new migration
supabase migration new description_of_change

# Apply migrations locally
supabase db reset

# Push to remote (production/staging)
supabase db push
```

### Production
- Migrations applied via `supabase db push` to the production project
- Or manually run SQL in Supabase Dashboard → SQL Editor
- Always backup before destructive migrations
- Test migrations on a staging project first when possible

## Domain Configuration

1. Add custom domain in Vercel project settings
2. Configure DNS records as instructed by Vercel
3. Update Supabase Auth "Site URL" to production domain
4. Update `NEXT_PUBLIC_APP_URL` in Vercel env vars
5. Verify SSL certificate is active

## Performance Targets

| Metric | Target |
|--------|--------|
| Largest Contentful Paint | < 2.5s |
| First Input Delay | < 100ms |
| Cumulative Layout Shift | < 0.1 |
| Time to First Byte | < 800ms |
| Lighthouse Performance | > 85 |
| Lighthouse Accessibility | > 90 |
| Build Time | < 120s |
