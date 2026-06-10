"use client";

import { motion } from "framer-motion";
import { generateActivityData } from "@/lib/utils";
import { useMemo } from "react";
import { Activity } from "lucide-react";

const INTENSITY_CLASSES: Record<number, string> = {
  0: "bg-white/[0.04]",
  1: "bg-violet-500/20",
  2: "bg-violet-500/40",
  3: "bg-violet-500/65",
  4: "bg-violet-400 shadow-[0_0_4px_1px_rgba(167,139,250,0.4)]",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.004,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
};

export function ActivityTile() {
  const data = useMemo(() => generateActivityData(), []);

  const totalActive = data.filter((v) => v > 0).length;
  const totalCommits = data.reduce((sum, v) => sum + v, 0);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1017] p-5">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
              <Activity size={14} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white/90">Activity</h2>
              <p className="text-[10px] text-white/30">Last 12 weeks</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-violet-400">{totalCommits}</p>
            <p className="text-[10px] text-white/30">sessions</p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(7, 1fr)",
          }}
          aria-label={`Activity graph: ${totalActive} active days`}
        >
          {data.map((value, i) => (
            <motion.div
              key={i}
              variants={cellVariants}
              title={`${value} sessions`}
              className={`aspect-square rounded-[2px] ${INTENSITY_CLASSES[value] ?? INTENSITY_CLASSES[0]}`}
            />
          ))}
        </motion.div>

        <div className="mt-3 flex items-center justify-end gap-1.5">
          <span className="text-[10px] text-white/25">Less</span>
          {[0, 1, 2, 3, 4].map((v) => (
            <div
              key={v}
              className={`h-2.5 w-2.5 rounded-sm ${INTENSITY_CLASSES[v]}`}
            />
          ))}
          <span className="text-[10px] text-white/25">More</span>
        </div>
      </div>
    </article>
  );
}
