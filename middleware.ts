import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'iron-lifters-secure-secret-key-2026')

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('il-session')?.value
  const { pathname } = request.nextUrl
  
  let valid = false
  if (token) {
    try {
      await jwtVerify(token, secret)
      valid = true
    } catch (e) {
      valid = false
    }
  }
  
  if (!valid && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (valid && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/leads', '/settings', '/account', '/login']
}
