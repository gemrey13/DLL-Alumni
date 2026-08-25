"use client";

import { motion } from "motion/react";
import { UserPlus, ShieldCheck, LayoutDashboard, Handshake } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: "Register",
    description: "Create your account with your name and email. It only takes a minute.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Get Verified",
    description: "The alumni office verifies your identity against official graduate records.",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6" />,
    title: "Explore",
    description: "Access the job board, events, community directory, and personalized dashboard.",
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "Connect",
    description: "Network with fellow alumni, attend events, and grow your career opportunities.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2434]">
            How It Works
          </h2>
          <p className="mt-3 text-body max-w-2xl mx-auto">
            Getting started with the DLL Alumni Portal is simple and
            straightforward.
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary origin-left"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step number circle */}
              <div className="relative z-10 flex items-center justify-center h-20 w-20 rounded-full bg-white border-2 border-brand-primary shadow-md">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-brand-primary/10 text-brand-primary">
                  {step.icon}
                </div>
              </div>

              {/* Step number badge */}
              <div className="absolute top-0 right-[calc(50%-2.5rem)] -translate-y-1 translate-x-full z-20">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-accent text-[#1C2434] text-xs font-bold shadow-sm">
                  {i + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-5 text-base font-semibold text-[#1C2434]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-body leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary via-brand-accent to-brand-primary origin-top"
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex gap-4"
              >
                {/* Circle on line */}
                <div className="absolute -left-8 top-0 flex items-center justify-center h-8 w-8 rounded-full bg-white border-2 border-brand-primary shadow-sm">
                  <span className="text-xs font-bold text-brand-primary">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="pl-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-brand-primary/10 text-brand-primary">
                      {step.icon}
                    </div>
                    <h3 className="text-base font-semibold text-[#1C2434]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
