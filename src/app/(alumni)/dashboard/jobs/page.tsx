import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

export default async function JobsPage() {
  const supabase = await createServerClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const jobsList = (jobs as any[]) || [];

  return (
    <div>
      <PageHeader title="Job Board" description="Browse available job opportunities.">
        <Link
          href="/dashboard/jobs/post"
          className={cn(buttonVariants(), "bg-brand-primary hover:bg-brand-primary/90 gap-2")}
        >
          <Plus className="h-4 w-4" /> Post a Job
        </Link>
      </PageHeader>

      {jobsList.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-12 w-12" />}
          title="No jobs available yet"
          description="Check back later for new job postings, or post your own."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobsList.map((job: any) => (
            <Link
              key={job.id}
              href={`/dashboard/jobs/${job.id}`}
              className="rounded-lg border border-stroke bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#1C2434]">{job.title}</h3>
                  <p className="text-sm text-body">{job.company_name}</p>
                </div>
                {job.starting_salary && (
                  <span className="text-sm font-medium text-brand-primary">
                    {formatCurrency(job.starting_salary)}
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-bodydark2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> {job.job_type}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {formatRelativeTime(job.created_at)}
                </span>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">
                  {job.experience_level === 1 ? "Entry Level" : job.experience_level === 2 ? "Intermediate" : "Expert"}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
