'use client'

import { useState } from 'react'
import { Bell, CircleUserRound, Home, LogOut, Menu, Plus, Settings, Users, Zap, Check } from 'lucide-react'
import { Logo, Button } from './ui'
import { useRouter, usePathname } from 'next/navigation'
import { logout } from '../app/actions'

function Sidebar({ mobileOpen, setMobileOpen }: any) { 
  const router = useRouter()
  const pathname = usePathname()
  const items = [['/dashboard', 'Dashboard', Home], ['/leads', 'All Leads', Users], ['/settings', 'Settings', Settings], ['/account', 'Account', CircleUserRound]]; 
  return <><aside className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col bg-zinc-950 p-5 text-white transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}><div className="mb-12 px-2"><Logo dark /></div><nav className="flex flex-col gap-1">{items.map(([path, label, Icon]: any) => <button key={path} onClick={() => { router.push(path); setMobileOpen(false) }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${pathname === path ? 'bg-[#f5c400] text-zinc-950' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}><Icon size={18} />{label}</button>)}<button onClick={() => logout()} className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-zinc-400 hover:bg-zinc-900 hover:text-white"><LogOut size={18} />Logout</button></nav><div className="mt-auto rounded-2xl bg-zinc-900 p-4"><div className="mb-2 flex items-center gap-2 text-[#f5c400]"><Zap size={15} fill="currentColor" /><span className="text-xs font-black uppercase tracking-wider">Pro tip</span></div><p className="text-xs leading-5 text-zinc-400">Follow up within 24 hours to improve conversion.</p></div></aside>{mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-zinc-950/50 lg:hidden" onClick={() => setMobileOpen(false)} />}</> 
}

function Header({ title, onMenu, onAdd }: any) { 
  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'Admin';
  const initials = username.substring(0, 2).toUpperCase();
  return <header className="sticky top-0 z-20 flex min-h-[68px] items-center justify-between gap-2 border-b border-zinc-200/80 bg-[#f7f7f5]/90 px-3 backdrop-blur sm:h-[76px] sm:px-5 lg:px-10"><div className="flex min-w-0 items-center gap-1.5"><button onClick={onMenu} aria-label="Open navigation" className="shrink-0 rounded-lg p-2 hover:bg-zinc-200 lg:hidden"><Menu size={21} /></button><div className="min-w-0"><h1 className="truncate text-lg font-black tracking-tight text-zinc-950 sm:text-xl">{title}</h1><p className="hidden text-xs font-semibold text-zinc-500 sm:block">Iron Lifters / Operations</p></div></div><div className="flex shrink-0 items-center gap-0.5 sm:gap-2"><button aria-label="Notifications" className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-200"><Bell size={18} /></button><Button onClick={onAdd} className="hidden max-sm:hidden sm:inline-flex" icon={<Plus size={17} />}>ADD LEAD</Button><div className="ml-0.5 flex size-8 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-black text-[#f5c400] sm:ml-1 sm:size-9 sm:text-xs">{initials}</div></div></header> 
}

export function AppLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-950">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="min-w-0 overflow-x-hidden lg:pl-[250px]">
        <Header title={title} onMenu={() => setMobileOpen(true)} onAdd={() => {
          if (typeof window !== 'undefined' && window.location.pathname === '/dashboard') {
            document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
          } else {
            router.push('/dashboard#lead-form')
          }
        }} />
        <main className="mx-auto w-full max-w-[1380px] min-w-0 overflow-x-hidden p-3 sm:p-5 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
