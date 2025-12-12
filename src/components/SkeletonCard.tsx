"use client";

import { cn } from "@/lib/utils";

export function SkeletonCard() {
    return (
        <div
            className={cn(
                "rounded-2xl p-4 animate-pulse",
                "bg-zinc-100 dark:bg-zinc-800",
                "border border-zinc-200 dark:border-zinc-700"
            )}
        >
            <div className="flex flex-col items-center gap-3">
                {/* 图标骨架 */}
                <div className="w-14 h-14 rounded-xl bg-zinc-200 dark:bg-zinc-700" />

                {/* 标题骨架 */}
                <div className="w-20 h-4 rounded bg-zinc-200 dark:bg-zinc-700" />

                {/* 描述骨架 */}
                <div className="w-16 h-3 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
        </div>
    );
}

export function SkeletonGrid() {
    return (
        <div className="space-y-8">
            {[1, 2].map((section) => (
                <div key={section} className="space-y-4">
                    {/* 分类标题骨架 */}
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        <div className="w-24 h-5 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                    </div>

                    {/* 卡片网格骨架 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[1, 2, 3, 4].map((card) => (
                            <SkeletonCard key={card} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
