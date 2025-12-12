import type { NavigationCardData, Category } from "@/types";

// 按分类分组卡片
export function groupCardsByCategory(
  cards: NavigationCardData[],
  categories: Category[]
): Map<Category, NavigationCardData[]> {
  const result = new Map<Category, NavigationCardData[]>();

  // 按分类顺序初始化
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  for (const category of sortedCategories) {
    const categoryCards = cards
      .filter((card) => card.categoryId === category.id)
      .sort((a, b) => a.order - b.order);

    if (categoryCards.length > 0) {
      result.set(category, categoryCards);
    }
  }

  return result;
}

// 搜索过滤卡片
export function filterCardsBySearch(
  cards: NavigationCardData[],
  query: string
): NavigationCardData[] {
  if (!query.trim()) {
    return cards;
  }

  const lowerQuery = query.toLowerCase().trim();

  return cards.filter(
    (card) =>
      card.name.toLowerCase().includes(lowerQuery) ||
      card.description?.toLowerCase().includes(lowerQuery)
  );
}
