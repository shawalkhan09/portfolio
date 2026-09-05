export function AuroraBackground({
  className = "",
  strong = false,
}: {
  className?: string;
  strong?: boolean;
}) {
  const opacity1 = strong ? "opacity-25" : "opacity-10";
  const opacity2 = strong ? "opacity-20" : "opacity-10";

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div
        className={`aurora-blob-1 absolute top-[-15%] right-[-10%] h-[50vh] w-[50vh] rounded-full ${opacity1} blur-3xl`}
        style={{
          background:
            "radial-gradient(circle, var(--accent-2), transparent 70%)",
        }}
      />
      <div
        className={`aurora-blob-2 absolute right-[5%] bottom-[-20%] h-[45vh] w-[45vh] rounded-full ${opacity2} blur-3xl`}
        style={{
          background:
            "radial-gradient(circle, var(--accent-3), transparent 70%)",
        }}
      />
    </div>
  );
}
