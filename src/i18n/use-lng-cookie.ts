"use client";

import { useCookies } from "react-cookie";
import { useCallback } from "react";
import type { Language } from "./types";
import { fallbackLng, i18nCookieName } from "./options";

type i18nCookies = {
  [i18nCookieName]?: string;
};

export function useLngCookie() {
  const [cookies, setCookie] = useCookies<typeof i18nCookieName, i18nCookies>([
    i18nCookieName,
  ]);

  /**
   * The cookie is set and sanitized to a valid language in the middleware.
   */
  const i18nCookie = cookies[i18nCookieName] as Language;

  const setLngCookie = useCallback(
    (lng: Language) => {
      setCookie(i18nCookieName, lng, { path: "/" });
    },
    [setCookie],
  );

  return [i18nCookie ?? fallbackLng, setLngCookie] as const;
}
