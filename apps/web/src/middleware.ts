import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('vyhir_token')?.value;

  // Root path routing
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/org/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect organizational and platform routes
  if (pathname.startsWith('/org') || pathname.startsWith('/platform')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from /login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/org/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/org/:path*', '/platform/:path*', '/login'],
};
