import { newsArticles } from '../../data/publicData';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
const cats = ['All', 'Company', 'Product', 'Industry', 'Press'];
export default function Newsroom() {
    const [filter, setFilter] = useState('All');
    const sorted = [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));
    const featured = sorted.filter(a => a.featured);
    const filtered = filter === 'All' ? sorted : sorted.filter(a => a.category === filter);
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Newsroom</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    News and insights
                </h1>
            </section>
            {/* Featured */}
            {featured.length > 0 && (
                <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 64px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        {featured.slice(0, 2).map(a => (
                            <NavLink key={a.slug} to={`/newsroom/${a.slug}`} style={{
                                background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                                borderRadius: 'var(--radius-lg)', padding: '36px 28px', textDecoration: 'none',
                                transition: 'border-color 0.2s', display: 'block',
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                            >
                                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                                    <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-primary)', fontSize: '0.625rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{a.category}</span>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{a.date}</span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.3 }}>{a.title}</h3>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{a.excerpt}</p>
                            </NavLink>
                        ))}
                    </div>
                </section>
            )}
            {/* Filter + Grid */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
                    {cats.map(c => (
                        <button key={c} onClick={() => setFilter(c)} style={{
                            padding: '6px 16px', borderRadius: 'var(--radius-full)',
                            border: `1px solid ${filter === c ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                            background: filter === c ? 'rgba(0,212,255,0.08)' : 'transparent',
                            color: filter === c ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                            fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
                        }}>{c}</button>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {filtered.map(a => (
                        <NavLink key={a.slug} to={`/newsroom/${a.slug}`} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-md)', padding: '24px 20px', textDecoration: 'none',
                            transition: 'border-color 0.15s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                        >
                            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-primary)', fontSize: '0.575rem', color: 'var(--text-tertiary)' }}>{a.category}</span>
                                <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{a.date}</span>
                            </div>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 8 }}>{a.title}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.excerpt}</p>
                        </NavLink>
                    ))}
                </div>
            </section>
        </div>
    );
}
