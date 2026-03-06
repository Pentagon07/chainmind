import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const erpSystems = [
    { id: 'sap', name: 'SAP S/4HANA', version: 'v2025.1', modules: ['MM', 'PP', 'SD', 'FI'], status: 'connected', lastSync: '2 min ago', records: '12,847' },
    { id: 'oracle', name: 'Oracle Cloud ERP', version: 'v24.3', modules: ['Procurement', 'Supply Chain', 'Finance'], status: 'pending', lastSync: 'Never', records: '0' },
    { id: 'netsuite', name: 'NetSuite', version: 'v2025.1', modules: ['Inventory', 'Procurement', 'Financials'], status: 'disconnected', lastSync: 'Never', records: '0' },
    { id: 'dynamics', name: 'Microsoft Dynamics 365', version: 'v10.0', modules: ['Supply Chain Mgmt', 'Finance', 'Commerce'], status: 'disconnected', lastSync: 'Never', records: '0' },
];

const statusColors = { connected: '#10b981', pending: '#f59e0b', disconnected: 'var(--text-tertiary)' };

export default function ERP() {
    const { scenarioData: sc, scenarioInfo: info } = useAuth();
    const [activeERP, setActiveERP] = useState('sap');
    const [showConnect, setShowConnect] = useState(false);

    // Mock ERP data
    const purchaseOrders = sc.suppliers.slice(0, 5).map((s, i) => ({
        id: `PO-2026-${String(1000 + i).padStart(4, '0')}`,
        supplier: s.name,
        material: s.category,
        qty: Math.floor(Math.random() * 500) + 100,
        unit: 'units',
        value: `$${(Math.random() * 200 + 50).toFixed(0)}K`,
        status: ['Open', 'Confirmed', 'In Transit', 'Delivered', 'Partial'][i % 5],
        delivery: new Date(Date.now() + (i + 1) * 7 * 86400000).toLocaleDateString(),
    }));

    const inventoryLevels = sc.suppliers.slice(0, 6).map(s => ({
        material: s.category,
        current: Math.floor(Math.random() * 800) + 100,
        reorderPoint: Math.floor(Math.random() * 200) + 100,
        max: Math.floor(Math.random() * 600) + 500,
        unit: 'units',
        daysOfSupply: Math.floor(Math.random() * 30) + 5,
        trend: Math.random() > 0.3 ? 'stable' : 'declining',
    }));

    const erpAlerts = [
        { type: 'warning', message: `Reorder point breach: ${sc.suppliers[0]?.category} inventory below threshold`, time: '15 min ago' },
        { type: 'info', message: `PO ${purchaseOrders[0]?.id} delivery confirmed for ${purchaseOrders[0]?.delivery}`, time: '1 hour ago' },
        { type: 'critical', message: `Lead time variance detected: ${sc.suppliers[1]?.name} +3 days vs forecast`, time: '2 hours ago' },
        { type: 'info', message: 'Automated safety stock calculation completed for all SKUs', time: '4 hours ago' },
    ];

    const alertColors = { critical: '#dc2626', warning: '#f59e0b', info: 'var(--accent-primary)' };

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>ERP Integration Hub</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Enterprise system connections and signal monitoring for {info?.company}</p>
                </div>
            </div>

            {/* ERP System Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                {erpSystems.map(erp => (
                    <div key={erp.id} onClick={() => { setActiveERP(erp.id); if (erp.status !== 'connected') setShowConnect(true); else setShowConnect(false); }}
                        style={{
                            background: 'var(--bg-elevated)',
                            border: `1px solid ${activeERP === erp.id ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                            borderRadius: 6, padding: '16px', cursor: 'pointer', transition: 'all 0.15s',
                        }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{erp.name}</div>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColors[erp.status], boxShadow: erp.status === 'connected' ? `0 0 6px ${statusColors[erp.status]}` : 'none' }} />
                        </div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>{erp.version}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>Sync: {erp.lastSync} | {erp.records} records</div>
                        <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                            {erp.modules.map(m => (
                                <span key={m} style={{ padding: '2px 8px', borderRadius: 3, fontSize: '0.5625rem', background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-primary)' }}>{m}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Connect Dialog */}
            {showConnect && (
                <div style={{
                    background: 'var(--bg-elevated)', border: '1px solid var(--accent-primary)',
                    borderRadius: 6, padding: '24px', marginBottom: 20,
                    animation: 'slideUp 0.2s var(--ease-out)',
                }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Connect {erpSystems.find(e => e.id === activeERP)?.name}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>API Endpoint</label>
                            <input placeholder="https://your-erp-instance.com/api" style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 4, color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>API Key / OAuth Token</label>
                            <input type="password" placeholder="sk-..." style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 4, color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none', fontFamily: 'var(--font-mono)' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <button style={{ padding: '8px 20px', background: 'var(--accent-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Test Connection</button>
                        <button onClick={() => setShowConnect(false)} style={{ padding: '8px 20px', background: 'transparent', color: 'var(--text-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 4, fontSize: '0.75rem', cursor: 'pointer' }}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
                <div>
                    {/* Purchase Orders */}
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 6, padding: '20px', marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Purchase Orders</h3>
                            <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{purchaseOrders.length} active</span>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                                    {['PO #', 'Supplier', 'Material', 'Qty', 'Value', 'Status', 'Delivery'].map(h => (
                                        <th key={h} style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseOrders.map(po => (
                                    <tr key={po.id} style={{ borderBottom: '1px solid var(--border-primary)' }}>
                                        <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.6875rem' }}>{po.id}</td>
                                        <td style={{ padding: '10px', color: 'var(--text-primary)' }}>{po.supplier.length > 18 ? po.supplier.slice(0, 18) + '...' : po.supplier}</td>
                                        <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>{po.material}</td>
                                        <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{po.qty}</td>
                                        <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{po.value}</td>
                                        <td style={{ padding: '10px' }}><span style={{
                                            padding: '2px 8px', borderRadius: 3, fontSize: '0.5625rem', fontWeight: 600,
                                            background: po.status === 'Delivered' ? '#10b98115' : po.status === 'In Transit' ? '#6366f115' : 'rgba(255,255,255,0.03)',
                                            color: po.status === 'Delivered' ? '#10b981' : po.status === 'In Transit' ? '#6366f1' : 'var(--text-tertiary)',
                                        }}>{po.status}</span></td>
                                        <td style={{ padding: '10px', color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>{po.delivery}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Inventory Levels */}
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 6, padding: '20px' }}>
                        <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Inventory Levels & Reorder Points</h3>
                        {inventoryLevels.map((inv, i) => {
                            const pct = Math.min(100, (inv.current / inv.max) * 100);
                            const belowReorder = inv.current < inv.reorderPoint;
                            return (
                                <div key={i} style={{ marginBottom: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: '0.75rem', color: belowReorder ? '#ef4444' : 'var(--text-primary)', fontWeight: 500 }}>{inv.material}</span>
                                        <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: belowReorder ? '#ef4444' : 'var(--text-secondary)' }}>{inv.current}/{inv.max} {inv.unit} | {inv.daysOfSupply}d</span>
                                    </div>
                                    <div style={{ height: 6, background: 'var(--bg-primary)', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', borderRadius: 3,
                                            width: `${pct}%`,
                                            background: belowReorder ? 'linear-gradient(90deg, #dc2626, #ef4444)' : pct < 40 ? 'linear-gradient(90deg, #f59e0b, #f97316)' : 'linear-gradient(90deg, #10b981, var(--accent-primary))',
                                            transition: 'width 0.5s var(--ease-out)',
                                        }} />
                                        {/* Reorder point marker */}
                                        <div style={{ position: 'absolute', left: `${(inv.reorderPoint / inv.max) * 100}%`, top: -2, bottom: -2, width: 2, background: '#f59e0b', borderRadius: 1 }} />
                                    </div>
                                </div>
                            );
                        })}
                        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: '0.5625rem', color: 'var(--text-tertiary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 2, background: '#f59e0b', borderRadius: 1 }} /> Reorder Point</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: '#dc2626' }} /> Below Threshold</div>
                        </div>
                    </div>
                </div>

                {/* ERP Signal Monitoring */}
                <div>
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 6, padding: '20px', position: 'sticky', top: 88 }}>
                        <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>ERP Signal Monitor</h3>
                        {erpAlerts.map((alert, i) => (
                            <div key={i} style={{
                                padding: '10px 12px', marginBottom: 8, borderRadius: 4,
                                border: `1px solid ${alertColors[alert.type]}20`,
                                background: `${alertColors[alert.type]}05`,
                                animation: `fadeIn 0.3s var(--ease-out) ${i * 100}ms both`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: alertColors[alert.type], textTransform: 'uppercase' }}>{alert.type}</span>
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{alert.time}</span>
                                </div>
                                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{alert.message}</div>
                            </div>
                        ))}

                        <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: 4 }}>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 600 }}>AI Recommendation</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Based on current inventory levels and lead time patterns, recommend increasing safety stock for {sc.suppliers[0]?.category} by 15% to account for recent supplier variability.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
