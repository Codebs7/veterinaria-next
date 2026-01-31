'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, PawPrint } from 'lucide-react'

const Navbar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const isActive = (path: string) => pathname === path ? 'text-teal-600 font-bold' : 'text-gray-600 hover:text-teal-600'
    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo - Left Aligned */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
                            PetsHealth <PawPrint className="w-8 h-8" />
                        </Link>
                    </div>

                    {/* Desktop Menu - Right Aligned */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={`text-lg font-medium transition-colors ${isActive('/')}`}>Inicio</Link>
                        <Link href="/servicios" className={`text-lg font-medium transition-colors ${isActive('/servicios')}`}>Servicios</Link>
                        <Link href="/reservas" className={`px-5 py-2.5 rounded-full bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${isActive('/reservas')}`}>
                            Reservar Cita
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Right Aligned (visible only on mobile) */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-colors"
                            aria-label="Menu"
                        >
                            {isOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 top-20 animate-in slide-in-from-top-5 duration-200">
                    <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col items-center text-center">
                        <Link
                            href="/"
                            className={`block w-full px-3 py-3 rounded-md text-lg font-medium ${pathname === '/' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/servicios"
                            className={`block w-full px-3 py-3 rounded-md text-lg font-medium ${pathname === '/servicios' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Servicios
                        </Link>
                        <Link
                            href="/reservas"
                            className="block w-full mt-4 px-5 py-3 rounded-full bg-teal-600 text-white font-bold hover:bg-teal-700 transition-colors shadow-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Reservar Cita
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
