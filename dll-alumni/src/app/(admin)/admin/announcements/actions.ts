"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/server";
import { logAuditAction } from "@/lib/audit";
import { broadcastNotification } from "@/lib/notifications/service";
import { NOTIFICATION_TYPES } from "@/lib/notifications/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResponse } from "@/types";

const announcementSchema = z.object({
  title: z.string().min(1).max(255),
  summary: z.string().min(1).max(500),
  content: z.string().min(1),
  status: z.enum(["draft", "published"]),
  cover_image_url: z.string().optional(),
});

export async function createAnnouncement(formData: FormData): Promise<ActionResponse> {
  const user = await requireAdmin();
  const raw = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    content: formData.get("content") as string,
    status: formData.get("status") as string,
    cover_image_url: (formData.get("cover_image_url") as string) || undefined,
  };

  const parsed = announcementSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: "Invalid data" };

  const supabase = createAdminClient();
  const insertData: Record<string, unknown> = {
    ...parsed.data,
    published_at: parsed.data.status === "published" ? new Date().toISOString() : null,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("announcements") as any)
    .insert(insertData)
    .select("id, title, status")
    .single();

  if (error) return { success: false, error: error.message };

  const ann = data as { id: string; title: string; status: string };

  // Notify alumni if published
  if (ann.status === "published") {
    await broadcastNotification(
      NOTIFICATION_TYPES.NEW_ANNOUNCEMENT,
      "New Announcement",
      `"${ann.title}" has been published.`,
      { announcement_id: ann.id, announcement_title: ann.title, link: `/news/${ann.id}` }
    );
  }

  await logAuditAction({
    actorId: user.id,
    action: "create",
    entityType: "announcement",
    entityId: ann.id,
    metadata: { title: ann.title, status: ann.status },
  });

  revalidatePath("/admin/announcements");
  revalidatePath("/news");
  return { success: true };
}

export async function deleteAnnouncement(id: string): Promise<ActionResponse> {
  const user = await requireAdmin();
  const supabase = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("announcements") as any).delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  await logAuditAction({ actorId: user.id, action: "delete", entityType: "announcement", entityId: id });
  revalidatePath("/admin/announcements");
  revalidatePath("/news");
  return { success: true };
}
