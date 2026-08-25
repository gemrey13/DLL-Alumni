"use server";

import { createServerClient, requireAuth } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  profileBasicSchema,
  educationSchema,
  workInfoSchema,
  type ProfileBasicFormData,
  type EducationFormData,
  type WorkInfoFormData,
} from "@/lib/validators/profile";
import type { ActionResponse } from "@/types";

/**
 * Update basic profile information (name, bio, sex, location).
 */
export async function updateProfileBasic(
  data: ProfileBasicFormData
): Promise<ActionResponse> {
  const user = await requireAuth();
  const parsed = profileBasicSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const { location_region, location_province, location_city, location_barangay, ...rest } = parsed.data;

  // Build location string from address cascade fields
  const locationParts = [location_barangay, location_city, location_province, location_region].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(", ") : null;

  const supabase = await createServerClient();
  const { error } = await (supabase.from("profiles") as any)
    .update({
      first_name: rest.first_name,
      last_name: rest.last_name,
      bio: rest.bio || null,
      sex: rest.sex || null,
      location,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/settings");
  return { success: true };
}

/**
 * Update education information.
 */
export async function updateEducation(
  data: EducationFormData
): Promise<ActionResponse> {
  const user = await requireAuth();
  const parsed = educationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const supabase = await createServerClient();

  // Upsert — check if record exists
  const { data: existing } = await supabase
    .from("user_education")
    .select("id")
    .eq("profile_id", user.id)
    .single();

  if (existing) {
    const { error } = await (supabase.from("user_education") as any)
      .update({
        school_name: parsed.data.school_name || null,
        course: parsed.data.course || null,
        school_year: parsed.data.school_year || null,
      })
      .eq("profile_id", user.id);

    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await (supabase.from("user_education") as any)
      .insert({
        profile_id: user.id,
        school_name: parsed.data.school_name || null,
        course: parsed.data.course || null,
        school_year: parsed.data.school_year || null,
      });

    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/settings");
  return { success: true };
}

/**
 * Update work information.
 */
export async function updateWorkInfo(
  data: WorkInfoFormData
): Promise<ActionResponse> {
  const user = await requireAuth();
  const parsed = workInfoSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const supabase = await createServerClient();

  // Upsert — check if record exists
  const { data: existing } = await supabase
    .from("user_work_info")
    .select("id")
    .eq("profile_id", user.id)
    .single();

  if (existing) {
    const { error } = await (supabase.from("user_work_info") as any)
      .update({
        specialty: parsed.data.specialty || null,
        description: parsed.data.description || null,
        experience: parsed.data.experience || null,
      })
      .eq("profile_id", user.id);

    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await (supabase.from("user_work_info") as any)
      .insert({
        profile_id: user.id,
        specialty: parsed.data.specialty || null,
        description: parsed.data.description || null,
        experience: parsed.data.experience || null,
      });

    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/settings");
  return { success: true };
}
