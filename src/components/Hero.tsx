"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types/content";
import { useSlideshow } from "@/hooks/useSlideshow";
import { AuroraBackground } from "./AuroraBackground";
import { BrowserFrame } from "./BrowserFrame";

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

export function Hero({ projects }: { projects: Project[] }) {
  const {
    index,
    goTo,
    next,
    prev,
    isPaused,
    togglePause,
    prefersReducedMotion,
    onMouseEnter,
    onMouseLeave,
  } = useSlideshow(projects.length);
  const saveData = useSyncExternalStore(
    subscribeSaveData,
    getSaveDataSnapshot,
    getSaveDataServerSnapshot,
  );

  const project = projects[index];
  const media = project.media;
  if (!media) {
    throw new Error(
      `Hero project "${project.id}" is featured but has no media`,
    );
  }
  const useStaticImage =
    media.type === "image" || prefersReducedMotion || saveData;
  const fadeDistance = prefersReducedMotion ? 0 : 16;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        else if (e.key === "ArrowLeft") prev();
      }}
      className="relative isolate overflow-hidden px-6 py-24 sm:px-12 lg:min-h-[80vh] lg:py-0"
    >
      <AuroraBackground strong className="absolute inset-0 overflow-hidden" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:min-h-[80vh] lg:grid-cols-2 lg:gap-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: fadeDistance }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -fadeDistance }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            className="bg-background/95 border-border max-w-xl rounded-2xl border p-8 backdrop-blur-sm sm:p-10"
          >
            <p className="text-accent font-mono text-sm tracking-widest uppercase">
              {project.category}
            </p>
            <h1 className="text-display-xl mt-4">{project.title}</h1>
            <p className="text-muted mt-4 max-w-lg">{project.description}</p>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-underline font-display text-accent focus-visible:outline-accent mt-6 inline-block tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {project.linkLabel} &rarr;
            </a>
          </motion.div>
        </AnimatePresence>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_e, info) => {
            if (info.offset.x < -50) next();
            else if (info.offset.x > 50) prev();
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            >
              <BrowserFrame className="shadow-[0_0_60px_-20px_var(--accent-2)]">
                <div className="relative aspect-video w-full">
                  {useStaticImage ? (
                    <Image
                      src={media.fallbackImage}
                      alt={`${project.title} screenshot`}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="pointer-events-none object-cover"
                    />
                  ) : (
                    <video
                      src={media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="pointer-events-none h-full w-full object-cover"
                    />
                  )}
                </div>
              </BrowserFrame>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="relative z-10 mt-12 flex items-center gap-4 lg:absolute lg:right-12 lg:bottom-8 lg:mt-0">
        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={isPaused}
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            className="glass-card focus-visible:outline-accent flex h-11 w-11 items-center justify-center rounded-full transition-shadow hover:shadow-[0_0_20px_-6px_var(--accent-2)] focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {isPaused ? (
              <svg
                viewBox="0 0 16 16"
                className="ml-0.5 h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M3 2l11 6-11 6V2z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <rect x="3" y="2" width="3.5" height="12" />
                <rect x="9.5" y="2" width="3.5" height="12" />
              </svg>
            )}
          </button>
        )}
        <div role="tablist" aria-label="Projects" className="flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${p.title}`}
              onClick={() => goTo(i)}
              className="focus-visible:outline-accent grid h-11 w-11 place-items-center focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "from-accent to-accent-3 w-7 bg-gradient-to-r"
                    : "bg-muted/40 w-2.5"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
