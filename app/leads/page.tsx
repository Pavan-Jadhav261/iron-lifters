'use client'

import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/ui'
import { LeadList, ViewModal, ConfirmModal, LeadForm } from '../../components/LeadComponents'
import { useLeads } from '../../components/useLeads'

export default function LeadsPage() {
  const { leads, saveLead, deleteLead, loaded } = useLeads()
  const [editing, setEditing] = useState<any>(null)
  const [viewing, setViewing] = useState<any>(null)
  const [deleting, setDeleting] = useState<any>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [toast, setToast] = useState('')

  if (!loaded) return null;

  const notify = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleSave = (lead: any) => {
    saveLead(lead);
    setEditing(null);
    setIsAdding(false);
    notify(lead.id && leads.some((l) => l.id === lead.id) ? 'Lead updated successfully.' : 'Lead added successfully.')
  }

  return (
    <AppLayout title="All leads">
      {!isAdding && !editing ? (
        <>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Your customer pipeline</p>
              <h2 className="text-4xl font-black tracking-[-0.04em] text-zinc-950 sm:text-5xl">Every lead, in one place.</h2>
            </div>
            <Button onClick={() => setIsAdding(true)} className="hidden sm:inline-flex" icon={<Plus size={17} />}>ADD LEAD</Button>
          </div>
          <LeadList leads={leads} onView={setViewing} onEdit={(l: any) => setEditing(l)} onDelete={setDeleting} />
        </>
      ) : (
        <LeadForm editing={editing} onSaved={handleSave} onCancel={() => { setEditing(null); setIsAdding(false) }} />
      )}

      {viewing && <ViewModal lead={viewing} onClose={() => setViewing(null)} onEdit={() => { setEditing(viewing); setViewing(null); }} />}
      {deleting && <ConfirmModal lead={deleting} onClose={() => setDeleting(null)} onConfirm={() => { deleteLead(deleting.id); setDeleting(null); notify('Lead deleted.') }} />}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-xl"><Check className="text-[#f5c400]" size={17} />{toast}</div>}
    </AppLayout>
  )
}
