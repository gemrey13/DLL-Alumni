import { createServerClient, requireAuth } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const user = await requireAuth();
  const supabase = await createServerClient();

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch education
  const { data: education } = await supabase
    .from("user_education")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  // Fetch work info
  const { data: workInfo } = await supabase
    .from("user_work_info")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Edit your profile, education, and work information."
      />
      <SettingsForm
        profile={profile as any}
        education={education as any}
        workInfo={workInfo as any}
      />
    </div>
  );
}
