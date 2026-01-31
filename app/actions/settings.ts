'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getSettings() {
    try {
        const settings = await prisma.setting.findMany()
        // Convert array to object { key: value }
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value || ''
            return acc
        }, {} as Record<string, string>)
        return settingsMap
    } catch (error) {
        console.error("Database connection error:", error)
        return {} // Return empty settings if DB fails so the UI can still render with defaults
    }
}

export async function updateSettings(updates: Record<string, string>) {
    for (const [key, value] of Object.entries(updates)) {
        const existing = await prisma.setting.findUnique({ where: { key } })
        if (existing) {
            await prisma.setting.update({
                where: { key },
                data: { value }
            })
        } else {
            await prisma.setting.create({
                data: { key, value }
            })
        }
    }
    revalidatePath('/')
    return { success: true }
}
