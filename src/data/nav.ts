import type { NavSection } from "@/types/content";

// Single source of truth for the header nav and the footer (Phase 04
// extends this with an external-links section for GitHub/LinkedIn/etc).
export const navSections: NavSection[] = [
  { label: "Work", href: "#work", links: [] },
  { label: "About", href: "#about", links: [] },
  { label: "Updates", href: "#updates", links: [] },
  { label: "Contact", href: "#contact", links: [] },
];
