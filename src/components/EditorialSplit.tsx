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
          className={`relative flex min-h-[60vh] items-end overflow-hidden p-8 transition-[filter] duration-300 sm:p-12 ${
            hovered !== null && hovered !== i ? "grayscale" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG, swapped for next/image once real assets land */}
          <img
            src={panel.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="bg-background/50 absolute inset-0" />
          <div className="relative z-10">
            <p className="font-display text-accent tracking-widest uppercase">
              {panel.eyebrow}
            </p>
            <h2 className="text-display-lg mt-2">{panel.headline}</h2>
            <p className="text-muted mt-4 max-w-md">{panel.body}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
