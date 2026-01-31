'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSettings } from './actions/settings';
import { PawPrint } from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState({
    heroTitle: 'Cuidamos a quienes más amas',
    heroSubtitle: 'Servicios veterinarios profesionales con amor y dedicación.',
    logoUrl: ''
  });

  useEffect(() => {
    getSettings().then(data => {
      if (data && Object.keys(data).length > 0) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="home">
      <section className="hero" style={{
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '0',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>

        <div className="hero-content" style={{ position: 'relative', zIndex: 2, color: 'white', width: '100%' }}>
          {settings.logoUrl && <img src={settings.logoUrl} alt="Logo" style={{ maxWidth: '150px', marginBottom: '1rem', borderRadius: '10px', display: 'inline-block' }} />}
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {settings.heroTitle.replace('🐾', '')}
            <PawPrint size={40} color="#FF7043" fill="#FF7043" />
          </h1>
          <p>{settings.heroSubtitle}</p>
          <div className="hero-buttons">
            <Link href="/reservas" className="btn-hero btn-hero-primary">Agendar Cita</Link>
            <Link href="/servicios" className="btn-hero btn-hero-outline">Ver Servicios</Link>
          </div>
        </div>
      </section>

      {/* Nueva Sección: Sobre Nosotros */}
      <section className="about-us" style={{ padding: '4rem 2rem', background: '#f9f9f9', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <img src="/about-us.png" alt="Equipo Veterinario" style={{ maxWidth: '500px', width: '100%', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
        <div style={{ maxWidth: '500px' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '2rem' }}>Más que una veterinaria, somos familia 🐾</h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            En PetsHealth, entendemos que tu mascota es un miembro más de la familia. Nuestro equipo de profesionales certificados se dedica a brindar la mejor atención médica con tecnología de punta y, sobre todo, mucho amor.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '10px' }}>✅</span> Atención personalizada</li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '10px' }}>✅</span> Instalaciones modernas</li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '10px' }}>✅</span> Amor por los animales</li>
          </ul>
        </div>
      </section>

      {/* Statistics Section with Animation */}
      <StatsSection />

      <section className="features" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '2rem', fontSize: '2rem' }}>¿Por qué elegirnos?</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>Atención 24/7</h3>
            <p>Emergencias veterinarias en cualquier momento.</p>
          </div>
          <div className="service-card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>Especialistas</h3>
            <p>Médicos veterinarios certificados y con experiencia.</p>
          </div>
          <div className="service-card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>Tecnología</h3>
            <p>Equipamiento moderno para diagnósticos precisos.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '4rem 2rem', background: '#e0f2f1' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '3rem', fontSize: '2rem' }}>Lo que dicen nuestros clientes ❤️</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <TestimonialCard name="María González" pet="Luna" text="¡Increíble atención! Salvaron a Luna cuando más lo necesitaba. Eternamente agradecida." />
          <TestimonialCard name="Carlos Ruiz" pet="Max" text="El mejor lugar para vacunas y chequeos. Son muy amables y profesionales." />
          <TestimonialCard name="Ana Paiva" pet="Toby" text="Toby siempre sale feliz de su baño. Recomendadísimos al 100%." />
        </div>
      </section>

      {/* Location Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', fontSize: '2rem' }}>Visítanos</h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>📍 Av. Principal 123, Lima, Perú</p>
        <div style={{ width: '100%', height: '400px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', maxWidth: '1200px', margin: '0 auto' }}>
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
  );
};

// Helper Components
const StatsSection = () => {
  return (
    <section style={{ background: 'var(--primary-dark)', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
      <div className="services-grid" style={{ maxWidth: '1000px', margin: '0 auto', gap: '30px' }}>
        <AnimatedStat end={6000} label="Mascotas Atendidas" suffix="+" />
        <AnimatedStat end={15} label="Años de Experiencia" suffix="+" />
        <AnimatedStat end={8500} label="Dueños Felices" suffix="+" />
      </div>
    </section>
  );
};

const AnimatedStat = ({ end, label, suffix }: { end: number, label: string, suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 } // Start when 10% visible
    );

    if (ref.current) {
      observer.observe(ref.current as any);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, hasStarted]);

  return (
    <div ref={ref as any}>
      <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{count}{suffix}</div>
      <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>{label}</div>
    </div>
  );
};

const TestimonialCard = ({ name, pet, text }: { name: string, pet: string, text: string }) => (
  <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'left' }}>
    <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: '#555' }}>"{text}"</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '40px', height: '40px', background: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
        {name[0]}
      </div>
      <div>
        <div style={{ fontWeight: 'bold' }}>{name}</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Dueño de {pet}</div>
      </div>
    </div>
  </div>
);
