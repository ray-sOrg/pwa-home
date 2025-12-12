"use client";

import { Home, Image, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "photos", label: "Photos", icon: Image },
  { id: "videos", label: "Videos", icon: Video },
  { id: "documents", label: "Documents", icon: FileText },
];

export function BottomNavigation({
  activeTab = "home",
  onTabChange,
}: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-black/5 dark:border-white/10 safe-area-inset-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
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
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
