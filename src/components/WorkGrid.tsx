"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/content";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="px-6 py-24 sm:px-12"
    >
      <h2 className="text-display-lg">Selected Work</h2>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
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
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-card focus-visible:outline-accent group block overflow-hidden rounded-xl transition-shadow hover:shadow-[0_0_40px_-14px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {project.media && (
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={project.media.fallbackImage}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <p className="text-accent font-mono text-xs tracking-widest uppercase">
                {project.category}
              </p>
              <h3 className="font-display mt-2 text-xl uppercase">
                {project.title}
              </h3>
              <p className="text-muted mt-2 text-sm">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stackTags.map((tag) => (
                  <li
                    key={tag}
                    className="border-border text-muted rounded-full border px-2.5 py-1 font-mono text-xs"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <span className="link-underline font-display text-accent mt-4 inline-block text-sm tracking-wide uppercase">
                {project.linkLabel} &rarr;
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
