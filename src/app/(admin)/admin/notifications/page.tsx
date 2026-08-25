import { PageHeader } from "@/components/shared/page-header";

export default function AdminNotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" description="View your admin notifications." />
      <div className="rounded-lg border border-stroke bg-white p-6 text-center text-body">
        Notifications — connect Supabase to populate.
      </div>
    </div>
  );
}
