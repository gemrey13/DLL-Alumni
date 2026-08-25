import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Calendar, MapPin, Users } from "lucide-react";

export default async function AlumniEventsPage() {
  const supabase = await createServerClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });

  const eventList = (events as any[]) || [];

  return (
    <div>
      <PageHeader title="Events" description="Browse and join upcoming alumni events." />
      {eventList.length === 0 ? (
        <EmptyState
          icon={<Calendar className="h-12 w-12" />}
          title="No upcoming events"
          description="Check back later for new events from the alumni association."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventList.map((ev: any) => (
            <div key={ev.id} className="rounded-lg border border-stroke bg-white overflow-hidden hover:shadow-md transition-shadow">
              {ev.poster_image_url && (
                <div className="h-40 bg-whiten overflow-hidden">
                  <img src={ev.poster_image_url} alt={ev.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-[#1C2434]">{ev.title}</h3>
                <div className="mt-2 space-y-1 text-xs text-bodydark2">
                  <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {ev.location}</p>
                  <p className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(ev.start_date).toLocaleDateString()} - {new Date(ev.end_date).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-2 text-sm text-body line-clamp-2">{ev.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
