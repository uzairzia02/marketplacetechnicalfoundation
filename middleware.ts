// middleware.js
import { NextResponse } from "next/server";

export function middleware(request: { nextUrl: { pathname: any; }; cookies: { get: (arg0: string) => any; }; url: string | URL | undefined; }) {
  const { pathname } = request.nextUrl;

  // Only run on protected routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("authToken");
    console.log("[Middleware] Accessing dashboard. authToken:", token);
    if (!token) {
      const signInUrl = new URL("/signin", request.url);
      console.log("[Middleware] No token found. Redirecting to", signInUrl.href);
      return NextResponse.redirect(signInUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
