import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const mainLinks = [
    { path: '/platform', label: 'Platform' },
    { path: '/pricing', label: 'Pricing' },
];

const companyLinks = [
    { path: '/about', label: 'About' },
    { path: '/executives', label: 'Leadership' },
    { path: '/careers', label: 'Careers' },
    { path: '/timeline', label: 'Timeline' },
];

const resourceLinks = [
    { path: '/newsroom', label: 'Newsroom' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/security', label: 'Security' },
    { path: '/how-it-works', label: 'How It Works' },
];

function Dropdown({ label, links, isScrolled }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <span style={{
                fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer',
                transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 4,
                fontWeight: 500,
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
                {label}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            {open && (
                <div style={{
                    position: 'absolute', top: '100%', left: -12, paddingTop: 8, zIndex: 200,
                    animation: 'fadeInDown 0.15s var(--ease-out)',
                }}>
                    <div style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-md)', padding: '6px', minWidth: 160,
                        boxShadow: 'var(--shadow-lg)', backdropFilter: 'blur(20px)',
                    }}>
                        {links.map(l => (
                            <NavLink key={l.path} to={l.path} style={{
                                display: 'block', padding: '8px 14px', fontSize: '0.8125rem',
                                color: 'var(--text-secondary)', borderRadius: 'var(--radius-sm)',
                                transition: 'all 0.15s', textDecoration: 'none',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                            >{l.label}</NavLink>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function PublicNav() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            height: 64,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 48px',
            background: scrolled ? 'rgba(6, 10, 19, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
            transition: 'all 0.3s var(--ease-out)',
        }}>
            {/* Logo */}
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 800, color: 'var(--bg-primary)',
                }}>C</div>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>ChainMind</span>
            </NavLink>

            {/* Center Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {mainLinks.map(l => (
                    <NavLink key={l.path} to={l.path} style={{
                        fontSize: '0.8125rem', fontWeight: 500,
                        color: location.pathname === l.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                        textDecoration: 'none', transition: 'color 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => { if (location.pathname !== l.path) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >{l.label}</NavLink>
                ))}
                <Dropdown label="Company" links={companyLinks} isScrolled={scrolled} />
                <Dropdown label="Resources" links={resourceLinks} isScrolled={scrolled} />
                <NavLink to="/contact" style={{
                    fontSize: '0.8125rem', fontWeight: 500,
                    color: location.pathname === '/contact' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 0.2s',
                }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => { if (location.pathname !== '/contact') e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >Contact</NavLink>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <NavLink to="/login" style={{
                    fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 0.2s',
                }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >Sign In</NavLink>
                <NavLink to="/contact" style={{
                    padding: '8px 20px', borderRadius: 'var(--radius-full)',
                    background: 'var(--text-primary)', color: 'var(--bg-primary)',
                    fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none',
                    transition: 'all 0.2s var(--ease-in-out)',
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >Request Demo</NavLink>
            </div>
        </nav>
    );
}
