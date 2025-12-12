"use client";

import { Home as HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { HistoryCard } from "@/components/HistoryCard";
import { SimpleNavigationCard } from "@/components/SimpleNavigationCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  const router = useRouter();

  const handleAnnouncementInfo = () => {
    console.log("Show announcement details");
  };

  const handleNavigationClick = (section: string) => {
    router.push(`/${section}`);
  };

  const handleTabChange = (tab: string) => {
    router.push(`/${tab === "home" ? "" : tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors pb-20">
      {/* 头部 */}
      <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-black/5 dark:border-white/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
            <HomeIcon className="w-5 h-5 text-black dark:text-white" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Announcements */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-4">
            Announcements
          </h2>
          <AnnouncementCard
            title="New Family Cloud Features Released"
            description="Explore the latest updates in our family cloud."
            onInfoClick={handleAnnouncementInfo}
          />
        </section>

        {/* Recent Browsing History */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-4">
            Recent Browsing History
          </h2>
          <HistoryCard description="Check out what your family has been viewing." />
        </section>

        {/* Navigation */}
        <section>
          <h2 className="text-xl font-bold text-black dark:text-white mb-4">
            Navigation
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <SimpleNavigationCard
              title="Home"
              onClick={() => handleNavigationClick("home")}
            />
            <SimpleNavigationCard
              title="Photos"
              onClick={() => handleNavigationClick("photos")}
            />
            <SimpleNavigationCard
              title="Videos"
              onClick={() => handleNavigationClick("videos")}
            />
            <SimpleNavigationCard
              title="Documents"
              onClick={() => handleNavigationClick("documents")}
            />
          </div>
        </section>
      </main>

      {/* 底部导航 */}
      <BottomNavigation activeTab="home" onTabChange={handleTabChange} />
    </div>
  );
}
