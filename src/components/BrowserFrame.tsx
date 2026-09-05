export function BrowserFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-card overflow-hidden rounded-xl ${className}`}>
      <div
        aria-hidden="true"
        className="border-border flex items-center gap-1.5 border-b px-4 py-2.5"
      >
        <span className="bg-muted/40 h-2.5 w-2.5 rounded-full" />
        <span className="bg-muted/40 h-2.5 w-2.5 rounded-full" />
        <span className="bg-muted/40 h-2.5 w-2.5 rounded-full" />
      </div>
      {children}
    </div>
  );
}
