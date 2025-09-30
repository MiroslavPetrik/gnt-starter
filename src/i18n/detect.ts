import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";

import { languages, i18nCookieName } from "./options";
import { Language } from "./types";

acceptLanguage.languages([...languages]);

export function detectLanguage({ cookies, headers }: NextRequest): Language {
  if (cookies.has(i18nCookieName)) {
    const cookieLng = cookies.get(i18nCookieName)!.value;

    /* Sanitize the cookie value. */
    if (languages.some((lng) => lng === cookieLng)) {
      return cookieLng;
    }
  }

  /* The acceptLanguage returns the fallback language if no match is found */
  return acceptLanguage.get(headers.get("Accept-Language"))!;
}
