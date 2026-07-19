// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('userRole')?.value;
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Routes: Only allow if role is 'admin'
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Protect User Routes: Allow if logged in (role exists)
  if (pathname.startsWith('/user') && !userRole) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Protect all sub-routes of /admin and /user
  matcher: ['/admin/:path*', '/user/:path*'],
};