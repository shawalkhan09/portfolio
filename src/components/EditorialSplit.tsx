"use client";

import { useState } from "react";
import type { EditorialPanel } from "@/types/content";

export function EditorialSplit({ panels }: { panels: EditorialPanel[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="about"
      aria-label="About"
      className="grid grid-cols-1 sm:grid-cols-2"
    >
      {panels.map((panel, i) => (
        <div
          key={panel.id}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className={`border-border flex min-h-[60vh] flex-col justify-end p-8 transition-[filter] duration-300 sm:border-l sm:p-12 sm:first:border-l-0 ${
            hovered !== null && hovered !== i ? "grayscale" : ""
          }`}
        >
          <p className="font-display text-accent tracking-widest uppercase">
            {panel.eyebrow}
          </p>
          <h2 className="text-display-lg mt-2">{panel.headline}</h2>
          <p className="text-muted mt-4 max-w-md">{panel.body}</p>
        </div>
      ))}
    </section>
  );
}
