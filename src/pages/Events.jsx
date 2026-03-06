import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { scenarioEvents } from '../data/events';

const sevColors = { critical: '#dc2626', high: '#f59e0b', medium: '#6366f1', low: '#10b981' };
const typeIcons = {
    incoming: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    escalation: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
    report: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    resolved: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
};

export default function Events() {
    const { activeScenario, scenarioInfo: info } = useAuth();
    const events = scenarioEvents[activeScenario] || [];
    const [expanded, setExpanded] = useState(null);
    const [showReport, setShowReport] = useState(null);
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Event Feed</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Real-time supply chain events for {info?.company}</p>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {['all', 'incoming', 'escalation', 'report', 'resolved'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '6px 14px', borderRadius: 4, fontSize: '0.6875rem',
                            background: filter === f ? 'var(--bg-elevated)' : 'transparent',
                            border: `1px solid ${filter === f ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                            color: filter === f ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                            cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize',
                        }}>{f}</button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
                {/* Event Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {filtered.map((evt, i) => {
                        const isExpanded = expanded === evt.id;
                        return (
                            <div key={evt.id} style={{
                                display: 'flex', gap: 16, animation: `slideUp 0.3s var(--ease-out) ${i * 60}ms both`,
                            }}>
                                {/* Timeline Line */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 4, flexShrink: 0,
                                        background: `${sevColors[evt.severity]}15`,
                                        border: `1px solid ${sevColors[evt.severity]}40`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sevColors[evt.severity]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d={typeIcons[evt.type]} />
                                        </svg>
                                    </div>
                                    {i < filtered.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border-primary)', minHeight: 20 }} />}
                                </div>

                                {/* Event Card */}
                                <div style={{
                                    flex: 1, paddingBottom: 16, cursor: 'pointer',
                                }} onClick={() => setExpanded(isExpanded ? null : evt.id)}>
                                    <div style={{
                                        background: 'var(--bg-elevated)', border: `1px solid ${isExpanded ? sevColors[evt.severity] + '60' : 'var(--border-primary)'}`,
                                        borderRadius: 6, padding: '16px 20px', transition: 'border-color 0.15s',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: sevColors[evt.severity], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{evt.severity}</span>
                                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>{evt.type}</span>
                                            </div>
                                            <span style={{ fontSize: '0.625rem', color: evt.timestamp.includes('min') || evt.timestamp.includes('just') ? 'var(--accent-primary)' : 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                                {evt.timestamp}
                                            </span>
                                        </div>

                                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>{evt.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{evt.description}</div>

                                        {isExpanded && (
                                            <div style={{ marginTop: 16, animation: 'fadeIn 0.2s var(--ease-out)' }}>
                                                {/* AI Analysis */}
                                                <div style={{ padding: '12px 16px', background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: 4, marginBottom: 12 }}>
                                                    <div style={{ fontSize: '0.5625rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>AI Analysis</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{evt.aiAnalysis}</div>
                                                </div>

                                                {/* Suggested Actions */}
                                                <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>Suggested Actions</div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                                    {evt.actions.map((a, j) => (
                                                        <button key={j} style={{
                                                            padding: '6px 12px', borderRadius: 4, fontSize: '0.6875rem',
                                                            background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-primary)',
                                                            color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s',
                                                        }}
                                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                                        >{a}</button>
                                                    ))}
                                                </div>

                                                {/* View Report */}
                                                {evt.report && (
                                                    <button onClick={(e) => { e.stopPropagation(); setShowReport(showReport === evt.id ? null : evt.id); }} style={{
                                                        marginTop: 12, padding: '8px 16px', borderRadius: 4,
                                                        background: 'var(--accent-primary)', color: 'var(--bg-primary)',
                                                        border: 'none', fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer',
                                                    }}>View Report: {evt.report.title}</button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Report Panel */}
                <div>
                    {showReport ? (() => {
                        const evt = events.find(e => e.id === showReport);
                        if (!evt || !evt.report) return null;
                        return (
                            <div style={{
                                background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                                borderRadius: 6, padding: '20px', position: 'sticky', top: 88,
                                animation: 'slideUp 0.3s var(--ease-out)',
                            }}>
                                <div style={{ fontSize: '0.5625rem', color: sevColors[evt.severity], textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>{evt.report.type}</div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.01em' }}>{evt.report.title}</h3>
                                <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', marginBottom: 16 }}>{evt.report.pages} pages | Generated by AI Agent</div>

                                <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Report Sections</div>
                                {evt.report.sections.map((sec, i) => (
                                    <div key={i} style={{
                                        padding: '10px 14px', borderBottom: '1px solid var(--border-primary)',
                                        display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.75rem',
                                        color: 'var(--text-secondary)',
                                    }}>
                                        <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', width: 20 }}>{i + 1}.</span>
                                        {sec}
                                    </div>
                                ))}
                                <button style={{
                                    width: '100%', marginTop: 16, padding: '10px',
                                    background: 'transparent', border: '1px solid var(--border-primary)',
                                    borderRadius: 4, color: 'var(--text-secondary)', fontSize: '0.75rem',
                                    cursor: 'pointer', transition: 'all 0.15s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                >Download Full Report (PDF)</button>
                            </div>
                        );
                    })() : (
                        <div style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 6, padding: '40px 20px', textAlign: 'center', position: 'sticky', top: 88,
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 12 }}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8" />
                            </svg>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Select an event and click "View Report" to see the detailed analysis report.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
