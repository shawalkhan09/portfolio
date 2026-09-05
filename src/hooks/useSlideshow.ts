"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Shared slide-state machine for the hero and news carousels: index,
// auto-advance, pause-on-hover, and a manual pause toggle. Auto-advance
// never runs under prefers-reduced-motion, regardless of pause state.
export function useSlideshow(count: number, intervalMs = 6000) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  useEffect(() => {
    if (isPaused || isHovered || prefersReducedMotion || count <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPaused, isHovered, prefersReducedMotion, count, intervalMs]);

  return {
    index,
    goTo,
    next,
    prev,
    isPaused,
    togglePause,
    prefersReducedMotion,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
}
