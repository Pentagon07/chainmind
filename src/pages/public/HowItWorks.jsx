import { useEffect, useRef, useState } from 'react';
function useReveal() { const ref = useRef(null); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el); } }, { threshold: 0.15 }); obs.observe(el); return () => obs.disconnect(); }, []); return { ref, style: { opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)' } }; }
function Section({ children, style = {} }) { const r = useReveal(); return <section ref={r.ref} style={{ ...r.style, maxWidth: 1200, margin: '0 auto', padding: '80px 48px', ...style }}>{children}</section>; }

const walkthrough = [
    { phase: 'Signal Detection', time: '0:00', desc: 'MarineTraffic AIS feed detects 87% vessel diversion from Suez Canal. Reuters NLP confirms Houthi activity escalation. Agent ingests both signals within 800ms.', color: 'var(--accent-primary)' },
    { phase: 'Impact Assessment', time: '0:04', desc: 'Agent maps affected shipping lanes against your supplier graph. Identifies 5 affected suppliers across 3 tiers. Calculates $3.4M revenue-at-risk using contract penalty models and lead time analysis.', color: 'var(--risk-amber)' },
    { phase: 'Strategy Generation', time: '0:18', desc: 'Gemini 2.5 Pro generates 3 mitigation strategies with Monte Carlo simulation for each. Evaluates cost, time impact, risk reduction, and supplier relationship effects.', color: 'var(--accent-secondary)' },
    { phase: 'Decision & Approval', time: '0:22', desc: 'Recommended strategy presented to VP Operations with full reasoning trace. Autonomous actions below $50K threshold auto-executed; strategy requiring $180K expenditure flagged for HITL approval.', color: 'var(--accent-emerald)' },
    { phase: 'Execution', time: '0:37', desc: 'Upon approval: 7 supplier coordination emails drafted and queued, ERP safety stocks adjusted for 12 SKUs, logistics rerouting initiated for 3 in-transit shipments, OEM delivery timeline updates sent.', color: 'var(--text-primary)' },
    { phase: 'Learning', time: '1:00+', desc: 'Outcome tracked over following weeks. Strategy effectiveness data feeds back into risk models. Response playbook updated for future Red Sea disruptions with refined cost estimates.', color: 'var(--risk-amber)' },
];

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>How It Works</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    A day in the life of your AI supply chain agent
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Follow a real disruption scenario from initial signal detection through autonomous response.
                    Every step is transparent, explainable, and auditable.
                </p>
            </section>

            {/* Interactive timeline */}
            <Section>
                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48 }}>
                    {/* Step selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {walkthrough.map((step, i) => (
                            <button key={i} onClick={() => setActiveStep(i)} style={{
                                background: activeStep === i ? 'var(--bg-elevated)' : 'transparent',
                                border: activeStep === i ? '1px solid var(--border-secondary)' : '1px solid transparent',
                                borderLeft: `3px solid ${activeStep === i ? step.color : 'var(--border-primary)'}`,
                                borderRadius: 'var(--radius-md)', padding: '16px 16px',
                                textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.625rem', color: step.color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{step.time}</span>
                                    <span style={{ fontSize: '0.8125rem', fontWeight: activeStep === i ? 700 : 500, color: activeStep === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                        {step.phase}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Detail panel */}
                    <div style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)', padding: '48px 40px',
                        borderTop: `3px solid ${walkthrough[activeStep].color}`,
                        backdropFilter: 'blur(16px)', transition: 'border-color 0.3s',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: walkthrough[activeStep].color, fontWeight: 600 }}>
                                T+{walkthrough[activeStep].time}
                            </span>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 20 }}>
                            {walkthrough[activeStep].phase}
                        </h2>
                        <p style={{ fontSize: '0.9375rem', color: 'var(--text-tertiary)', lineHeight: 1.9 }}>
                            {walkthrough[activeStep].desc}
                        </p>
                    </div>
                </div>
            </Section>

            {/* Before/After */}
            <Section>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 48, textAlign: 'center' }}>Before vs. After ChainMind</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                    <div style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)', padding: '36px 28px',
                        borderTop: '3px solid var(--risk-critical)',
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--risk-critical)', marginBottom: 24 }}>Manual Process</h3>
                        {[
                            { metric: 'Detection Time', val: '3-5 days' },
                            { metric: 'Impact Assessment', val: '5-10 days' },
                            { metric: 'Strategy Development', val: '7-14 days' },
                            { metric: 'Execution', val: '3-7 days' },
                            { metric: 'Total Response', val: '18-36 days' },
                        ].map(m => (
                            <div key={m.metric} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-primary)' }}>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{m.metric}</span>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--risk-critical)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{m.val}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)', padding: '36px 28px',
                        borderTop: '3px solid var(--accent-emerald)',
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: 24 }}>With ChainMind</h3>
                        {[
                            { metric: 'Detection Time', val: '< 1 minute' },
                            { metric: 'Impact Assessment', val: '4 seconds' },
                            { metric: 'Strategy Development', val: '18 seconds' },
                            { metric: 'Execution', val: '< 1 minute' },
                            { metric: 'Total Response', val: '4.2 minutes' },
                        ].map(m => (
                            <div key={m.metric} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-primary)' }}>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{m.metric}</span>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{m.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
