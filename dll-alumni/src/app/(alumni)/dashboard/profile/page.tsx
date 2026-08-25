import { PageHeader } from "@/components/shared/page-header";

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="My Profile" description="View and manage your alumni profile." />
      <div className="rounded-lg border border-stroke bg-white p-6 text-center text-body">
        Profile view — connect Supabase to display your data.
      </div>
    </div>
  );
}
