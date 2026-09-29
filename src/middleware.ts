import { NextRequest, NextResponse } from "next/server";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  localeFromPathname,
  type Locale,
} from "@/i18n/config";

const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function resolveLocale(request: NextRequest): Locale {
  const { pathname } = request.nextUrl;

  // Path is authoritative for localized marketing pages.
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return "ar";
  }
  if (pathname === "/") {
    return "en";
  }

  // Other app routes (make-photo, success, legal) keep the user's language cookie.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api");

  if (isApi) {
    const isPreflight = request.method === "OPTIONS";
    if (isPreflight) {
      return NextResponse.json({}, { headers: corsOptions });
    }

    const response = NextResponse.next();
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  const locale = resolveLocale(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("x-locale", locale);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|.*\\..*).*)",
  ],
};
