import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()

  // Add X-Robots-Tag header
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}