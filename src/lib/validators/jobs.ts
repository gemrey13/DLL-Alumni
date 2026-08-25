import { z } from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  company_name: z.string().min(1, "Company name is required").max(150),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required").max(150),
  job_type: z.string().min(1, "Job type is required"),
  experience_level: z.number().min(1).max(3),
  starting_salary: z.number().optional(),
  categories: z.array(z.string()).optional().default([]),
});

export type JobPostFormData = z.infer<typeof jobPostSchema>;
