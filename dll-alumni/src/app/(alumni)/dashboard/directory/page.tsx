import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

export default async function DirectoryPage() {
  const supabase = await createServerClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, avatar_url, location, bio")
    .eq("status", "active")
    .order("first_name", { ascending: true });

  const alumni = (profiles as any[]) || [];

  return (
    <div>
      <PageHeader title="Alumni Directory" description="Browse and connect with fellow alumni." />
      {alumni.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title="No alumni profiles yet"
          description="The directory will be populated as alumni join the platform."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alumni.map((profile: any) => (
            <div key={profile.id} className="rounded-lg border border-stroke bg-white p-4 flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-brand-primary text-white font-semibold">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#1C2434] truncate">
                  {profile.first_name} {profile.last_name}
                </h3>
                {profile.location && (
                  <p className="text-xs text-bodydark2 truncate">{profile.location}</p>
                )}
                {profile.bio && (
                  <p className="text-xs text-body mt-1 line-clamp-2">{profile.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
