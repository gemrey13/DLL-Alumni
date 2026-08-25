"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,199,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,199,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-brand-accent/5 blur-2xl" />
      <div className="absolute bottom-10 right-[15%] w-48 h-48 rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute top-1/2 right-[8%] w-16 h-16 rounded-lg bg-brand-accent/10 rotate-12" />
      <div className="absolute bottom-[20%] left-[5%] w-20 h-20 rounded-lg bg-brand-primary/10 -rotate-6" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-accent leading-tight"
        >
          Ready to reconnect with
          <br />
          <span className="text-white">your alma mater?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-lg text-bodydark1/80 max-w-xl mx-auto"
        >
          Join thousands of DLL graduates who are building careers, attending
          events, and staying connected through the alumni portal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-brand-accent hover:bg-brand-accent/90 text-[#1C2434] font-semibold px-8 h-12 text-base gap-2 group"
            )}
          >
            Register Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/news"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base"
            )}
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
