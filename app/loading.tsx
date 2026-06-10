/**
 * loading.tsx — Shown by Next.js while the page is streaming.
 * Mirrors the exact layout of the dashboard to prevent CLS.
 */

import { SkeletonGrid } from "@/components/ui/SkeletonCard";

export default function DashboardLoading() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Hero skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="h-52 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />
        </div>

        {/* Activity skeleton */}
        <div className="col-span-1">
          <div className="h-52 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />
        </div>

        {/* Section label */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="h-5 w-32 animate-pulse rounded-lg bg-white/[0.06]" />
        </div>

        {/* Course card skeletons */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <SkeletonGrid />
        </div>
      </div>
    </div>
  );
}
