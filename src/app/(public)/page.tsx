import { createServerClient } from "@/lib/supabase/server";
import { HeroSection } from "./_components/hero-section";
import { StatsSection } from "./_components/stats-section";
import { FeaturesSection } from "./_components/features-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { NewsPreviewSection } from "./_components/news-preview-section";
import { EventsPreviewSection } from "./_components/events-preview-section";
import { CtaSection } from "./_components/cta-section";

export default async function LandingPage() {
  const supabase = await createServerClient();

  // Fetch latest 3 published announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, title, summary, cover_image_url, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);

  // Fetch next 3 upcoming events
  const { data: events } = await supabase
    .from("events")
    .select("id, title, location, description, start_date, poster_image_url")
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true })
    .limit(3);

  const newsList = (announcements as any[]) || [];
  const eventList = (events as any[]) || [];

  return (
    <div className="scroll-smooth">
      {/* Hero — dark gradient with parallax */}
      <HeroSection />

      {/* Stats — white bg, animated counters */}
      <StatsSection />

      {/* Features — light gray bg, 6 cards */}
      <FeaturesSection />

      {/* How It Works — white bg, timeline */}
      <HowItWorksSection />

      {/* Latest News — light gray bg */}
      <NewsPreviewSection announcements={newsList} />

      {/* Upcoming Events — white bg */}
      <EventsPreviewSection events={eventList} />

      {/* CTA — dark gradient */}
      <CtaSection />
    </div>
  );
}
