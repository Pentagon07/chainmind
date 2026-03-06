import { useParams, NavLink } from 'react-router-dom';
import { newsArticles } from '../../data/publicData';
export default function NewsArticle() {
    const { slug } = useParams();
    const article = newsArticles.find(a => a.slug === slug);
    if (!article) return <div style={{ padding: '160px 48px', textAlign: 'center', color: 'var(--text-tertiary)' }}>Article not found.</div>;
    const related = newsArticles.filter(a => a.slug !== slug && a.category === article.category).slice(0, 3);
    return (
        <div style={{ padding: '160px 48px 120px', maxWidth: 960, margin: '0 auto' }}>
            <NavLink to="/newsroom" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >Back to Newsroom</NavLink>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, marginBottom: 16 }}>
                <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-primary)', fontSize: '0.625rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{article.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{article.date}</span>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 32 }}>{article.title}</h1>
            <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 32 }}>
                {article.content.split('\n\n').map((p, i) => (
                    <p key={i} style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 24 }}>{p}</p>
                ))}
            </div>
            {related.length > 0 && (
                <div style={{ marginTop: 64, borderTop: '1px solid var(--border-primary)', paddingTop: 48 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Related Articles</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {related.map(r => (
                            <NavLink key={r.slug} to={`/newsroom/${r.slug}`} style={{
                                background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                                borderRadius: 'var(--radius-md)', padding: '20px 16px', textDecoration: 'none',
                                transition: 'border-color 0.15s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                            >
                                <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{r.date}</span>
                                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 8, lineHeight: 1.4 }}>{r.title}</h4>
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
