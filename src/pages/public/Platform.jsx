import { useEffect, useRef } from 'react';
function useReveal() { const ref = useRef(null); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el); } }, { threshold: 0.15 }); obs.observe(el); return () => obs.disconnect(); }, []); return { ref, style: { opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)' } }; }
function Section({ children, style = {} }) { const r = useReveal(); return <section ref={r.ref} style={{ ...r.style, maxWidth: 1200, margin: '0 auto', padding: '80px 48px', ...style }}>{children}</section>; }

const layers = [
    { name: 'Perception Layer', color: 'var(--accent-primary)', desc: 'Continuous ingestion of 50+ real-time data feeds including maritime AIS, weather systems, financial filings, news sentiment, IoT sensor data, and commodity pricing.', feeds: ['MarineTraffic AIS', 'NOAA Weather', 'D&B Financial', 'Reuters News', 'Commodity Exchanges', 'IoT Telemetry'] },
    { name: 'Risk Intelligence Layer', color: 'var(--risk-amber)', desc: 'Multi-model AI evaluates signals against your supply chain graph to generate probabilistic risk assessments with revenue impact quantification and time-to-impact estimates.', feeds: ['Monte Carlo Simulation', 'Bayesian Networks', 'Historical Pattern Matching', 'Geopolitical Models'] },
    { name: 'Planning & Decision Layer', color: 'var(--accent-secondary)', desc: 'Generates ranked mitigation strategies with transparent cost-risk-time trade-off analysis. Leverages Gemini 2.5 Pro thinking mode for multi-step reasoning.', feeds: ['Strategy Generation', 'Trade-off Optimization', 'What-If Scenarios', 'Decision Trees'] },
    { name: 'Autonomous Action Layer', color: 'var(--accent-emerald)', desc: 'Executes pre-approved response playbooks: drafts supplier communications, adjusts ERP safety stocks, reroutes logistics, and escalates to stakeholders.', feeds: ['Email Drafting', 'ERP Updates', 'Logistics Rerouting', 'Stakeholder Alerts'] },
    { name: 'Memory & Reflection Layer', color: 'var(--risk-amber)', desc: 'Continuous learning from every disruption, decision, and outcome. Builds institutional supply chain knowledge that improves predictions over time.', feeds: ['Decision Logging', 'Outcome Tracking', 'Pattern Learning', 'Playbook Evolution'] },
    { name: 'Decision Transparency Layer', color: 'var(--text-primary)', desc: 'Full reasoning traces for every recommendation. Every data source consulted, assumption made, and confidence level is available for audit and review.', feeds: ['Reasoning Traces', 'Source Citations', 'Confidence Scores', 'Audit Logs'] },
];

const integrations = [
    { name: 'SAP S/4HANA', cat: 'ERP' }, { name: 'Oracle NetSuite', cat: 'ERP' }, { name: 'Microsoft Dynamics', cat: 'ERP' },
    { name: 'Coupa', cat: 'Procurement' }, { name: 'Ariba', cat: 'Procurement' }, { name: 'Jaggaer', cat: 'Procurement' },
    { name: 'project44', cat: 'Logistics' }, { name: 'FourKites', cat: 'Logistics' }, { name: 'Flexport', cat: 'Logistics' },
    { name: 'Salesforce', cat: 'CRM' }, { name: 'Slack', cat: 'Comms' }, { name: 'Teams', cat: 'Comms' },
];

export default function Platform() {
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Platform</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    Six layers of autonomous intelligence
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    ChainMind's architecture mirrors how the best supply chain teams operate: sense signals,
                    assess risk, plan responses, execute actions, learn from outcomes, and maintain full transparency.
                </p>
            </section>

            {/* Agent Architecture Layers */}
            <Section>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {layers.map((layer, i) => (
                        <div key={layer.name} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-lg)', padding: '36px 32px',
                            borderLeft: `3px solid ${layer.color}`, backdropFilter: 'blur(16px)',
                            transition: 'all 0.2s', cursor: 'default',
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = layer.color}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.borderLeftColor = layer.color; }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                        <span style={{ fontSize: '0.6875rem', color: layer.color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>0{i + 1}</span>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{layer.name}</h3>
                                    </div>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>{layer.desc}</p>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 280 }}>
                                    {layer.feeds.map(f => (
                                        <span key={f} style={{
                                            padding: '4px 10px', fontSize: '0.6875rem', borderRadius: 'var(--radius-full)',
                                            border: '1px solid var(--border-primary)', color: 'var(--text-tertiary)',
                                            background: 'rgba(255,255,255,0.02)',
                                        }}>{f}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Google AI Stack */}
            <Section>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 16, textAlign: 'center' }}>Built on Google AI</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.7 }}>
                    Enterprise-grade AI infrastructure with state-of-the-art reasoning capabilities
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {[
                        { name: 'Gemini 2.5 Pro', role: 'Deep Analysis', desc: 'Extended thinking mode for complex multi-variable supply chain scenario evaluation and strategy generation.' },
                        { name: 'Gemini 2.5 Flash', role: 'Real-time Processing', desc: 'Sub-second signal processing for live disruption detection across 50+ data feeds simultaneously.' },
                        { name: 'Agent Development Kit', role: 'Multi-Agent Orchestration', desc: 'Native A2A protocol support for specialized sub-agents that collaborate on complex supply chain decisions.' },
                    ].map(t => (
                        <div key={t.name} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-lg)', padding: '32px 24px', backdropFilter: 'blur(16px)',
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{t.name}</h3>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{t.role}</span>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7, marginTop: 12 }}>{t.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Integrations */}
            <Section>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 48, textAlign: 'center' }}>Integration Ecosystem</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {integrations.map(ig => (
                        <div key={ig.name} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-md)', padding: '20px 16px', textAlign: 'center',
                            transition: 'border-color 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                        >
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{ig.name}</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{ig.cat}</div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
