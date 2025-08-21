import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protect authenticated routes by checking for access_token cookie set by backend
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public paths that don't require auth
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/livequiz',
    '/quizzes',
    /^\/quizzes\/[^/]+$/, // quiz details
    '/favicon.ico',
  ]

  const isPublic = publicPaths.some((p) =>
    typeof p === 'string' ? p === pathname : (p as RegExp).test(pathname)
  )

  const accessToken = req.cookies.get('access_token')?.value

  // If not public and no token, redirect to login
  if (!isPublic && !accessToken) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If trying to access login/register while authenticated, redirect to /quizzes
  if ((pathname === '/login' || pathname === '/register') && accessToken) {
    return NextResponse.redirect(new URL('/quizzes', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
  ],
}
