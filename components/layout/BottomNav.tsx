"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
} from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart2 },
  { id: "achievements", label: "Awards", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-[#0a0d13]/95 backdrop-blur-xl lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around px-2 py-2" role="list">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveId(item.id)}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    className="absolute inset-0 rounded-xl bg-violet-500/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-violet-400" : "text-white/40"
                  }`}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium transition-colors ${
                    isActive ? "text-violet-400" : "text-white/30"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
