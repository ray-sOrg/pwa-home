"use client";

import { Home, Image, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/LanguageProvider";

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navItemsConfig = [
  { id: "home", labelKey: "home" as const, icon: Home },
  { id: "photos", labelKey: "photos" as const, icon: Image },
  { id: "videos", labelKey: "videos" as const, icon: Video },
  { id: "documents", labelKey: "documents" as const, icon: FileText },
];

export function BottomNavigation({
  activeTab = "home",
  onTabChange,
}: BottomNavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-black/5 dark:border-white/10 safe-area-inset-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around px-4 py-2">
        {navItemsConfig.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors",
                isActive
                  ? "text-blue-500"
                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{t.common[item.labelKey]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
