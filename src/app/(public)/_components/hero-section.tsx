"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, GraduationCap } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950"
    >
      {/* Animated background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,199,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,199,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Parallax decorative elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute right-[10%] top-[15%] w-72 h-72 rounded-full bg-brand-accent/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute right-[20%] top-[30%] w-20 h-20 rounded-lg bg-brand-accent/20 rotate-12"
      />
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute right-[8%] top-[50%] w-32 h-32 rounded-lg bg-brand-accent/10 -rotate-6"
      />
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute right-[30%] bottom-[20%] w-16 h-16 rounded-full bg-brand-primary/20"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute left-[5%] bottom-[30%] w-24 h-24 rounded-full bg-brand-secondary/10 blur-xl"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 text-sm text-brand-accent font-medium">
              <GraduationCap className="h-4 w-4" />
              Dalubhasaan ng Lungsod ng Lucena
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-brand-accent leading-tight"
          >
            Welcome to the Alumni
            <br />
            <span className="text-white">Web Portal</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-2xl md:text-3xl font-semibold text-white/90"
          >
            Empowering Education,
            <br className="hidden sm:block" />
            Connecting Alumni!
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg text-bodydark1/80 max-w-xl leading-relaxed"
          >
            Your all-in-one online portal and alumni office information system
            with tracer study for curriculum analysis. Stay connected, find
            opportunities, and grow your professional network.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-brand-accent hover:bg-brand-accent/90 text-[#1C2434] font-semibold px-8 h-12 text-base gap-2 group"
              )}
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base"
              )}
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-whiten to-transparent" />
    </section>
  );
}
