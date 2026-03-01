import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mandatory for Next.js 16 + Cloudflare compatibility
export const runtime = 'experimental-edge'; 

const locales = ['en', 'de', 'fr', 'es'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(preferredLocale)) {
      return preferredLocale;
    }
  }
  return defaultLocale;
}

/**
 * NAMING: We use 'middleware' here because your Cloudflare log 
 * specifically says: "Ensure this file has a 'middleware' function export."
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip localization for internals, APIs, and the admin-portal
  if (
    pathname === '/' || 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin-portal') || 
    pathname.includes('.') || 
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|admin-portal|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
};