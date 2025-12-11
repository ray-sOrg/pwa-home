# Design Document

## Overview

家庭网络导航 PWA 采用 Next.js 16 + Tailwind CSS 4 + Framer Motion 技术栈构建。应用采用单页面设计，以卡片网格为核心交互形式，支持离线访问和主屏安装。数据存储使用 localStorage/IndexedDB，无需后端服务。

### 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **PWA**: next-pwa
- **状态管理**: Zustand
- **存储**: localStorage + IndexedDB (通过 idb-keyval)
- **图标**: Lucide React

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PWA Shell                             │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Next.js App Router                  │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────┐  │    │
│  │  │  Home   │  │  Edit   │  │    Settings     │  │    │
│  │  │  Page   │  │  Modal  │  │     Sheet       │  │    │
│  │  └────┬────┘  └────┬────┘  └────────┬────────┘  │    │
│  │       │            │                │           │    │
│  │  ┌────┴────────────┴────────────────┴────────┐  │    │
│  │  │           Zustand Store                    │  │    │
│  │  │  - navigationCards[]                       │  │    │
│  │  │  - categories[]                            │  │    │
│  │  │  - theme                                   │  │    │
│  │  │  - editMode                                │  │    │
│  │  └────────────────────┬──────────────────────┘  │    │
│  │                       │                         │    │
│  │  ┌────────────────────┴──────────────────────┐  │    │
│  │  │         Storage Layer (idb-keyval)         │  │    │
│  │  └───────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Service Worker (next-pwa)           │    │
│  │  - Static asset caching                          │    │
│  │  - Navigation data caching                       │    │
│  │  - Offline fallback                              │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 页面结构

```
app/
├── layout.tsx          # 根布局，主题 Provider
├── page.tsx            # 首页，导航卡片网格
├── manifest.ts         # PWA manifest 配置
└── globals.css         # 全局样式
```

### 核心组件

```
components/
├── NavigationGrid.tsx      # 导航卡片网格容器
├── NavigationCard.tsx      # 单个导航卡片
├── CategorySection.tsx     # 分类区块
├── SearchBar.tsx           # 搜索栏
├── EditModal.tsx           # 编辑/新增弹窗
├── SettingsSheet.tsx       # 设置侧边栏
├── ThemeToggle.tsx         # 主题切换按钮
├── InstallPrompt.tsx       # PWA 安装提示
└── SkeletonCard.tsx        # 加载骨架屏
```

### 组件接口

```typescript
// NavigationCard 组件
interface NavigationCardProps {
  card: NavigationCardData;
  isEditMode: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: DragHandleProps;
}

// EditModal 组件
interface EditModalProps {
  isOpen: boolean;
  card?: NavigationCardData;
  onSave: (card: NavigationCardData) => void;
  onClose: () => void;
}

// CategorySection 组件
interface CategorySectionProps {
  category: Category;
  cards: NavigationCardData[];
  isEditMode: boolean;
}
```

## Data Models

### NavigationCard

```typescript
interface NavigationCardData {
  id: string;
  name: string;
  url: string;
  icon: string;           // Lucide 图标名称或自定义 URL
  description?: string;
  categoryId: string;
  order: number;
  createdAt: number;
  updatedAt: number;
}
```

### Category

```typescript
interface Category {
  id: string;
  name: string;
  order: number;
  icon?: string;
}
```

### AppState (Zustand Store)

```typescript
interface AppState {
  // 数据
  cards: NavigationCardData[];
  categories: Category[];
  
  // UI 状态
  isEditMode: boolean;
  searchQuery: string;
  theme: 'light' | 'dark' | 'system';
  
  // Actions
  addCard: (card: Omit<NavigationCardData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCard: (id: string, updates: Partial<NavigationCardData>) => void;
  deleteCard: (id: string) => void;
  reorderCards: (categoryId: string, cardIds: string[]) => void;
  
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  setEditMode: (enabled: boolean) => void;
  setSearchQuery: (query: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // 持久化
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}
```

### 默认数据

```typescript
const defaultCategories: Category[] = [
  { id: 'media', name: '影音娱乐', order: 0, icon: 'Film' },
  { id: 'storage', name: '云存储', order: 1, icon: 'HardDrive' },
  { id: 'tools', name: '工具服务', order: 2, icon: 'Wrench' },
];

const defaultCards: NavigationCardData[] = [
  {
    id: '1',
    name: '家庭影视',
    url: 'http://192.168.1.100:8096',
    icon: 'Tv',
    description: 'Jellyfin 媒体服务器',
    categoryId: 'media',
    order: 0,
  },
  // ... 更多默认卡片
];
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Card rendering completeness
*For any* NavigationCardData, when rendered, the output SHALL contain the card's name, icon identifier, and URL.
**Validates: Requirements 1.2**

### Property 2: Category grouping correctness
*For any* set of NavigationCardData with assigned categoryIds, grouping by category SHALL result in each card appearing exactly once under its assigned category.
**Validates: Requirements 2.1**

### Property 3: Card validation rejects incomplete data
*For any* card input missing name, URL, or icon, the validation function SHALL reject the input and return appropriate error messages.
**Validates: Requirements 3.2**

### Property 4: Card persistence round-trip
*For any* NavigationCardData, saving to storage and then loading from storage SHALL produce an equivalent card object.
**Validates: Requirements 3.3**

### Property 5: Card deletion removes from store
*For any* card deletion operation, the deleted card SHALL no longer exist in the cards array after the operation completes.
**Validates: Requirements 3.4**

### Property 6: Reorder preserves all cards
*For any* reorder operation on a category's cards, the total number of cards in that category SHALL remain unchanged, and all original card IDs SHALL still be present.
**Validates: Requirements 3.5**

### Property 7: Theme toggle cycles correctly
*For any* current theme state, toggling SHALL produce a valid next theme state (light → dark → system → light).
**Validates: Requirements 7.1**

### Property 8: Theme persistence round-trip
*For any* theme preference, saving to storage and loading SHALL produce the same theme value.
**Validates: Requirements 7.3**

### Property 9: Search filter correctness
*For any* search query and card set, the filtered results SHALL only contain cards whose name or description includes the query string (case-insensitive).
**Validates: Requirements 8.1**

## Error Handling

### 用户输入错误

| 场景 | 处理方式 |
|------|----------|
| URL 格式无效 | 表单验证提示，阻止提交 |
| 必填字段为空 | 高亮字段，显示错误信息 |
| 图标名称无效 | 回退到默认图标 |

### 存储错误

| 场景 | 处理方式 |
|------|----------|
| localStorage 已满 | Toast 提示，建议清理数据 |
| 数据格式损坏 | 重置为默认数据，Toast 通知 |
| IndexedDB 不可用 | 降级到 localStorage |

### 网络错误

| 场景 | 处理方式 |
|------|----------|
| 离线状态 | 显示离线指示器，使用缓存数据 |
| 服务不可达 | 点击卡片时 Toast 提示 |

## Testing Strategy

### 单元测试 (Vitest)

- 测试 Zustand store 的 actions
- 测试数据验证函数
- 测试搜索过滤逻辑
- 测试分类分组逻辑

### 属性测试 (fast-check)

使用 fast-check 库进行属性测试，每个属性测试运行至少 100 次迭代。

测试标注格式：`**Feature: home-navigation, Property {number}: {property_text}**`

属性测试覆盖：
- Property 1: 卡片渲染完整性
- Property 2: 分类分组正确性
- Property 3: 卡片验证拒绝不完整数据
- Property 4: 卡片持久化往返
- Property 5: 卡片删除从 store 移除
- Property 6: 重排序保留所有卡片
- Property 7: 主题切换循环正确
- Property 8: 主题持久化往返
- Property 9: 搜索过滤正确性

### 组件测试 (React Testing Library)

- 测试 NavigationCard 渲染
- 测试 EditModal 表单交互
- 测试 SearchBar 输入响应

### E2E 测试 (Playwright) - 可选

- 完整的添加/编辑/删除流程
- PWA 安装流程
- 离线功能验证
