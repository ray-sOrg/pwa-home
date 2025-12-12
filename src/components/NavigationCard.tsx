"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
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

// 图标颜色映射
const iconColors: Record<string, string> = {
    Tv: "from-purple-500 to-purple-600",
    Film: "from-pink-500 to-pink-600",
    Image: "from-green-500 to-green-600",
    FolderOpen: "from-yellow-500 to-yellow-600",
    HardDrive: "from-blue-500 to-blue-600",
    Cloud: "from-cyan-500 to-cyan-600",
    Music: "from-red-500 to-red-600",
    Video: "from-orange-500 to-orange-600",
    FileText: "from-teal-500 to-teal-600",
    Server: "from-indigo-500 to-indigo-600",
    Database: "from-violet-500 to-violet-600",
    Globe: "from-emerald-500 to-emerald-600",
    Settings: "from-gray-500 to-gray-600",
    Link: "from-blue-500 to-blue-600",
    Home: "from-blue-500 to-blue-600",
    Wrench: "from-gray-500 to-gray-600",
    Folder: "from-blue-400 to-blue-500",
};

export function NavigationCard({
    card,
    isEditMode,
    onEdit,
    onDelete,
}: NavigationCardProps) {
    const IconComponent = getIcon(card.icon);
    const colorClass = iconColors[card.icon] || "from-blue-500 to-blue-600";

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
                "bg-gray-50 hover:bg-gray-100",
                "dark:bg-white/5 dark:hover:bg-white/10",
                "transition-all duration-200",
                isEditMode && "ring-2 ring-blue-500/50"
            )}
            onClick={handleClick}
        >
            {/* 编辑模式控制按钮 */}
            {isEditMode && (
                <div className="absolute -top-2 -right-2 flex gap-1 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(card.id);
                        }}
                        className="p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        <Pencil className="w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(card.id);
                        }}
                        className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
            )}

            {/* 卡片内容 */}
            <div className="flex flex-col items-center text-center gap-3">
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br",
                        colorClass,
                        "text-white shadow-lg"
                    )}
                >
                    <IconComponent className="w-6 h-6" />
                </div>

                <span className="text-black dark:text-white text-sm font-medium truncate w-full">
                    {card.name}
                </span>
            </div>
        </motion.div>
    );
}
