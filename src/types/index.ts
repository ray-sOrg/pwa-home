// 导航卡片数据
export interface NavigationCardData {
  id: string;
  name: string;
  url: string;
  icon: string; // Lucide 图标名称或自定义图片 URL
  description?: string;
  categoryId: string;
  order: number;
  createdAt: number;
  updatedAt: number;
}

// 服务分类
export interface Category {
  id: string;
  name: string;
  order: number;
  icon?: string;
}

// 主题类型
export type Theme = "light" | "dark" | "system";

// 应用状态
export interface AppState {
  // 数据
  cards: NavigationCardData[];
  categories: Category[];

  // UI 状态
  isEditMode: boolean;
  searchQuery: string;
  theme: Theme;

  // Actions
  addCard: (
    card: Omit<NavigationCardData, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateCard: (id: string, updates: Partial<NavigationCardData>) => void;
  deleteCard: (id: string) => void;
  reorderCards: (categoryId: string, cardIds: string[]) => void;

  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  setEditMode: (enabled: boolean) => void;
  setSearchQuery: (query: string) => void;
  setTheme: (theme: Theme) => void;

  // 持久化
  loadFromStorage: () => Promise<void>;
}

// 新建/编辑卡片的表单数据
export interface CardFormData {
  name: string;
  url: string;
  icon: string;
  description?: string;
  categoryId: string;
}

// 验证错误
export interface ValidationError {
  field: string;
  message: string;
}
