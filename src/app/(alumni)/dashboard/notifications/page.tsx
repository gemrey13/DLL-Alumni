import { createServerClient, getCurrentUser } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import { NotificationsClient } from "./notifications-client";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const supabase = await createServerClient();
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const notifList = (notifications as any[]) || [];

  return (
    <div>
      <PageHeader title="Notifications" description="View all your notifications." />
      {notifList.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-12 w-12" />}
          title="No notifications"
          description="You're all caught up! New notifications will appear here."
        />
      ) : (
        <NotificationsClient notifications={notifList} userId={user.id} />
      )}
    </div>
  );
}
