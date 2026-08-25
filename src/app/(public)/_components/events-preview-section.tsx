"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  location: string;
  description: string;
  start_date: string;
  poster_image_url: string | null;
}

interface EventsPreviewSectionProps {
  events: EventItem[];
}

export function EventsPreviewSection({ events }: EventsPreviewSectionProps) {
  if (events.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2434]">
              Upcoming Events
            </h2>
            <p className="mt-2 text-body">
              Join alumni gatherings, seminars, and community events.
            </p>
          </div>
          <Link
            href="/events"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-xl border border-stroke bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {ev.poster_image_url ? (
                <div className="h-48 bg-whiten overflow-hidden">
                  <img
                    src={ev.poster_image_url}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-brand-accent/5 to-brand-primary/5 flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-brand-accent/40" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold text-[#1C2434] text-lg line-clamp-2 group-hover:text-brand-primary transition-colors">
                  {ev.title}
                </h3>
                <div className="mt-3 space-y-1.5 text-sm text-bodydark2">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1">{ev.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    {new Date(ev.start_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="mt-3 text-sm text-body line-clamp-2">
                  {ev.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
