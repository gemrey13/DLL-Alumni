"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { NotificationType, NotificationMetadata } from "./types";

/**
 * Create a notification for a single user.
 */
export async function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  body: string | null,
  metadata: NotificationMetadata
): Promise<void> {
  const supabase = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("notifications") as any).insert({
    user_id: userId,
    type,
    title,
    body,
    metadata,
  });
}

/**
 * Broadcast a notification to all active alumni.
 */
export async function broadcastNotification(
  type: NotificationType,
  title: string,
  body: string | null,
  metadata: NotificationMetadata,
  excludeUserId?: string
): Promise<void> {
  const supabase = createAdminClient();

  // Fetch all active alumni user IDs
  let query = supabase
    .from("profiles")
    .select("id")
    .eq("status", "active")
    .eq("role", "alumni");

  if (excludeUserId) {
    query = query.neq("id", excludeUserId);
  }

  const { data: users } = await query;
  if (!users || users.length === 0) return;

  // Batch insert notifications (chunks of 100)
  const CHUNK_SIZE = 100;
  for (let i = 0; i < users.length; i += CHUNK_SIZE) {
    const chunk = users.slice(i, i + CHUNK_SIZE);
    const notifications = chunk.map((user) => ({
      user_id: (user as Record<string, unknown>).id as string,
      type,
      title,
      body,
      metadata,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("notifications") as any).insert(notifications);
  }
}
