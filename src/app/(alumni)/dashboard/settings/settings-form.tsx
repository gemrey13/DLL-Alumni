"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileBasicSchema,
  educationSchema,
  workInfoSchema,
  type ProfileBasicFormData,
  type EducationFormData,
  type WorkInfoFormData,
} from "@/lib/validators/profile";
import { updateProfileBasic, updateEducation, updateWorkInfo } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressCascadeSelect } from "@/components/shared/address-cascade-select";
import { toast } from "sonner";
import { User, GraduationCap, Briefcase } from "lucide-react";

interface SettingsFormProps {
  profile: {
    first_name: string;
    last_name: string;
    bio: string | null;
    sex: string | null;
    location: string | null;
  } | null;
  education: {
    school_name: string | null;
    course: string | null;
    school_year: string | null;
  } | null;
  workInfo: {
    specialty: string | null;
    description: string | null;
    experience: string | null;
  } | null;
}

/**
 * Parse a location string like "Barangay, City, Province, Region"
 * back into individual fields for the cascade select defaults.
 */
function parseLocation(location: string | null) {
  if (!location) return { region: "", province: "", city: "", barangay: "" };
  const parts = location.split(", ").map((s) => s.trim());
  // Stored as: barangay, city, province, region
  return {
    barangay: parts[0] || "",
    city: parts[1] || "",
    province: parts[2] || "",
    region: parts[3] || "",
  };
}

export function SettingsForm({ profile, education, workInfo }: SettingsFormProps) {
  const locationParts = parseLocation(profile?.location ?? null);

  return (
    <div className="space-y-6">
      {/* Basic Profile Section */}
      <ProfileBasicSection
        defaultValues={{
          first_name: profile?.first_name ?? "",
          last_name: profile?.last_name ?? "",
          bio: profile?.bio ?? "",
          sex: profile?.sex ?? "",
          location_region: locationParts.region,
          location_province: locationParts.province,
          location_city: locationParts.city,
          location_barangay: locationParts.barangay,
        }}
      />

      {/* Education Section */}
      <EducationSection
        defaultValues={{
          school_name: education?.school_name ?? "",
          course: education?.course ?? "",
          school_year: education?.school_year ?? "",
        }}
      />

      {/* Work Info Section */}
      <WorkInfoSection
        defaultValues={{
          specialty: workInfo?.specialty ?? "",
          description: workInfo?.description ?? "",
          experience: workInfo?.experience ?? "",
        }}
      />
    </div>
  );
}

function ProfileBasicSection({ defaultValues }: { defaultValues: ProfileBasicFormData }) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<ProfileBasicFormData>({
    resolver: zodResolver(profileBasicSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues,
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  async function onSubmit(data: ProfileBasicFormData) {
    setIsLoading(true);
    const result = await updateProfileBasic(data);
    if (result.success) {
      toast.success("Profile updated successfully.");
    } else {
      toast.error(result.error as string);
    }
    setIsLoading(false);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className="rounded-lg border border-stroke bg-white p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <User className="h-5 w-5 text-brand-primary" />
          <h3 className="text-lg font-semibold text-[#1C2434]">Basic Information</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input id="first_name" {...register("first_name")} aria-invalid={!!errors.first_name} />
              {errors.first_name && (
                <p className="text-xs text-red-600">{errors.first_name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input id="last_name" {...register("last_name")} aria-invalid={!!errors.last_name} />
              {errors.last_name && (
                <p className="text-xs text-red-600">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <select
                id="sex"
                {...register("sex")}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                {...register("bio")}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50 focus:outline-none resize-none"
                maxLength={500}
              />
            </div>
          </div>

          {/* Location — Cascading PH Address Select */}
          <div>
            <Label className="mb-2 block">Location</Label>
            <AddressCascadeSelect prefix="location_" />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

function EducationSection({ defaultValues }: { defaultValues: EducationFormData }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues,
  });

  async function onSubmit(data: EducationFormData) {
    setIsLoading(true);
    const result = await updateEducation(data);
    if (result.success) {
      toast.success("Education updated successfully.");
    } else {
      toast.error(result.error as string);
    }
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit as any)}
      className="rounded-lg border border-stroke bg-white p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <GraduationCap className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-semibold text-[#1C2434]">Education</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school_name">School Name</Label>
          <Input id="school_name" {...register("school_name")} placeholder="e.g., DLL" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course / Program</Label>
          <Input id="course" {...register("course")} placeholder="e.g., BSIT" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school_year">School Year</Label>
          <Input id="school_year" {...register("school_year")} placeholder="e.g., 2020-2024" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-brand-primary hover:bg-brand-primary/90"
        >
          {isLoading ? "Saving..." : "Save Education"}
        </Button>
      </div>
    </form>
  );
}

function WorkInfoSection({ defaultValues }: { defaultValues: WorkInfoFormData }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<WorkInfoFormData>({
    resolver: zodResolver(workInfoSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues,
  });

  async function onSubmit(data: WorkInfoFormData) {
    setIsLoading(true);
    const result = await updateWorkInfo(data);
    if (result.success) {
      toast.success("Work info updated successfully.");
    } else {
      toast.error(result.error as string);
    }
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit as any)}
      className="rounded-lg border border-stroke bg-white p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Briefcase className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-semibold text-[#1C2434]">Work Information</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty / Field</Label>
            <Input id="specialty" {...register("specialty")} placeholder="e.g., Web Development" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Input id="experience" {...register("experience")} placeholder="e.g., 3 years" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            placeholder="Brief description of your work or professional background..."
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50 focus:outline-none resize-none"
            maxLength={1000}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-brand-primary hover:bg-brand-primary/90"
        >
          {isLoading ? "Saving..." : "Save Work Info"}
        </Button>
      </div>
    </form>
  );
}
