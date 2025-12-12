"use client";

import { motion } from "framer-motion";
import type { Category, NavigationCardData } from "@/types";
import { NavigationCard } from "./NavigationCard";
import { staggerContainer } from "@/lib/animations";

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
    return (
        <section className="space-y-3">
            {/* 分类标题 */}
            <h2 className="text-black/50 dark:text-white/50 text-sm font-medium px-1">
                {category.name}
            </h2>

            {/* 卡片网格 */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-4 gap-3"
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
