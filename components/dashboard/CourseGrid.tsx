"use client";

import { motion } from "framer-motion";
import { type Course } from "@/lib/supabase/types";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { BookOpen } from "lucide-react";

interface CourseGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16 text-center">
        <BookOpen size={32} className="text-white/20" />
        <p className="text-sm text-white/30">No courses found</p>
        <p className="text-xs text-white/20">
          Add courses in your Supabase dashboard to get started.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </motion.div>
  );
}
