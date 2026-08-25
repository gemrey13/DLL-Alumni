"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { animate } from "animejs";
import { GraduationCap, Briefcase, Calendar, TrendingUp } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <GraduationCap className="h-7 w-7" />,
    value: 2500,
    suffix: "+",
    label: "Alumni Registered",
  },
  {
    icon: <Briefcase className="h-7 w-7" />,
    value: 89,
    suffix: "%",
    label: "Employment Rate",
  },
  {
    icon: <Calendar className="h-7 w-7" />,
    value: 150,
    suffix: "+",
    label: "Events Held",
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    value: 320,
    suffix: "+",
    label: "Job Postings",
  },
];

function AnimatedCounter({
  value,
  suffix,
  shouldAnimate,
}: {
  value: number;
  suffix: string;
  shouldAnimate: boolean;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldAnimate && !hasAnimated.current && counterRef.current) {
      hasAnimated.current = true;

      const obj = { count: 0 };
      animate(obj, {
        count: value,
        duration: 2000,
        ease: "outExpo",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(obj.count).toLocaleString()}${suffix}`;
          }
        },
      });
    }
  }, [shouldAnimate, value, suffix]);

  return (
    <span ref={counterRef} className="text-4xl md:text-5xl font-bold text-[#1C2434]">
      0{suffix}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2434]">
            Our Impact in Numbers
          </h2>
          <p className="mt-3 text-body max-w-2xl mx-auto">
            See how the DLL Alumni community continues to grow and make a
            difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center p-6 rounded-xl bg-whiten border border-stroke/50 hover:border-brand-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                {stat.icon}
              </div>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                shouldAnimate={isInView}
              />
              <span className="mt-2 text-sm text-body font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
