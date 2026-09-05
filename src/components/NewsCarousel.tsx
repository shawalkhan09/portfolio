"use client";

import type { NewsItem } from "@/types/content";
import { useSlideshow } from "@/hooks/useSlideshow";

export function NewsCarousel({ items }: { items: NewsItem[] }) {
  const { index, goTo, isPaused, togglePause, onMouseEnter, onMouseLeave } =
    useSlideshow(items.length);
  const item = items[index];

  return (
    <section
      id="updates"
      aria-roledescription="carousel"
      aria-label="Recent updates"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col gap-8 px-6 py-24 sm:px-12"
    >
      <h2 className="text-display-lg">Updates</h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG, swapped for next/image once real assets land */}
        <img
          src={item.image}
          alt=""
          className="aspect-video w-full object-cover"
        />
        <div>
          {item.date && (
            <p className="text-muted text-sm uppercase">
              {item.category} &middot; {item.date}
            </p>
          )}
          {!item.date && (
            <p className="text-muted text-sm uppercase">{item.category}</p>
          )}
          <h3 className="font-display mt-2 text-2xl uppercase">{item.title}</h3>
          <p className="text-muted mt-4 max-w-md">{item.excerpt}</p>
          <a
            href={item.href}
            className="font-display text-accent focus-visible:outline-accent mt-6 inline-block tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Read more &rarr;
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={isPaused}
          aria-label={isPaused ? "Play updates" : "Pause updates"}
          className="font-display text-foreground focus-visible:outline-accent text-sm tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {isPaused ? "Play" : "Pause"}
        </button>
        <div role="tablist" aria-label="Updates" className="flex gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${it.title}`}
              onClick={() => goTo(i)}
              className={`focus-visible:outline-accent h-2 w-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 ${
                i === index ? "bg-accent" : "bg-muted/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
