import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ onSimulate }) {
    const { user, activeScenario, scenarioData, scenarioInfo } = useAuth();
    const navigate = useNavigate();
    const [searchFocused, setSearchFocused] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const criticalCount = scenarioData.disruptions.filter(d => d.severity === 'critical' || d.severity === 'high').length;

    const notifications = scenarioData.disruptions.map(d => ({
        title: d.title,
        severity: d.severity,
        time: d.timeToImpact,
        revenue: d.revenueAtRisk,
    }));

    return (
        <header style={{
            height: 'var(--topbar-height)', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '0 24px',
            borderBottom: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)', position: 'sticky',
            top: 0, zIndex: 50, gap: 16,
        }}>
            {/* Search */}
            <div style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
                <input type="text" placeholder="Search suppliers, disruptions, actions..."
                    onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                    style={{
                        width: '100%', padding: '8px 16px 8px 36px',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid ${searchFocused ? 'var(--border-accent)' : 'var(--border-primary)'}`,
                        background: searchFocused ? 'var(--bg-elevated)' : 'var(--bg-glass)',
                        color: 'var(--text-primary)', fontSize: '0.8125rem',
                        fontFamily: 'var(--font-sans)', outline: 'none',
                        transition: 'all 0.2s var(--ease-in-out)',
                        boxShadow: searchFocused ? 'var(--shadow-glow)' : 'none',
                    }}
                />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Company Badge (read-only, no dropdown) */}
                <div style={{
                    padding: '6px 14px', borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-primary)', background: 'var(--bg-elevated)',
                    fontSize: '0.6875rem', color: 'var(--accent-primary)', fontWeight: 500,
                }}>
                    {scenarioInfo?.company}
                </div>

                {/* Alert badge */}
                <div style={{ position: 'relative' }} onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
                    <button style={{
                        padding: '8px 12px', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-primary)', cursor: 'pointer',
                        background: 'transparent', color: 'var(--text-secondary)',
                        transition: 'all 0.15s', display: 'flex', alignItems: 'center',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                    {criticalCount > 0 && (
                        <span style={{
                            position: 'absolute', top: -4, right: -4,
                            width: 18, height: 18, borderRadius: '50%',
                            background: 'var(--risk-critical)', color: 'white',
                            fontSize: '0.625rem', fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            animation: 'pulse 2s ease-in-out infinite',
                            boxShadow: '0 0 8px var(--risk-critical-glow)',
                        }}>{criticalCount}</span>
                    )}

                    {showNotifications && (
                        <div style={{
                            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                            width: 360, background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                            animation: 'fadeInDown 0.2s var(--ease-out)',
                            zIndex: 100, maxHeight: 400, overflow: 'auto',
                        }}>
                            <div style={{ position: 'absolute', top: -8, left: 0, right: 0, height: 8 }} /> {/* Invisible bridge */}
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-primary)', fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                Active Alerts ({notifications.length})
                            </div>
                            {notifications.map((n, i) => {
                                const sevColors = { critical: 'var(--risk-critical)', high: 'var(--risk-amber)', medium: '#f59e0b', low: 'var(--accent-emerald)' };
                                return (
                                    <div key={i} style={{
                                        padding: '12px 16px', borderBottom: '1px solid var(--border-primary)',
                                        borderLeft: `3px solid ${sevColors[n.severity]}`,
                                        cursor: 'pointer', transition: 'background 0.1s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        onClick={() => { setShowNotifications(false); navigate('/app/events'); }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <span style={{ fontSize: '0.5625rem', fontWeight: 600, color: sevColors[n.severity], textTransform: 'uppercase' }}>{n.severity}</span>
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)' }}>{n.time}</span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{n.title}</div>
                                        <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>Revenue at risk: {n.revenue}</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Simulate button */}
                <button onClick={onSimulate} style={{
                    padding: '6px 14px', background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white', border: 'none', borderRadius: 'var(--radius-sm)',
                    fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s',
                }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(239,68,68,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    Simulate
                </button>

                {/* User Avatar */}
                <div style={{ position: 'relative' }} onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '4px 12px 4px 4px', borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-primary)', background: 'transparent',
                        cursor: 'pointer', transition: 'border-color 0.15s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                    >
                        <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.625rem', fontWeight: 700, color: '#fff',
                        }}>{user?.avatar || 'U'}</div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'User'}</div>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-tertiary)' }}>{scenarioInfo?.company}</div>
                        </div>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5"><path d="M3 5l3 3 3-3" /></svg>
                    </button>

                    {showUserMenu && (
                        <div style={{
                            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                            width: 240, background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                            animation: 'fadeInDown 0.2s var(--ease-out)',
                            zIndex: 100,
                        }}>
                            <div style={{ position: 'absolute', top: -8, left: 0, right: 0, height: 8 }} /> {/* Invisible bridge */}
                            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-primary)' }}>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</div>
                                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{user?.email}</div>
                                <div style={{ fontSize: '0.625rem', color: 'var(--accent-primary)', marginTop: 4 }}>{user?.title}</div>
                            </div>
                            <div style={{ padding: '8px' }}>
                                <div style={{ padding: '8px 12px', fontSize: '0.75rem', color: 'var(--text-tertiary)', cursor: 'default' }}>
                                    Industry: {scenarioInfo?.name}
                                </div>
                                <div style={{ padding: '8px 12px', fontSize: '0.75rem', color: 'var(--text-tertiary)', cursor: 'default' }}>
                                    Revenue: {scenarioInfo?.revenue}
                                </div>
                                <div onClick={() => { setShowUserMenu(false); navigate('/app/settings'); }} style={{ padding: '8px 12px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: 'var(--radius-sm)', transition: 'background 0.1s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >Settings</div>
                            </div>
                            <div style={{ padding: '8px', borderTop: '1px solid var(--border-primary)' }}>
                                <button onClick={() => { setShowUserMenu(false); navigate('/login'); }} style={{
                                    width: '100%', padding: '8px 12px', textAlign: 'left',
                                    background: 'transparent', border: 'none', borderRadius: 'var(--radius-sm)',
                                    color: 'var(--text-secondary)', fontSize: '0.75rem',
                                    cursor: 'pointer', transition: 'all 0.1s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--risk-critical)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                >Sign Out</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
