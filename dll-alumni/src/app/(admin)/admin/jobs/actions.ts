"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/server";
import { logAuditAction } from "@/lib/audit";
import { createNotification } from "@/lib/notifications/service";
import { NOTIFICATION_TYPES } from "@/lib/notifications/types";
import { revalidatePath } from "next/cache";
import type { ActionResponse } from "@/types";

export async function approveJob(jobId: string): Promise<ActionResponse> {
  const user = await requireAdmin();
  const supabase = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: job, error } = await (supabase.from("jobs") as any)
    .update({ status: "approved" })
    .eq("id", jobId)
    .select("id, title, posted_by")
    .single();

  if (error) return { success: false, error: error.message };

  const jobData = job as { id: string; title: string; posted_by: string };

  // Notify the job poster
  await createNotification(
    jobData.posted_by,
    NOTIFICATION_TYPES.JOB_APPROVED,
    "Job Approved",
    `Your job listing "${jobData.title}" has been approved and is now visible.`,
    { job_id: jobData.id, job_title: jobData.title, link: `/dashboard/jobs/${jobData.id}` }
  );

  await logAuditAction({
    actorId: user.id,
    action: "approve",
    entityType: "job",
    entityId: jobId,
    metadata: { title: jobData.title },
  });

  revalidatePath("/admin/jobs");
  return { success: true };
}

export async function rejectJob(jobId: string, feedback?: string): Promise<ActionResponse> {
  const user = await requireAdmin();
  const supabase = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: job, error } = await (supabase.from("jobs") as any)
    .update({ status: "rejected", admin_feedback: feedback || null })
    .eq("id", jobId)
    .select("id, title, posted_by")
    .single();

  if (error) return { success: false, error: error.message };

  const jobData = job as { id: string; title: string; posted_by: string };

  await createNotification(
    jobData.posted_by,
    NOTIFICATION_TYPES.JOB_REJECTED,
    "Job Rejected",
    `Your job listing "${jobData.title}" was not approved.${feedback ? ` Feedback: ${feedback}` : ""}`,
    { job_id: jobData.id, job_title: jobData.title, feedback, link: `/dashboard/jobs/${jobData.id}` }
  );

  await logAuditAction({
    actorId: user.id,
    action: "reject",
    entityType: "job",
    entityId: jobId,
    metadata: { title: jobData.title, feedback },
  });

  revalidatePath("/admin/jobs");
  return { success: true };
}
