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
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {logoUrl && (
            <div className="mb-6">
              <img src={logoUrl} alt="Logo" className="w-32 h-auto rounded-xl shadow-lg" />
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
            {heroTitle}
          </h1>

          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl drop-shadow-sm">
            {heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/reservas"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg text-center"
            >
              Agendar Cita
            </Link>
            <Link
              href="/servicios"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition-all text-center"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Nueva Sección: Sobre Nosotros */}
      <section className="about-us" style={{ padding: '4rem 2rem', background: '#f9f9f9', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <img src="/about-us.png" alt="Equipo Veterinario" style={{ maxWidth: '500px', width: '100%', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
        <div style={{ maxWidth: '500px' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Más que una veterinaria, somos familia 🐾</h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            En PetsHealth, entendemos que tu mascota es un miembro más de la familia. Nuestro equipo de profesionales certificados se dedica a brindar la mejor atención médica con tecnología de punta y, sobre todo, mucho amor.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>✅ Atención personalizada</li>
            <li style={{ marginBottom: '10px' }}>✅ Instalaciones modernas</li>
            <li style={{ marginBottom: '10px' }}>✅ Amor por los animales</li>
          </ul>
        </div>
      </section>

      {/* Statistics Section with Animation */}
      <StatsSection />

      <section className="features" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '2rem' }}>¿Por qué elegirnos?</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Atención 24/7</h3>
            <p>Emergencias veterinarias en cualquier momento.</p>
          </div>
          <div className="service-card">
            <h3>Especialistas</h3>
            <p>Médicos veterinarios certificados y con experiencia.</p>
          </div>
          <div className="service-card">
            <h3>Tecnología</h3>
            <p>Equipamiento moderno para diagnósticos precisos.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '4rem 2rem', background: '#e0f2f1' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '3rem' }}>Lo que dicen nuestros clientes ❤️</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <TestimonialCard name="María González" pet="Luna" text="¡Increíble atención! Salvaron a Luna cuando más lo necesitaba. Eternamente agradecida." />
          <TestimonialCard name="Carlos Ruiz" pet="Max" text="El mejor lugar para vacunas y chequeos. Son muy amables y profesionales." />
          <TestimonialCard name="Ana Paiva" pet="Toby" text="Toby siempre sale feliz de su baño. Recomendadísimos al 100%." />
        </div>
      </section>

      {/* Location Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Visítanos</h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>📍 Av. Principal 123, Lima, Perú</p>
        <div style={{ width: '100%', height: '400px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
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
