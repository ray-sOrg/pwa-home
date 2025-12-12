"use client";

import { createContext, useContext, useLayoutEffect, useMemo, useReducer } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
}

type Action = { type: "SET"; theme: Theme } | { type: "TOGGLE" };

function themeReducer(state: Theme, action: Action): Theme {
    switch (action.type) {
        case "SET":
            return action.theme;
        case "TOGGLE":
            return state === "dark" ? "light" : "dark";
        default:
            return state;
    }
}

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, dispatch] = useReducer(themeReducer, "light");

    // 初始化
    useLayoutEffect(() => {
        const stored = localStorage.getItem("theme");
        let initial: Theme = "light";

        if (stored === "light" || stored === "dark") {
            initial = stored;
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            initial = "dark";
        }

        dispatch({ type: "SET", theme: initial });
        applyTheme(initial);
    }, []);

    // 主题变化时同步 DOM 和 localStorage
    useLayoutEffect(() => {
        applyTheme(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const value = useMemo(() => ({
        theme,
        toggleTheme: () => dispatch({ type: "TOGGLE" }),
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
