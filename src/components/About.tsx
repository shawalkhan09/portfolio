"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EditorialPanel, SkillGroup } from "@/types/content";

export function About({
  intro,
  skillGroups,
  panels,
}: {
  intro: string;
  skillGroups: SkillGroup[];
  panels: EditorialPanel[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" aria-label="About" className="px-6 py-24 sm:px-12">
      <motion.div
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
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-display-lg">About</h2>
        <p className="text-muted mt-6 max-w-2xl text-lg">{intro}</p>

        <div className="mt-12 flex flex-wrap gap-10">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <p className="text-accent font-mono text-xs tracking-widest uppercase">
                {group.category}
              </p>
              <ul className="mt-3 flex max-w-xs flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border-border text-muted rounded-full border px-2.5 py-1 font-mono text-xs"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2">
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
            className={`flex min-h-[50vh] flex-col justify-start p-8 transition-[filter] duration-300 sm:p-12 ${
              hovered !== null && hovered !== i ? "grayscale" : ""
            }`}
            style={{
              background: "color-mix(in srgb, var(--accent) 5%, transparent)",
            }}
          >
            <p className="text-accent font-mono text-sm tracking-widest uppercase">
              {panel.eyebrow}
            </p>
            <h3 className="text-display-lg mt-2">{panel.headline}</h3>
            <p className="text-muted mt-4 max-w-md">{panel.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
