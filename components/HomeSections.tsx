'use client'

import React, { useState, useEffect, useRef } from 'react'

export const StatsSection = () => {
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
    const ref = useRef<HTMLDivElement>(null);

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
            observer.observe(ref.current);
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
        <div ref={ref}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{count}{suffix}</div>
            <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>{label}</div>
        </div>
    );
};

export const TestimonialCard = ({ name, pet, text }: { name: string, pet: string, text: string }) => (
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
