"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="flex max-w-md flex-col items-center gap-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <AlertTriangle size={24} className="text-red-400" />
        </div>

        <div>
          <h1 className="mb-2 text-lg font-semibold text-white">
            Something went wrong
          </h1>
          <p className="text-sm text-white/50">
            {error.message.includes("Failed to fetch")
              ? "Couldn't connect to the database. Make sure your Supabase environment variables are set correctly."
              : error.message}
          </p>
          {error.digest && (
            <p className="mt-2 text-xs text-white/25">Error ID: {error.digest}</p>
          )}
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </motion.div>
    </div>
  );
}
