"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { approveJob, rejectJob } from "./actions";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  status: string;
  created_at: string;
}

const tabs = ["pending", "approved", "rejected"] as const;

export function JobModerationClient({ jobs }: { jobs: Job[] }) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("pending");
  const [processing, setProcessing] = useState<string | null>(null);

  const filtered = jobs.filter((j) => j.status === activeTab);

  async function handleApprove(id: string) {
    setProcessing(id);
    await approveJob(id);
    setProcessing(null);
  }

  async function handleReject(id: string) {
    const feedback = prompt("Rejection feedback (optional):");
    setProcessing(id);
    await rejectJob(id, feedback || undefined);
    setProcessing(null);
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-whiten p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors",
              activeTab === tab
                ? "bg-white text-[#1C2434] shadow-sm"
                : "text-body hover:text-[#1C2434]"
            )}
          >
            {tab}
            <span className="ml-1.5 text-xs text-bodydark2">
              ({jobs.filter((j) => j.status === tab).length})
            </span>
          </button>
        ))}
      </div>

      {/* Job list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-stroke bg-white p-8 text-center text-body">
            No {activeTab} jobs.
          </div>
        ) : (
          filtered.map((job) => (
            <div key={job.id} className="rounded-lg border border-stroke bg-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[#1C2434]">{job.title}</h3>
                <p className="text-sm text-body">{job.company_name} &middot; {job.location} &middot; {job.job_type}</p>
                <p className="text-xs text-bodydark2 mt-1">{formatRelativeTime(job.created_at)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={job.status === "approved" ? "default" : job.status === "rejected" ? "destructive" : "secondary"}
                  className={cn(
                    job.status === "approved" && "bg-brand-success text-white",
                    job.status === "pending" && "bg-brand-warning/10 text-brand-warning"
                  )}
                >
                  {job.status}
                </Badge>
                {job.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(job.id)}
                      disabled={processing === job.id}
                      className="bg-brand-success hover:bg-brand-success/90 gap-1"
                    >
                      <Check className="h-3 w-3" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(job.id)}
                      disabled={processing === job.id}
                      className="gap-1"
                    >
                      <X className="h-3 w-3" /> Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
