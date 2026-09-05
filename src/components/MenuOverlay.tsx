"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { NavSection } from "@/types/content";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MenuOverlay({
  sections,
  isOpen,
  onClose,
  triggerRef,
}: {
  sections: NavSection[];
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="bg-background fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto px-10 py-8"
        initial={false}
        animate={
          isOpen
            ? { x: 0, opacity: 1 }
            : { x: prefersReducedMotion ? 0 : 40, opacity: 0 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 0.25,
          ease: "easeOut",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="font-display focus-visible:outline-accent self-end text-sm tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Close
        </button>
        <nav
          aria-label="Primary"
          className="flex flex-1 flex-col justify-center"
        >
          <ul className="flex flex-col gap-6">
            {sections.map((section) => (
              <li key={section.label}>
                <a
                  href={section.href}
                  onClick={onClose}
                  className="font-display text-display-md focus-visible:outline-accent hover:text-accent block uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
}
