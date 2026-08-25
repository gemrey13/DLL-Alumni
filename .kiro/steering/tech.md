---
inclusion: always
---

# Technology Stack — DLL Alumni Platform

## Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x (latest stable) | Full-stack React framework with App Router |
| React | 19.x (latest supported by Next.js 15) | UI library |
| TypeScript | 5.x (latest) | Type safety |
| Tailwind CSS | 4.x (latest) | Utility-first CSS |

## Backend & Data

| Technology | Purpose |
|-----------|---------|
| Supabase | Backend-as-a-Service (PostgreSQL, Auth, Realtime, Storage) |
| @supabase/supabase-js | Supabase JavaScript client |
| @supabase/ssr | Server-side Supabase integration for Next.js |

## UI Components & Libraries

| Technology | Purpose |
|-----------|---------|
| shadcn/ui | Component system (built on Radix UI primitives) |
| Radix UI | Accessible headless UI primitives (via shadcn/ui) |
| Lucide React | Icon library |
| Recharts | Charting library for analytics dashboard |
| class-variance-authority (cva) | Component variant management (via shadcn/ui) |
| clsx + tailwind-merge | Class name utilities (via shadcn/ui cn helper) |

## Forms & Validation

| Technology | Purpose |
|-----------|---------|
| React Hook Form | Form state management |
| @hookform/resolvers | Resolver integration (Zod) |
| Zod | Schema validation (forms + server-side) |

## Typography

| Font | Usage |
|------|-------|
| Satoshi | Primary font (loaded via next/font/local if available) |
| Inter | Fallback web-safe font (via next/font/google) |

## Development & Quality

| Technology | Purpose |
|-----------|---------|
| ESLint | Code linting (Next.js config) |
| Prettier | Code formatting |
| Vitest | Unit and integration testing |
| @testing-library/react | Component testing |
| @testing-library/jest-dom | DOM assertion matchers |

## Deployment

| Technology | Purpose |
|-----------|---------|
| Vercel | Next.js hosting and deployment |
| Supabase Cloud | Managed PostgreSQL, Auth, Realtime, Storage |

## Package Manager

- **npm** (default with Next.js)

## Version Policy

- Use latest stable versions at time of project initialization
- Pin exact versions in package.json (no ^ or ~ ranges for production dependencies)
- Keep dependencies updated via regular maintenance cycles

## Not Using

- No Express.js or separate backend server
- No Redux, Zustand, or global state library (unnecessary with Server Components)
- No Prisma or Drizzle (Supabase client handles DB access directly)
- No DaisyUI (replaced by shadcn/ui)
- No Axios (use native fetch via Supabase client)
- No JWT manual handling (Supabase Auth manages sessions)
