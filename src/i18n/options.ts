import { type InitOptions } from "i18next";

export const fallbackLng = "en";
export const languages = [fallbackLng, "sk"] as const; // add your locales (e.g. "de", "sk") into the list
export const i18nCookieName = "i18next" as const;

export function getOptions(ns: string, lng = fallbackLng) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    defaultNS: false,
    ns: [ns],
    partialBundledLanguages: true,
  } satisfies InitOptions;
}

export function findPathnameLanguage(pathname: string) {
  return languages.find(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  );
}
