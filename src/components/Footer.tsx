import { navSections } from "@/data/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t px-6 py-16 sm:px-12">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="font-display tracking-widest uppercase">
              {section.href ? (
                <a
                  href={section.href}
                  className="focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {section.label}
                </a>
              ) : (
                section.label
              )}
            </p>
            {section.links.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted hover:text-accent focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <p className="text-muted mt-16 text-sm">&copy; {year} Portfolio</p>
    </footer>
  );
}
