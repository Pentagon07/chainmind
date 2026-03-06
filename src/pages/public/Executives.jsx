import { executives } from '../../data/publicData';
export default function Executives() {
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Leadership</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    Built by experts in supply chain and AI
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Our leadership team combines deep supply chain domain expertise with
                    cutting-edge AI research from Google, Kinaxis, and Shopify.
                </p>
            </section>
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {executives.map((exec, i) => (
                        <div key={exec.name} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-lg)', padding: '36px 28px', backdropFilter: 'blur(16px)',
                            transition: 'border-color 0.2s', animation: `fadeIn 0.5s var(--ease-out) ${i * 0.1}s both`,
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                        >
                            {/* Placeholder avatar */}
                            <div style={{
                                width: 64, height: 64, borderRadius: '50%', marginBottom: 20,
                                background: `linear-gradient(135deg, ${['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-emerald)', 'var(--risk-amber)', 'var(--accent-primary)', 'var(--accent-secondary)'][i]} 0%, rgba(255,255,255,0.1) 100%)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.25rem', fontWeight: 700, color: 'var(--bg-primary)',
                            }}>{exec.name.split(' ').map(n => n[0]).join('')}</div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{exec.name}</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 500, marginBottom: 16 }}>{exec.title}</p>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{exec.bio}</p>
                        </div>
                    ))}
                </div>

                {/* Advisory Board */}
                <div style={{ marginTop: 80 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 32, textAlign: 'center', letterSpacing: '-0.02em' }}>Advisory Board</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                        {[
                            { name: 'Dr. Sarah Morrison', role: 'Former SVP Supply Chain, Procter & Gamble' },
                            { name: 'Raj Patel', role: 'Partner, McKinsey Operations Practice' },
                            { name: 'Prof. Hans Mueller', role: 'Chair of Logistics, ETH Zurich' },
                            { name: 'Lisa Chang', role: 'Former CIO, Flex Ltd.' },
                        ].map(a => (
                            <div key={a.name} style={{
                                background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                                borderRadius: 'var(--radius-md)', padding: '20px 16px', textAlign: 'center',
                            }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto 12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                                    {a.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{a.name}</div>
                                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{a.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
