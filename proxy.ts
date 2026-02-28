// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Updated to perfectly match your SupportedLanguage type from types/index.ts
// const locales = ['en', 'de', 'fr', 'es'];
// const defaultLocale = 'en';

// // Helper function to detect the user's preferred language
// function getLocale(request: NextRequest): string {
//   const acceptLanguage = request.headers.get('accept-language');
  
//   if (acceptLanguage) {
//     const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
//     if (locales.includes(preferredLocale)) {
//       return preferredLocale;
//     }
//   }
  
//   return defaultLocale;
// }

// // 🚨 NEXT.JS 16 FIX: The exported function must now be named `proxy`
// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 1. Skip proxying for the root homepage (/), Next.js internals, APIs, and assets
//   // 🚨 FIX: Adding pathname === '/' prevents the 404 crash on your homepage
//   if (
//     pathname === '/' || 
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api') ||
//     pathname.includes('.') || 
//     pathname === '/favicon.ico'
//   ) {
//     return NextResponse.next();
//   }

//   // 2. Check if the pathname already starts with a supported locale (e.g., /en/albania)
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) {
//     return NextResponse.next();
//   }

//   // 3. If navigating to a deep link without a locale, redirect to the localized version
//   const locale = getLocale(request);
//   request.nextUrl.pathname = `/${locale}${pathname}`;
  
//   return NextResponse.redirect(request.nextUrl);
// }

// // Config ensures the proxy only runs on actual page routes
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)',
//   ],
// };




import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

// 🟢 FIX 1: The function MUST be named 'proxy' as per your error message
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🟢 FIX 2: Explicitly exclude admin-portal from the localization logic
  if (
    pathname === '/' || 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin-portal') || // Stops the redirect to /en/admin-portal
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
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

// 🟢 FIX 3: Exclude admin-portal from the matcher as well
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|admin-portal|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
};