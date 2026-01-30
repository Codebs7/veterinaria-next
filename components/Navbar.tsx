'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const isActive = (path: string) => pathname === path ? 'active' : ''
    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">PetsHealth 🐾</div>

                <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                    <span className={`bar ${isOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'open' : ''}`}></span>
                </button>

                <div className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
                    <Link href="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsOpen(false)}>Inicio</Link>
                    <Link href="/servicios" className={`nav-link ${isActive('/servicios')}`} onClick={() => setIsOpen(false)}>Servicios</Link>
                    <Link href="/reservas" className={`nav-link ${isActive('/reservas')}`} onClick={() => setIsOpen(false)}>Reservar Cita</Link>
                </div>
            </div>

            <style jsx>{`
                .navbar {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    padding: 1rem;
                }
                .navbar-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #2563eb;
                }
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                .nav-link {
                    text-decoration: none;
                    color: #4b5563;
                    font-weight: 500;
                    transition: color 0.3s;
                }
                .nav-link:hover, .nav-link.active {
                    color: #2563eb;
                }
                .hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .bar {
                    width: 25px;
                    height: 3px;
                    background-color: #333;
                    transition: 0.3s;
                }
                .bar.open:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
                .bar.open:nth-child(2) { opacity: 0; }
                .bar.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -6px); }

                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        border-top: 1px solid #eee;
                        padding: 1rem;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .nav-links.mobile-open {
                        display: flex;
                    }
                    .hamburger {
                        display: flex;
                    }
                }
            `}</style>
        </nav>
    )
}

export default Navbar
