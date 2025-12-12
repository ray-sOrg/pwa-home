"use client";

import { motion } from "framer-motion";
import { cardVariants } from "@/lib/animations";

interface HistoryCardProps {
  description: string;
}

export function HistoryCard({ description }: HistoryCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/10"
    >
      <p className="text-sm text-black/60 dark:text-white/60">
        {description}
      </p>
    </motion.div>
  );
}
