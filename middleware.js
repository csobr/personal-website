import { NextResponse } from 'next/server'

const NOTES_URL = 'https://modestcuriosity.sihamhadi.com'
const MAIN_HOSTS = ['sihamhadi.com', 'www.sihamhadi.com']

const route = (request) => {
  const host = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  if (host.startsWith('modestcuriosity.')) {
    if (pathname === '/' || /^\/[\w-]+$/.test(pathname)) {
      const url = request.nextUrl.clone()
      url.pathname = pathname === '/' ? '/notes' : `/notes${pathname}`
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  if (MAIN_HOSTS.includes(host) && /^\/notes(\/|$)/.test(pathname)) {
    return NextResponse.redirect(
      `${NOTES_URL}${pathname.replace(/^\/notes/, '') || '/'}`,
      308
    )
  }

  return NextResponse.next()
}

export function middleware(request) {
  const response = route(request)

  // Add X-Robots-Tag header
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
