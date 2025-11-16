import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = [
  '/trip/book',
  '/profile',
  // '/profile',
  // '/bookings',
  // '/settings',
];

const authRoutes = ['/auth'];

export default async function proxy (request: NextRequest) {

  const { pathname } = request.nextUrl;

  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token'
  });

  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (token.error) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/trip/book/:path*', 
    '/auth',
    '/profile/:path*', 
    // '/trips/:path*', 
    // '/bookings/:path*', 
    // '/settings/:path*'
  ]
}