import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { AnnouncementsClient } from "./announcements-client";

export default async function AdminAnnouncementsPage() {
  const supabase = await createServerClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader title="Announcements" description="Create and manage news announcements." />
      <AnnouncementsClient announcements={(announcements as any[]) || []} />
    </div>
  );
}
