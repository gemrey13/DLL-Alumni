import { z } from "zod";

export const profileBasicSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(100),
  last_name: z.string().min(1, "Last name is required").max(100),
  bio: z.string().max(500).optional().default(""),
  sex: z.string().optional().default(""),
  // Location stored as formatted string from address cascade
  location_region: z.string().optional().default(""),
  location_province: z.string().optional().default(""),
  location_city: z.string().optional().default(""),
  location_barangay: z.string().optional().default(""),
});

export type ProfileBasicFormData = z.infer<typeof profileBasicSchema>;

export const educationSchema = z.object({
  school_name: z.string().max(255).optional().default(""),
  course: z.string().max(255).optional().default(""),
  school_year: z.string().max(50).optional().default(""),
});

export type EducationFormData = z.infer<typeof educationSchema>;

export const workInfoSchema = z.object({
  specialty: z.string().max(255).optional().default(""),
  description: z.string().max(1000).optional().default(""),
  experience: z.string().max(500).optional().default(""),
});

export type WorkInfoFormData = z.infer<typeof workInfoSchema>;
