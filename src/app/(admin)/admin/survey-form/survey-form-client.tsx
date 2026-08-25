"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { alumniFormSchema, type AlumniFormData } from "@/lib/validators/alumni";
import { createAlumniProfile } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressCascadeSelect } from "@/components/shared/address-cascade-select";
import { cn } from "@/lib/utils";

const steps = [
  "Personal Info",
  "Academic",
  "Employment",
  "History",
];

export function SurveyFormClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const methods = useForm<AlumniFormData>({
    resolver: zodResolver(alumniFormSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues: {
      fname: "",
      lname: "",
      mi: "",
      sex: "",
      date_of_birth: "",
      religion: "",
      civil_status: "",
      contact_number: "",
      facebook_account: "",
      address_country: "Philippines",
      address_region: "",
      address_province: "",
      address_city: "",
      address_barangay: "",
      address_zip: "",
      course_id: "",
      year_graduated: new Date().getFullYear(),
      satisfaction_level: undefined,
      pursued_further_education: false,
      honor: "",
      job_position: "",
      approximate_monthly_salary: undefined,
      company_affiliation: "",
      company_address_country: "Philippines",
      company_address_region: "",
      company_address_province: "",
      company_address_city: "",
      company_address_barangay: "",
      company_address_zip: "",
      employment_status: "",
      employed_within_6mo: false,
      promoted_in_current_job: false,
      getting_jobs_related_to_experience: false,
      employment_type: "",
      employment_records: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods;

  async function nextStep() {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate as (keyof AlumniFormData)[]);
    if (isValid) {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }
  }

  function prevStep() {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: AlumniFormData) {
    setIsSubmitting(true);
    setError(null);

    const result = await createAlumniProfile(data);

    if (!result.success) {
      setError(result.error as string);
      setIsSubmitting(false);
      return;
    }

    setSuccess(`Alumni profile created successfully! ID: ${result.data?.alumni_id}`);
    setIsSubmitting(false);
  }

  function getFieldsForStep(step: number): string[] {
    switch (step) {
      case 0:
        return ["fname", "lname", "sex", "date_of_birth", "contact_number"];
      case 1:
        return ["course_id", "year_graduated"];
      case 2:
        return ["employment_status"];
      case 3:
        return [];
      default:
        return [];
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-stroke bg-white p-8 text-center">
        <div className="text-brand-success text-lg font-semibold mb-2">Success!</div>
        <p className="text-body">{success}</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Button
            onClick={() => { setSuccess(null); setCurrentStep(0); }}
            variant="outline"
          >
            Add Another
          </Button>
          <Button
            onClick={() => router.push("/admin/trace-alumni")}
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            View Alumni Table
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="rounded-lg border border-stroke bg-white">
        {/* Progress Steps */}
        <div className="border-b border-stroke p-4">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {steps.map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold",
                    i <= currentStep
                      ? "bg-brand-primary text-white"
                      : "bg-whiten text-bodydark2 border border-stroke"
                  )}
                >
                  {i + 1}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-body">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit as any)} className="p-6">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1C2434]">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name *</Label>
                  <Input id="fname" {...register("fname")} aria-invalid={!!errors.fname} />
                  {errors.fname && <p className="text-xs text-red-600">{errors.fname.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name *</Label>
                  <Input id="lname" {...register("lname")} aria-invalid={!!errors.lname} />
                  {errors.lname && <p className="text-xs text-red-600">{errors.lname.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mi">M.I.</Label>
                  <Input id="mi" {...register("mi")} maxLength={5} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sex">Sex *</Label>
                  <select id="sex" {...register("sex")} className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.sex && <p className="text-xs text-red-600">{errors.sex.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth *</Label>
                  <Input id="date_of_birth" type="date" {...register("date_of_birth")} />
                  {errors.date_of_birth && <p className="text-xs text-red-600">{errors.date_of_birth.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_number">Contact Number *</Label>
                  <Input id="contact_number" {...register("contact_number")} placeholder="09xxxxxxxxx" />
                  {errors.contact_number && <p className="text-xs text-red-600">{errors.contact_number.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Input id="religion" {...register("religion")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="civil_status">Civil Status</Label>
                  <select id="civil_status" {...register("civil_status")} className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Select...</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook_account">Facebook Account</Label>
                  <Input id="facebook_account" {...register("facebook_account")} />
                </div>
              </div>

              {/* Home Address — Cascading PH Address Select */}
              <h4 className="text-sm font-semibold text-[#1C2434] pt-2">Home Address</h4>
              <AddressCascadeSelect prefix="address_" />
            </div>
          )}

          {/* Step 2: Academic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1C2434]">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course_id">Course *</Label>
                  <Input id="course_id" {...register("course_id")} placeholder="Course ID (connect DB for dropdown)" />
                  {errors.course_id && <p className="text-xs text-red-600">{errors.course_id.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year_graduated">Year Graduated *</Label>
                  <Input id="year_graduated" type="number" {...register("year_graduated")} />
                  {errors.year_graduated && <p className="text-xs text-red-600">{errors.year_graduated.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="satisfaction_level">Satisfaction Level (1-5)</Label>
                  <select id="satisfaction_level" {...register("satisfaction_level")} className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Select...</option>
                    <option value="5">5 - Very Satisfied</option>
                    <option value="4">4 - Satisfied</option>
                    <option value="3">3 - Neutral</option>
                    <option value="2">2 - Dissatisfied</option>
                    <option value="1">1 - Very Dissatisfied</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="honor">Honors/Awards</Label>
                  <Input id="honor" {...register("honor")} placeholder="e.g., Cum Laude" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pursued_further_education" {...register("pursued_further_education")} className="h-4 w-4" />
                <Label htmlFor="pursued_further_education">Pursued Further Education</Label>
              </div>
            </div>
          )}

          {/* Step 3: Current Employment */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1C2434]">Current Employment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment_status">Employment Status *</Label>
                  <select id="employment_status" {...register("employment_status")} className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Select...</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                  {errors.employment_status && <p className="text-xs text-red-600">{errors.employment_status.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type</Label>
                  <select id="employment_type" {...register("employment_type")} className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Select...</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contractual">Contractual</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job_position">Job Position</Label>
                  <Input id="job_position" {...register("job_position")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approximate_monthly_salary">Monthly Salary (PHP)</Label>
                  <Input id="approximate_monthly_salary" type="number" {...register("approximate_monthly_salary")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_affiliation">Company/Employer</Label>
                <Input id="company_affiliation" {...register("company_affiliation")} />
              </div>

              {/* Company Address — Cascading PH Address Select */}
              <h4 className="text-sm font-semibold text-[#1C2434] pt-2">Company Address</h4>
              <AddressCascadeSelect prefix="company_address_" />

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="employed_within_6mo" {...register("employed_within_6mo")} className="h-4 w-4" />
                  <Label htmlFor="employed_within_6mo">Employed within 6 months after graduation</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="promoted_in_current_job" {...register("promoted_in_current_job")} className="h-4 w-4" />
                  <Label htmlFor="promoted_in_current_job">Promoted in current job</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="getting_jobs_related_to_experience" {...register("getting_jobs_related_to_experience")} className="h-4 w-4" />
                  <Label htmlFor="getting_jobs_related_to_experience">Job related to field of study</Label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Employment History */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1C2434]">Employment History</h3>
              <p className="text-sm text-body">
                Add previous employment records (optional). These can be added later.
              </p>
              <div className="rounded-lg border border-dashed border-stroke p-6 text-center text-body text-sm">
                Employment history entries will be available after connecting to the database.
                You can submit the form without this step.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-brand-primary hover:bg-brand-primary/90"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-accent hover:bg-brand-accent/90 text-[#1C2434] font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit Survey"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
