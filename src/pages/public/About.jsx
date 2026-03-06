import { useEffect, useRef } from 'react';

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el); }
        }, { threshold: 0.15 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, style: { opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)' } };
}

function Section({ children, style = {} }) {
    const r = useReveal();
    return <section ref={r.ref} style={{ ...r.style, maxWidth: 1200, margin: '0 auto', padding: '80px 48px', ...style }}>{children}</section>;
}

export default function About() {
    return (
        <div>
            {/* Hero */}
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>About ChainMind</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    Making supply chains think for themselves
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Founded in 2025 by supply chain engineers and AI researchers who saw that mid-market manufacturers
                    deserve the same intelligence capabilities that Fortune 100 companies build for millions.
                </p>
            </section>

            {/* Mission & Vision */}
            <Section>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', padding: '48px 36px', backdropFilter: 'blur(16px)' }}>
                        <h3 style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Mission</h3>
                        <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 16 }}>
                            Eliminate supply chain blindness for every manufacturer, everywhere.
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                            We deploy autonomous AI agents that continuously monitor, reason about, and respond to supply chain disruptions
                            so manufacturers can focus on building great products instead of firefighting logistics crises.
                        </p>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', padding: '48px 36px', backdropFilter: 'blur(16px)' }}>
                        <h3 style={{ fontSize: '0.6875rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Vision</h3>
                        <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 16 }}>
                            A world where no production line stops because of a preventable supply chain failure.
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                            By 2030, we envision a network of interconnected AI agents collaborating across manufacturer supply chains,
                            creating a collective intelligence layer that makes global supply chains self-healing by default.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Values */}
            <Section>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 48, textAlign: 'center' }}>Our Values</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {[
                        { title: 'Transparency First', desc: 'Every AI decision comes with a complete reasoning trace. We believe autonomous systems must earn trust through explainability, not demand it through authority.' },
                        { title: 'Operator Empathy', desc: 'We build for the procurement manager at 2 AM facing a supplier crisis, not for a conference demo. Every feature is designed to reduce cognitive load when stakes are highest.' },
                        { title: 'Compounding Intelligence', desc: 'Our platform learns from every disruption, every decision, and every outcome. Each customer makes the system smarter for all customers.' },
                    ].map(v => (
                        <div key={v.title} style={{ padding: '32px 24px', borderLeft: '2px solid var(--border-secondary)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{v.title}</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Offices */}
            <Section>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 48, textAlign: 'center' }}>Our Offices</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                    {[
                        { city: 'Toronto', country: 'Canada', address: 'MaRS Discovery District, 101 College St, Suite 300', role: 'Global Headquarters', team: '30+ employees' },
                        { city: 'Berlin', country: 'Germany', address: 'Mitte District, Friedrichstrasse 68', role: 'European Headquarters', team: '8 employees, growing to 25' },
                    ].map(o => (
                        <div key={o.city} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-lg)', padding: '32px 28px', backdropFilter: 'blur(16px)',
                        }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{o.city}</h3>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{o.role}</span>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: 16, lineHeight: 1.7 }}>{o.address}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 8 }}>{o.team}</p>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
