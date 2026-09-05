const EMAIL = "shawalbusiness@gmail.com";

export function ContactCta() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="border-border flex flex-col items-center gap-6 border-t px-6 py-32 text-center"
    >
      <h2 className="text-display-xl">Let&rsquo;s work together</h2>
      <p className="text-muted max-w-md">
        Open to freelance and collaboration opportunities.
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="font-display text-accent focus-visible:outline-accent text-2xl tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Get in touch &rarr;
      </a>
    </section>
  );
}
