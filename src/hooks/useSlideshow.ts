"use client";

import { useCallback, useEffect, useState } from "react";

// Shared slide-state machine for the hero and news carousels: index,
// auto-advance, pause-on-hover, and a manual pause toggle.
export function useSlideshow(count: number, intervalMs = 6000) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  useEffect(() => {
    if (isPaused || isHovered || count <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPaused, isHovered, count, intervalMs]);

  return {
    index,
    goTo,
    isPaused,
    togglePause,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
}
