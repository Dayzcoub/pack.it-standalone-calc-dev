import { en } from "./en";
import { ru } from "./ru";
import type { I18nKey, LocaleCode } from "./types";

export const dictionaries = {
  en,
  ru
} as const;

export const t = (locale: LocaleCode, key: I18nKey): string => dictionaries[locale]?.[key] ?? en[key] ?? key;
