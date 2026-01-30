import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Seed Services
    const services = [
        { name: 'Consulta General', price: 50, duration: 30, description: 'Chequeo completo de salud.' },
        { name: 'Vacunación', price: 40, duration: 15, description: 'Vacunas anuales y refuerzos.' },
        { name: 'Desparasitación', price: 25, duration: 15, description: 'Control de parásitos.' },
        { name: 'Baño y Corte', price: 60, duration: 60, description: 'Estética e higiene.' },
        { name: 'Cirugía Menor', price: 150, duration: 90, description: 'Procedimientos ambulatorios.' },
        { name: 'Emergencia', price: 80, duration: 45, description: 'Atención inmediata.' }
    ]

    for (const service of services) {
        // Use upsert to avoid errors if run multiple times
        // Assuming 'name' isn't unique in schema, but for seeding let's try just create
        // If create fails due to constraint, we catch at end
        try {
            await prisma.service.create({ data: service })
        } catch (e) {
            console.log(`Service ${service.name} might already exist or error:`, e.code)
        }
    }

    // Seed Settings
    const settings = [
        { key: 'heroTitle', value: 'Cuidamos a quienes más amas 🐾' },
        { key: 'heroSubtitle', value: 'Servicios veterinarios profesionales con amor y dedicación.' },
        { key: 'logoUrl', value: '' }
    ]

    for (const setting of settings) {
        try {
            await prisma.setting.create({ data: setting })
        } catch (e) {
            console.log(`Setting ${setting.key} might already exist or error:`, e.code)
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
