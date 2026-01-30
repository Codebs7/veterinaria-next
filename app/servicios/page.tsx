import Link from 'next/link'
import { getServices } from '@/app/actions/services'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
    const servicesList = await getServices()

    return (
        <div className="services-page">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-dark)' }}>Nuestros Servicios</h2>

            <div className="services-grid">
                {servicesList.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Cargando servicios...</p>
                ) : (
                    servicesList.map(service => (
                        <div key={service.id} className="service-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ color: 'var(--primary)' }}>{service.name}</h3>
                            <p style={{ flex: 1, margin: '1rem 0', color: '#666' }}>{service.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>S/ {service.price}</span>
                                <Link href="/reservas" className="btn-primary" style={{ fontSize: '0.9rem' }}>Reservar</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
