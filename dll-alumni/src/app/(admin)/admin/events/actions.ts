"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/server";
import { logAuditAction } from "@/lib/audit";
import { broadcastNotification } from "@/lib/notifications/service";
import { NOTIFICATION_TYPES } from "@/lib/notifications/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResponse } from "@/types";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  location: z.string().min(1, "Location is required").max(255),
  description: z.string().min(1, "Description is required"),
  organizer: z.string().min(1, "Organizer is required").max(255),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  poster_image_url: z.string().optional(),
});

export async function createEvent(formData: FormData): Promise<ActionResponse> {
  const user = await requireAdmin();
  const raw = {
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    organizer: formData.get("organizer") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
    poster_image_url: (formData.get("poster_image_url") as string) || undefined,
  };

  const parsed = eventSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Invalid event data" };
  }

  const supabase = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: event, error } = await (supabase.from("events") as any)
    .insert(parsed.data)
    .select("id, title")
    .single();

  if (error) return { success: false, error: error.message };

  const eventData = event as { id: string; title: string };

  // Notify all alumni
  await broadcastNotification(
    NOTIFICATION_TYPES.NEW_EVENT,
    "New Event",
    `A new event "${eventData.title}" has been posted.`,
    { event_id: eventData.id, event_title: eventData.title, link: `/dashboard/events/${eventData.id}` }
  );

  await logAuditAction({
    actorId: user.id,
    action: "create",
    entityType: "event",
    entityId: eventData.id,
    metadata: { title: eventData.title },
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { success: true };
}

export async function deleteEvent(id: string): Promise<ActionResponse> {
  const user = await requireAdmin();
  const supabase = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("events") as any).delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  await logAuditAction({ actorId: user.id, action: "delete", entityType: "event", entityId: id });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { success: true };
}
