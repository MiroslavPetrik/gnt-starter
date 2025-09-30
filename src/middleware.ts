import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { fallbackLng, languages, i18nCookieName } from "@/i18n/options";
import { detectLanguage } from "@/i18n/detect";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|auth|assets|.*\\.).*)"],
};

export async function middleware(req: NextRequest) {
  const headersList = await headers();

  const lng = detectLanguage(req);

  const lngInPathname = languages.some(pathnameHasLocale(req.nextUrl.pathname));

  // Redirect if lng in path is not supported
  if (!lngInPathname && !req.nextUrl.pathname.startsWith("/_next")) {
    const url = new URL(
      `/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`,
      req.url,
    );

    if (lng === fallbackLng) {
      return NextResponse.rewrite(url);
    }

    return NextResponse.redirect(url);
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(headersList.get("referer")!);
    const lngInReferer = languages.find(pathnameHasLocale(refererUrl.pathname));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(i18nCookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

function pathnameHasLocale(pathname: string) {
  return (locale: string) =>
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`;
}
