import { PageHeader } from "@/components/shared/page-header";
import { SurveyFormClient } from "./survey-form-client";

export default function SurveyFormPage() {
  return (
    <div>
      <PageHeader
        title="Alumni Tracer Survey Form"
        description="Record alumni information from tracer study surveys."
      />
      <SurveyFormClient />
    </div>
  );
}
