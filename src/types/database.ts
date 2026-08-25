export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "admin" | "alumni";
export type UserStatus = "active" | "inactive";
export type JobStatus = "pending" | "approved" | "rejected";
export type ApplicationStatus = "applied" | "withdrawn";
export type AnnouncementStatus = "draft" | "published";

/**
 * Database type placeholder.
 * This will be replaced with auto-generated types from `supabase gen types typescript`
 * once the Supabase project is configured and migrations are applied.
 *
 * For now, we use a minimal shape that satisfies the @supabase/supabase-js client
 * without breaking type inference.
 */
export type Database = {
  public: {
    Tables: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: Array<{
          foreignKeyName: string;
          columns: string[];
          isOneToOne: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }>;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Relationships: unknown[];
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      user_role: UserRole;
      user_status: UserStatus;
      job_status: JobStatus;
      application_status: ApplicationStatus;
      announcement_status: AnnouncementStatus;
    };
    CompositeTypes: {
      [key: string]: unknown;
    };
  };
};

// ─── Row Types (used throughout the application) ────────────────────────────

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  status: UserStatus;
  bio: string | null;
  location: string | null;
  sex: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserEducation {
  id: string;
  profile_id: string;
  school_name: string | null;
  course: string | null;
  school_year: string | null;
  created_at: string;
}

export interface UserWorkInfo {
  id: string;
  profile_id: string;
  specialty: string | null;
  description: string | null;
  experience: string | null;
  created_at: string;
}

export interface UserLanguage {
  id: string;
  profile_id: string;
  name: string;
}

export interface UserAccountLink {
  id: string;
  profile_id: string;
  url: string;
  created_at: string;
}

export interface UserSkill {
  id: string;
  profile_id: string;
  category_id: string;
}

export interface Curriculum {
  id: string;
  cmo_no: string;
  description: string;
  start_year: number;
  end_year: number;
  created_at: string;
}

export interface Course {
  id: string;
  curriculum_id: string;
  course_id: string;
  course_name: string;
  course_desc: string | null;
  no_units: number;
  created_at: string;
}

export interface AlumniProfile {
  id: string;
  alumni_id: string;
  course_id: string | null;
  fname: string;
  lname: string;
  mi: string | null;
  sex: string;
  contact_number: string;
  religion: string | null;
  civil_status: string | null;
  date_of_birth: string;
  facebook_account: string | null;
  address_country: string | null;
  address_region: string | null;
  address_province: string | null;
  address_city: string | null;
  address_barangay: string | null;
  address_zip: string | null;
  created_at: string;
  updated_at: string;
}

export interface GraduateInformation {
  id: string;
  alumni_profile_id: string;
  year_graduated: number;
  satisfaction_level: number | null;
  pursued_further_education: boolean;
  honor: string | null;
  created_at: string;
}

export interface CurrentJobRecord {
  id: string;
  alumni_profile_id: string;
  job_position: string;
  approximate_monthly_salary: number | null;
  company_affiliation: string | null;
  company_address_country: string | null;
  company_address_region: string | null;
  company_address_province: string | null;
  company_address_city: string | null;
  company_address_barangay: string | null;
  company_address_zip: string | null;
  employment_status: string;
  employed_within_6mo: boolean;
  promoted_in_current_job: boolean;
  getting_jobs_related_to_experience: boolean;
  employment_type: string | null;
  created_at: string;
}

export interface EmploymentRecord {
  id: string;
  alumni_profile_id: string;
  company_name: string;
  employment_status: string;
  approximate_monthly_salary: number | null;
  date_employed: string;
  created_at: string;
}

export interface JobCategory {
  id: string;
  name: string;
  created_at: string;
}

export interface Job {
  id: string;
  posted_by: string;
  title: string;
  company_name: string;
  starting_salary: number | null;
  description: string;
  location: string;
  job_type: string;
  experience_level: number;
  status: JobStatus;
  admin_feedback: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  status: ApplicationStatus;
  applied_at: string;
}

export interface SavedJob {
  id: string;
  job_id: string;
  user_id: string;
  saved_at: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  description: string;
  organizer: string;
  start_date: string;
  end_date: string;
  poster_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventParticipant {
  id: string;
  event_id: string;
  user_id: string;
  registered_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover_image_url: string | null;
  status: AnnouncementStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  metadata: Json;
  read: boolean;
  created_at: string;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  event_notifications: boolean;
  announcement_notifications: boolean;
  job_notifications: boolean;
  system_notifications: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Json;
  created_at: string;
}

export interface SystemUpdate {
  id: string;
  title: string;
  description: string;
  created_at: string;
}
