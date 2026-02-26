import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "de", "fr"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(",")[0].split("-")[0];
    if (locales.includes(browserLocale)) {
      return browserLocale;
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const userAgent = request.headers.get("user-agent") || "";
    const isBot =
      /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit/i.test(
        userAgent
      );

    if (isBot) {
      return NextResponse.redirect(new URL("/en", request.url));
    }

    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)"],
};
