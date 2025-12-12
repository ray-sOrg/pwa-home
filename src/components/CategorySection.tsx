"use client";

import { motion } from "framer-motion";
import type { Category, NavigationCardData } from "@/types";
import { NavigationCard } from "./NavigationCard";
import { staggerContainer } from "@/lib/animations";
import { getCategoryIcon } from "@/lib/icons";

interface CategorySectionProps {
    category: Category;
    cards: NavigationCardData[];
    isEditMode: boolean;
    onEditCard?: (id: string) => void;
    onDeleteCard?: (id: string) => void;
}

export function CategorySection({
    category,
    cards,
    isEditMode,
    onEditCard,
    onDeleteCard,
}: CategorySectionProps) {
    const IconComponent = getCategoryIcon(category.icon);

    return (
        <section className="space-y-4">
            {/* 分类标题 */}
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <IconComponent className="w-5 h-5" />
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <span className="text-sm text-zinc-400">({cards.length})</span>
            </div>

            {/* 卡片网格 */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
                {cards.map((card) => (
                    <NavigationCard
                        key={card.id}
                        card={card}
                        isEditMode={isEditMode}
                        onEdit={onEditCard}
                        onDelete={onDeleteCard}
                    />
                ))}
            </motion.div>
        </section>
    );
}
