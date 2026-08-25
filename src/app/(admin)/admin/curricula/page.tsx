import { PageHeader } from "@/components/shared/page-header";
import { createServerClient } from "@/lib/supabase/server";
import { CurriculaClient } from "./curricula-client";

export default async function CurriculaPage() {
  const supabase = await createServerClient();
  const { data: curricula } = await supabase
    .from("curricula")
    .select("*")
    .order("start_year", { ascending: false });

  return (
    <div>
      <PageHeader title="Curricula" description="Manage CMO curricula and their year ranges." />
      <CurriculaClient curricula={(curricula as any[]) || []} />
    </div>
  );
}
