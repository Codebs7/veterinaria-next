import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ChatWidget from '@/components/ChatWidget'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veterinaria Pets Health',
  description: 'Cuidamos a quienes más amas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={outfit.className}>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <footer className="footer">
            <p>&copy; 2026 Creado por Codebs - Lima, Perú</p>
            <p>Urgencias: 992-107-290 | contacto@petshealth.pe</p>
          </footer>
          <ChatWidget />
        </div>
      </body>
    </html>
  )
}
