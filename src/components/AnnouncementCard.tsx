"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { cardVariants } from "@/lib/animations";

interface AnnouncementCardProps {
  title: string;
  description: string;
  onInfoClick?: () => void;
}

export function AnnouncementCard({
  title,
  description,
  onInfoClick,
}: AnnouncementCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/10"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-black dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-black/60 dark:text-white/60">
            {description}
          </p>
        </div>
        <button
          onClick={onInfoClick}
          className="ml-4 p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
        >
          <Info className="w-5 h-5 text-black/40 dark:text-white/40" />
        </button>
      </div>
    </motion.div>
  );
}
