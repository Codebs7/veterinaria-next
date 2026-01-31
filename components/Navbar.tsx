'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, PawPrint } from 'lucide-react'

const Navbar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const isActive = (path: string) => pathname === path ? 'active' : ''
    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    PetsHealth <PawPrint color="var(--secondary)" size={28} />
                </div>

                {/* Mobile Menu Button */}
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Links */}
                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <Link href="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsOpen(false)}>Inicio</Link>
                    <Link href="/servicios" className={`nav-link ${isActive('/servicios')}`} onClick={() => setIsOpen(false)}>Servicios</Link>
                    <Link href="/reservas" className={`nav-link ${isActive('/reservas')}`} onClick={() => setIsOpen(false)}>Reservar Cita</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
