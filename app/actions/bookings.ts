'use server'

import prisma from '@/lib/prisma'
import { sendNotificationEmail } from '@/lib/email'
import { revalidatePath } from 'next/cache'

export async function getBookings(date?: string) {
    const where = date ? { date } : {}
    return await prisma.booking.findMany({ where })
}

export async function createBooking(data: {
    clientName: string
    clientPhone?: string
    clientEmail?: string
    petName?: string
    serviceId?: number
    date: string
    time: string
    notes?: string
    paymentStatus?: string
}) {
    // Check availability
    const existing = await prisma.booking.findFirst({
        where: {
            date: data.date,
            time: data.time
        }
    })

    if (existing) {
        return { error: 'Horario no disponible' }
    }

    try {
        const booking = await prisma.booking.create({
            data: {
                clientName: data.clientName,
                clientPhone: data.clientPhone,
                clientEmail: data.clientEmail,
                petName: data.petName,
                serviceReferenceId: data.serviceId,
                date: data.date,
                time: data.time,
                notes: data.notes,
                paymentStatus: data.paymentStatus || 'pending'
            },
            include: {
                service: true
            }
        })

        // Send Email
        // We pass service name if available from the relation
        await sendNotificationEmail(booking, booking.service?.name)

        revalidatePath('/reservas')
        revalidatePath('/admin')

        return { success: true, booking }
    } catch (err) {
        console.error(err)
        return { error: 'Error al crear reserva' }
    }
}
