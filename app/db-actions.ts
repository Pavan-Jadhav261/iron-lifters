'use server'

import { prisma } from '../lib/db'

export async function getLeads() {
  return await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function saveLead(data: any) {
  const { id, ...rest } = data
  // Check if lead exists
  const existing = await prisma.lead.findUnique({ where: { id } })
  if (existing) {
    return await prisma.lead.update({
      where: { id },
      data: rest
    })
  } else {
    return await prisma.lead.create({
      data: { id, ...rest }
    })
  }
}

export async function deleteLeadAction(id: string) {
  await prisma.lead.delete({ where: { id } })
  return { success: true }
}

export async function getSettings() {
  let settings = await prisma.settings.findUnique({ where: { id: 'default' } })
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: 'default',
        businessName: 'Iron Lifters',
        phone: '+91 90000 00000',
        email: 'hello@ironlifters.com',
        address: '12 Strength Avenue, Mumbai',
        website: 'ironlifters.com',
        description: '',
        instructions: ''
      }
    })
  }
  return settings
}

export async function saveSettingsAction(data: any) {
  return await prisma.settings.update({
    where: { id: 'default' },
    data
  })
}
