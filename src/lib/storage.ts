import type { NavigationCardData, Category, Theme } from "@/types";

const STORAGE_KEYS = {
  CARDS: "pwa-home-cards",
  CATEGORIES: "pwa-home-categories",
  THEME: "pwa-home-theme",
} as const;

// 默认分类
export const defaultCategories: Category[] = [
  { id: "media", name: "影音娱乐", order: 0, icon: "Film" },
  { id: "storage", name: "云存储", order: 1, icon: "HardDrive" },
  { id: "tools", name: "工具服务", order: 2, icon: "Wrench" },
];

// 默认卡片 - 空数组
export const defaultCards: NavigationCardData[] = [];

// 保存卡片到 localStorage
export function saveCards(cards: NavigationCardData[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  } catch (error) {
    console.error("Failed to save cards:", error);
  }
}

// 从 localStorage 加载卡片
export function loadCards(): NavigationCardData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CARDS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load cards:", error);
  }
  return defaultCards;
}

// 保存分类到 localStorage
export function saveCategories(categories: Category[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error("Failed to save categories:", error);
  }
}

// 从 localStorage 加载分类
export function loadCategories(): Category[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
  return defaultCategories;
}

// 保存主题到 localStorage
export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error("Failed to save theme:", error);
  }
}

// 从 localStorage 加载主题
export function loadTheme(): Theme {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.THEME);
    if (data && ["light", "dark", "system"].includes(data)) {
      return data as Theme;
    }
  } catch (error) {
    console.error("Failed to load theme:", error);
  }
  return "system";
}
