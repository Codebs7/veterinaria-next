'use client'

import React, { useEffect, useState } from 'react'
import { getServices, createService, deleteService } from '@/app/actions/services'
import { getBookings } from '@/app/actions/bookings'
import { getSettings, updateSettings } from '@/app/actions/settings'

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [activeTab, setActiveTab] = useState('dashboard')

    // Data
    const [bookings, setBookings] = useState<any[]>([])
    const [services, setServices] = useState<any[]>([])
    const [settings, setSettingsData] = useState<any>({ heroTitle: '', heroSubtitle: '', logoUrl: '' })

    // Forms
    const [newService, setNewService] = useState({ name: '', price: 0, duration: 30, description: '', imageUrl: '' })

    // Load login state from session storage for convenience
    useEffect(() => {
        const logged = sessionStorage.getItem('isAdminLogged')
        if (logged) setIsLoggedIn(true)
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            fetchData()
        }
    }, [isLoggedIn])

    const fetchData = async () => {
        try {
            const [b, s, set] = await Promise.all([
                getBookings(),
                getServices(),
                getSettings()
            ])
            setBookings(b)
            setServices(s)
            setSettingsData(set)
        } catch (e) {
            console.error("Error fetching admin data", e)
        }
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (user === 'admin' && pass === 'admin123') { // Simple Auth
            setIsLoggedIn(true)
            sessionStorage.setItem('isAdminLogged', 'true')
            setError('')
        } else {
            setError('Credenciales incorrectas')
        }
    }

    // --- Services Handlers ---
    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault()
        await createService(newService)
        setNewService({ name: '', price: 0, duration: 30, description: '', imageUrl: '' })
        fetchData()
    }

    const handleDeleteService = async (id: number) => {
        if (!window.confirm("¿Seguro de eliminar este servicio?")) return
        await deleteService(id)
        fetchData()
    }

    // --- Settings Handlers ---
    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateSettings(settings)
            alert("Configuración guardada correctamente ✅")
        } catch (error) {
            console.error(error)
            alert("Error guardando configuración ❌")
        }
    }

    // --- Export Handler ---
    const handleExport = () => {
        if (bookings.length === 0) {
            alert("No hay datos para exportar")
            return
        }
        const fields = ['ID', 'Cliente', 'Email', 'Telefono', 'Mascota', 'Fecha', 'Hora', 'Servicio']
        let csv = 'sep=;\n' + fields.join(';') + '\n'
        bookings.forEach(b => {
            const cleanName = b.clientName ? b.clientName.replace(/;/g, '') : ''
            const cleanPet = b.petName ? b.petName.replace(/;/g, '') : ''
            // Robust Service Name Search
            const sId = b.serviceReferenceId
            const serviceObj = services.find(s => s.id == sId)
            const serviceName = serviceObj ? serviceObj.name : (sId || 'Sin Servicio')

            csv += `${b.id};${cleanName};${b.clientEmail || ''};${b.clientPhone || ''};${cleanPet};${b.date};${b.time};${serviceName}\n`
        })
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'clientes_veterinaria.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    if (!isLoggedIn) {
        return (
            <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>Acceso Administrativo 🔒</h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}><label>Usuario</label><input type="text" value={user} onChange={e => setUser(e.target.value)} style={inputStyle} /></div>
                    <div style={{ marginBottom: '1rem' }}><label>Contraseña</label><input type="password" value={pass} onChange={e => setPass(e.target.value)} style={inputStyle} /></div>
                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Ingresar</button>
                </form>
            </div>
        )
    }

    return (
        <div className="admin-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Panel de Control 🛠️</h2>
                <div>
                    <button className="btn-primary" onClick={handleExport} style={{ marginRight: '10px', fontSize: '0.9rem' }}>📥 Descargar Excel</button>
                    <button onClick={() => { setIsLoggedIn(false); sessionStorage.removeItem('isAdminLogged') }} style={{ background: 'none', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Cerrar Sesión</button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '10px', overflowX: 'auto' }}>
                <TabButton name="dashboard" label="📊 Resumen" active={activeTab} set={setActiveTab} />
                <TabButton name="services" label="📦 Servicios" active={activeTab} set={setActiveTab} />
                <TabButton name="content" label="✏️ Editar Web" active={activeTab} set={setActiveTab} />
                <TabButton name="bookings" label="📅 Historial Citas" active={activeTab} set={setActiveTab} />
            </div>

            {activeTab === 'dashboard' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <StatCard title="Reservas Totales" value={bookings.length} icon="📅" />
                    <StatCard title="Servicios Activos" value={services.length} icon="🏷️" />
                    <StatCard title="Ingresos Estimados" value={`S/ ${bookings.reduce((sum, b) => {
                        const sId = b.serviceReferenceId
                        const s = services.find(srv => srv.id == sId)
                        return sum + (s ? s.price : 0)
                    }, 0)}`} icon="💵" />
                </div>
            )}

            {activeTab === 'services' && (
                <div>
                    <h3 style={{ marginBottom: '1rem' }}>Gestionar Servicios</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                            <h4>Nuevo Servicio</h4>
                            <form onSubmit={handleAddService}>
                                <input placeholder="Nombre" value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} style={inputStyle} required />
                                <input placeholder="Precio (S/)" type="number" value={newService.price} onChange={e => setNewService({ ...newService, price: parseFloat(e.target.value) })} style={inputStyle} required />
                                <input placeholder="URL Imagen (opcional)" value={newService.imageUrl || ''} onChange={e => setNewService({ ...newService, imageUrl: e.target.value })} style={inputStyle} />
                                <input placeholder="Descripción" value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} style={inputStyle} />
                                <button className="btn-primary" style={{ marginTop: '10px', width: '100%' }}>Agregar</button>
                            </form>
                        </div>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#eee' }}><th style={{ padding: '8px' }}>Nombre</th><th style={{ padding: '8px' }}>Precio</th><th style={{ padding: '8px' }}>Acción</th></tr>
                                </thead>
                                <tbody>
                                    {services.map(s => (
                                        <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '8px' }}>{s.name}</td>
                                            <td style={{ padding: '8px' }}>S/ {s.price}</td>
                                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                                <button onClick={() => handleDeleteService(s.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'content' && (
                <div style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: '8px' }}>
                    <h3>Personalizar Página de Inicio</h3>
                    <form onSubmit={handleSaveSettings}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Título Principal (Hero)</label>
                            <input value={settings.heroTitle || ''} onChange={e => setSettingsData({ ...settings, heroTitle: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Subtítulo</label>
                            <input value={settings.heroSubtitle || ''} onChange={e => setSettingsData({ ...settings, heroSubtitle: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>URL del Logo (Opcional)</label>
                            <input placeholder="https://..." value={settings.logoUrl || ''} onChange={e => setSettingsData({ ...settings, logoUrl: e.target.value })} style={inputStyle} />
                            {settings.logoUrl && <img src={settings.logoUrl} alt="Preview" style={{ marginTop: '10px', maxHeight: '50px' }} />}
                        </div>
                        <button className="btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            )}

            {activeTab === 'bookings' && (
                <div style={{ overflowX: 'auto', background: 'white', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3>Historial Completo</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#eee' }}>
                                <th style={thStyle}>Cliente</th>
                                <th style={thStyle}>Mascota</th>
                                <th style={thStyle}>Fecha/Hora</th>
                                <th style={thStyle}>Servicio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => {
                                const sId = b.serviceReferenceId
                                const service = services.find(s => s.id == sId)
                                return (
                                    <tr key={b.id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={tdStyle}>{b.clientName}</td>
                                        <td style={tdStyle}>{b.petName}</td>
                                        <td style={tdStyle}>{b.date} {b.time}</td>
                                        <td style={tdStyle}>{service ? service.name : (sId || '-')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

// Utils
const TabButton = ({ name, label, active, set }: any) => (
    <button
        onClick={() => set(name)}
        style={{
            padding: '10px 20px',
            border: 'none',
            borderBottom: active === name ? '3px solid var(--primary)' : '3px solid transparent',
            background: 'none',
            fontWeight: active === name ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '1rem'
        }}
    >
        {label}
    </button>
)

const StatCard = ({ title, value, icon }: any) => (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{value}</div>
        <div style={{ color: '#666' }}>{title}</div>
    </div>
)

const inputStyle: React.CSSProperties = { width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px' }
const thStyle: React.CSSProperties = { padding: '1rem', textAlign: 'left' }
const tdStyle: React.CSSProperties = { padding: '1rem' }
