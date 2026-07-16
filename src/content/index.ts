import { en } from "./en";
import { pidgin } from "./pidgin";
import type { Content, Locale } from "./types";

export type { Content, Locale, RoleValue, InterestValue } from "./types";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pidgin", label: "Pidgin" },
];

export const contentByLocale: Record<Locale, Content> = {
  en,
  pidgin,
};

export function getContent(locale: Locale): Content {
  return contentByLocale[locale] ?? en;
}
