import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Users } from "lucide-react";
import { UsersTable } from "./users-table";

export default async function AdminUsersPage() {
  await requireAdmin();

  const supabase = await createServerClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, role, status, avatar_url, created_at")
    .order("created_at", { ascending: false });

  const userList = (users as any[]) || [];

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Manage user accounts, roles, and activation status."
      />
      {userList.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title="No users found"
          description="Users will appear here once they register."
        />
      ) : (
        <UsersTable users={userList} />
      )}
    </div>
  );
}
