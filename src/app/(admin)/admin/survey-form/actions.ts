"use server";

import { createServerClient, requireAdmin } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { alumniFormSchema, type AlumniFormData } from "@/lib/validators/alumni";
import { logAuditAction } from "@/lib/audit";
import type { ActionResponse } from "@/types";

export async function createAlumniProfile(
  data: AlumniFormData
): Promise<ActionResponse<{ alumni_id: string }>> {
  const user = await requireAdmin();

  const parsed = alumniFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  const supabase = createAdminClient();
  const formData = parsed.data;

  try {
    // Generate alumni ID
    const { data: idResult } = await supabase.rpc("generate_alumni_id");
    const alumni_id = (idResult as unknown as string) || "A0-0001";

    // Create alumni profile
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: alumniProfile, error: profileError } = await (supabase.from("alumni_profiles") as any)
      .insert({
        alumni_id,
        course_id: formData.course_id || null,
        fname: formData.fname,
        lname: formData.lname,
        mi: formData.mi || null,
        sex: formData.sex,
        contact_number: formData.contact_number,
        religion: formData.religion || null,
        civil_status: formData.civil_status || null,
        date_of_birth: formData.date_of_birth,
        facebook_account: formData.facebook_account || null,
        address_country: formData.address_country || null,
        address_region: formData.address_region || null,
        address_province: formData.address_province || null,
        address_city: formData.address_city || null,
        address_barangay: formData.address_barangay || null,
        address_zip: formData.address_zip || null,
      })
      .select("id")
      .single();

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    const alumniProfileId = (alumniProfile as { id: string }).id;

    // Create graduate information
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("graduate_information") as any).insert({
      alumni_profile_id: alumniProfileId,
      year_graduated: formData.year_graduated,
      satisfaction_level: formData.satisfaction_level || null,
      pursued_further_education: formData.pursued_further_education,
      honor: formData.honor || null,
    });

    // Create current job
    if (formData.job_position || formData.employment_status) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("current_jobs") as any).insert({
        alumni_profile_id: alumniProfileId,
        job_position: formData.job_position || "N/A",
        approximate_monthly_salary: formData.approximate_monthly_salary || null,
        company_affiliation: formData.company_affiliation || null,
        company_address_country: formData.company_address_country || null,
        company_address_region: formData.company_address_region || null,
        company_address_province: formData.company_address_province || null,
        company_address_city: formData.company_address_city || null,
        company_address_barangay: formData.company_address_barangay || null,
        company_address_zip: formData.company_address_zip || null,
        employment_status: formData.employment_status,
        employed_within_6mo: formData.employed_within_6mo,
        promoted_in_current_job: formData.promoted_in_current_job,
        getting_jobs_related_to_experience: formData.getting_jobs_related_to_experience,
        employment_type: formData.employment_type || null,
      });
    }

    // Create employment records
    if (formData.employment_records && formData.employment_records.length > 0) {
      const records = formData.employment_records
        .filter((r) => r.company_name && r.employment_status && r.date_employed)
        .map((r) => ({
          alumni_profile_id: alumniProfileId,
          company_name: r.company_name,
          employment_status: r.employment_status,
          approximate_monthly_salary: r.approximate_monthly_salary || null,
          date_employed: r.date_employed,
        }));

      if (records.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("employment_records") as any).insert(records);
      }
    }

    // Audit log
    await logAuditAction({
      actorId: user.id,
      action: "create",
      entityType: "alumni_profile",
      entityId: alumniProfileId,
      metadata: { alumni_id, name: `${formData.fname} ${formData.lname}` },
    });

    return { success: true, data: { alumni_id } };
  } catch (error) {
    console.error("Failed to create alumni profile:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
