"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface AnimatedProgressBarProps {
  progress: number;
  className?: string;
}

export function AnimatedProgressBar({ progress, className }: AnimatedProgressBarProps) {
  const width = useMotionValue(0);
  const widthPercent = useTransform(width, (v) => `${v}%`);

  useEffect(() => {
    const controls = animate(width, progress, {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.4,
    });
    return controls.stop;
  }, [progress, width]);

  return (
    <div
      className={`relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 ${className ?? ""}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: widthPercent,
          background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
          boxShadow: "0 0 8px 1px rgba(139,92,246,0.6)",
        }}
      />
    </div>
  );
}
