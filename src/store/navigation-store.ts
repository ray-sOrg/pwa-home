import { create } from "zustand";
import type { AppState, NavigationCardData, Category, Theme } from "@/types";
import {
  saveCards,
  loadCards,
  saveCategories,
  loadCategories,
  saveTheme,
  loadTheme,
  defaultCards,
  defaultCategories,
} from "@/lib/storage";

// 生成唯一 ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useNavigationStore = create<AppState>((set, get) => ({
  // 初始状态
  cards: defaultCards,
  categories: defaultCategories,
  isEditMode: false,
  searchQuery: "",
  theme: "system",

  // 卡片操作
  addCard: (cardData) => {
    const newCard: NavigationCardData = {
      ...cardData,
      id: generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set((state) => {
      const newCards = [...state.cards, newCard];
      saveCards(newCards);
      return { cards: newCards };
    });
  },

  updateCard: (id, updates) => {
    set((state) => {
      const newCards = state.cards.map((card) =>
        card.id === id ? { ...card, ...updates, updatedAt: Date.now() } : card
      );
      saveCards(newCards);
      return { cards: newCards };
    });
  },

  deleteCard: (id) => {
    set((state) => {
      const newCards = state.cards.filter((card) => card.id !== id);
      saveCards(newCards);
      return { cards: newCards };
    });
  },

  reorderCards: (categoryId, cardIds) => {
    set((state) => {
      const newCards = state.cards.map((card) => {
        if (card.categoryId === categoryId) {
          const newOrder = cardIds.indexOf(card.id);
          if (newOrder !== -1) {
            return { ...card, order: newOrder, updatedAt: Date.now() };
          }
        }
        return card;
      });
      saveCards(newCards);
      return { cards: newCards };
    });
  },

  // 分类操作
  addCategory: (categoryData) => {
    const newCategory: Category = {
      ...categoryData,
      id: generateId(),
    };
    set((state) => {
      const newCategories = [...state.categories, newCategory];
      saveCategories(newCategories);
      return { categories: newCategories };
    });
  },

  updateCategory: (id, updates) => {
    set((state) => {
      const newCategories = state.categories.map((cat) =>
        cat.id === id ? { ...cat, ...updates } : cat
      );
      saveCategories(newCategories);
      return { categories: newCategories };
    });
  },

  deleteCategory: (id) => {
    set((state) => {
      const newCategories = state.categories.filter((cat) => cat.id !== id);
      saveCategories(newCategories);
      // 同时删除该分类下的所有卡片
      const newCards = state.cards.filter((card) => card.categoryId !== id);
      saveCards(newCards);
      return { categories: newCategories, cards: newCards };
    });
  },

  // UI 状态操作
  setEditMode: (enabled) => set({ isEditMode: enabled }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  setTheme: (theme) => {
    saveTheme(theme);
    set({ theme });
  },

  // 从存储加载数据
  loadFromStorage: async () => {
    const cards = loadCards();
    const categories = loadCategories();
    const theme = loadTheme();
    set({ cards, categories, theme });
  },
}));
