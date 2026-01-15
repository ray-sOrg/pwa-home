# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16** Progressive Web App (PWA) called "家庭云" (Family Cloud) - a home network service navigation portal with offline support, theme switching, and multi-language support (Chinese/English).

## Development Commands

```bash
# Development server
bun run dev

# Build (must use --webpack flag, next-pwa does not support Turbopack)
bun run build

# Production server
bun run start

# Linting
bun run lint

# Testing (Vitest + React Testing Library)
bun run test          # Watch mode
bun run test:run      # Single run
```

**Important**: Always build with `--webpack` flag. The project uses next-pwa which is incompatible with Turbopack.

## Architecture

### Framework & Tooling
- **Next.js 16** with App Router (not Pages Router)
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **Bun** as package manager
- **Zustand** for state management
- **next-themes** for theme switching
- **next-pwa** for PWA functionality
- **Framer Motion** for animations
- **Lucide React** for icons

### Directory Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── layout.tsx    # Root layout with providers + manual SW registration
│   ├── manifest.ts   # PWA manifest
│   └── globals.css   # Global styles
├── components/       # React components (UI, providers)
├── store/            # Zustand stores (navigation, language)
├── lib/              # Utilities (storage, validation, i18n)
├── types/            # TypeScript definitions
└── test/             # Vitest setup
```

### State Management

Two Zustand stores manage application state:

1. **`useNavigationStore`** (`src/store/navigation-store.ts`):
   - Navigation cards (CRUD operations)
   - Categories (CRUD operations)
   - UI state (edit mode, search query, theme)
   - LocalStorage persistence via `src/lib/storage.ts`

2. **`useLanguageStore`** (`src/store/language-store.ts`):
   - Uses Zustand's `persist` middleware for automatic localStorage sync
   - Manages locale (zh-CN/en) and translations
   - Must call `onRehydrateStorage` to sync `t` with locale after hydration

### Data Persistence

- **Cards and Categories**: Stored in localStorage via `src/lib/storage.ts`
- **Theme**: Stored in localStorage (read by navigation store on load)
- **Language**: Persisted via Zustand middleware
- Default categories are defined in `src/lib/storage.ts` (media, storage, tools)

### PWA Configuration

- Service Worker is **manually registered** in `src/app/layout.tsx` (inline script in head)
- Do not rely on next-pwa's automatic `register: true` option
- PWA manifest is in `src/app/manifest.ts`
- Icons in `public/icons/` directory

### Internationalization

Custom i18n implementation (no external library):
- Translations in `src/lib/i18n/locales.ts`
- `LanguageProvider` wraps the app
- Access translations via `useLanguageStore` hook

### Theme System

Uses `next-themes` with:
- `ThemeProvider` wraps the app in `src/app/layout.tsx`
- `enableSystem={false}` - only light/dark themes (no system preference detection currently)
- `suppressHydrationWarning` on `<html>` tag to prevent hydration mismatch

### Testing

- Vitest with jsdom environment
- React Testing Library
- Test setup in `src/test/setup.ts`
- Tests should use `@testing-library/react` patterns

## Deployment

The app outputs in `standalone` mode for Docker deployment. Kubernetes manifests are available for containerized deployment.

## Key Types (`src/types/index.ts`)

- `NavigationCardData`: Service navigation cards with id, name, url, icon, categoryId, order
- `Category`: Grouping containers for cards
- `Theme`: "light" | "dark" | "system"
- `AppState`: Full application state interface with all actions
