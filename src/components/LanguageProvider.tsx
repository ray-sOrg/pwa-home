"use client";

import * as React from "react";
import { useLanguageStore } from "@/store/language-store";
import { translations } from "@/lib/i18n/locales";

interface LanguageProviderProps {
  children: React.ReactNode;
}

// 用于避免闪烁的脚本
const languageScript = `
(function() {
  try {
    var stored = localStorage.getItem('language-storage');
    if (stored) {
      var parsed = JSON.parse(stored);
      if (parsed.state && parsed.state.locale) {
        document.documentElement.lang = parsed.state.locale;
      }
    }
  } catch (e) {}
})();
`;

function subscribeToClientSnapshot() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useMounted() {
  return React.useSyncExternalStore(
    subscribeToClientSnapshot,
    getClientSnapshot,
    getServerSnapshot
  );
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const locale = useLanguageStore((state) => state.locale);

  // 同步 html lang 属性
  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: languageScript }} />
      {children}
    </>
  );
}

// 自定义 hook 用于获取翻译
export function useTranslation() {
  const { locale, setLocale, t } = useLanguageStore();
  const mounted = useMounted();

  // 返回带有 mounted 状态的翻译，避免服务端渲染不一致
  return {
    locale,
    setLocale,
    t: mounted ? t : translations["zh-CN"], // 默认使用中文避免闪烁
    mounted,
    toggleLocale: () => {
      setLocale(locale === "zh-CN" ? "en" : "zh-CN");
    },
  };
}
