"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Megaphone } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string | null;
  published_at: string;
}

interface NewsPreviewSectionProps {
  announcements: NewsItem[];
}

export function NewsPreviewSection({ announcements }: NewsPreviewSectionProps) {
  if (announcements.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-whiten">
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
              Latest News
            </h2>
            <p className="mt-2 text-body">
              Stay updated with announcements from the alumni association.
            </p>
          </div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-xl border border-stroke bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {item.cover_image_url ? (
                <div className="h-48 bg-whiten overflow-hidden">
                  <img
                    src={item.cover_image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 flex items-center justify-center">
                  <Megaphone className="h-12 w-12 text-brand-primary/30" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold text-[#1C2434] text-lg line-clamp-2 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-body line-clamp-2">
                  {item.summary}
                </p>
                <p className="mt-3 text-xs text-bodydark2">
                  {new Date(item.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            View All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
