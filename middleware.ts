import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Les langues supportées
const locales = ["en", "de", "fr"];
const defaultLocale = "en";

// Fonction pour détecter la langue préférée du navigateur
function getLocale(request: NextRequest): string {
  // 1. Vérifie si une langue est déjà dans l'URL
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) return pathnameLocale;

  // 2. Vérifie le header Accept-Language du navigateur
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(",")[0].split("-")[0];
    if (locales.includes(browserLocale)) {
      return browserLocale;
    }
  }

  // 3. Retourne la langue par défaut
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignore les fichiers statiques et les routes API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // fichiers avec extension
  ) {
    return NextResponse.next();
  }

  // Vérifie si l'URL contient déjà une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirige vers l'URL avec la locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  return NextResponse.redirect(newUrl);
}

// Configure quels chemins doivent passer par le middleware
export const config = {
  matcher: [
    // Match tous les chemins sauf ceux qui commencent par :
    // - _next/static (fichiers statiques)
    // - _next/image (fichiers d'optimisation d'images)
    // - favicon.ico (favicon)
    // - fichiers publics (images, etc.)
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};
