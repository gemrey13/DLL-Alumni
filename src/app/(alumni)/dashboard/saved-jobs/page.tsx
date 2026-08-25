import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Bookmark } from "lucide-react";

export default function SavedJobsPage() {
  return (
    <div>
      <PageHeader title="Saved Jobs" description="Jobs you've saved for later." />
      <EmptyState
        icon={<Bookmark className="h-12 w-12" />}
        title="No saved jobs"
        description="Save jobs you're interested in and they'll appear here."
      />
    </div>
  );
}
