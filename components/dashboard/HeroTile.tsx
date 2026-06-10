"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Flame, Zap } from "lucide-react";

const STREAK_DAYS = 12;

export function HeroTile() {
  const [count, setCount] = useState(0);
  const motionCount = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionCount, STREAK_DAYS, {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.6,
      onUpdate: (latest) => setCount(Math.floor(latest)),
    });
    return controls.stop;
  }, [motionCount]);

  return (
    <article className="relative col-span-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0f1118] to-[#12101f] p-6 md:col-span-2 lg:col-span-2">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, #4f46e5 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full opacity-15 blur-3xl"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, #7c3aed 40%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Zap size={11} className="text-violet-400" />
            Today&apos;s Focus
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Alex
            </span>{" "}
            👋
          </h1>
          <p className="mt-2 text-sm text-white/40">
            You&apos;ve been on a roll. Keep the momentum going!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-5 py-3.5">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Flame size={28} className="text-orange-400" />
            </motion.div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums text-white">{count}</span>
                <span className="text-sm font-medium text-white/50">days</span>
              </div>
              <p className="text-xs text-orange-300/70">Learning streak</p>
            </div>
          </div>

          <div className="flex gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.07, type: "spring", stiffness: 400, damping: 20 }}
                className={`h-2.5 w-2.5 rounded-full ${
                  i < 5
                    ? "bg-orange-400 shadow-[0_0_6px_1px_rgba(251,146,60,0.5)]"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
