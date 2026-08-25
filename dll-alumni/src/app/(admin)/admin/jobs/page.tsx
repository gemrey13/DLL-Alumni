import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { JobModerationClient } from "./jobs-client";

export default async function AdminJobsPage() {
  const supabase = await createServerClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader title="Job Moderation" description="Review, approve, or reject job postings from alumni." />
      <JobModerationClient jobs={(jobs as any[]) || []} />
    </div>
  );
}
