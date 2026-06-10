"use client";

import { motion } from "framer-motion";
import { type Course } from "@/lib/supabase/types";
import { DynamicIcon } from "@/components/icons/DynamicIcon";
import { AnimatedProgressBar } from "@/components/ui/AnimatedProgressBar";
import { ArrowUpRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1017] p-5 cursor-pointer"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.08) 0%, transparent 60%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.35)" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
            <DynamicIcon name={course.icon_name} size={18} className="text-violet-400" />
          </div>
          <span className="text-white/20 transition-colors group-hover:text-violet-400">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <h2 className="mb-1 text-sm font-semibold leading-snug text-white/90 line-clamp-2">
          {course.title}
        </h2>
        <p className="mb-4 text-xs text-white/35">Continue learning</p>

        <AnimatedProgressBar progress={course.progress} />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-white/30">Progress</span>
          <span className="text-xs font-semibold text-violet-400">{course.progress}%</span>
        </div>
      </div>
    </motion.article>
  );
}
