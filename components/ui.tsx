'use client'

import { Dumbbell } from 'lucide-react'

export function Logo({ dark = false }: { dark?: boolean }) {
  return <div className={`flex items-center gap-3 ${dark ? 'text-white' : 'text-zinc-950'}`}><div className="flex size-9 items-center justify-center rounded-xl bg-[#f5c400] text-zinc-950"><Dumbbell size={19} strokeWidth={2.7} /></div><div className="leading-none"><div className="text-[15px] font-black tracking-[0.16em]">IRON</div><div className="text-[15px] font-black tracking-[0.16em]">LIFTERS</div></div></div>
}

export function Button({ children, variant = 'primary', onClick, type = 'button', className = '', icon }: any) {
  const styles: any = { primary: 'bg-[#f5c400] text-zinc-950 hover:bg-[#ffd21a] shadow-[0_4px_20px_-4px_rgba(245,196,0,0.4)]', dark: 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-[0_4px_20px_-4px_rgba(24,24,27,0.4)]', secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200', outline: 'border-2 border-zinc-200 bg-transparent text-zinc-800 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white', ghost: 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900', danger: 'bg-red-50 text-red-700 hover:bg-red-100' }
  const base = className.includes('hidden') ? '' : 'inline-flex';
  return <button type={type} onClick={onClick} className={`${base} min-h-12 items-center justify-center gap-2 rounded-2xl px-6 text-[11px] font-black uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400] disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`}>{icon}{children}</button>
}

export function Field({ label, children, error }: any) { return <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">{label}{children}{error && <span className="text-xs font-medium text-red-600">{error}</span>}</label> }
export function Input({ className = '', ...props }: any) { return <input {...props} className={`h-11 w-full rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3.5 text-sm font-medium text-zinc-900 outline-none transition hover:bg-zinc-100/50 focus:border-[#d7aa00] focus:bg-white focus:ring-3 focus:ring-[#f5c400]/20 ${className}`} /> }
export function Select({ className = '', ...props }: any) { return <select {...props} className={`h-11 w-full appearance-none rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3.5 text-sm font-medium text-zinc-900 outline-none transition hover:bg-zinc-100/50 focus:border-[#d7aa00] focus:bg-white focus:ring-3 focus:ring-[#f5c400]/20 ${className}`} /> }
export function Textarea({ className = '', ...props }: any) { return <textarea {...props} className={`min-h-28 w-full resize-y rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3.5 py-3 text-sm font-medium text-zinc-900 outline-none transition hover:bg-zinc-100/50 focus:border-[#d7aa00] focus:bg-white focus:ring-3 focus:ring-[#f5c400]/20 ${className}`} /> }

export function Stat({ label, value, icon: Icon, accent = false }: any) { return <div className={`flex flex-col justify-between rounded-3xl border p-6 h-36 ${accent ? 'border-[#f5c400] bg-[#f5c400]' : 'border-zinc-200 bg-white'}`}><div className="flex items-start justify-between"><span className={`text-[10px] font-black uppercase tracking-[0.2em] ${accent ? 'text-zinc-800' : 'text-zinc-500'}`}>{label}</span><Icon size={20} className={accent ? 'text-zinc-950' : 'text-[#b18c00]'} strokeWidth={2.5} /></div><p className="text-5xl font-black tracking-[-0.05em] text-zinc-950">{value}</p></div> }

export type Status = 'New' | 'Contacted' | 'Follow-up Scheduled' | 'Converted' | 'Closed'
export function StatusBadge({ status }: { status: Status }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${status === 'Converted' ? 'bg-emerald-50 text-emerald-700' : status === 'Follow-up Scheduled' ? 'bg-[#fff6c7] text-[#856800]' : status === 'Closed' ? 'bg-zinc-100 text-zinc-500' : status === 'Contacted' ? 'bg-blue-50 text-blue-700' : 'bg-zinc-100 text-zinc-700'}`}>{status}</span> }
