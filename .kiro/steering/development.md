---
inclusion: always
---

# Development Conventions — DLL Alumni Platform

## TypeScript

### Strict Mode
- `strict: true` in `tsconfig.json`
- No `any` types — use proper typing or `unknown` with type narrowing
- Explicit return types on exported functions
- Use `interface` for object shapes, `type` for unions/intersections/utilities

### Type Organization
- Database types in `src/types/database.ts` (matching Supabase schema)
- Application types in `src/types/index.ts`
- Component prop types co-located with components
- Zod schemas double as runtime validators and type sources (use `z.infer<typeof schema>`)

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Files & folders | kebab-case | `survey-form.tsx`, `use-notifications.ts` |
| Components | PascalCase | `MetricCard`, `NotificationBell` |
| Functions | camelCase | `getCurrentUser`, `createNotification` |
| Variables | camelCase | `unreadCount`, `jobCategories` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `NOTIFICATION_TYPES` |
| Types/Interfaces | PascalCase | `AlumniProfile`, `JobFormData` |
| Enums | PascalCase (members too) | `UserRole.Admin`, `JobStatus.Pending` |
| Database columns | snake_case | `first_name`, `created_at` |
| CSS classes | Tailwind utilities | No custom class names unless absolutely necessary |
| Server Actions | camelCase, verb-first | `createAlumniProfile`, `approveJob` |
| Zod schemas | camelCase + Schema suffix | `loginSchema`, `alumniFormSchema` |

## Component Patterns

### Server vs Client Components
- **Server Components** (default): pages, layouts, data display components
- **Client Components** (`"use client"`): forms, interactive elements, charts, realtime subscriptions, components using hooks or browser APIs

### Component Structure
```typescript
// Component file structure
import statements (external → internal → types)

// Types (if small, otherwise separate file)
interface ComponentProps { ... }

// Component
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // hooks
  // derived state
  // handlers
  // render
}
```

### Exports
- **Named exports** for all components (except page.tsx which uses default)
- **Named exports** for utilities, hooks, types
- One component per file (co-located helpers are fine)

### Co-location
- Page-specific components live next to their page
- Shared components in `src/components/shared/` or `src/components/ui/`
- Feature-specific components in `src/components/admin/` or `src/components/alumni/`

## Server Actions

### Pattern
```typescript
"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const schema = z.object({ ... });

export async function actionName(formData: FormData) {
  // 1. Authenticate & authorize
  const user = await requireAdmin();

  // 2. Parse & validate input
  const raw = Object.fromEntries(formData);
  const result = schema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // 3. Perform operation
  const supabase = await createServerClient();
  const { error } = await supabase.from('table').insert(result.data);

  if (error) {
    return { success: false, error: error.message };
  }

  // 4. Revalidate & return
  revalidatePath('/admin/table');
  return { success: true };
}
```

### Rules
- Always validate with Zod before database operations
- Always check authorization first
- Return typed response: `{ success: boolean, data?: T, error?: string | Record<string, string[]> }`
- Use `revalidatePath` or `revalidateTag` after mutations
- Keep actions in dedicated files (e.g., `actions.ts`) co-located with the feature page

## Form Handling

### Pattern (React Hook Form + Zod)
```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({ ... });
type FormData = z.infer<typeof formSchema>;

export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { ... },
  });

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    const result = await serverAction(formData);
    // handle result
  }

  return <Form {...form}>...</Form>;
}
```

### Rules
- Client-side validation for UX (immediate feedback)
- Server-side validation is the security boundary
- Use shadcn/ui Form components with React Hook Form
- Show inline errors below fields
- Disable submit button during submission
- Show success/error toast after submission

## Data Fetching

### Server Components
```typescript
// Direct Supabase query in Server Component
export default async function Page() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <ErrorState message={error.message} />;
  if (!data?.length) return <EmptyState ... />;

  return <EventList events={data} />;
}
```

### Rules
- Fetch data in Server Components (not client-side useEffect)
- Use Suspense boundaries for streaming where beneficial
- Pass data down as props to Client Components when needed
- Only use client-side fetching for real-time updates (Supabase Realtime)

## Error Handling

### Server Actions
- Always wrap database operations in try/catch
- Return structured error responses, never throw from actions
- Log errors server-side for debugging

### Components
- Use error boundaries for unexpected errors (`error.tsx` files)
- Show user-friendly error states, not raw error messages
- Provide retry actions where appropriate

### Pattern
```typescript
try {
  const { data, error } = await supabase.from('table').select();
  if (error) throw error;
  return { success: true, data };
} catch (error) {
  console.error('Operation failed:', error);
  return { success: false, error: 'An unexpected error occurred' };
}
```

## File Organization

### Import Order
1. External packages (react, next, supabase)
2. Internal aliases (`@/lib/...`, `@/components/...`)
3. Relative imports (`./`, `../`)
4. Type imports (last, using `import type`)

### Path Aliases
```json
{
  "@/*": ["./src/*"]
}
```

All imports use `@/` prefix: `@/components/ui/button`, `@/lib/supabase/server`, `@/types/database`

## Validation Schemas

### Location
All Zod schemas in `src/lib/validators/`:
- `auth.ts` — login, register, password reset
- `alumni.ts` — tracer survey form (multi-step)
- `jobs.ts` — job posting, job filtering
- `events.ts` — event creation/editing
- `announcements.ts` — announcement creation/editing
- `profile.ts` — profile editing, preferences

### Pattern
```typescript
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

## Git Conventions

### Commits
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`
- Imperative mood: "add login page" not "added login page"
- Reference task number if applicable

### Branches
- `main` — production-ready code
- `feat/feature-name` — feature branches
- `fix/bug-description` — bug fixes
- Never force push to main

## Code Quality Rules

- No unused variables or imports
- No `console.log` in production code (use proper error logging)
- No hardcoded strings for URLs, keys, or configuration — use env vars or constants
- No inline styles — use Tailwind classes
- No `!important` in CSS
- Prefer early returns over deeply nested conditions
- Prefer const over let
- Prefer function declarations for components, arrow functions for callbacks
- Maximum file length: aim for < 300 lines (split if larger)
- One responsibility per file

## Testing Conventions

### File Location
- Tests next to source: `component.test.tsx` alongside `component.tsx`
- Or in `__tests__/` folder for integration tests

### Patterns
- Unit tests for: Zod schemas, utility functions, notification service logic
- Integration tests for: Server Actions (mock Supabase), component rendering
- Name tests descriptively: `"should reject invalid email"`, `"should redirect unauthenticated users"`

### Running
```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode for development
```
