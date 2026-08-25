import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Calendar, MapPin } from "lucide-react";

export default async function PublicEventsPage() {
  const supabase = await createServerClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });

  const eventList = (events as any[]) || [];

  return (
    <section className="py-12 px-4 bg-whiten min-h-[60vh]">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Events" description="Upcoming events from DLL Alumni Association." />
        {eventList.length === 0 ? (
          <EmptyState
            icon={<Calendar className="h-12 w-12" />}
            title="No upcoming events"
            description="Check back later for new alumni events and gatherings."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventList.map((ev: any) => (
              <div key={ev.id} className="rounded-lg border border-stroke bg-white overflow-hidden hover:shadow-md transition-shadow">
                {ev.poster_image_url && (
                  <div className="h-48 bg-whiten overflow-hidden">
                    <img src={ev.poster_image_url} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-[#1C2434] text-lg">{ev.title}</h3>
                  <div className="mt-2 space-y-1 text-sm text-bodydark2">
                    <p className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {ev.location}</p>
                    <p className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(ev.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-body line-clamp-3">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
