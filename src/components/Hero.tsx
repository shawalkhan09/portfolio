"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/content";
import { useSlideshow } from "@/hooks/useSlideshow";
import { SITE_DESCRIPTION, SITE_NAME, VALUE_STATEMENT } from "@/lib/site";
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
  const introReduceMotion = useReducedMotion();

  const project = projects[index];
  const media = project.media;
  if (!media) {
    throw new Error(
      `Hero project "${project.id}" is featured but has no media`,
    );
  }
  const useStaticImage =
    media.type === "image" || prefersReducedMotion || saveData;

  return (
    <section
      aria-label="Introduction"
      className="relative isolate overflow-hidden px-6 py-24 sm:px-12 lg:pt-24 lg:pb-12"
    >
      <AuroraBackground strong className="absolute inset-0 overflow-hidden" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:min-h-[75vh] lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={introReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={introReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: introReduceMotion ? 0 : 0.5 }}
          className="max-w-xl"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase">
            {SITE_DESCRIPTION}
          </p>
          <h1 className="text-display-xl mt-4">{SITE_NAME}</h1>
          <p className="text-muted mt-4 max-w-lg">{VALUE_STATEMENT}</p>
          <a
            href="#work"
            className="link-underline font-display text-accent focus-visible:outline-accent mt-6 inline-block tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            View Work &rarr;
          </a>
        </motion.div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") next();
            else if (e.key === "ArrowLeft") prev();
          }}
        >
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
                <BrowserFrame className="shadow-[0_0_60px_-20px_var(--accent)]">
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
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-accent font-mono text-xs tracking-widest uppercase">
                      {project.category}
                    </p>
                    <p className="font-display text-lg uppercase">
                      {project.title}
                    </p>
                  </div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-display text-accent focus-visible:outline-accent shrink-0 text-sm tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {project.linkLabel} &rarr;
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-4">
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={togglePause}
                aria-pressed={isPaused}
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                className="glass-card focus-visible:outline-accent flex h-11 w-11 items-center justify-center rounded-full transition-shadow hover:shadow-[0_0_20px_-6px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4"
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
                      i === index ? "bg-accent w-7" : "bg-muted/40 w-2.5"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
