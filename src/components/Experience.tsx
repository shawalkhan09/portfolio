"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ExperienceEntry } from "@/types/content";

function EntryList({ entries }: { entries: ExperienceEntry[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ul className="border-border divide-border mt-8 max-w-2xl divide-y border-t">
      {entries.map((entry, i) => (
        <motion.li
          key={entry.id}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <div>
            <p className="font-display text-xl uppercase">{entry.role}</p>
            <p className="text-muted">{entry.org}</p>
            {entry.description && (
              <p className="text-muted mt-1 text-sm">{entry.description}</p>
            )}
          </div>
          {entry.period && (
            <p className="text-accent shrink-0 font-mono text-sm">
              {entry.period}
            </p>
          )}
        </motion.li>
      ))}
    </ul>
  );
}

export function Experience({
  entries,
  education,
}: {
  entries: ExperienceEntry[];
  education: ExperienceEntry[];
}) {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="px-6 py-24 sm:px-12"
    >
      <h2 className="text-display-lg">Experience</h2>
      <EntryList entries={entries} />

      {education.length > 0 && (
        <>
          <h3 className="font-display mt-16 text-2xl uppercase">Education</h3>
          <EntryList entries={education} />
        </>
      )}
    </section>
  );
}
