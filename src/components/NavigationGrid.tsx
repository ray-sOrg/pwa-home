"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigationStore } from "@/store/navigation-store";
import { CategorySection } from "./CategorySection";
import { SkeletonGrid } from "./SkeletonCard";
import { groupCardsByCategory, filterCardsBySearch } from "@/lib/grouping";
import { fadeIn } from "@/lib/animations";
import { SearchX } from "lucide-react";

interface NavigationGridProps {
    onEditCard?: (id: string) => void;
    onDeleteCard?: (id: string) => void;
    isLoading?: boolean;
}

export function NavigationGrid({
    onEditCard,
    onDeleteCard,
    isLoading = false,
}: NavigationGridProps) {
    const { cards, categories, isEditMode, searchQuery } = useNavigationStore();

    // 过滤和分组卡片
    const groupedCards = useMemo(() => {
        const filteredCards = filterCardsBySearch(cards, searchQuery);
        return groupCardsByCategory(filteredCards, categories);
    }, [cards, categories, searchQuery]);

    // 加载状态
    if (isLoading) {
        return <SkeletonGrid />;
    }

    // 空状态
    if (groupedCards.size === 0) {
        return (
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-20 text-zinc-500"
            >
                <SearchX className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">
                    {searchQuery ? "没有找到匹配的服务" : "还没有添加任何服务"}
                </p>
                <p className="text-sm mt-1">
                    {searchQuery ? "试试其他关键词" : "点击右上角添加你的第一个服务"}
                </p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-8">
            {Array.from(groupedCards.entries()).map(([category, categoryCards]) => (
                <CategorySection
                    key={category.id}
                    category={category}
                    cards={categoryCards}
                    isEditMode={isEditMode}
                    onEditCard={onEditCard}
                    onDeleteCard={onDeleteCard}
                />
            ))}
        </div>
    );
}
