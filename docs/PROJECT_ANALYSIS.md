# 项目分析记录

更新时间：2026-05-15

## 项目定位

`pwa-home` 是一个面向家庭网络服务入口的 Next.js 16 PWA，产品名为“家庭云”。当前实现更接近移动端服务导航面板：主页展示公告和固定服务入口，照片、影视、文档页分别展示对应服务的打开按钮、内网/公网地址和账号信息。

## 技术栈

- Next.js 16.2.6 App Router，React 19.2.6，TypeScript 5.9.3。
- Tailwind CSS v4，使用 `@custom-variant dark` 配合 `next-themes` 实现暗色模式。
- Bun 作为包管理和脚本运行工具。
- Zustand 管理导航数据和语言状态。
- Framer Motion 做卡片进入、悬停等动效。
- Lucide React 作为图标库。
- Serwist (`@serwist/next` 9.5.11) 生成 PWA 相关资源，项目当前走 Webpack 构建。
- `package.json` 通过 `overrides.postcss = 8.5.14` 规避 Next 内部旧 PostCSS 版本带来的安全审计告警。

## 常用命令

```bash
bun run dev
bun run build
bun run start
bun run lint
bun run test:run
```

注意：`dev` 和 `build` 脚本已经带 `--webpack`。当前 Serwist 集成使用 Webpack 配置。

## 关键目录

- `src/app/`：App Router 页面、根布局、PWA manifest。
- `src/app/page.tsx`：主页，包含公告、基础服务入口和底部导航。
- `src/app/photos/page.tsx`、`src/app/videos/page.tsx`、`src/app/documents/page.tsx`：三个服务详情页，内置服务地址和账号信息。
- `src/components/`：UI 组件、主题 Provider、语言 Provider、底部导航等。
- `src/store/`：Zustand 状态层。
- `src/lib/`：本地存储、网络地址探测、i18n、分组、校验、图标工具。
- `public/`：PWA 图标等静态资源；`sw.js` 是 Serwist 构建产物，不应手写维护。
- `src/app/sw.ts`：Serwist service worker 源码。
- `src/app/~offline/page.tsx`：离线 fallback 页面。
- `Dockerfile`、`deployment.yaml`：容器构建和 Kubernetes 部署配置。

## 当前路由和功能

- `/`：家庭云主页。
- `/photos`：Immich 照片服务入口。
- `/videos`：Jellyfin 影视服务入口。
- `/documents`：Nextcloud 文档/云盘服务入口。

主页还包含外链入口：

- `https://chuan-dai.tt829.cn/`
- MoviePilot，优先探测内网地址，失败后回退到公网地址 `https://mp.tt829.cn`。

## 状态和持久化

`src/store/navigation-store.ts` 定义了导航卡片、分类、编辑模式、搜索词和主题状态。卡片与分类通过 `src/lib/storage.ts` 手动读写 localStorage：

- `pwa-home-cards`
- `pwa-home-categories`
- `pwa-home-theme`

`src/store/language-store.ts` 使用 Zustand `persist` 中间件存储语言：

- `language-storage`

语言恢复后需要保持 `locale` 和 `t` 同步，当前通过 `onRehydrateStorage` 做了这件事。

## PWA 注意点

- PWA 已从 `next-pwa` 迁移到 Serwist。
- `next.config.ts` 通过 `withSerwistInit` 使用 `src/app/sw.ts` 生成 `public/sw.js`。
- Service Worker 自动注册，scope 为 `/`，与当前实际路由保持一致。
- `src/app/manifest.ts` 的 `start_url`、`scope`、`id` 均使用 `/`。
- `src/app/~offline/page.tsx` 是文档请求离线 fallback。
- Serwist 在开发环境禁用：`disable: process.env.NODE_ENV === "development"`。
- `public/sw.js` 和旧 Workbox 文件不再作为源码维护；构建时会重新生成 service worker。

## i18n 和主题

- i18n 是自研轻量方案，没有引入 next-intl 等库。
- 翻译集中在 `src/lib/i18n/locales.ts`，目前支持 `zh-CN` 和 `en`。
- `LanguageProvider` 会同步 `<html lang>`，并用内联脚本减少语言闪烁。
- 主题由 `next-themes` 控制，根布局里配置 `defaultTheme="light"` 和 `enableSystem={false}`。
- 类型里仍允许 `Theme = "light" | "dark" | "system"`，但 UI 当前只在 light/dark 间切换。

## 网络地址探测

`src/lib/network.ts` 提供服务地址优选逻辑：

1. 家庭内网地址。
2. Tailscale 地址。
3. 公网地址。

探测使用 `fetch` 的 `HEAD` 请求和 `mode: "no-cors"`，因此只能把“请求未抛错”当作可达信号，不能依赖响应状态码判断服务健康。所有地址都不可达时会回退到公网地址。

## 当前代码中的敏感点

- `photos`、`videos`、`documents` 页面中硬编码了服务账号和密码，且 UI 会直接展示并支持复制。
- 服务内网地址、公网域名也直接写在页面组件里。
- 如果仓库会共享或公开，应优先把这些信息迁移到环境变量、服务端配置或受控的私有配置文件中。

## 实现与文档不一致处

- README 写到搜索、拖拽排序、自定义分类和服务卡片管理，但当前主页没有暴露这些 CRUD/拖拽 UI；相关状态层和部分组件存在，像是早期设计或未接入功能。
- README 部署章节说 Kubernetes 配置在 `k8s/` 目录，实际文件是仓库根目录的 `deployment.yaml`。
- AGENTS/CLAUDE 已从 `next-pwa` 说明更新为 Serwist 说明。

## 测试现状

- Vitest 已配置 jsdom 和 React Testing Library。
- 当前仓库没有发现 `*.test.*` 或 `*.spec.*` 测试文件。
- 适合优先补的测试：`src/lib/grouping.ts`、`src/lib/validation.ts`、`src/store/language-store.ts` 的基础行为。

## 后续维护建议

1. 处理敏感信息：避免在客户端源码中硬编码账号密码。
2. 决定导航 CRUD 功能是否要继续接入 UI；如果不要，可以删除未使用组件和 store 分支，降低维护成本。
3. 给纯函数和 store 增加轻量测试，再逐步覆盖页面交互。
