---
inclusion: always
---

# Security — DLL Alumni Platform

## Authentication

### Provider
- **Supabase Auth** handles all authentication
- Email/password authentication
- No social OAuth providers initially (can be added later)

### Flows
- **Registration**: email + password + user metadata (first_name, last_name)
- **Login**: email + password → session cookie set via `@supabase/ssr`
- **Logout**: Server Action calls `supabase.auth.signOut()`, clears cookies, redirects to home
- **Password Reset**: forgot password → email link → reset password page
- **Session Refresh**: middleware refreshes session on every request via `@supabase/ssr`

### Session Management
- Sessions managed via HTTP-only cookies (set by `@supabase/ssr`)
- No localStorage token storage (unlike the old system)
- Session refresh happens automatically in middleware
- Expired sessions redirect to login

## Authorization

### Layers

1. **Middleware** (first layer — route-level)
   - `/admin/*` → requires authenticated user with `role = 'admin'`
   - `/dashboard/*` → requires authenticated user (any role)
   - Public routes → no restriction

2. **Server Actions** (second layer — action-level)
   - Every Server Action that performs admin operations MUST verify:
     ```typescript
     const user = await getCurrentUser();
     if (!user || user.role !== 'admin') {
       return { success: false, error: 'Unauthorized' };
     }
     ```
   - Every Server Action that modifies user data MUST verify ownership:
     ```typescript
     if (resource.user_id !== user.id) {
       return { success: false, error: 'Forbidden' };
     }
     ```

3. **Row Level Security** (third layer — database-level)
   - RLS is the final defense — even if application logic has bugs, RLS prevents unauthorized access
   - Every table has RLS enabled
   - Policies enforce: users can only access their own data, admins can access all, public data is readable by anon

### Role Checking Pattern

```typescript
// src/lib/supabase/server.ts helper
export async function getCurrentUser() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, first_name, last_name, status')
    .eq('id', user.id)
    .single();

  return profile;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.status === 'inactive') redirect('/account-inactive');
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'admin') redirect('/dashboard');
  return user;
}
```

## Never Trust Client

- **Never trust client-provided user IDs** — always use `auth.uid()` from the session
- **Never trust client-provided roles** — always check from the database
- **Never trust client-provided ownership** — verify server-side
- **Never trust client-provided admin status** — verify from profiles table
- **Never accept raw user input without validation** — always validate with Zod

## Supabase Keys

| Key | Usage | Exposure |
|-----|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Safe for browser |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anonymous/public key | Safe for browser (RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | Bypasses RLS | **SERVER ONLY — never expose to client** |

### Service Role Key Rules
- Only used in `src/lib/supabase/admin.ts`
- Only imported in Server Actions or Route Handlers
- Never imported in Client Components or files with `"use client"`
- Used for: bulk notification creation, admin operations that bypass RLS for performance

## Input Validation

### Strategy
- **All form inputs validated server-side with Zod** before database operations
- Client-side validation is for UX only — not a security boundary
- Validate in Server Actions before any database call

### Validation Rules
- **Strings**: trim whitespace, enforce max lengths, reject empty where required
- **Numbers**: enforce min/max ranges (salary > 0, satisfaction 1-5, experience 1-3)
- **Emails**: Zod email() validator
- **URLs**: Zod url() validator for account links
- **Dates**: valid date format, reasonable ranges
- **Enums**: validate against allowed values only
- **Files**: validated by type and size before upload

## File Upload Security

### Validation
- **Allowed types**: `image/jpeg`, `image/png`, `image/webp`
- **Max size**: 5MB per file
- **Filename sanitization**: strip special characters, generate UUID-based names

### Storage Policies (Supabase Storage)
```
avatars/
  - INSERT: auth.uid() must match folder path (users upload to own folder)
  - SELECT: public (anyone can view avatars)
  - DELETE: auth.uid() must match folder path

event-posters/
  - INSERT: user must be admin
  - SELECT: public
  - DELETE: user must be admin

announcement-covers/
  - INSERT: user must be admin
  - SELECT: public
  - DELETE: user must be admin
```

### Upload Flow
1. Client validates file type/size (UX only)
2. Client sends file to Server Action
3. Server Action validates type/size again
4. Server Action uploads to Supabase Storage
5. Returns public URL on success

## XSS Prevention

- React automatically escapes rendered content
- Never use `dangerouslySetInnerHTML` with user-provided content
- If rendering markdown/rich text from user input, use a sanitization library
- Content Security Policy headers configured in `next.config.ts`

## IDOR Prevention

- All data access filtered by `auth.uid()` via RLS
- Server Actions verify ownership before mutations
- Alumni directory shows limited fields — sensitive data (contact info, address) only visible to admins
- Notification access scoped to `user_id = auth.uid()`

## Rate Limiting

- Supabase Auth has built-in rate limiting for auth endpoints
- For custom endpoints, consider Vercel Edge Middleware rate limiting if abuse occurs
- Application-level: prevent rapid-fire job applications or event joins via unique constraints

## Audit Logging

- All admin actions logged to `audit_logs` table
- Logged actions: create/update/delete alumni, approve/reject jobs, manage events/announcements, user management
- Log format: `{ actor_id, action, entity_type, entity_id, metadata, timestamp }`
- Metadata includes relevant details (what changed, previous values if applicable)
- Audit logs are append-only (no update/delete by anyone except DB admin)

## Environment Variables

### Required (never commit actual values)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

### .env.local
- Contains actual secrets for local development
- Listed in `.gitignore` — never committed

### .env.example
- Contains variable names with placeholder descriptions
- Committed to repository as documentation

## Security Checklist (Pre-Production)

- [ ] RLS enabled on ALL tables
- [ ] Service role key not in any client-side code
- [ ] All Server Actions check authorization
- [ ] All forms validate with Zod server-side
- [ ] File uploads validate type and size
- [ ] No `dangerouslySetInnerHTML` with user content
- [ ] Audit logging active for admin actions
- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in git history
- [ ] Middleware protects admin routes
- [ ] Inactive accounts cannot access protected resources
