import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import SimulationOverlay from '../components/DisruptionSim/SimulationOverlay';

const supplierCoords = {
    'Hsinchu, Taiwan': [24.8, 120.97], 'Kaohsiung, Taiwan': [22.62, 120.30], 'Osaka, Japan': [34.69, 135.50],
    'Billerica, MA': [42.56, -71.27], 'Tokyo, Japan': [35.68, 139.69], 'New Taipei, Taiwan': [25.01, 121.47],
    'Malta, NY': [42.98, -73.86], 'Tempe, AZ': [33.43, -111.94], 'Shenzhen, China': [22.54, 114.06],
    'Yokohama, Japan': [35.44, 139.64], 'Seoul, South Korea': [37.57, 126.98], 'Vancouver, BC': [49.28, -123.12],
    'Copenhagen, Denmark': [55.68, 12.57], 'Ningbo, China': [29.87, 121.55], 'Fresno, CA': [36.75, -119.77],
    'Parma, Italy': [44.80, 10.33], 'Saskatoon, SK': [52.13, -106.67], 'Jaipur, India': [26.91, 75.79],
    'Hamilton, ON': [43.26, -79.87], 'London, ON': [42.98, -81.25], 'Urumqi, China': [43.83, 87.62],
    'Winnipeg, MB': [49.90, -97.14], 'Montreal, QC': [45.50, -73.57], 'Mississauga, ON': [43.59, -79.64],
    'Houston, TX': [29.76, -95.37], 'Burnaby, BC': [49.27, -122.97], 'Whistler, BC': [50.12, -122.95],
    'Portland, OR': [45.52, -122.68], 'Pittsburgh, PA': [40.44, -79.99], 'Charlotte, NC': [35.23, -80.84],
    'Cleveland, OH': [41.50, -81.69], 'Canton, OH': [40.80, -81.38], 'Lake Forest, IL': [42.23, -87.84],
    'Chicago, IL': [41.88, -87.63], 'Dusseldorf, Germany': [51.23, 6.77], 'Detroit, MI': [42.33, -83.05],
    'Seattle, WA': [47.61, -122.33], 'San Francisco, CA': [37.77, -122.42], 'New York, NY': [40.71, -74.01],
    'Ottawa, ON': [45.42, -75.70], 'Purchase, NY': [41.04, -73.71], 'Milwaukee, WI': [43.04, -87.91],
    'Palo Alto, CA': [37.44, -122.14], 'Toronto, ON': [43.65, -79.38], 'Kelowna, BC': [49.88, -119.50],
    'Surrey, BC': [49.19, -122.85], 'Ho Chi Minh, Vietnam': [10.82, 106.63], 'Guadalajara, Mexico': [20.67, -103.35],
    'Leicester, UK': [52.63, -1.13], 'Stockholm, Sweden': [59.33, 18.07], 'Dublin, Ireland': [53.35, -6.26],
    'Waterloo, ON': [43.46, -80.52], 'Bangalore, India': [12.97, 77.59],
};

const riskColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444', critical: '#dc2626' };

export default function Dashboard() {
    const { user, scenarioData: sc, scenarioInfo: info } = useAuth();
    const [showSim, setShowSim] = useState(false);
    const [expandedDisruption, setExpandedDisruption] = useState(null);

    const totalRisk = sc.disruptions.reduce((sum, d) => sum + parseFloat(d.revenueAtRisk.replace(/[$M,K]/g, '')) * (d.revenueAtRisk.includes('K') ? 0.001 : 1), 0);
    const avgHealth = Math.round(sc.suppliers.reduce((s, sup) => s + sup.health, 0) / sc.suppliers.length);
    const critCount = sc.disruptions.filter(d => d.severity === 'critical').length;

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            {showSim && <SimulationOverlay onClose={() => setShowSim(false)} />}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Command Center</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{info?.company} -- {info?.location} | Logged in as {user?.name || 'User'}</p>
                </div>
                <button onClick={() => setShowSim(true)} style={{
                    padding: '8px 16px', background: 'var(--risk-critical)', color: '#fff',
                    border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem',
                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: 6,
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    Simulate Disruption
                </button>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                    { label: 'Revenue at Risk', value: totalRisk, prefix: '$', suffix: 'M', color: 'var(--risk-critical)', decimals: 1 },
                    { label: 'Active Disruptions', value: sc.disruptions.length, color: 'var(--risk-amber)', decimals: 0 },
                    { label: 'Avg Supplier Health', value: avgHealth, suffix: '/100', color: 'var(--accent-primary)', decimals: 0 },
                    { label: 'Critical Alerts', value: critCount, color: critCount > 0 ? 'var(--risk-critical)' : 'var(--accent-emerald)', decimals: 0 },
                ].map(kpi => (
                    <div key={kpi.label} style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-md)', padding: '20px 16px',
                    }}>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{kpi.label}</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: kpi.color, fontFamily: 'var(--font-mono)' }}>
                            {kpi.prefix || ''}<AnimatedNumber value={kpi.value} decimals={kpi.decimals} />{kpi.suffix || ''}
                        </div>
                    </div>
                ))}
            </div>

            {/* Map + Risk Feed */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: 420 }}>
                    <MapContainer center={[25, 10]} zoom={2} style={{ height: '100%', width: '100%', background: '#060a13' }} zoomControl={false} attributionControl={false} scrollWheelZoom={true}>
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />
                        {sc.suppliers.map(sup => {
                            const coord = supplierCoords[sup.location];
                            if (!coord) return null;
                            return (
                                <CircleMarker key={sup.id} center={coord} radius={8}
                                    pathOptions={{ fillColor: riskColors[sup.risk] || '#10b981', color: riskColors[sup.risk] || '#10b981', fillOpacity: 0.7, weight: 1.5 }}
                                >
                                    <Popup>
                                        <div style={{ color: '#000', fontSize: '0.75rem', minWidth: 160 }}>
                                            <strong>{sup.name}</strong><br />
                                            Tier {sup.tier} | {sup.category}<br />
                                            Health: {sup.health}/100 | Risk: {sup.risk}<br />
                                            Lead: {sup.leadTime} | {sup.spend}
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            );
                        })}
                    </MapContainer>
                </div>

                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '16px', overflow: 'auto', maxHeight: 420 }}>
                    <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Active Disruptions</h3>
                    {sc.disruptions.map(d => {
                        const sevColors = { critical: 'var(--risk-critical)', high: 'var(--risk-amber)', medium: '#f59e0b', low: 'var(--accent-emerald)' };
                        const isExpanded = expandedDisruption === d.id;
                        return (
                            <div key={d.id} style={{
                                padding: '12px', borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border-primary)', marginBottom: 8,
                                cursor: 'pointer', transition: 'border-color 0.15s',
                                borderLeft: `3px solid ${sevColors[d.severity]}`,
                            }} onClick={() => setExpandedDisruption(isExpanded ? null : d.id)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: sevColors[d.severity], textTransform: 'uppercase' }}>{d.severity}</span>
                                    <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{d.type}</span>
                                </div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{d.title}</div>
                                <div style={{ display: 'flex', gap: 16, fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                                    <span>Revenue: {d.revenueAtRisk}</span>
                                    <span>Impact: {d.timeToImpact}</span>
                                </div>
                                {isExpanded && (
                                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-primary)', animation: 'fadeIn 0.2s var(--ease-out)' }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>{d.summary}</p>
                                        <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>
                                            <strong>Sources:</strong> {d.sources.join(' | ')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Supplier Table */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Supplier Overview</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                                {['Supplier', 'Tier', 'Category', 'Location', 'Health', 'Risk', 'Lead Time', 'Annual Spend'].map(h => (
                                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sc.suppliers.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-primary)', transition: 'background 0.1s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                                    <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)' }}>T{s.tier}</td>
                                    <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)' }}>{s.category}</td>
                                    <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)' }}>{s.location}</td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 48, height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden' }}>
                                                <div style={{ width: `${s.health}%`, height: '100%', background: s.health > 80 ? 'var(--accent-emerald)' : s.health > 60 ? 'var(--risk-amber)' : 'var(--risk-critical)', borderRadius: 2 }} />
                                            </div>
                                            <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{s.health}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.625rem', fontWeight: 600, color: riskColors[s.risk], border: `1px solid ${riskColors[s.risk]}30`, background: `${riskColors[s.risk]}10` }}>{s.risk}</span>
                                    </td>
                                    <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{s.leadTime}</td>
                                    <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{s.spend}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
