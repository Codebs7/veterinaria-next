'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getServices() {
    return await prisma.service.findMany()
}

export async function createService(data: { name: string; description?: string; price?: number; duration?: number; imageUrl?: string }) {
    const service = await prisma.service.create({
        data
    })
    revalidatePath('/servicios')
    revalidatePath('/admin')
    return service
}

export async function updateService(id: number, data: { name?: string; description?: string; price?: number; duration?: number; imageUrl?: string }) {
    await prisma.service.update({
        where: { id },
        data
    })
    revalidatePath('/servicios')
    revalidatePath('/admin')
    return { success: true }
}

export async function deleteService(id: number) {
    await prisma.service.delete({
        where: { id }
    })
    revalidatePath('/servicios')
    revalidatePath('/admin')
    return { success: true }
}
