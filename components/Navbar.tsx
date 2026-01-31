'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    // Simple state if we need mobile menu later, but legacy app didn't show complex mobile menu logic in the snippet
    // keeping it simple to match legacy exact look first.

    const isActive = (path: string) => pathname === path ? 'active' : ''

    return (
        <nav className="navbar">
            <div className="logo">PetsHealth 🐾</div>
            <div className="nav-links">
                <Link href="/" className={`nav-link ${isActive('/')}`}>Inicio</Link>
                <Link href="/servicios" className={`nav-link ${isActive('/servicios')}`}>Servicios</Link>
                <Link href="/reservas" className={`nav-link ${isActive('/reservas')}`}>Reservar Cita</Link>
            </div>
        </nav>
    )
}

export default Navbar
