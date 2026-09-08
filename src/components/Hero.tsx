"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_DESCRIPTION, SITE_NAME, VALUE_STATEMENT } from "@/lib/site";
import { AuroraBackground } from "./AuroraBackground";
import { NeuralCanvas } from "./NeuralCanvas";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Introduction"
      className="relative isolate overflow-hidden px-6 py-24 sm:px-12 lg:pt-24 lg:pb-12"
    >
      <AuroraBackground strong className="absolute inset-0 overflow-hidden" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:min-h-[75vh] lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="max-w-xl"
        >
          <Image
            src="/profile.png"
            alt={SITE_NAME}
            width={96}
            height={96}
            priority
            className="border-border h-24 w-24 rounded-full border object-cover"
          />
          <p className="text-accent mt-6 font-mono text-sm tracking-widest uppercase">
            {SITE_DESCRIPTION}
          </p>
          <h1 className="text-display-xl mt-4">{SITE_NAME}</h1>
          <p className="text-muted mt-4 max-w-lg">{VALUE_STATEMENT}</p>
          <a
            href="#work"
            className="link-underline font-display text-accent focus-visible:outline-accent mt-6 inline-block tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            View Work &rarr;
          </a>
        </motion.div>

        <NeuralCanvas />
      </div>
    </section>
  );
}
