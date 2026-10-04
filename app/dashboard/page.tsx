'use client'

import { useState } from 'react'
import { ArrowRight, CalendarDays, Check, Plus, UserPlus, Users } from 'lucide-react'
import { AppLayout } from '../../components/AppLayout'
import { Button, Stat } from '../../components/ui'
import { LeadForm } from '../../components/LeadComponents'
import { useLeads } from '../../components/useLeads'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { leads, saveLead, loaded } = useLeads()
  const router = useRouter()
  const [toast, setToast] = useState('')

  if (!loaded) return null;

  const newLeads = leads.filter((l) => l.status === 'New').length; 
  const scheduled = leads.filter((l) => l.scheduledMessages.length).length;

  const handleSave = (lead: any) => {
    saveLead(lead);
    setToast(lead.id && leads.some((l) => l.id === lead.id) ? 'Lead updated successfully.' : 'Lead added successfully.')
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <AppLayout title="Lead management">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Tuesday, October 4, 2026</p>
          <h2 className="text-4xl font-black tracking-[-0.04em] text-zinc-950 sm:text-5xl">Good morning, {process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'Admin'}.</h2>
          <p className="mt-3 text-sm font-semibold text-zinc-500">Add and manage your Iron Lifters leads.</p>
        </div>
        <Button onClick={() => router.push('/leads')} variant="outline" icon={<ArrowRight size={16} />}>VIEW ALL LEADS</Button>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total leads" value={leads.length} icon={Users} accent />
        <Stat label="New leads" value={newLeads} icon={UserPlus} />
        <Stat label="Scheduled" value={scheduled} icon={CalendarDays} />
        <Stat label="Converted" value={leads.filter((l) => l.status === 'Converted').length} icon={Check} />
      </div>

      <LeadForm onSaved={handleSave} />

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-xl"><Check className="text-[#f5c400]" size={17} />{toast}</div>}
    </AppLayout>
  )
}
