"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobPostSchema, type JobPostFormData } from "@/lib/validators/jobs";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PostJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema) as any,
    defaultValues: {
      title: "",
      company_name: "",
      description: "",
      location: "",
      job_type: "",
      experience_level: 1,
      starting_salary: undefined,
      categories: [],
    },
  });

  async function onSubmit(data: JobPostFormData) {
    setIsSubmitting(true);
    setError(null);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!result.success) {
      setError(result.error || "Failed to post job");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard/jobs");
    router.refresh();
  }

  return (
    <div>
      <PageHeader title="Post a Job" description="Submit a job listing for admin review." />
      <div className="rounded-lg border border-stroke bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4 max-w-2xl">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input id="title" {...register("title")} placeholder="e.g. Software Engineer" />
            {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input id="company_name" {...register("company_name")} />
              {errors.company_name && <p className="text-xs text-red-600">{errors.company_name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" {...register("location")} placeholder="e.g. Lucena City" />
              {errors.location && <p className="text-xs text-red-600">{errors.location.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job_type">Job Type *</Label>
              <select id="job_type" {...register("job_type")} className="w-full h-8 rounded-lg border border-input bg-background px-3 text-sm">
                <option value="">Select...</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contractual">Contractual</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.job_type && <p className="text-xs text-red-600">{errors.job_type.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience_level">Experience Level *</Label>
              <select id="experience_level" {...register("experience_level", { valueAsNumber: true })} className="w-full h-8 rounded-lg border border-input bg-background px-3 text-sm">
                <option value={1}>Entry Level</option>
                <option value={2}>Intermediate</option>
                <option value={3}>Expert</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="starting_salary">Starting Salary (PHP)</Label>
              <Input id="starting_salary" type="number" {...register("starting_salary", { valueAsNumber: true })} placeholder="Optional" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea id="description" rows={6} {...register("description")} placeholder="Describe the role, requirements, and responsibilities..." />
            {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting} className="bg-brand-accent hover:bg-brand-accent/90 text-[#1C2434] font-semibold">
              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
