import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { jobPostSchema } from "@/lib/validators/jobs";

export async function POST(request: Request) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = jobPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }

  const { categories, ...jobData } = parsed.data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: job, error } = await (supabase.from("jobs") as any)
    .insert({
      ...jobData,
      posted_by: user.id,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  // Add category assignments if provided
  if (categories && categories.length > 0 && job) {
    const assignments = categories.map((catId: string) => ({
      job_id: (job as { id: string }).id,
      category_id: catId,
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("job_category_assignments") as any).insert(assignments);
  }

  return NextResponse.json({ success: true, data: job });
}
