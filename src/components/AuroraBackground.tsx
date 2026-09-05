export function AuroraBackground({
  className = "",
  strong = false,
}: {
  className?: string;
  strong?: boolean;
}) {
  const opacity1 = strong ? "opacity-20" : "opacity-10";
  const opacity2 = strong ? "opacity-15" : "opacity-[0.08]";

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div
        className={`aurora-blob-1 bg-accent absolute top-[-15%] right-[-10%] h-[50vh] w-[50vh] rounded-full ${opacity1} blur-3xl`}
      />
      <div
        className={`aurora-blob-2 bg-accent absolute right-[5%] bottom-[-20%] h-[45vh] w-[45vh] rounded-full ${opacity2} blur-3xl`}
      />
    </div>
  );
}
