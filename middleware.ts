import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicitly route /login to its static page
  if (pathname === '/login') {
    return NextResponse.rewrite(new URL('/login/page', request.url));
  }

  return NextResponse.next();
}

// Match all routes
export const config = {
  matcher: '/:path*',
};
