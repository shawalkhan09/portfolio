"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { NewsItem } from "@/types/content";
import { useSlideshow } from "@/hooks/useSlideshow";

export function NewsCarousel({ items }: { items: NewsItem[] }) {
  const {
    index,
    goTo,
    next,
    prev,
    isPaused,
    togglePause,
    onMouseEnter,
    onMouseLeave,
  } = useSlideshow(items.length);
  const prefersReducedMotion = useReducedMotion();
  const item = items[index];

  return (
    <section
      id="updates"
      aria-roledescription="carousel"
      aria-label="Recent updates"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        else if (e.key === "ArrowLeft") prev();
      }}
      className="flex flex-col gap-8 px-6 py-24 sm:px-12"
    >
      <h2 className="text-display-lg">Updates</h2>

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
        className="glass-card grid grid-cols-1 gap-6 overflow-hidden rounded-xl p-6 sm:grid-cols-2 sm:p-8"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={`${item.title} preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          {item.date ? (
            <p className="text-accent font-mono text-xs tracking-widest uppercase">
              {item.category} · {item.date}
            </p>
          ) : (
            <p className="text-accent font-mono text-xs tracking-widest uppercase">
              {item.category}
            </p>
          )}
          <h3 className="font-display mt-2 text-2xl uppercase">{item.title}</h3>
          <p className="text-muted mt-4 max-w-md">{item.excerpt}</p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-display text-accent focus-visible:outline-accent mt-6 inline-block tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Read more &rarr;
          </a>
        </div>
      </motion.div>

      {items.length > 1 && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={isPaused}
            aria-label={isPaused ? "Play updates" : "Pause updates"}
            className="text-foreground focus-visible:outline-accent font-mono text-xs tracking-widest uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
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
                className="focus-visible:outline-accent grid h-11 w-11 place-items-center focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "bg-accent w-7" : "bg-muted/40 w-2.5"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
