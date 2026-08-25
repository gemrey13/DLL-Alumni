import { PageHeader } from "@/components/shared/page-header";

export default function AuditLogPage() {
  return (
    <div>
      <PageHeader title="Audit Log" description="View history of all admin actions." />
      <div className="rounded-lg border border-stroke bg-white p-6 text-center text-body">
        Audit log viewer — connect Supabase to populate.
      </div>
    </div>
  );
}
