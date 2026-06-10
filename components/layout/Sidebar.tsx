"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  GraduationCap,
  Bell,
  Trophy,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "#" },
  { id: "progress", label: "Progress", icon: BarChart2, href: "#" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "#" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative hidden h-screen flex-shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0d13] lg:flex"
      style={{ display: "flex" }}
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center gap-3 px-4 border-b border-white/[0.06]">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
          <GraduationCap size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="whitespace-nowrap text-sm font-semibold text-white"
            >
              LearnFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <ul className="flex flex-1 flex-col gap-1 overflow-hidden px-2 py-4" role="list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveId(item.id)}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.10]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 flex-shrink-0 ${isActive ? "text-violet-400" : ""}`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-white/[0.06] p-2">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white/70"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ChevronLeft size={16} />
          </motion.span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>
  );
}
