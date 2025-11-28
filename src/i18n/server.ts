import { cache } from "react";
import { cookies } from "next/headers";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import { RootPages } from "@/types/page";
import { getOptions, i18nCookieName, fallbackLng } from "./options";
import { type Language } from "./types";

const initI18next = cache(async (lng: string, ns: string) => {
  const i18n = createInstance();

  await i18n
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(ns, lng));

  return i18n;
});

/**
 * A server-side equivalent of the useTranslation hook.
 * The name must match the configured value in i18next-parser.config.ts#L21.
 */
export async function translate(
  ns: RootPages | "gel" | "global",
  { keyPrefix }: { keyPrefix?: string } = {},
) {
  const lng = await getLngCookie();
  const i18n = await initI18next(lng, ns);

  const t = i18n.getFixedT(lng, ns, keyPrefix);

  return {
    t,
    i18n,
  };
}

export async function getLngCookie() {
  const cookie = await cookies();

  return (cookie.get(i18nCookieName)?.value as Language) ?? fallbackLng;
}
