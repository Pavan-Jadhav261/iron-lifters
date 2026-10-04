'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '../../components/AppLayout'
import { Button, Field, Input, Textarea } from '../../components/ui'
import { Check } from 'lucide-react'
import { getSettings, saveSettingsAction } from '../db-actions'

let cachedSettings: any = null

export default function SettingsPage() {
  const [toast, setToast] = useState('')
  const [settings, setSettings] = useState<any>(cachedSettings)
  const [loaded, setLoaded] = useState(cachedSettings !== null)

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings)
      setLoaded(true)
    }
    getSettings().then(data => {
      cachedSettings = data
      setSettings(data)
      setLoaded(true)
    }).catch(e => {
      console.error(e)
      setLoaded(true)
    })
  }, [])

  if (!loaded || !settings) return null;

  function notify(message: string) { setToast(message); setTimeout(() => setToast(''), 3000) }

  async function save(e: React.FormEvent) { 
    e.preventDefault(); 
    await saveSettingsAction(settings)
    cachedSettings = settings
    notify('Business settings saved successfully.') 
  } 

  return (
    <AppLayout title="Business settings">
      <form onSubmit={save} className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8">
        <div className="mb-8">
          <p className="text-sm text-zinc-500">Manage the details your team works from.</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight">Business settings</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Business name"><Input value={settings.businessName} onChange={(e: any) => setSettings({ ...settings, businessName: e.target.value })} /></Field>
          <Field label="Business phone"><Input value={settings.phone} onChange={(e: any) => setSettings({ ...settings, phone: e.target.value })} /></Field>
          <Field label="Business email"><Input type="email" value={settings.email} onChange={(e: any) => setSettings({ ...settings, email: e.target.value })} /></Field>
          <Field label="Website"><Input value={settings.website} onChange={(e: any) => setSettings({ ...settings, website: e.target.value })} /></Field>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <Field label="Business address"><Input value={settings.address} onChange={(e: any) => setSettings({ ...settings, address: e.target.value })} /></Field>
          <Field label="Business description"><Textarea value={settings.description} onChange={(e: any) => setSettings({ ...settings, description: e.target.value })} placeholder="Describe your business..." /></Field>
          <Field label="Lead management instructions"><Textarea className="min-h-40" value={settings.instructions} onChange={(e: any) => setSettings({ ...settings, instructions: e.target.value })} placeholder="How should leads be followed up? What tone should the team use?" /></Field>
        </div>
        <Button type="submit" className="mt-7">SAVE BUSINESS SETTINGS</Button>
      </form>

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-xl"><Check className="text-[#f5c400]" size={17} />{toast}</div>}
    </AppLayout>
  )
}
