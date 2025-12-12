"use client";

import { useEffect, useState } from "react";
import { useNavigationStore } from "@/store/navigation-store";
import { NavigationGrid } from "@/components/NavigationGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Cloud } from "lucide-react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { loadFromStorage, deleteCard } = useNavigationStore();

  useEffect(() => {
    loadFromStorage().then(() => {
      setIsLoading(false);
    });
  }, [loadFromStorage]);

  const handleEditCard = (id: string) => {
    console.log("Edit card:", id);
  };

  const handleDeleteCard = (id: string) => {
    if (confirm("确定要删除这个服务吗？")) {
      deleteCard(id);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* 头部 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-blue-500" />
            </div>
            <h1 className="text-lg font-semibold text-black dark:text-white">
              家庭云
            </h1>
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <NavigationGrid
          isLoading={isLoading}
          onEditCard={handleEditCard}
          onDeleteCard={handleDeleteCard}
        />
      </main>
    </div>
  );
}
