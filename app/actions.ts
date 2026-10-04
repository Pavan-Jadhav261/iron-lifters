'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT } from 'jose'

import { prisma } from '../lib/db'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'iron-lifters-secure-secret-key-2026')

export async function login(state: any, formData: FormData) {
  const inputUser = (formData.get('username') as string || '').trim().toLowerCase()
  const inputPass = (formData.get('password') as string || '').trim()
  
  const cookieStore = await cookies()

  const defaultUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
  const defaultPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  let admin = await prisma.admin.findUnique({ where: { username: defaultUsername } })
  if (!admin) {
    admin = await prisma.admin.create({
      data: { username: defaultUsername, password: defaultPassword }
    })
  }

  if (inputUser === admin.username && inputPass === admin.password) {
    const token = await new SignJWT({ username: inputUser, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret)
      
    const isProd = process.env.NODE_ENV === 'production'
    cookieStore.set('il-session', token, { httpOnly: true, secure: isProd, maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' })
    redirect('/dashboard')
  } else {
    return { error: 'Invalid username or password. Try again.' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('il-session')
  redirect('/login')
}

export async function changePassword(state: any, formData: FormData) {
  const current = formData.get('current') as string
  const next = formData.get('next') as string
  const confirm = formData.get('confirm') as string
  
  const defaultUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
  const defaultPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  let admin = await prisma.admin.findUnique({ where: { username: defaultUsername } })
  if (!admin) {
    admin = await prisma.admin.create({
      data: { username: defaultUsername, password: defaultPassword }
    })
  }
  
  if (current !== admin.password) return { error: 'Current password is incorrect.' }
  if (next.length < 6) return { error: 'New password must be at least 6 characters.' }
  if (next !== confirm) return { error: 'New passwords do not match.' }
  
  await prisma.admin.update({
    where: { username: defaultUsername },
    data: { password: next }
  })
  
  return { success: 'Password changed successfully.' }
}
