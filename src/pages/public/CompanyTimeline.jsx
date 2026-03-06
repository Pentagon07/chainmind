import { companyTimeline } from '../../data/publicData';
export default function CompanyTimeline() {
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Our Journey</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    From founding to the future
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Building the autonomous supply chain intelligence platform, one milestone at a time.
                </p>
            </section>
            <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 48px 120px', position: 'relative' }}>
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--border-primary)' }} />
                {companyTimeline.map((item, i) => {
                    const isLeft = i % 2 === 0;
                    const isFuture = item.date.includes('Q');
                    return (
                        <div key={i} style={{
                            display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end',
                            marginBottom: 32, position: 'relative',
                        }}>
                            {/* Dot */}
                            <div style={{
                                position: 'absolute', left: '50%', top: 16, transform: 'translateX(-50%)',
                                width: 12, height: 12, borderRadius: '50%',
                                background: isFuture ? 'transparent' : 'var(--accent-primary)',
                                border: isFuture ? '2px solid var(--border-secondary)' : '2px solid var(--accent-primary)',
                                zIndex: 2,
                            }} />
                            <div style={{
                                width: 'calc(50% - 40px)',
                                background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                                borderRadius: 'var(--radius-md)', padding: '24px 20px',
                                opacity: isFuture ? 0.6 : 1,
                                backdropFilter: 'blur(16px)',
                                transition: 'border-color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                            >
                                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>{item.date}</span>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 8, marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
