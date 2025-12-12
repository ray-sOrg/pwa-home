"use client";

import { Home as HomeIcon } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

export default function PhotosPage() {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    router.push(`/${tab === "home" ? "" : tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors pb-20">
      {/* 头部 */}
      <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-black/5 dark:border-white/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <HomeIcon className="w-5 h-5 text-black dark:text-white" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
          Photos
        </h1>
        <p className="text-black/60 dark:text-white/60">
          Photos page content will be here.
        </p>
      </main>

      {/* 底部导航 */}
      <BottomNavigation activeTab="photos" onTabChange={handleTabChange} />
    </div>
  );
}
