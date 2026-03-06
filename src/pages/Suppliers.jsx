import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const riskColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444', critical: '#dc2626' };

export default function Suppliers() {
    const { user, scenarioData: sc, scenarioInfo: info } = useAuth();
    const [showAdd, setShowAdd] = useState(false);
    const [suppliers, setSuppliers] = useState(null);

    const currentSuppliers = suppliers || sc.suppliers;

    const removeSupplier = (id) => {
        setSuppliers(currentSuppliers.filter(s => s.id !== id));
    };

    const addSupplier = (e) => {
        e.preventDefault();
        const form = e.target;
        const newSup = {
            id: 's' + Date.now(), name: form.name.value, tier: parseInt(form.tier.value),
            location: form.location.value, health: parseInt(form.health.value),
            risk: form.risk.value, leadTime: form.leadTime.value, spend: form.spend.value,
            category: form.category.value, concentration: parseInt(form.concentration.value || 50),
            financialScore: parseInt(form.financialScore.value || 70),
        };
        setSuppliers([...currentSuppliers, newSup]);
        setShowAdd(false);
    };

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Supplier Intelligence</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{currentSuppliers.length} suppliers monitored for {info?.company}</p>
                </div>
                <button onClick={() => setShowAdd(true)} style={{
                    padding: '8px 16px', background: 'var(--accent-primary)', color: 'var(--bg-primary)',
                    border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                }}>Add Supplier</button>
            </div>

            {showAdd && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAdd(false)}>
                    <form onSubmit={addSupplier} onClick={e => e.stopPropagation()} style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)', padding: '32px', width: 480,
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
                    }}>
                        <h3 style={{ gridColumn: 'span 2', fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Add Supplier</h3>
                        {[['name', 'Supplier Name', 'text'], ['category', 'Category', 'text'], ['location', 'Location', 'text'], ['tier', 'Tier', 'number'], ['health', 'Health (0-100)', 'number'], ['risk', 'Risk Level', 'text'], ['leadTime', 'Lead Time', 'text'], ['spend', 'Annual Spend', 'text'], ['concentration', 'Concentration %', 'number'], ['financialScore', 'Financial Score', 'number']].map(([name, label, type]) => (
                            <div key={name}>
                                <label style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{label}</label>
                                <input name={name} type={type} required={['name', 'category', 'location'].includes(name)} style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem' }} />
                            </div>
                        ))}
                        <div style={{ gridColumn: 'span 2', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setShowAdd(false)} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontSize: '0.8125rem', cursor: 'pointer' }}>Cancel</button>
                            <button type="submit" style={{ padding: '8px 20px', background: 'var(--accent-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>Add</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                {currentSuppliers.map(s => (
                    <div key={s.id} style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-md)', padding: '20px', position: 'relative', transition: 'border-color 0.15s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                    >
                        <button onClick={() => removeSupplier(s.id)} style={{
                            position: 'absolute', top: 12, right: 12, background: 'transparent',
                            border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.15s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--risk-critical)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                        >x</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%', position: 'relative',
                                background: `conic-gradient(${riskColors[s.risk]} ${s.health * 3.6}deg, var(--bg-primary) 0)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{s.health}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Tier {s.tier} | {s.category}</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.6875rem' }}>
                            <div><span style={{ color: 'var(--text-tertiary)' }}>Location:</span> <span style={{ color: 'var(--text-secondary)' }}>{s.location}</span></div>
                            <div><span style={{ color: 'var(--text-tertiary)' }}>Lead:</span> <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{s.leadTime}</span></div>
                            <div><span style={{ color: 'var(--text-tertiary)' }}>Spend:</span> <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{s.spend}</span></div>
                            <div><span style={{ color: 'var(--text-tertiary)' }}>Risk:</span> <span style={{ color: riskColors[s.risk], fontWeight: 600 }}>{s.risk}</span></div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 32, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Concentration Risk</h3>
                {[...currentSuppliers].sort((a, b) => b.concentration - a.concentration).map(s => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ width: 160, fontSize: '0.6875rem', color: 'var(--text-secondary)', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                        <div style={{ flex: 1, height: 6, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: `${s.concentration}%`, height: '100%', borderRadius: 3, background: s.concentration > 70 ? 'var(--risk-critical)' : s.concentration > 50 ? 'var(--risk-amber)' : 'var(--accent-emerald)', transition: 'width 0.5s var(--ease-out)' }} />
                        </div>
                        <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', width: 36, textAlign: 'right' }}>{s.concentration}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
