import { Suspense } from "react";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { CoursesSection } from "@/components/dashboard/CoursesSection";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <BentoGrid>
        <Suspense fallback={<SkeletonGrid />}>
          <CoursesSection />
        </Suspense>
      </BentoGrid>
    </div>
  );
}
