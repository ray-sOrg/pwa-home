import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n/locales";
import { defaultLocale, translations } from "@/lib/i18n/locales";

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations[Locale];
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: defaultLocale,
      t: translations[defaultLocale],
      setLocale: (locale: Locale) =>
        set({
          locale,
          t: translations[locale],
        }),
    }),
    {
      name: "language-storage",
      onRehydrateStorage: () => (state) => {
        // 确保 t 与当前 locale 同步
        if (state) {
          state.t = translations[state.locale];
        }
      },
    }
  )
);
