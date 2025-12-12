"use client";

import { useEffect, useState } from "react";
import { useNavigationStore } from "@/store/navigation-store";
import { NavigationGrid } from "@/components/NavigationGrid";
import { Home } from "lucide-react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { loadFromStorage, deleteCard } = useNavigationStore();

  useEffect(() => {
    loadFromStorage().then(() => {
      setIsLoading(false);
    });
  }, [loadFromStorage]);

  const handleEditCard = (id: string) => {
    // TODO: 打开编辑弹窗
    console.log("Edit card:", id);
  };

  const handleDeleteCard = (id: string) => {
    if (confirm("确定要删除这个服务吗？")) {
      deleteCard(id);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* 头部 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
              <Home className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              家庭导航
            </h1>
          </div>

          {/* TODO: 添加搜索栏和设置按钮 */}
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <NavigationGrid
          isLoading={isLoading}
          onEditCard={handleEditCard}
          onDeleteCard={handleDeleteCard}
        />
      </main>
    </div>
  );
}
