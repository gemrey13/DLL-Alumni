"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/server";
import { logAuditAction } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResponse } from "@/types";

const curriculumSchema = z.object({
  cmo_no: z.string().min(1, "CMO number is required").max(20),
  description: z.string().min(1, "Description is required").max(100),
  start_year: z.number().min(1950).max(2100),
  end_year: z.number().min(1950).max(2100),
});

export async function createCurriculum(formData: FormData): Promise<ActionResponse> {
  const user = await requireAdmin();
  const raw = {
    cmo_no: formData.get("cmo_no") as string,
    description: formData.get("description") as string,
    start_year: Number(formData.get("start_year")),
    end_year: Number(formData.get("end_year")),
  };

  const parsed = curriculumSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const supabase = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("curricula") as any)
    .insert(parsed.data)
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditAction({
    actorId: user.id,
    action: "create",
    entityType: "curriculum",
    entityId: (data as { id: string }).id,
    metadata: { cmo_no: parsed.data.cmo_no },
  });

  revalidatePath("/admin/curricula");
  return { success: true };
}

export async function deleteCurriculum(id: string): Promise<ActionResponse> {
  const user = await requireAdmin();
  const supabase = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("curricula") as any).delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditAction({
    actorId: user.id,
    action: "delete",
    entityType: "curriculum",
    entityId: id,
  });

  revalidatePath("/admin/curricula");
  return { success: true };
}
