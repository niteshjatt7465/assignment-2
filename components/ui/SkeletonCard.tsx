export function SkeletonCard() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="mb-4 h-10 w-10 animate-pulse rounded-xl bg-white/10" />
      <div className="mb-2 h-4 w-3/4 animate-pulse rounded-lg bg-white/10" />
      <div className="mb-6 h-3 w-1/2 animate-pulse rounded-lg bg-white/[0.06]" />
      <div className="mb-2 h-1.5 w-full animate-pulse rounded-full bg-white/10" />
      <div className="h-3 w-10 animate-pulse rounded-md bg-white/[0.06]" />
    </article>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
