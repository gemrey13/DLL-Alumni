"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  Calendar,
  Users,
  ClipboardList,
  Bell,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Job Board",
    description:
      "Browse and apply to job listings tailored to DLL alumni skills and experience. Post openings and connect with talent.",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Events",
    description:
      "Stay connected through alumni gatherings, seminars, homecomings, and community events organized by the alumni office.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Directory",
    description:
      "Explore the alumni network, find batchmates, and build professional connections across industries.",
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: "Tracer Study",
    description:
      "Comprehensive graduate tracking system that helps the institution analyze curriculum effectiveness and alumni outcomes.",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Real-time Notifications",
    description:
      "Get instant alerts for new job matches, upcoming events, announcements, and important updates from the alumni office.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Career Growth",
    description:
      "Access career resources, mentorship opportunities, and skill-matched job recommendations to advance your profession.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-whiten">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2434]">
            What We Offer
          </h2>
          <p className="mt-3 text-body max-w-2xl mx-auto">
            Everything you need to stay connected, grow professionally, and give
            back to the DLL community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-xl bg-white border border-stroke p-6 hover:border-brand-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-[#1C2434]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-body leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                <div className="absolute top-0 right-0 w-8 h-8 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors duration-300 rounded-bl-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
