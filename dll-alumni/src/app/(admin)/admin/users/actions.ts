"use server";

import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/server";
import { logAuditAction } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import type { ActionResponse } from "@/types";

/**
 * Update a user's status (activate or deactivate).
 */
export async function updateUserStatus(
  userId: string,
  status: "active" | "inactive"
): Promise<ActionResponse> {
  const admin = await requireAdmin();

  // Prevent admins from deactivating themselves
  if (userId === admin.id && status === "inactive") {
    return { success: false, error: "You cannot deactivate your own account." };
  }

  const supabase = await createServerClient();

  // Get current user info for audit log
  const { data: targetUser } = await supabase
    .from("profiles")
    .select("first_name, last_name, status, role")
    .eq("id", userId)
    .single();

  if (!targetUser) {
    return { success: false, error: "User not found." };
  }

  const previousStatus = (targetUser as any).status;

  // Update status
  const { error } = await (supabase
    .from("profiles") as any)
    .update({ status })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  // Audit log
  await logAuditAction({
    actorId: admin.id,
    action: status === "active" ? "activate_user" : "deactivate_user",
    entityType: "profile",
    entityId: userId,
    metadata: {
      target_name: `${(targetUser as any).first_name} ${(targetUser as any).last_name}`,
      previous_status: previousStatus,
      new_status: status,
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Update a user's role (admin or alumni).
 */
export async function updateUserRole(
  userId: string,
  role: "admin" | "alumni"
): Promise<ActionResponse> {
  const admin = await requireAdmin();

  // Prevent admins from demoting themselves
  if (userId === admin.id && role === "alumni") {
    return { success: false, error: "You cannot change your own role." };
  }

  const supabase = await createServerClient();

  // Get current user info for audit log
  const { data: targetUser } = await supabase
    .from("profiles")
    .select("first_name, last_name, role")
    .eq("id", userId)
    .single();

  if (!targetUser) {
    return { success: false, error: "User not found." };
  }

  const previousRole = (targetUser as any).role;

  // Update role
  const { error } = await (supabase
    .from("profiles") as any)
    .update({ role })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  // Audit log
  await logAuditAction({
    actorId: admin.id,
    action: "change_user_role",
    entityType: "profile",
    entityId: userId,
    metadata: {
      target_name: `${(targetUser as any).first_name} ${(targetUser as any).last_name}`,
      previous_role: previousRole,
      new_role: role,
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}
