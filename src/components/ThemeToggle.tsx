"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            title={theme === "dark" ? "切换到浅色" : "切换到深色"}
        >
            {theme === "dark" ? (
                <Moon className="w-5 h-5 text-white/60" />
            ) : (
                <Sun className="w-5 h-5 text-black/60" />
            )}
        </button>
    );
}
