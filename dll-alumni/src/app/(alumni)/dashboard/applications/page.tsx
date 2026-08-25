import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { FileText } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <div>
      <PageHeader title="My Applications" description="Track your job applications." />
      <EmptyState
        icon={<FileText className="h-12 w-12" />}
        title="No applications yet"
        description="Apply to jobs and track your application status here."
      />
    </div>
  );
}
