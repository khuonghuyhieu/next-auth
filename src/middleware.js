import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import queryString from 'query-string'
import Routes from './constants/Routes'

const PUBLIC_FILE = /\.(.*)$/
const locales = ['ja', 'en']

const checkIsPublicPage = (pathname) => {
  if (pathname === Routes.HOME || pathname === Routes.WK.PAYMENT) {
    return true
  }
  return Object.values(Routes.PUBLIC).some((route) => pathname.startsWith(route))
}

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'ja',
  localeDetection: false,
})

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    async authorized() {
      return true
    },
  },
  pages: {
    signIn: Routes.AUTH.LOGIN,
  },
})

export default async function middleware(req) {
  const webviewToken = queryString.parse(req.nextUrl.search)?.token
  const token = await getToken({ req })
  const isAuth = !!token || !!webviewToken
  const pathName = req.nextUrl.pathname
  const isPublicPage = checkIsPublicPage(pathName)

  const isPublicFolder =
    pathName.startsWith('/_next') ||
    pathName.startsWith('/api') ||
    pathName.startsWith('/static') ||
    PUBLIC_FILE.test(pathName)

  const isAuthPage = [
    Routes.AUTH.LOGIN,
    Routes.AUTH.SIGNUP,
    Routes.AUTH.REGISTER,
  ].includes(pathName)

  if (pathName === Routes.HOME && isAuth) {
    return NextResponse.redirect(new URL(Routes.AUTH.HOME, req.url))
  }

  if (isPublicPage || isPublicFolder) {
    return intlMiddleware(req)
  }

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL(Routes.AUTH.HOME, req.url))
    }
    return intlMiddleware(req)
  }

  if (!isAuth && !isPublicPage && req.method !== 'POST') {
    return NextResponse.redirect(new URL(Routes.AUTH.LOGIN, req.url))
  }
  return authMiddleware(req)
}

export const config = {
  unstable_allowDynamic: ['/node_modules/**'],
  matcher: ['/((?!api|_vercel|_next|icons|images|.well-known|favicon.ico).*)'],
}
