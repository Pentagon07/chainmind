import { pricingTiers } from '../../data/publicData';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
function useReveal() { const ref = useRef(null); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el); } }, { threshold: 0.15 }); obs.observe(el); return () => obs.disconnect(); }, []); return { ref, style: { opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)' } }; }
function Section({ children, style = {} }) { const r = useReveal(); return <section ref={r.ref} style={{ ...r.style, maxWidth: 1200, margin: '0 auto', padding: '80px 48px', ...style }}>{children}</section>; }

const faqs = [
    { q: 'How long does deployment take?', a: 'Typical deployment is 2-4 weeks. This includes ERP integration (1 week), supply chain mapping (1 week), and agent configuration and testing (1-2 weeks). Design partner customers have gone live in as few as 10 days.' },
    { q: 'Do I need to change my existing systems?', a: 'No. ChainMind integrates with your existing ERP, procurement, and logistics systems through pre-built connectors. The platform reads data from your systems and writes back recommendations through approved channels.' },
    { q: 'How does the AI make decisions?', a: 'Every AI decision comes with a complete reasoning trace showing data sources consulted, assumptions made, and confidence levels. You configure approval thresholds that determine which actions the agent can execute autonomously and which require human approval.' },
    { q: 'Is my supply chain data secure?', a: 'Yes. ChainMind is SOC 2 Type II certified with data encryption at rest and in transit. We offer data residency options in North America, Europe, and Asia Pacific. Enterprise customers can opt for single-tenant deployments.' },
    { q: 'Can I try before committing?', a: 'Yes. We offer a 30-day free trial on Starter and Professional plans. Enterprise evaluations include a guided proof-of-concept with your actual supply chain data.' },
];

export default function Pricing() {
    const [openFaq, setOpenFaq] = useState(-1);
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Pricing</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    Plans that scale with your supply chain
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Start with Starter for basic monitoring. Upgrade to Professional for autonomous response.
                    Enterprise for unlimited scale and custom deployments.
                </p>
            </section>

            {/* Tiers */}
            <Section>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
                    {pricingTiers.map(tier => (
                        <div key={tier.name} style={{
                            background: tier.highlighted ? 'linear-gradient(180deg, rgba(0,212,255,0.04) 0%, var(--bg-elevated) 100%)' : 'var(--bg-elevated)',
                            border: `1px solid ${tier.highlighted ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                            borderRadius: 'var(--radius-lg)', padding: '40px 28px',
                            position: 'relative', backdropFilter: 'blur(16px)',
                            boxShadow: tier.highlighted ? '0 0 40px rgba(0,212,255,0.08)' : 'none',
                        }}>
                            {tier.highlighted && (
                                <div style={{
                                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                                    padding: '4px 16px', borderRadius: 'var(--radius-full)',
                                    background: 'var(--accent-primary)', color: 'var(--bg-primary)',
                                    fontSize: '0.6875rem', fontWeight: 600,
                                }}>Most Popular</div>
                            )}
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{tier.name}</h3>
                            <div style={{ marginBottom: 8 }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em' }}>{tier.price}</span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>{tier.period}</span>
                            </div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: 32, lineHeight: 1.6 }}>{tier.desc}</p>
                            <a href="/contact" style={{
                                display: 'block', textAlign: 'center', padding: '12px 24px',
                                borderRadius: 'var(--radius-full)',
                                background: tier.highlighted ? 'var(--accent-primary)' : 'transparent',
                                color: tier.highlighted ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                border: tier.highlighted ? 'none' : '1px solid var(--border-secondary)',
                                fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none',
                                transition: 'all 0.2s', marginBottom: 32,
                            }}>{tier.cta}</a>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {tier.features.map(f => (
                                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                                            <path d="M4 8L7 11L12 5" stroke="var(--accent-emerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* FAQ */}
            <Section>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 48, textAlign: 'center' }}>Frequently Asked Questions</h2>
                <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{
                            border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)',
                            overflow: 'hidden', background: 'var(--bg-elevated)',
                        }}>
                            <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
                                width: '100%', padding: '16px 20px', background: 'transparent', border: 'none',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600,
                            }}>
                                {faq.q}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            {openFaq === i && (
                                <div style={{ padding: '0 20px 16px', fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.8, animation: 'fadeIn 0.2s var(--ease-out)' }}>
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
