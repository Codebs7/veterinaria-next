import nodemailer from 'nodemailer'
import { Booking } from '@prisma/client'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const SERVICE_MAP: Record<number, string> = {
    1: 'Consulta General',
    2: 'Vacunacion',
    3: 'Desparasitacion',
    4: 'Bano y Corte',
    5: 'Cirugia Menor',
    6: 'Emergencia'
}

export async function sendNotificationEmail(booking: Booking, serviceNameFromDb?: string) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log("NO EMAIL: Faltan credenciales.");
        return;
    }

    const serviceName = serviceNameFromDb || (booking.serviceReferenceId ? SERVICE_MAP[booking.serviceReferenceId] : 'Servicio General');
    const cleanNotes = booking.notes || 'Ninguna';

    // 1. Admin Email
    const adminMail = {
        from: `Pets Health <${process.env.EMAIL_USER}>`,
        to: 'srzbryan23@gmail.com', // OR process.env.ADMIN_EMAIL
        subject: `Nueva Reserva: ${booking.date} ${booking.time}`,
        text: `NUEVA RESERVA
----------------
Cliente: ${booking.clientName}
Mascota: ${booking.petName}
Telefono: ${booking.clientPhone}
Email: ${booking.clientEmail}
Fecha: ${booking.date}
Hora: ${booking.time}
Servicio: ${serviceName}
Notas: ${cleanNotes}`
    };

    // 2. Client Email
    if (booking.clientEmail) {
        const clientMail = {
            from: `Pets Health <${process.env.EMAIL_USER}>`,
            to: booking.clientEmail,
            subject: 'Confirmacion de Cita - Pets Health',
            text: `Estimado/a ${booking.clientName},

Su cita ha sido reservada con exito.
Mascota: ${booking.petName}
Servicio: ${serviceName}
Fecha: ${booking.date}
Hora: ${booking.time}

Por favor llegar 10 minutos antes.
Atentamente,
Equipo Pets Health`
        };
        await transporter.sendMail(clientMail);
    }

    await transporter.sendMail(adminMail);
    console.log("Emails sent successfully");
}
