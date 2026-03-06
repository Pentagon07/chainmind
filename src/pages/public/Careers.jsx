import { careers } from '../../data/publicData';
import { useState } from 'react';
export default function Careers() {
    const [filter, setFilter] = useState('All');
    const depts = ['All', ...new Set(careers.map(c => c.dept))];
    const filtered = filter === 'All' ? careers : careers.filter(c => c.dept === filter);
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Careers</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    Build the future of supply chain intelligence
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Join a team of AI researchers, supply chain engineers, and product builders creating
                    autonomous intelligence for the world's manufacturers.
                </p>
            </section>

            {/* Values */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 64px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                    {[
                        { title: 'Impact', desc: 'Your work protects real revenue for real manufacturers. Every feature ships to production, not a backlog.' },
                        { title: 'Autonomy', desc: 'Small teams, high trust, clear goals. We hire experts and give them the space to do their best work.' },
                        { title: 'Growth', desc: '$2,500/year learning budget, conference attendance, and internal research time. We invest in our people.' },
                        { title: 'Flexibility', desc: 'Hybrid-first in Toronto and Berlin. Comprehensive health benefits, equity participation, and competitive compensation.' },
                    ].map(v => (
                        <div key={v.title} style={{ padding: '24px 0' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{v.title}</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Positions */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, letterSpacing: '-0.02em' }}>Open Positions</h2>
                <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
                    {depts.map(d => (
                        <button key={d} onClick={() => setFilter(d)} style={{
                            padding: '6px 16px', borderRadius: 'var(--radius-full)',
                            border: `1px solid ${filter === d ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                            background: filter === d ? 'rgba(0,212,255,0.08)' : 'transparent',
                            color: filter === d ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                            fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
                        }}>{d}</button>
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filtered.map(job => (
                        <div key={job.id} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-md)', padding: '24px 28px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            transition: 'border-color 0.15s', cursor: 'pointer',
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                        >
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{job.title}</h3>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.5, maxWidth: 600 }}>{job.desc}</p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 24 }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{job.location}</div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-primary)', fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{job.dept}</span>
                                    <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-primary)', fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{job.type}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
