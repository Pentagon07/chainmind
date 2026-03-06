export default function Security() {
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Security</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>Enterprise-grade security and compliance</h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Your supply chain data is among your most sensitive assets. We protect it accordingly.
                </p>
            </section>
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>
                {/* Certifications */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 64 }}>
                    {[
                        { cert: 'SOC 2 Type II', desc: 'Independent audit by Deloitte confirming 150+ security controls' },
                        { cert: 'GDPR Compliant', desc: 'EU data residency, right to deletion, data processing agreements' },
                        { cert: 'EU AI Act Ready', desc: 'Transparent AI decision-making with full audit trails' },
                        { cert: 'ISO 27001', desc: 'Information security management system aligned with international standards' },
                    ].map(c => (
                        <div key={c.cert} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-md)', padding: '24px 20px', textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{c.cert}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{c.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Security Architecture */}
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 32, letterSpacing: '-0.02em' }}>Security Architecture</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 64 }}>
                    {[
                        { title: 'Data Encryption', items: ['AES-256 encryption at rest', 'TLS 1.3 for data in transit', 'Customer-managed encryption keys (Enterprise)', 'Encrypted database backups'] },
                        { title: 'Access Control', items: ['Role-based access control (RBAC)', 'SSO via SAML 2.0 and OIDC', 'Multi-factor authentication', 'API key management with rotation'] },
                        { title: 'Infrastructure', items: ['Google Cloud Platform hosting', 'SOC 2 certified data centers', 'Multi-region failover', 'DDoS protection and WAF'] },
                        { title: 'Data Governance', items: ['Data residency: NA, EU, APAC', 'Configurable retention policies', 'Automated PII detection and masking', 'Right to deletion compliance'] },
                    ].map(s => (
                        <div key={s.title} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-lg)', padding: '28px 24px',
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>{s.title}</h3>
                            {s.items.map(item => (
                                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0' }}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="var(--accent-emerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Responsible AI */}
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 32, letterSpacing: '-0.02em' }}>Responsible AI</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {[
                        { title: 'Decision Transparency', desc: 'Full reasoning traces for every agent recommendation. Every data source, assumption, and confidence level is inspectable.' },
                        { title: 'Human Override', desc: 'Configurable risk thresholds determine what agents can do autonomously vs. what requires human approval. No black box decisions.' },
                        { title: 'Bias Monitoring', desc: 'Ongoing audits of supplier scoring algorithms for geographic or economic bias. Regular third-party fairness assessments.' },
                    ].map(r => (
                        <div key={r.title} style={{ padding: '24px 0', borderTop: '2px solid var(--accent-secondary)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{r.title}</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{r.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
