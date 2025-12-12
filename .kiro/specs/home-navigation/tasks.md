# Implementation Plan

- [x] 1. 项目初始化和基础配置




  - [x] 1.1 初始化 Next.js 16 项目，配置 TypeScript、Tailwind CSS 4、ESLint


    - 创建 Next.js 项目结构
    - 配置 tailwind.config.ts 和 globals.css
    - _Requirements: 1.1_

  - [x] 1.2 配置 next-pwa 插件和 manifest

    - 安装 next-pwa，配置 next.config.ts
    - 创建 app/manifest.ts 定义 PWA 元数据
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 1.3 安装并配置 Framer Motion 和 Lucide React

    - 安装依赖包
    - 创建动画配置常量文件
    - _Requirements: 6.1, 6.2_
  - [x] 1.4 配置 Vitest 和 fast-check 测试框架

    - 安装 vitest、@testing-library/react、fast-check
    - 创建 vitest.config.ts
    - _Requirements: 测试策略_

- [x] 2. 数据模型和状态管理




  - [x] 2.1 定义 TypeScript 类型和接口

    - 创建 types/index.ts 定义 NavigationCardData、Category、AppState
    - _Requirements: 1.2, 2.1, 3.2_

  - [x] 2.2 实现数据验证函数

    - 创建 lib/validation.ts 实现卡片验证逻辑
    - 验证 URL、name、icon 必填字段
    - _Requirements: 3.2_
  - [ ]* 2.3 编写属性测试：卡片验证拒绝不完整数据
    - **Property 3: Card validation rejects incomplete data**
    - **Validates: Requirements 3.2**

  - [x] 2.4 实现 Zustand store

    - 创建 store/navigation-store.ts
    - 实现 cards、categories、editMode、searchQuery、theme 状态
    - 实现 addCard、updateCard、deleteCard、reorderCards actions
    - _Requirements: 3.1, 3.3, 3.4, 3.5_
  - [ ]* 2.5 编写属性测试：卡片删除从 store 移除
    - **Property 5: Card deletion removes from store**
    - **Validates: Requirements 3.4**
  - [ ]* 2.6 编写属性测试：重排序保留所有卡片
    - **Property 6: Reorder preserves all cards**
    - **Validates: Requirements 3.5**

  - [ ] 2.7 实现本地存储持久化
    - 创建 lib/storage.ts 实现 save/load 函数
    - 使用 localStorage 存储导航数据
    - _Requirements: 3.3, 4.1_
  - [ ]* 2.8 编写属性测试：卡片持久化往返
    - **Property 4: Card persistence round-trip**
    - **Validates: Requirements 3.3**

- [ ] 3. Checkpoint - 确保所有测试通过
  - Ensure all tests pass, ask the user if questions arise.

- [-] 4. 核心 UI 组件


  - [x] 4.1 实现 NavigationCard 组件

    - 创建 components/NavigationCard.tsx
    - 显示图标、名称、描述
    - 实现 Framer Motion 悬停动画
    - _Requirements: 1.2, 1.3, 6.2_
  - [ ]* 4.2 编写属性测试：卡片渲染完整性
    - **Property 1: Card rendering completeness**
    - **Validates: Requirements 1.2**
  - [x] 4.3 实现 CategorySection 组件


    - 创建 components/CategorySection.tsx
    - 显示分类标题和卡片网格
    - _Requirements: 2.1, 2.2_

  - [ ] 4.4 实现分类分组逻辑
    - 创建 lib/grouping.ts 实现 groupCardsByCategory 函数
    - _Requirements: 2.1_
  - [ ]* 4.5 编写属性测试：分类分组正确性
    - **Property 2: Category grouping correctness**

    - **Validates: Requirements 2.1**
  - [ ] 4.6 实现 NavigationGrid 组件
    - 创建 components/NavigationGrid.tsx
    - 整合 CategorySection，实现交错入场动画

    - _Requirements: 1.1, 6.1_
  - [ ] 4.7 实现 SkeletonCard 加载骨架屏
    - 创建 components/SkeletonCard.tsx
    - _Requirements: 1.4_

- [ ] 5. 搜索功能
  - [ ] 5.1 实现搜索过滤逻辑
    - 创建 lib/search.ts 实现 filterCards 函数
    - 支持按名称和描述搜索
    - _Requirements: 8.1_
  - [ ]* 5.2 编写属性测试：搜索过滤正确性
    - **Property 9: Search filter correctness**
    - **Validates: Requirements 8.1**
  - [ ] 5.3 实现 SearchBar 组件
    - 创建 components/SearchBar.tsx
    - 实时过滤，显示空状态
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 6. 编辑功能
  - [ ] 6.1 实现 EditModal 组件
    - 创建 components/EditModal.tsx
    - 表单包含 name、url、icon、description、category 字段
    - 集成验证逻辑
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ] 6.2 实现拖拽排序功能
    - 使用 Framer Motion Reorder 实现拖拽
    - 保存新顺序到 store
    - _Requirements: 3.5, 6.4_

- [ ] 7. 主题切换
  - [ ] 7.1 实现主题切换逻辑
    - 创建 lib/theme.ts 实现 toggleTheme 函数
    - 支持 light/dark/system 三种模式
    - _Requirements: 7.1, 7.2_
  - [ ]* 7.2 编写属性测试：主题切换循环正确
    - **Property 7: Theme toggle cycles correctly**
    - **Validates: Requirements 7.1**
  - [ ]* 7.3 编写属性测试：主题持久化往返
    - **Property 8: Theme persistence round-trip**
    - **Validates: Requirements 7.3**
  - [ ] 7.4 实现 ThemeToggle 组件
    - 创建 components/ThemeToggle.tsx
    - 显示当前主题图标，点击切换
    - _Requirements: 7.1_
  - [ ] 7.5 配置 ThemeProvider
    - 在 layout.tsx 中配置主题 Provider
    - 读取系统偏好和本地存储
    - _Requirements: 7.2, 7.3_

- [ ] 8. Checkpoint - 确保所有测试通过
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. 页面整合
  - [ ] 9.1 实现首页布局
    - 创建 app/page.tsx
    - 整合 SearchBar、NavigationGrid、ThemeToggle
    - _Requirements: 1.1, 2.3_
  - [ ] 9.2 实现 SettingsSheet 组件
    - 创建 components/SettingsSheet.tsx
    - 包含编辑模式开关、主题设置
    - _Requirements: 3.1, 7.1_
  - [ ] 9.3 实现 InstallPrompt PWA 安装提示
    - 创建 components/InstallPrompt.tsx
    - 监听 beforeinstallprompt 事件
    - _Requirements: 5.1_

- [ ] 10. 离线支持和错误处理
  - [ ] 10.1 配置 Service Worker 缓存策略
    - 在 next.config.ts 中配置 next-pwa 缓存规则
    - _Requirements: 4.1, 4.2_
  - [ ] 10.2 实现离线状态检测和提示
    - 创建 hooks/useOnlineStatus.ts
    - 显示离线指示器
    - _Requirements: 4.2, 4.4_
  - [ ] 10.3 实现错误边界和 Toast 通知
    - 配置 react-error-boundary
    - 集成 sonner 或类似 Toast 库
    - _Requirements: 错误处理_

- [ ] 11. Final Checkpoint - 确保所有测试通过
  - Ensure all tests pass, ask the user if questions arise.
