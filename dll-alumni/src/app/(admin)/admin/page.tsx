import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/admin/metric-card";
import { Users, Briefcase, TrendingUp, GraduationCap } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createServerClient();

  // Fetch metrics
  const [
    { count: alumniCount },
    { count: employedCount },
    { count: pendingJobsCount },
    { count: activeUsersCount },
  ] = await Promise.all([
    supabase.from("alumni_profiles").select("*", { count: "exact", head: true }),
    supabase.from("current_jobs").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "active"),
  ]);

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of alumni data and platform metrics."
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Alumni Profiles"
          value={alumniCount ?? 0}
          icon={<GraduationCap className="h-6 w-6" />}
          color="primary"
        />
        <MetricCard
          title="Employed Alumni"
          value={employedCount ?? 0}
          icon={<Briefcase className="h-6 w-6" />}
          color="success"
        />
        <MetricCard
          title="Pending Jobs"
          value={pendingJobsCount ?? 0}
          icon={<TrendingUp className="h-6 w-6" />}
          color="warning"
        />
        <MetricCard
          title="Active Users"
          value={activeUsersCount ?? 0}
          icon={<Users className="h-6 w-6" />}
          color="secondary"
        />
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-stroke bg-white p-6">
          <h3 className="text-sm font-semibold text-[#1C2434] mb-4">Graduation Year Distribution</h3>
          <div className="h-48 flex items-center justify-center text-body text-sm">
            Chart will render with data from Supabase
          </div>
        </div>
        <div className="rounded-lg border border-stroke bg-white p-6">
          <h3 className="text-sm font-semibold text-[#1C2434] mb-4">Employment Type Breakdown</h3>
          <div className="h-48 flex items-center justify-center text-body text-sm">
            Chart will render with data from Supabase
          </div>
        </div>
        <div className="rounded-lg border border-stroke bg-white p-6">
          <h3 className="text-sm font-semibold text-[#1C2434] mb-4">Geographic Distribution</h3>
          <div className="h-48 flex items-center justify-center text-body text-sm">
            Regional breakdown of where alumni work
          </div>
        </div>
        <div className="rounded-lg border border-stroke bg-white p-6">
          <h3 className="text-sm font-semibold text-[#1C2434] mb-4">Salary Distribution</h3>
          <div className="h-48 flex items-center justify-center text-body text-sm">
            Monthly salary distribution per course
          </div>
        </div>
      </div>
    </div>
  );
}
