"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EditorialPanel } from "@/types/content";

export function EditorialSplit({ panels }: { panels: EditorialPanel[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About"
      className="relative grid grid-cols-1 sm:grid-cols-2"
    >
      <div
        aria-hidden="true"
        className="bg-accent pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 opacity-70 shadow-[0_0_16px_var(--accent)] sm:block"
      />
      {panels.map((panel, i) => (
        <motion.div
          key={panel.id}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          initial={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          whileInView={
            prefersReducedMotion
              ? undefined
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`flex min-h-[60vh] flex-col justify-end p-8 transition-[filter] duration-300 sm:p-12 ${
            hovered !== null && hovered !== i ? "grayscale" : ""
          }`}
          style={{
            background: "color-mix(in srgb, var(--accent) 5%, transparent)",
          }}
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase">
            {panel.eyebrow}
          </p>
          <h2 className="text-display-lg mt-2">{panel.headline}</h2>
          <p className="text-muted mt-4 max-w-md">{panel.body}</p>
        </motion.div>
      ))}
    </section>
  );
}
