"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { HeroSlide } from "@/types/content";
import { useSlideshow } from "@/hooks/useSlideshow";

type NavigatorConnection = {
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

function getConnection() {
  return (navigator as Navigator & { connection?: NavigatorConnection })
    .connection;
}

function subscribeSaveData(callback: () => void) {
  const connection = getConnection();
  connection?.addEventListener?.("change", callback);
  return () => connection?.removeEventListener?.("change", callback);
}

function getSaveDataSnapshot() {
  return !!getConnection()?.saveData;
}

function getSaveDataServerSnapshot() {
  return false;
}

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const { index, goTo, isPaused, togglePause, onMouseEnter, onMouseLeave } =
    useSlideshow(slides.length);
  const prefersReducedMotion = useReducedMotion();
  const saveData = useSyncExternalStore(
    subscribeSaveData,
    getSaveDataSnapshot,
    getSaveDataServerSnapshot,
  );

  const slide = slides[index];
  const useStaticImage =
    slide.media.type === "image" || prefersReducedMotion || saveData;

  return (
    <section
      id="work"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[80vh] items-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="absolute inset-0"
        >
          {useStaticImage ? (
            <Image
              src={slide.media.fallbackImage}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <video
              src={slide.media.src}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          )}
          <div className="bg-background/60 absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl px-6 sm:px-12">
        <p className="font-display text-accent tracking-widest uppercase">
          {slide.eyebrow}
        </p>
        <h1 className="text-display-xl mt-2">{slide.headline}</h1>
        <p className="text-muted mt-4 max-w-lg">{slide.description}</p>
        <a
          href={slide.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-accent focus-visible:outline-accent mt-6 inline-block tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {slide.linkLabel} &rarr;
        </a>
      </div>

      <div className="absolute right-8 bottom-8 z-10 flex items-center gap-4">
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={isPaused}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          className="font-display text-foreground focus-visible:outline-accent text-sm tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {isPaused ? "Play" : "Pause"}
        </button>
        <div role="tablist" aria-label="Slides" className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${s.headline}`}
              onClick={() => goTo(i)}
              className="focus-visible:outline-accent grid place-items-center p-2 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-accent" : "bg-muted/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
