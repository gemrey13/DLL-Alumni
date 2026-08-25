"use server";

import { createAdminClient } from "@/lib/supabase/admin";

interface AuditLogEntry {
  actorId: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Log an admin action to the audit_logs table.
 */
export async function logAuditAction({
  actorId,
  action,
  entityType,
  entityId,
  metadata,
}: AuditLogEntry): Promise<void> {
  const supabase = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("audit_logs") as any).insert({
    actor_id: actorId,
    action,
    entity_type: entityType,
    entity_id: entityId ?? null,
    metadata: metadata ?? {},
  });
}
