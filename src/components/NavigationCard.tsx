"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import type { NavigationCardData } from "@/types";
import { cardVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

interface NavigationCardProps {
    card: NavigationCardData;
    isEditMode: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function NavigationCard({
    card,
    isEditMode,
    onEdit,
    onDelete,
}: NavigationCardProps) {
    const IconComponent = getIcon(card.icon);

    const handleClick = () => {
        if (!isEditMode) {
            window.open(card.url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={isEditMode ? undefined : "hover"}
            whileTap={isEditMode ? undefined : "tap"}
            className={cn(
                "relative group rounded-2xl p-4 cursor-pointer",
                "bg-white dark:bg-zinc-800",
                "border border-zinc-200 dark:border-zinc-700",
                "shadow-sm hover:shadow-lg transition-shadow",
                isEditMode && "ring-2 ring-blue-500/50"
            )}
            onClick={handleClick}
        >
            {/* 编辑模式控制按钮 */}
            {isEditMode && (
                <div className="absolute -top-2 -right-2 flex gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(card.id);
                        }}
                        className="p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(card.id);
                        }}
                        className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* 拖拽手柄 */}
            {isEditMode && (
                <div className="absolute top-2 left-2 cursor-grab active:cursor-grabbing text-zinc-400">
                    <GripVertical className="w-4 h-4" />
                </div>
            )}

            {/* 卡片内容 */}
            <div className="flex flex-col items-center text-center gap-3">
                <div
                    className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br from-blue-500 to-blue-600",
                        "text-white shadow-md"
                    )}
                >
                    <IconComponent className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                        {card.name}
                    </h3>
                    {card.description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {card.description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
