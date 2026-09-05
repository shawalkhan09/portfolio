"use client";

import { useEffect, useRef, useState } from "react";
import { navSections } from "@/data/nav";
import { SITE_NAME } from "@/lib/site";
import { MenuOverlay } from "./MenuOverlay";

const siteLinks = navSections.filter((section) => section.href);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-200 ${
          isScrolled
            ? "bg-background/90 border-border border-b backdrop-blur-sm"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="font-display text-display-sm focus-visible:outline-accent uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {SITE_NAME}
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="font-display focus-visible:outline-accent text-sm tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <MenuOverlay
        sections={siteLinks}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={toggleRef}
      />
    </>
  );
}
