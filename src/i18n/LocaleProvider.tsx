"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { en } from "@/i18n/dictionaries/en";

type I18nContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  dictionary: en,
});

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: I18nContextValue & { children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
