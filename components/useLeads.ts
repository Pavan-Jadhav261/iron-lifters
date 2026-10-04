'use client'

import { useState, useEffect } from 'react'
import { getLeads, saveLead as dbSaveLead, deleteLeadAction } from '../app/db-actions'

export type Lead = {
  id: string
  name: string
  phone: string
  membership: string
  notes: string | null
  status: string
  scheduledMessages: string[]
  createdAt: string
  updatedAt: string
}

let cachedLeads: Lead[] | null = null

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(cachedLeads || []);
  const [loaded, setLoaded] = useState(cachedLeads !== null);

  useEffect(() => { 
    if (cachedLeads) {
      setLeads(cachedLeads)
      setLoaded(true)
    }

    getLeads().then((data) => {
      // Prisma returns dates, map them to strings for the frontend
      const serialized = data.map(l => ({
        ...l,
        createdAt: new Date(l.createdAt).toISOString().split('T')[0],
        updatedAt: new Date(l.updatedAt).toISOString().split('T')[0]
      }))
      cachedLeads = serialized
      setLeads(serialized)
      setLoaded(true)
    }).catch(e => {
      console.error(e)
      setLoaded(true)
    })
  }, []); 

  const saveLead = async (lead: Lead) => {
    // Optimistic UI & update global cache
    const updater = (old: Lead[]) => old.some((l) => l.id === lead.id) ? old.map((l) => l.id === lead.id ? lead : l) : [lead, ...old]
    setLeads(updater)
    if (cachedLeads) cachedLeads = updater(cachedLeads)
    
    // Save to server
    await dbSaveLead({
      ...lead,
      createdAt: new Date(lead.createdAt),
      updatedAt: new Date(lead.updatedAt)
    })
  }

  const deleteLead = async (leadId: string) => {
    const updater = (old: Lead[]) => old.filter((l) => l.id !== leadId)
    setLeads(updater);
    if (cachedLeads) cachedLeads = updater(cachedLeads)
    await deleteLeadAction(leadId)
  }

  return { leads, saveLead, deleteLead, loaded }
}
