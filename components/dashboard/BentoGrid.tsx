"use client";

import { motion } from "framer-motion";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

interface BentoGridProps {
  children: React.ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Dashboard bento grid"
    >
      <motion.div variants={tileVariants} className="col-span-1 md:col-span-2 lg:col-span-2">
        <HeroTile />
      </motion.div>

      <motion.div variants={tileVariants} className="col-span-1">
        <ActivityTile />
      </motion.div>

      <motion.div variants={tileVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white/80">Active Courses</h2>
          <button className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
            View all →
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={tileVariants}
        className="col-span-1 md:col-span-2 lg:col-span-3"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
