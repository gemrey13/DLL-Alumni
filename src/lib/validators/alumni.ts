import { z } from "zod";

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  fname: z.string().min(1, "First name is required").max(64),
  lname: z.string().min(1, "Last name is required").max(64),
  mi: z.string().max(5).optional().default(""),
  sex: z.string().min(1, "Sex is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  religion: z.string().optional().default(""),
  civil_status: z.string().optional().default(""),
  contact_number: z.string().min(1, "Contact number is required").max(15),
  facebook_account: z.string().optional().default(""),
  address_country: z.string().optional().default(""),
  address_region: z.string().optional().default(""),
  address_province: z.string().optional().default(""),
  address_city: z.string().optional().default(""),
  address_barangay: z.string().optional().default(""),
  address_zip: z.string().optional().default(""),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Step 2: Academic Information
export const academicInfoSchema = z.object({
  course_id: z.string().min(1, "Course is required"),
  year_graduated: z.number().min(1950).max(2100),
  satisfaction_level: z.number().min(1).max(5).optional(),
  pursued_further_education: z.boolean().default(false),
  honor: z.string().optional().default(""),
});

export type AcademicInfoFormData = z.infer<typeof academicInfoSchema>;

// Step 3: Current Employment
export const employmentInfoSchema = z.object({
  job_position: z.string().optional().default(""),
  approximate_monthly_salary: z.number().optional(),
  company_affiliation: z.string().optional().default(""),
  company_address_country: z.string().optional().default(""),
  company_address_region: z.string().optional().default(""),
  company_address_province: z.string().optional().default(""),
  company_address_city: z.string().optional().default(""),
  company_address_barangay: z.string().optional().default(""),
  company_address_zip: z.string().optional().default(""),
  employment_status: z.string().min(1, "Employment status is required"),
  employed_within_6mo: z.boolean().default(false),
  promoted_in_current_job: z.boolean().default(false),
  getting_jobs_related_to_experience: z.boolean().default(false),
  employment_type: z.string().optional().default(""),
});

export type EmploymentInfoFormData = z.infer<typeof employmentInfoSchema>;

// Step 4: Employment History
export const employmentRecordSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  employment_status: z.string().min(1, "Employment status is required"),
  approximate_monthly_salary: z.number().optional(),
  date_employed: z.string().min(1, "Date employed is required"),
});

export type EmploymentRecordFormData = z.infer<typeof employmentRecordSchema>;

// Full alumni form (all steps combined)
export const alumniFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...academicInfoSchema.shape,
  ...employmentInfoSchema.shape,
  employment_records: z.array(employmentRecordSchema).optional().default([]),
});

export type AlumniFormData = z.infer<typeof alumniFormSchema>;
