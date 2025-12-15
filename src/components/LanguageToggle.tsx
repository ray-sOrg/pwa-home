"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";
import { localeNames } from "@/lib/i18n/locales";

export function LanguageToggle() {
  const { locale, toggleLocale, mounted, t } = useTranslation();

  // 避免服务端渲染和客户端渲染不一致
  if (!mounted) {
    return (
      <button
        className="rounded-lg px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-1.5 text-sm font-medium"
        aria-label="切换语言"
      >
        <Languages className="h-4 w-4" />
        <span>中文</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLocale}
      className="rounded-lg px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-1.5 text-sm font-medium transition-colors"
      aria-label={t.common.toggleLanguage}
    >
      <Languages className="h-4 w-4" />
      <span>{localeNames[locale]}</span>
    </button>
  );
}
