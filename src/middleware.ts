import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, i18nCookieName } from "@/i18n/options";
import type { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { getLngCookie } from "./i18n";

acceptLanguage.languages([...languages]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|auth|assets|.*\\.).*)"],
};

export async function middleware(req: NextRequest) {
  const cookiesList = await cookies();
  const headersList = await headers();

  let lng;
  if (cookiesList.has(i18nCookieName))
    lng = acceptLanguage.get(await getLngCookie());
  if (!lng) lng = acceptLanguage.get(headersList.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

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
