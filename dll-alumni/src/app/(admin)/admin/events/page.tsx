import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EventsAdminClient } from "./events-admin-client";

export default async function AdminEventsPage() {
  const supabase = await createServerClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

  return (
    <div>
      <PageHeader title="Event Management" description="Create and manage alumni events." />
      <EventsAdminClient events={(events as any[]) || []} />
    </div>
  );
}
