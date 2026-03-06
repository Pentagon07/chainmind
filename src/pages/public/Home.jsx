import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* shared scroll-reveal hook */
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

function Section({ children, style = {}, ...rest }) {
    const r = useReveal();
    return <section ref={r.ref} style={{ ...r.style, maxWidth: 1200, margin: '0 auto', padding: '80px 48px', ...style }} {...rest}>{children}</section>;
}

/* SVG icons for capabilities */
const capIcons = {
    perceive: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="var(--accent-primary)" strokeWidth="1.5" opacity=".3" /><circle cx="20" cy="20" r="10" stroke="var(--accent-primary)" strokeWidth="1.5" /><circle cx="20" cy="20" r="3" fill="var(--accent-primary)" /><line x1="20" y1="2" x2="20" y2="8" stroke="var(--accent-primary)" strokeWidth="1.5" /><line x1="20" y1="32" x2="20" y2="38" stroke="var(--accent-primary)" strokeWidth="1.5" /><line x1="2" y1="20" x2="8" y2="20" stroke="var(--accent-primary)" strokeWidth="1.5" /><line x1="32" y1="20" x2="38" y2="20" stroke="var(--accent-primary)" strokeWidth="1.5" /></svg>,
    reason: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 28L16 20L22 26L32 12" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16" cy="20" r="2.5" fill="var(--accent-secondary)" opacity=".4" /><circle cx="22" cy="26" r="2.5" fill="var(--accent-secondary)" opacity=".4" /><circle cx="32" cy="12" r="2.5" fill="var(--accent-secondary)" /></svg>,
    act: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="14" width="12" height="12" rx="2" stroke="var(--accent-emerald)" strokeWidth="1.5" /><rect x="22" y="6" width="12" height="12" rx="2" stroke="var(--accent-emerald)" strokeWidth="1.5" /><rect x="22" y="22" width="12" height="12" rx="2" stroke="var(--accent-emerald)" strokeWidth="1.5" /><path d="M18 18L22 11M18 22L22 28" stroke="var(--accent-emerald)" strokeWidth="1.5" strokeLinecap="round" /></svg>,
};

const capabilities = [
    { key: 'perceive', title: 'Perceive', desc: 'Continuous monitoring of 50+ real-time data feeds. Maritime AIS tracking, financial filings, weather systems, geopolitical signals, and supplier health metrics are aggregated into a unified risk surface.' },
    { key: 'reason', title: 'Reason', desc: 'Multi-model AI orchestration evaluates cascading risks across your entire supply network. Monte Carlo simulations generate probabilistic impact assessments with full decision transparency.' },
    { key: 'act', title: 'Act', desc: 'Autonomous execution of pre-approved response playbooks. Draft supplier communications, adjust ERP safety stocks, reroute logistics, and escalate to stakeholders with human-in-the-loop controls.' },
];

const steps = [
    { num: '01', title: 'Connect', desc: 'Integrate existing ERP, procurement, and logistics systems through pre-built connectors for SAP, Oracle, NetSuite, and 40+ platforms.' },
    { num: '02', title: 'Map', desc: 'Automated supply chain graph construction maps every supplier, route, and dependency down to Tier 3 with financial health scoring.' },
    { num: '03', title: 'Monitor', desc: 'Always-on perception agents scan global disruption signals and correlate them with your specific supply chain exposure in real time.' },
    { num: '04', title: 'Respond', desc: 'When disruptions hit, autonomous agents generate mitigation strategies, model trade-offs, and execute approved actions within minutes.' },
];

const industries = [
    'Semiconductors', 'Import & Export', 'Agriculture & Food', 'Hospitality & Tourism',
    'Heavy Manufacturing', 'Software & SaaS', 'Financial Services',
];

const metrics = [
    { value: '4.2', unit: 'min', label: 'Average response time to critical disruption' },
    { value: '94', unit: '%', label: 'Risk prediction accuracy across monitored signals' },
    { value: '$12M', unit: '', label: 'Average annual savings per enterprise deployment' },
    { value: '47', unit: '', label: 'Live data feeds integrated per client instance' },
];

export default function Home() {
    return (
        <div>
            {/* === HERO === */}
            <section style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                padding: '120px 48px 80px', position: 'relative', overflow: 'hidden',
            }}>
                {/* Animated gradient mesh background */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0, 212, 255, 0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 20%, rgba(16, 185, 129, 0.04) 0%, transparent 60%)',
                }} />
                {/* Subtle grid overlay */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
                    <div style={{
                        display: 'inline-block', padding: '6px 16px', borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-primary)', fontSize: '0.6875rem',
                        color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase',
                        marginBottom: 32, fontWeight: 500,
                        background: 'rgba(255,255,255,0.02)',
                    }}>
                        Foundational Supply Chain Intelligence
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700,
                        lineHeight: 1.05, letterSpacing: '-0.04em',
                        color: 'var(--text-primary)', marginBottom: 24,
                    }}>
                        Autonomous resilience
                        <br />
                        for global supply chains
                    </h1>

                    <p style={{
                        fontSize: '1.125rem', color: 'var(--text-tertiary)', lineHeight: 1.7,
                        maxWidth: 560, margin: '0 auto 48px',
                    }}>
                        ChainMind deploys AI agents that perceive disruptions, reason through trade-offs,
                        and act autonomously to protect revenue. Built on Google Gemini.
                    </p>

                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                        <Link to="/contact" style={{
                            padding: '14px 32px', borderRadius: 'var(--radius-full)',
                            background: 'var(--text-primary)', color: 'var(--bg-primary)',
                            fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
                            transition: 'all 0.2s var(--ease-in-out)',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >Request Demo</Link>
                        <Link to="/platform" style={{
                            padding: '14px 32px', borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--border-secondary)',
                            color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500,
                            textDecoration: 'none', transition: 'all 0.2s var(--ease-in-out)',
                            background: 'rgba(255,255,255,0.02)',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >Explore Platform</Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div style={{
                    position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    animation: 'float 3s ease-in-out infinite',
                }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                        <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--text-tertiary)" strokeWidth="1" />
                        <circle cx="8" cy="7" r="2" fill="var(--text-tertiary)">
                            <animate attributeName="cy" values="7;15;7" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>
            </section>

            {/* === LOGOS === */}
            <Section style={{ padding: '40px 48px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, marginBottom: 32 }}>
                    Trusted by forward-thinking manufacturers and enterprises
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
                    {['Meridian Automotive', 'Cascade Industries', 'Atlas Precision', 'Helix Materials', 'Vertex Semiconductor', 'Nordic Supply Co.'].map(name => (
                        <span key={name} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-tertiary)', opacity: 0.5, letterSpacing: '-0.01em' }}>{name}</span>
                    ))}
                </div>
            </Section>

            {/* === THE PROBLEM === */}
            <Section>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 20 }}>
                            Supply chains break.<br />Recovery is manual.
                        </h2>
                        <p style={{ fontSize: '0.9375rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                            Mid-market manufacturers lose an average of $184 billion annually to supply chain disruptions.
                            When signals emerge, teams scramble across spreadsheets, emails, and calls. By the time a response
                            is coordinated, revenue is already lost.
                        </p>
                    </div>
                    <div style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)', padding: 40,
                        backdropFilter: 'blur(20px)',
                    }}>
                        {[
                            { stat: '72%', desc: 'of companies lack real-time supply chain visibility' },
                            { stat: '23 days', desc: 'average time to identify and respond to disruptions' },
                            { stat: '$184B', desc: 'annual global losses from supply chain failures' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: '20px 0',
                                borderBottom: i < 2 ? '1px solid var(--border-primary)' : 'none',
                            }}>
                                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{item.stat}</div>
                                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* === CAPABILITIES === */}
            <Section>
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 12 }}>Core Capabilities</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                        Perceive. Reason. Act.
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {capabilities.map(cap => (
                        <div key={cap.key} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-lg)', padding: '40px 32px',
                            backdropFilter: 'blur(16px)',
                            transition: 'all 0.25s var(--ease-in-out)',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ marginBottom: 24 }}>{capIcons[cap.key]}</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.02em' }}>{cap.title}</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>{cap.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* === PLATFORM PREVIEW === */}
            <Section>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 12 }}>Live Platform</p>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                        Your supply chain, fully illuminated
                    </h2>
                </div>
                <div style={{
                    background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-lg)', padding: 3, overflow: 'hidden',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset',
                }}>
                    <div style={{
                        borderRadius: 'calc(var(--radius-lg) - 3px)',
                        background: 'linear-gradient(180deg, rgba(0,212,255,0.03) 0%, var(--bg-primary) 50%)',
                        padding: '48px 40px',
                        minHeight: 320,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {/* Simulated dashboard preview */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '100%', marginBottom: 32 }}>
                            {[
                                { label: 'Revenue at Risk', val: '$2.1M', color: 'var(--risk-critical)' },
                                { label: 'Active Disruptions', val: '3', color: 'var(--risk-amber)' },
                                { label: 'Supplier Health', val: '78/100', color: 'var(--accent-primary)' },
                                { label: 'Agent Actions', val: '12', color: 'var(--accent-secondary)' },
                            ].map(m => (
                                <div key={m.label} style={{
                                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-primary)',
                                    borderRadius: 'var(--radius-md)', padding: '20px 16px',
                                }}>
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{m.label}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: m.color, fontFamily: 'var(--font-mono)' }}>{m.val}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            width: '100%', height: 200, borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(99,102,241,0.03) 100%)',
                            border: '1px solid var(--border-primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8125rem', color: 'var(--text-tertiary)',
                        }}>
                            Global Supply Network Visualization
                        </div>
                    </div>
                </div>
            </Section>

            {/* === HOW IT WORKS === */}
            <Section>
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 12 }}>How It Works</p>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                        Four steps to autonomous resilience
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                    {steps.map((s, i) => (
                        <div key={s.num} style={{ position: 'relative' }}>
                            {i < 3 && (
                                <div style={{
                                    position: 'absolute', top: 20, left: '100%', width: 24, height: 1,
                                    background: 'var(--border-secondary)', zIndex: 1,
                                }} />
                            )}
                            <div style={{
                                fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)',
                                fontFamily: 'var(--font-mono)', opacity: 0.3, marginBottom: 16,
                            }}>{s.num}</div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>{s.title}</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* === INDUSTRIES === */}
            <Section>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 16 }}>
                        Built for critical industries
                    </h2>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-tertiary)' }}>
                        Pre-configured for the complexity of your sector
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {industries.map((ind, i) => (
                        <Link key={ind} to="/case-studies" style={{
                            padding: '24px 20px',
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-md)', textDecoration: 'none',
                            transition: 'all 0.2s var(--ease-in-out)',
                            gridColumn: i === industries.length - 1 && industries.length % 4 !== 0 ? 'span 1' : undefined,
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{ind}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>View case study</div>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* === METRICS === */}
            <section style={{
                padding: '80px 48px', background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.03) 50%, transparent 100%)',
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, textAlign: 'center' }}>
                    {metrics.map(m => (
                        <div key={m.label}>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em' }}>
                                {m.value}<span style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>{m.unit}</span>
                            </div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: 8, lineHeight: 1.5 }}>{m.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* === CTA === */}
            <Section style={{ textAlign: 'center', paddingBottom: 120 }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 16 }}>
                    Ready to make your supply chain autonomous?
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
                    Join enterprises that have reduced disruption response time from weeks to minutes.
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <Link to="/contact" style={{
                        padding: '14px 36px', borderRadius: 'var(--radius-full)',
                        background: 'var(--text-primary)', color: 'var(--bg-primary)',
                        fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
                        transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >Request Demo</Link>
                    <Link to="/pricing" style={{
                        padding: '14px 36px', borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-secondary)',
                        color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500,
                        textDecoration: 'none', transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >View Pricing</Link>
                </div>
            </Section>
        </div>
    );
}
