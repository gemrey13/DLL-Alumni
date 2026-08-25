import { PageHeader } from "@/components/shared/page-header";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Welcome back!"
        description="Here's what's happening with your alumni community."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg border border-stroke bg-white p-6">
          <h3 className="text-sm font-medium text-bodydark2">Job Recommendations</h3>
          <p className="mt-2 text-2xl font-bold text-[#1C2434]">Coming Soon</p>
          <p className="mt-1 text-xs text-body">Based on your skills</p>
        </div>
        <div className="rounded-lg border border-stroke bg-white p-6">
          <h3 className="text-sm font-medium text-bodydark2">Upcoming Events</h3>
          <p className="mt-2 text-2xl font-bold text-[#1C2434]">0</p>
          <p className="mt-1 text-xs text-body">Events this month</p>
        </div>
        <div className="rounded-lg border border-stroke bg-white p-6">
          <h3 className="text-sm font-medium text-bodydark2">Notifications</h3>
          <p className="mt-2 text-2xl font-bold text-[#1C2434]">0</p>
          <p className="mt-1 text-xs text-body">Unread notifications</p>
        </div>
      </div>
    </div>
  );
}
