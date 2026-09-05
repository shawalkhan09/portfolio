import { AuroraBackground } from "./AuroraBackground";

const EMAIL = "shawalbusiness@gmail.com";

export function ContactCta() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="border-border relative isolate flex flex-col items-center gap-6 overflow-hidden border-t px-6 py-32 text-center"
    >
      <AuroraBackground className="absolute inset-0 overflow-hidden" />

      <h2 className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 leading-none whitespace-nowrap opacity-[0.07]"
          style={{ fontSize: "clamp(3rem, 13vw, 10rem)" }}
        >
          Let&rsquo;s work together
        </span>
        <span className="text-display-xl">Let&rsquo;s work together</span>
      </h2>

      <p className="text-muted relative max-w-md">
        Open to freelance and collaboration opportunities.
      </p>

      <a
        href={`mailto:${EMAIL}`}
        className="glass-card focus-visible:outline-accent relative mt-2 inline-flex items-center gap-2 rounded-full px-8 py-4 text-2xl transition-shadow hover:shadow-[0_0_36px_-10px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <span className="font-display text-accent tracking-wide uppercase">
          Get in touch
        </span>
        <span aria-hidden="true" className="font-display text-accent">
          &rarr;
        </span>
      </a>
    </section>
  );
}
