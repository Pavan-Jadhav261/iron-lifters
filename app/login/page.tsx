'use client'

import { useState, useActionState } from 'react'
import { Activity, ArrowRight, Eye } from 'lucide-react'
import { Logo, Button, Field, Input } from '../../components/ui'
import { login } from '../actions'

export default function LoginPage() {
  const [show, setShow] = useState(false); 
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <main className="flex min-h-screen bg-[#f5c400] text-zinc-950">
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white lg:flex">
        <div className="pointer-events-none absolute -right-24 top-1/2 size-72 -translate-y-1/2 rounded-full border-[34px] border-white/5" />
        <div className="pointer-events-none absolute -right-8 top-1/2 size-40 -translate-y-1/2 rounded-full border-[18px] border-white/5" />
        <Logo dark />
        <div className="relative max-w-md">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">Admin operations / 01</p>
          <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.06em]">Build a<br />stronger<br /><span className="text-[#f5c400]">business.</span></h1>
          <p className="mt-7 max-w-sm text-sm font-semibold leading-6 text-zinc-400">One focused workspace for every conversation, follow-up, and membership opportunity.</p>
          <div className="mt-8 flex items-center gap-3 text-xs font-black uppercase tracking-[0.12em]"><span className="h-px w-8 bg-white/20" /> Move with intent</div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold"><Activity size={16} /> Iron Lifter&apos;s internal operations</div>
      </div>
      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <form action={formAction} className="w-full max-w-[400px] -mt-16 sm:mt-0">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <div className="mb-10">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-800">Iron Lifters / Admin</p>
            <h1 className="text-4xl font-black tracking-[-0.04em]">Welcome back.</h1>
            <p className="mt-2 text-sm text-zinc-800">Sign in to manage your leads and members.</p>
          </div>
          <div className="flex flex-col gap-5">
            <Field label={<span className="text-zinc-800">Username</span>}>
              <Input name="username" required placeholder="Enter your username" autoComplete="username" autoCapitalize="none" autoCorrect="off" />
            </Field>
            <Field label={<span className="text-zinc-800">Password</span>}>
              <div className="relative">
                <Input name="password" required type={show ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" className="pr-11" />
                <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)} className="absolute right-3 top-3 text-zinc-600 hover:text-zinc-900"><Eye size={18} /></button>
              </div>
            </Field>
          </div>
          {state?.error && <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-700">{state.error}</p>}
          <Button type="submit" variant="dark" className="mt-7 w-full" icon={<ArrowRight size={17} />} disabled={isPending}>
            {isPending ? 'LOGGING IN...' : 'LOGIN'}
          </Button>
          <p className="mt-5 text-center text-xs text-zinc-700">Authorized personnel only</p>
        </form>
      </div>
    </main>
  )
}
