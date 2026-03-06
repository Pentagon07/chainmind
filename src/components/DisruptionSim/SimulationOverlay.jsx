import { useState, useEffect } from 'react';

const simStages = [
    { label: 'Port closure detected', icon: 'alert', delay: 500 },
    { label: 'Mapping affected supply routes...', icon: 'search', delay: 1500 },
    { label: 'Analyzing 8 supplier dependencies...', icon: 'analyze', delay: 2500 },
    { label: 'Running Monte Carlo simulation (10,000 iterations)...', icon: 'compute', delay: 4000 },
    { label: 'Calculating revenue-at-risk exposure: $4.7M', icon: 'risk', delay: 5500 },
    { label: 'Generating 3 mitigation strategies...', icon: 'strategy', delay: 7000 },
    { label: 'Ranking by risk-adjusted ROI...', icon: 'rank', delay: 8500 },
    { label: 'Simulation complete.', icon: 'done', delay: 10000 },
];

export default function SimulationOverlay({ onClose }) {
    const [stage, setStage] = useState(0);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const timers = simStages.map((s, i) =>
            setTimeout(() => {
                setStage(i);
                if (i === simStages.length - 1) setTimeout(() => setComplete(true), 1000);
            }, s.delay)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.3s var(--ease-out)',
        }}>
            <div style={{
                width: 560, background: 'var(--bg-elevated)',
                border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)',
                padding: '40px 36px', boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Disruption Simulation</h2>
                    <button onClick={onClose} style={{
                        background: 'transparent', border: 'none', color: 'var(--text-tertiary)',
                        cursor: 'pointer', fontSize: '1.125rem',
                    }}>x</button>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{
                            width: `${((stage + 1) / simStages.length) * 100}%`,
                            height: '100%', borderRadius: 2,
                            background: complete ? 'var(--accent-emerald)' : 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                            transition: 'width 0.5s var(--ease-out)',
                        }} />
                    </div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textAlign: 'right' }}>{Math.round(((stage + 1) / simStages.length) * 100)}%</div>
                </div>

                {/* Stages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {simStages.map((s, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px',
                            borderRadius: 'var(--radius-sm)',
                            opacity: i <= stage ? 1 : 0.3,
                            transition: 'opacity 0.3s',
                        }}>
                            <div style={{
                                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                background: i < stage ? 'var(--accent-emerald)' : i === stage ? 'var(--accent-primary)' : 'var(--bg-primary)',
                                border: `1.5px solid ${i <= stage ? 'transparent' : 'var(--border-primary)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.3s',
                            }}>
                                {i < stage && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="var(--bg-primary)" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                {i === stage && !complete && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bg-primary)', animation: 'pulse 1s infinite' }} />}
                            </div>
                            <span style={{
                                fontSize: '0.8125rem',
                                color: i <= stage ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                fontWeight: i === stage ? 600 : 400,
                            }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Result Preview */}
                {complete && (
                    <div style={{
                        marginTop: 24, padding: '20px', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--accent-emerald)', background: 'rgba(16,185,129,0.05)',
                        animation: 'fadeIn 0.3s var(--ease-out)',
                    }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: 12 }}>Simulation Results</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                            {[
                                { label: 'Revenue Protected', val: '$3.8M' },
                                { label: 'Optimal Strategy Cost', val: '$420K' },
                                { label: 'Risk Reduction', val: '81%' },
                            ].map(m => (
                                <div key={m.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{m.val}</div>
                                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{m.label}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={onClose} style={{
                            width: '100%', marginTop: 16, padding: '10px',
                            background: 'var(--accent-primary)', color: 'var(--bg-primary)',
                            border: 'none', borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                        }}>View Full Analysis</button>
                    </div>
                )}
            </div>
        </div>
    );
}
