import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
    const { user, scenarioInfo: info } = useAuth();
    const [geminiKey, setGeminiKey] = useState('');
    const [newsKey, setNewsKey] = useState('');
    const [saved, setSaved] = useState(false);
    const [riskThresholds, setRiskThresholds] = useState({ critical: 90, high: 70, medium: 40 });
    const [notifications, setNotifications] = useState({ email: true, push: true, slack: false, webhook: false });

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
    const inputStyle = { width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 4, color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none', fontFamily: 'var(--font-mono)' };
    const labelStyle = { fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 };
    const sectionStyle = { background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 6, padding: '24px', marginBottom: 16 };

    return (
        <div style={{ padding: 24, maxWidth: 720, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Settings</h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Configuration for {info?.company}</p>
            </div>

            {/* API Keys */}
            <div style={sectionStyle}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>API Configuration</h3>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginBottom: 16 }}>Connect AI and data services. Keys are encrypted and stored securely.</p>
                <div style={{ display: 'grid', gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Google Gemini API Key</label>
                        <input value={geminiKey} onChange={e => setGeminiKey(e.target.value)} placeholder="AIzaSy..." style={inputStyle} />
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', marginTop: 4 }}>Powers AI agent reasoning, PDF analysis, and disruption intelligence. Get key at ai.google.dev</p>
                    </div>
                    <div>
                        <label style={labelStyle}>NewsData.io API Key</label>
                        <input value={newsKey} onChange={e => setNewsKey(e.target.value)} placeholder="pub_..." style={inputStyle} />
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', marginTop: 4 }}>Enables real-time news monitoring and supply chain signal detection. Get key at newsdata.io</p>
                    </div>
                </div>
            </div>

            {/* Risk Thresholds */}
            <div style={sectionStyle}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Risk Thresholds</h3>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginBottom: 16 }}>Define when suppliers are classified at each risk level based on health score.</p>
                {Object.entries(riskThresholds).map(([level, value]) => {
                    const colors = { critical: '#dc2626', high: '#ef4444', medium: '#f59e0b' };
                    return (
                        <div key={level} style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: '0.75rem', color: colors[level], fontWeight: 500, textTransform: 'capitalize' }}>{level} Threshold</span>
                                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>Health &lt; {value}</span>
                            </div>
                            <div style={{ position: 'relative', height: 6, background: 'var(--bg-primary)', borderRadius: 3 }}>
                                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${value}%`, background: colors[level], borderRadius: 3 }} />
                                <input type="range" min={10} max={100} value={value} onChange={e => setRiskThresholds(t => ({ ...t, [level]: Number(e.target.value) }))} style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer' }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Notifications */}
            <div style={sectionStyle}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Notifications</h3>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginBottom: 16 }}>Choose how you receive disruption alerts and reports.</p>
                {Object.entries(notifications).map(([channel, enabled]) => (
                    <div key={channel} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-primary)' }}>
                        <div>
                            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500, textTransform: 'capitalize' }}>{channel === 'push' ? 'Push Notifications' : channel === 'webhook' ? 'Webhook' : channel.charAt(0).toUpperCase() + channel.slice(1)}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{channel === 'email' ? 'Receive critical alerts via email' : channel === 'push' ? 'Browser push notifications for real-time alerts' : channel === 'slack' ? 'Send alerts to a Slack channel' : 'HTTP webhook for custom integrations'}</div>
                        </div>
                        <button onClick={() => setNotifications(n => ({ ...n, [channel]: !enabled }))} style={{
                            width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
                            background: enabled ? 'var(--accent-primary)' : 'var(--bg-primary)', position: 'relative', transition: 'background 0.2s',
                            outline: `1px solid ${enabled ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                        }}>
                            <div style={{
                                width: 16, height: 16, borderRadius: '50%', background: '#fff',
                                position: 'absolute', top: 3,
                                left: enabled ? 21 : 3, transition: 'left 0.2s',
                            }} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Account Info */}
            <div style={sectionStyle}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Account</h3>
                {[
                    ['Name', user?.name],
                    ['Email', user?.email],
                    ['Title', user?.title],
                    ['Company', info?.company],
                    ['Industry', info?.name],
                ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-primary)', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-tertiary)' }}>{label}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{value}</span>
                    </div>
                ))}
            </div>

            <button onClick={handleSave} style={{
                padding: '12px 32px', borderRadius: 4,
                background: saved ? '#10b981' : 'var(--accent-primary)',
                color: 'var(--bg-primary)', border: 'none',
                fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
            }}>{saved ? 'Saved' : 'Save Configuration'}</button>
        </div>
    );
}
