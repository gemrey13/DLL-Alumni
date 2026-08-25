import { createServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Megaphone } from "lucide-react";

export default async function NewsPage() {
  const supabase = await createServerClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const newsList = (announcements as any[]) || [];

  return (
    <section className="py-12 px-4 bg-whiten min-h-[60vh]">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="News & Announcements" description="Latest updates from DLL Alumni Association." />
        {newsList.length === 0 ? (
          <EmptyState
            icon={<Megaphone className="h-12 w-12" />}
            title="No announcements yet"
            description="Stay tuned for news and updates from the alumni association."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((item: any) => (
              <article key={item.id} className="rounded-lg border border-stroke bg-white overflow-hidden hover:shadow-md transition-shadow">
                {item.cover_image_url && (
                  <div className="h-48 bg-whiten overflow-hidden">
                    <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-[#1C2434] text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-body line-clamp-3">{item.summary}</p>
                  <p className="mt-3 text-xs text-bodydark2">
                    {new Date(item.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
