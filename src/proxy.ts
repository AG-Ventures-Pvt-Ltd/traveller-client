import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = [
  '/profile',
  '/referral',
  '/referral-policy',
];

const authRoutes = ['/auth'];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);

  const sessionToken = request.cookies.get('next-auth.session-token');
  const hasSession = !!sessionToken?.value;

  if (!hasSession && !isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  let token = null;
  if (hasSession) {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: 'next-auth.session-token'
    });

    if (token?.type === 'Host') {
      return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_SUBDOMAIN!, request.url));
    }
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isProtectedRoute && !token) {
    const originalPath = pathname + (request.nextUrl.search || '');
    return NextResponse.redirect(new URL(`/auth?redirectUrl=${encodeURIComponent(originalPath)}`, request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/trip/book/:path*',
    '/auth',
    '/profile/:path*',
    '/referral',
    '/referral-policy',
    '/booking-policy'
  ]
}