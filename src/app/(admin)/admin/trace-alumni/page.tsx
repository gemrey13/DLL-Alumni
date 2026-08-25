import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function TraceAlumniPage() {
  return (
    <div>
      <PageHeader
        title="Trace Alumni"
        description="View and manage traced alumni records."
      >
        <Link
          href="/admin/survey-form"
          className={cn(buttonVariants(), "bg-brand-primary hover:bg-brand-primary/90 gap-2")}
        >
          <Plus className="h-4 w-4" />
          Add Alumni
        </Link>
      </PageHeader>

      {/* Alumni table placeholder - will be populated when DB is connected */}
      <div className="rounded-lg border border-stroke bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stroke bg-whiten">
              <tr>
                <th className="px-4 py-3 font-medium text-[#1C2434]">Alumni ID</th>
                <th className="px-4 py-3 font-medium text-[#1C2434]">Name</th>
                <th className="px-4 py-3 font-medium text-[#1C2434]">Course</th>
                <th className="px-4 py-3 font-medium text-[#1C2434]">Year Graduated</th>
                <th className="px-4 py-3 font-medium text-[#1C2434]">Employment Status</th>
                <th className="px-4 py-3 font-medium text-[#1C2434]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-body">
                  No alumni records yet. Connect to Supabase and run migrations to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
