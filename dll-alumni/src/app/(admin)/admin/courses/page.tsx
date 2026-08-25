import { PageHeader } from "@/components/shared/page-header";

export default function CoursesPage() {
  return (
    <div>
      <PageHeader title="Courses" description="Manage courses under each curriculum." />
      <div className="rounded-lg border border-stroke bg-white p-6 text-center text-body">
        Course management — connect Supabase to populate.
      </div>
    </div>
  );
}
