---
inclusion: always
---

# Notifications — DLL Alumni Platform

## Architecture

```
Application Event (Server Action / Database Trigger)
       ↓
Notification Service (creates DB records)
       ↓
Supabase PostgreSQL (notifications table — source of truth)
       ↓
Supabase Realtime (postgres_changes subscription)
       ↓
Connected Client (useNotifications hook)
       ↓
Notification UI (bell badge, dropdown, toast)
```

## Core Principles

1. **Database is the source of truth** — notifications always persisted to PostgreSQL first
2. **Realtime is a delivery optimization** — not the only path; if a user is offline, they get notifications on next load
3. **Reconnection sync** — when a client reconnects after a disconnect, it fetches all unread notifications from the database to catch anything missed
4. **Per-user scoping** — notifications are always scoped to a specific user via RLS

## Notification Types

| Type | Trigger | Recipients | Metadata |
|------|---------|------------|----------|
| `new_event` | Admin creates event | All active alumni | `{ event_id, event_title }` |
| `new_announcement` | Admin publishes announcement | All active alumni | `{ announcement_id, announcement_title }` |
| `job_approved` | Admin approves job posting | Job poster | `{ job_id, job_title }` |
| `job_rejected` | Admin rejects job posting | Job poster | `{ job_id, job_title, feedback }` |
| `job_matching_skills` | New approved job matches user skills | Users with matching skills | `{ job_id, job_title, matched_skills[] }` |
| `event_participation` | User joins/leaves event | Event creator (admin) | `{ event_id, event_title, user_name, action }` |
| `admin_action` | Admin modifies user account | Target user | `{ action, details }` |
| `system_announcement` | System update published | All active users | `{ update_id, title }` |
| `welcome` | New user registers | New user | `{ user_name }` |

## Notification Service

Located at `src/lib/notifications/service.ts`:

```typescript
// Single notification
async function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  body: string | null,
  metadata: Record<string, unknown>
): Promise<void>

// Broadcast to all active alumni
async function broadcastNotification(
  type: NotificationType,
  title: string,
  body: string | null,
  metadata: Record<string, unknown>,
  excludeUserId?: string
): Promise<void>

// Broadcast to users with matching skills
async function notifyMatchingSkills(
  jobId: string,
  jobTitle: string,
  categoryIds: string[]
): Promise<void>

// Convenience functions
async function notifyNewEvent(event: Event): Promise<void>
async function notifyNewAnnouncement(announcement: Announcement): Promise<void>
async function notifyJobApproved(job: Job): Promise<void>
async function notifyJobRejected(job: Job, feedback?: string): Promise<void>
async function notifyWelcome(userId: string, userName: string): Promise<void>
```

### Implementation Notes
- Uses the **admin Supabase client** (service role) to bypass RLS for bulk inserts
- For broadcasts, fetches all active alumni IDs and batch-inserts notifications
- Respects notification preferences — check `notification_preferences` before creating

## Client-Side Hook

`src/hooks/use-notifications.ts`:

```typescript
function useNotifications() {
  // State
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean

  // Actions
  markAsRead(notificationId: string): void
  markAllAsRead(): void
  
  // Lifecycle
  // - On mount: fetch initial unread notifications from DB
  // - Subscribe to Supabase Realtime (postgres_changes on notifications table, filter by user_id)
  // - On INSERT event: prepend to notifications list, increment unread count
  // - On reconnect (channel status 'SUBSCRIBED' after 'CLOSED'): refetch all unread from DB
  // - On unmount: unsubscribe from channel
}
```

### Realtime Subscription

```typescript
const channel = supabase
  .channel('user-notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      // Add new notification to state
      // Increment unread count
      // Optionally show toast
    }
  )
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      // Connected — sync with DB to catch any missed
    }
  });
```

## UI Components

### NotificationBell
- Bell icon (Lucide `Bell`)
- Unread count badge (red circle with number, max "99+")
- Clicking opens NotificationDropdown
- Placed in both alumni header and admin header

### NotificationDropdown
- Popover/dropdown anchored to bell icon
- Shows last 10 notifications
- Each item: icon (by type), title, body preview, relative time, read/unread indicator
- Click notification: mark as read + navigate to deep link
- "Mark all as read" button at top
- "View all" link to full notifications page at bottom

### NotificationsPage (`/dashboard/notifications` and `/admin/notifications`)
- Full paginated list of all notifications
- Filter by type, read/unread
- Bulk mark as read
- Each notification shows: type icon, title, body, timestamp, link
- Empty state when no notifications

## Deep Links (metadata.link)

Each notification type includes a link for navigation:

| Type | Link |
|------|------|
| `new_event` | `/dashboard/events/{event_id}` |
| `new_announcement` | `/news/{announcement_id}` |
| `job_approved` | `/dashboard/jobs/{job_id}` |
| `job_rejected` | `/dashboard/jobs/{job_id}` |
| `job_matching_skills` | `/dashboard/jobs/{job_id}` |
| `event_participation` | `/admin/events` |
| `admin_action` | `/dashboard/settings` |
| `system_announcement` | `/dashboard` |
| `welcome` | `/dashboard/settings` |

## Notification Preferences

Users can toggle notification types on/off in settings:
- Event notifications (new events created)
- Announcement notifications (new announcements published)
- Job notifications (job status changes, skill matches)
- System notifications (admin actions, system updates, welcome)

Preferences stored in `notification_preferences` table. The notification service checks preferences before creating notifications for each user.

## Performance Considerations

- Broadcast notifications (new event, new announcement) create many rows — use batch insert
- For large user bases, consider chunked inserts (e.g., 100 at a time)
- Index on `notifications(user_id, read, created_at DESC)` for efficient queries
- Client only subscribes to own notifications via Realtime filter
- Pagination on notifications page to avoid loading all at once
- Consider cleanup: archive or delete notifications older than 90 days (future optimization)
