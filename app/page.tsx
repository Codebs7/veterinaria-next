import Link from 'next/link'
import { getSettings } from '@/app/actions/settings'
import { StatsSection, TestimonialCard } from '@/components/HomeSections'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const settings = await getSettings()

  // Default Fallbacks
  const heroTitle = settings.heroTitle || 'Cuidamos a quienes más amas 🐾'
  const heroSubtitle = settings.heroSubtitle || 'Servicios veterinarios profesionales con amor y dedicación.'
  const logoUrl = settings.logoUrl || ''

  return (
    <div className="home font-sans">
      <section className="relative min-h-[600px] flex items-center justify-center text-center text-white px-4 py-20" style={{
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay for readability - increased opacity */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
          {logoUrl && (
            <div className="mb-6">
              <img src={logoUrl} alt="Logo" className="w-32 h-auto rounded-xl shadow-lg bg-white p-2" />
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg text-white">
            {heroTitle}
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl drop-shadow-md">
            {heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Link
              href="/reservas"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl text-center w-full sm:w-auto"
            >
              Agendar Cita
            </Link>
            <Link
              href="/servicios"
              className="bg-transparent border-2 border-white hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-all text-center w-full sm:w-auto backdrop-blur-sm"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Nueva Sección: Sobre Nosotros */}
      <section className="bg-gray-50 py-16 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <img src="/about-us.png" alt="Equipo Veterinario" className="w-full max-w-lg rounded-xl shadow-lg" />
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-teal-700 mb-4">Más que una veterinaria, somos familia 🐾</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            En PetsHealth, entendemos que tu mascota es un miembro más de la familia. Nuestro equipo de profesionales certificados se dedica a brindar la mejor atención médica con tecnología de punta y, sobre todo, mucho amor.
          </p>
          <ul className="space-y-2">
            <li>✅ Atención personalizada</li>
            <li>✅ Instalaciones modernas</li>
            <li>✅ Amor por los animales</li>
          </ul>
        </div>
      </section>

      {/* Statistics Section with Animation */}
      <StatsSection />

      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-teal-800 mb-8">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-teal-600 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2">Atención 24/7</h3>
            <p className="text-gray-600">Emergencias veterinarias en cualquier momento.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-teal-600 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2">Especialistas</h3>
            <p className="text-gray-600">Médicos veterinarios certificados y con experiencia.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-teal-600 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2">Tecnología</h3>
            <p className="text-gray-600">Equipamiento moderno para diagnósticos precisos.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-teal-50">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-12">Lo que dicen nuestros clientes ❤️</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TestimonialCard name="María González" pet="Luna" text="¡Increíble atención! Salvaron a Luna cuando más lo necesitaba. Eternamente agradecida." />
          <TestimonialCard name="Carlos Ruiz" pet="Max" text="El mejor lugar para vacunas y chequeos. Son muy amables y profesionales." />
          <TestimonialCard name="Ana Paiva" pet="Toby" text="Toby siempre sale feliz de su baño. Recomendadísimos al 100%." />
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">Visítanos</h2>
        <p className="text-xl mb-8 text-gray-700">📍 Av. Principal 123, Lima, Perú</p>
        <div className="w-full max-w-5xl mx-auto h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Ubicacion"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124847.16972046894!2d-77.10848834015694!3d-12.083758379435456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c935d21074e9%3A0xc3c9402e1d0335e3!2sVeterinaria%20Pancho%20Cavero!5e0!3m2!1ses-419!2spe!4v1706123456789!5m2!1ses-419!2spe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </section>
    </div>
  )
}
