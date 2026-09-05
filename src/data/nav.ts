import type { NavSection } from "@/types/content";

// Single source of truth for the header nav and the footer. Sections
// with an `href` are flat top-level links (the header renders these);
// the footer renders every section, including grouped ones like
// "Elsewhere" below.
export const navSections: NavSection[] = [
  { label: "Work", href: "#work", links: [] },
  { label: "About", href: "#about", links: [] },
  { label: "Updates", href: "#updates", links: [] },
  { label: "Contact", href: "#contact", links: [] },
  {
    label: "Elsewhere",
    links: [
      // TODO: replace with real profile/resume URLs.
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Resume", href: "#" },
      { label: "Freelance", href: "#" },
    ],
  },
];
