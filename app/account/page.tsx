'use client'

import { useState, useActionState } from 'react'
import { AppLayout } from '../../components/AppLayout'
import { Button, Field, Input } from '../../components/ui'
import { Check, LogOut } from 'lucide-react'
import { changePassword, logout } from '../actions'

export default function AccountPage() {
  const [toast, setToast] = useState('')
  const [state, formAction, isPending] = useActionState(changePassword, null)

  function notify(message: string) { setToast(message); setTimeout(() => setToast(''), 3000) }

  if (state?.success && toast !== state.success) {
    notify(state.success)
  }

  return (
    <AppLayout title="Account settings">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8">
          <div className="mb-8">
            <p className="text-sm text-zinc-500">Manage your access and security.</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight">Account settings</h2>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-zinc-50 p-4">
            <div className="flex size-11 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-[#f5c400]">AD</div>
            <div>
              <p className="font-bold">Admin account</p>
              <p className="text-sm text-zinc-500">Username: {process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'}</p>
            </div>
          </div>
          <form action={formAction} className="mt-8 border-t border-zinc-100 pt-7">
            <h3 className="text-lg font-black">Change password</h3>
            <div className="mt-5 flex flex-col gap-5 sm:max-w-md">
              <Field label="Current password"><Input name="current" type="password" required /></Field>
              <Field label="New password"><Input name="next" type="password" required /></Field>
              <Field label="Confirm new password"><Input name="confirm" type="password" required /></Field>
            </div>
            {state?.error && <p className="mt-4 text-xs font-medium text-red-600">{state.error}</p>}
            <Button type="submit" className="mt-7" disabled={isPending}>{isPending ? 'CHANGING...' : 'CHANGE PASSWORD'}</Button>
          </form>
        </div>
        <div className="mt-5 rounded-2xl border border-red-100 bg-red-50/50 p-5">
          <p className="font-bold text-zinc-900">Sign out of this device</p>
          <p className="mt-1 text-sm text-zinc-500">You&apos;ll need to sign in again to manage Iron Lifters.</p>
          <Button variant="danger" onClick={() => logout()} className="mt-4" icon={<LogOut size={16} />}>LOGOUT</Button>
        </div>
      </div>
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-xl"><Check className="text-[#f5c400]" size={17} />{toast}</div>}
    </AppLayout>
  )
}
