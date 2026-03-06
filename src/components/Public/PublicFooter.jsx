import { NavLink } from 'react-router-dom';

const footerLinks = [
    {
        title: 'Platform',
        links: [
            { label: 'Overview', path: '/platform' },
            { label: 'How It Works', path: '/how-it-works' },
            { label: 'Pricing', path: '/pricing' },
            { label: 'Security', path: '/security' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', path: '/about' },
            { label: 'Leadership', path: '/executives' },
            { label: 'Careers', path: '/careers' },
            { label: 'Timeline', path: '/timeline' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Newsroom', path: '/newsroom' },
            { label: 'Case Studies', path: '/case-studies' },
            { label: 'Contact', path: '/contact' },
        ],
    },
];

export default function PublicFooter() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-primary)',
            padding: '64px 48px 32px',
            background: 'var(--bg-secondary)',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.875rem', fontWeight: 800, color: 'var(--bg-primary)',
                            }}>C</div>
                            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>ChainMind</span>
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.7, maxWidth: 280 }}>
                            Autonomous supply chain intelligence, powered by Google AI. Perceive risks. Reason through trade-offs. Act with precision.
                        </p>
                    </div>

                    {footerLinks.map(group => (
                        <div key={group.title}>
                            <h4 style={{
                                fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)',
                                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16,
                            }}>{group.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {group.links.map(l => (
                                    <NavLink key={l.path} to={l.path} style={{
                                        fontSize: '0.8125rem', color: 'var(--text-tertiary)',
                                        textDecoration: 'none', transition: 'color 0.15s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                                    >{l.label}</NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    borderTop: '1px solid var(--border-primary)', paddingTop: 24,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        &copy; 2026 ChainMind Technologies Inc. All rights reserved.
                    </span>
                    <div style={{ display: 'flex', gap: 24 }}>
                        {['Privacy', 'Terms', 'Cookie Policy'].map(t => (
                            <span key={t} style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'color 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                            >{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
