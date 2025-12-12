"use client";

import { motion } from "framer-motion";
import { cardVariants } from "@/lib/animations";

interface SimpleNavigationCardProps {
  title: string;
  onClick?: () => void;
}

export function SimpleNavigationCard({
  title,
  onClick,
}: SimpleNavigationCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-black/5 dark:border-white/10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
    >
      <h3 className="text-base font-medium text-black dark:text-white">
        {title}
      </h3>
    </motion.div>
  );
}
