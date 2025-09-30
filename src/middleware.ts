import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import {
  fallbackLng,
  findPathnameLanguage,
  i18nCookieName,
} from "@/i18n/options";
import { detectLanguage } from "@/i18n/detect";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|auth|assets|.*\\.).*)"],
};

export async function middleware(req: NextRequest) {
  const headersList = await headers();

  const lng = detectLanguage(req);
  const lngInPathname = findPathnameLanguage(req.nextUrl.pathname);

  if (!lngInPathname && !req.nextUrl.pathname.startsWith("/_next")) {
    const lngUrl = new URL(
      `/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`,
      req.url,
    );

    /**
     * Add the fallback language to the pathname without redirecting.
     * e.g. /home -> /en/home
     */
    if (lng === fallbackLng) {
      return NextResponse.rewrite(lngUrl);
    }

    /**
     * Set cookie and redirect to the detected language in the pathname.
     */
    const response = NextResponse.redirect(lngUrl);
    response.cookies.set(i18nCookieName, lng);

    return response;
  }

  if (lngInPathname) {
    const response = NextResponse.next();
    response.cookies.set(i18nCookieName, lngInPathname);

    return response;
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(headersList.get("referer")!);
    const lngInReferer = findPathnameLanguage(refererUrl.pathname);
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(i18nCookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
