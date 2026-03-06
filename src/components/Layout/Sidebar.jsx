import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { path: '/app/dashboard', label: 'Command Center', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { path: '/app/events', label: 'Event Feed', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
    { path: '/app/suppliers', label: 'Supplier Intel', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
    { path: '/app/supply-tree', label: 'Supply Chain Map', icon: 'M12 2L2 7l10 5 10-5-10-5z M4 15l8 4 8-4 M4 11l8 4 8-4' },
    { path: '/app/simulation', label: 'Scenario Sim', icon: 'M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364' },
    { path: '/app/agent', label: 'AI Agent', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { path: '/app/charts', label: 'Analytics', icon: 'M18 20V10M12 20V4M6 20v-6' },
    { path: '/app/erp', label: 'ERP Hub', icon: 'M4 7h16M4 12h16M4 17h16 M8 7v10 M16 7v10' },
    { path: '/app/insights', label: 'Insights', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' },
    { path: '/app/email', label: 'Email Drafts', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
    { path: '/app/news-feed', label: 'Live News', icon: 'M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2' },
    { path: '/app/settings', label: 'Settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { user, scenarioInfo, scenarioData } = useAuth();

    const critAlerts = scenarioData?.disruptions?.filter(d => d.severity === 'critical').length || 0;
    const totalSuppliers = scenarioData?.suppliers?.length || 0;

    return (
        <aside style={{
            width: collapsed ? 64 : 240,
            minHeight: '100vh', background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-primary)',
            transition: 'width 0.25s var(--ease-in-out)',
            display: 'flex', flexDirection: 'column',
            position: 'relative', flexShrink: 0,
        }}>
            {/* Logo */}
            <div style={{
                padding: collapsed ? '20px 16px' : '20px 24px',
                display: 'flex', alignItems: 'center', gap: 10,
                borderBottom: '1px solid var(--border-primary)',
                minHeight: 64,
            }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 800, color: 'var(--bg-primary)',
                }}>C</div>
                {!collapsed && (
                    <div style={{ animation: 'fadeIn 0.2s var(--ease-out)' }}>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>ChainMind</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Supply Chain AI</div>
                    </div>
                )}
            </div>

            {/* Account Info */}
            {!collapsed && user && (
                <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.625rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{user.avatar}</div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)' }}>{user.title}</div>
                        </div>
                    </div>
                    <div style={{
                        padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                        background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.08)',
                    }}>
                        <div style={{ fontSize: '0.625rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: 4 }}>{scenarioInfo?.company}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: '0.5625rem', color: 'var(--text-tertiary)' }}>
                            <span>Suppliers: {totalSuppliers}</span>
                            <span>Alerts: <span style={{ color: critAlerts > 0 ? 'var(--risk-critical)' : 'var(--accent-emerald)', fontWeight: 600 }}>{critAlerts}</span></span>
                        </div>
                    </div>
                </div>
            )}

            {/* Nav Items */}
            <nav style={{ padding: '12px 8px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink key={item.path} to={item.path} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none',
                            fontSize: '0.8125rem', fontWeight: isActive ? 600 : 400,
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            background: isActive ? 'rgba(0, 212, 255, 0.06)' : 'transparent',
                            borderLeft: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                            transition: 'all 0.15s var(--ease-in-out)',
                        }}
                            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                <path d={item.icon} />
                            </svg>
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Back to site */}
            <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border-primary)' }}>
                <NavLink to="/" style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none', fontSize: '0.75rem',
                    color: 'var(--text-tertiary)', transition: 'color 0.15s',
                }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {!collapsed && <span>Back to site</span>}
                </NavLink>
            </div>

            {/* Collapse */}
            <button onClick={() => setCollapsed(!collapsed)} style={{
                padding: '12px', border: 'none', background: 'transparent',
                color: 'var(--text-tertiary)', cursor: 'pointer',
                borderTop: '1px solid var(--border-primary)',
                fontSize: '0.75rem', transition: 'color 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                {!collapsed && <span>Collapse</span>}
            </button>
        </aside>
    );
}
