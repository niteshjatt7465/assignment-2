"use client";

import {
  Layers,
  Code2,
  Network,
  Zap,
  BookOpen,
  Brain,
  Database,
  Globe,
  Cpu,
  BarChart,
  Shield,
  Rocket,
  Star,
  Terminal,
  Layout,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Code2,
  Network,
  Zap,
  BookOpen,
  Brain,
  Database,
  Globe,
  Cpu,
  BarChart,
  Shield,
  Rocket,
  Star,
  Terminal,
  Layout,
};

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function DynamicIcon({ name, size = 20, className }: DynamicIconProps) {
  const Icon = iconMap[name] ?? BookOpen;
  return <Icon size={size} className={className} />;
}
