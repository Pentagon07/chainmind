import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const riskColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444', critical: '#dc2626' };

export default function SupplyTree() {
    const { scenarioData: sc, scenarioInfo: info } = useAuth();
    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    const tier1 = sc.suppliers.filter(s => s.tier === 1);
    const tier2 = sc.suppliers.filter(s => s.tier === 2);

    // Layout calculations -- responsive to container
    const svgWidth = 800;
    const svgHeight = Math.max(460, (Math.max(tier1.length, tier2.length) + 1) * 56 + 80);
    const rootX = 60;
    const rootY = svgHeight / 2;
    const tier1X = 260;
    const tier2X = 520;

    const tier1Spacing = Math.min(56, (svgHeight - 80) / Math.max(tier1.length, 1));
    const tier1StartY = rootY - (tier1.length - 1) * tier1Spacing / 2;
    const tier2Spacing = Math.min(56, (svgHeight - 80) / Math.max(tier2.length, 1));
    const tier2StartY = rootY - (tier2.length - 1) * tier2Spacing / 2;

    const selected = sc.suppliers.find(s => s.id === selectedNode);

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Supply Chain Map</h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Interactive supply hierarchy for {info?.company}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
                <div style={{
                    background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                    borderRadius: 6, padding: '16px', overflow: 'auto',
                }}>
                    <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ display: 'block' }}>
                        {/* Connection lines: root to tier 1 */}
                        {tier1.map((s, i) => {
                            const y = tier1StartY + i * tier1Spacing;
                            return (
                                <path key={`line-r-${s.id}`} d={`M${rootX + 80},${rootY} C${(rootX + 80 + tier1X - 60) / 2},${rootY} ${(rootX + 80 + tier1X - 60) / 2},${y} ${tier1X - 60},${y}`}
                                    stroke={hoveredNode === s.id ? riskColors[s.risk] : 'var(--border-primary)'}
                                    strokeWidth={hoveredNode === s.id ? 2 : 1} fill="none" strokeDasharray={hoveredNode === s.id ? '' : '4 4'}
                                    style={{ transition: 'all 0.2s' }}
                                />
                            );
                        })}

                        {/* Connection lines: tier 1 to tier 2 */}
                        {tier2.map((s2, j) => {
                            const y2 = tier2StartY + j * tier2Spacing;
                            // Connect to closest tier 1 by category proximity
                            const parentIdx = Math.min(j, tier1.length - 1);
                            const parentY = tier1StartY + parentIdx * tier1Spacing;
                            return (
                                <path key={`line-t-${s2.id}`} d={`M${tier1X + 100},${parentY} C${(tier1X + 100 + tier2X - 60) / 2},${parentY} ${(tier1X + 100 + tier2X - 60) / 2},${y2} ${tier2X - 60},${y2}`}
                                    stroke={hoveredNode === s2.id ? riskColors[s2.risk] : 'var(--border-primary)'}
                                    strokeWidth={hoveredNode === s2.id ? 2 : 1} fill="none" strokeDasharray={hoveredNode === s2.id ? '' : '4 4'}
                                    style={{ transition: 'all 0.2s' }}
                                />
                            );
                        })}

                        {/* Root Node (Company) */}
                        <g transform={`translate(${rootX - 40}, ${rootY - 30})`}>
                            <rect width={120} height={60} rx={4} fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeWidth={2} />
                            <text x={60} y={22} textAnchor="middle" fill="var(--accent-primary)" fontSize={10} fontWeight={700}>{info?.company?.length > 16 ? info.company.slice(0, 16) + '...' : info?.company}</text>
                            <text x={60} y={38} textAnchor="middle" fill="var(--text-tertiary)" fontSize={8}>{info?.location}</text>
                            <text x={60} y={50} textAnchor="middle" fill="var(--text-tertiary)" fontSize={7}>{info?.revenue} revenue</text>
                        </g>

                        {/* Tier 1 Label */}
                        <text x={tier1X + 20} y={30} textAnchor="middle" fill="var(--accent-primary)" fontSize={9} fontWeight={600} letterSpacing="0.1em">TIER 1</text>
                        <line x1={tier1X - 60} y1={40} x2={tier1X + 100} y2={40} stroke="var(--border-primary)" strokeWidth={0.5} />

                        {/* Tier 1 Nodes */}
                        {tier1.map((s, i) => {
                            const y = tier1StartY + i * tier1Spacing;
                            const isHovered = hoveredNode === s.id;
                            const isSelected = selectedNode === s.id;
                            return (
                                <g key={s.id} transform={`translate(${tier1X - 60}, ${y - 18})`}
                                    onMouseEnter={() => setHoveredNode(s.id)} onMouseLeave={() => setHoveredNode(null)}
                                    onClick={() => setSelectedNode(isSelected ? null : s.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <rect width={160} height={36} rx={4}
                                        fill={isSelected ? `${riskColors[s.risk]}15` : 'var(--bg-surface)'}
                                        stroke={isHovered || isSelected ? riskColors[s.risk] : 'var(--border-primary)'}
                                        strokeWidth={isHovered || isSelected ? 1.5 : 0.5}
                                        style={{ transition: 'all 0.15s' }}
                                    />
                                    <circle cx={14} cy={18} r={4} fill={riskColors[s.risk]} opacity={0.8} />
                                    <text x={24} y={15} fill="var(--text-primary)" fontSize={9} fontWeight={600}>{s.name.length > 16 ? s.name.slice(0, 16) + '...' : s.name}</text>
                                    <text x={24} y={27} fill="var(--text-tertiary)" fontSize={7}>{s.category} | {s.health}/100</text>
                                </g>
                            );
                        })}

                        {/* Tier 2 Label */}
                        {tier2.length > 0 && (
                            <>
                                <text x={tier2X + 20} y={30} textAnchor="middle" fill="var(--accent-secondary)" fontSize={9} fontWeight={600} letterSpacing="0.1em">TIER 2</text>
                                <line x1={tier2X - 60} y1={40} x2={tier2X + 100} y2={40} stroke="var(--border-primary)" strokeWidth={0.5} />
                            </>
                        )}

                        {/* Tier 2 Nodes */}
                        {tier2.map((s, i) => {
                            const y = tier2StartY + i * tier2Spacing;
                            const isHovered = hoveredNode === s.id;
                            const isSelected = selectedNode === s.id;
                            return (
                                <g key={s.id} transform={`translate(${tier2X - 60}, ${y - 18})`}
                                    onMouseEnter={() => setHoveredNode(s.id)} onMouseLeave={() => setHoveredNode(null)}
                                    onClick={() => setSelectedNode(isSelected ? null : s.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <rect width={160} height={36} rx={4}
                                        fill={isSelected ? `${riskColors[s.risk]}15` : 'var(--bg-surface)'}
                                        stroke={isHovered || isSelected ? riskColors[s.risk] : 'var(--border-primary)'}
                                        strokeWidth={isHovered || isSelected ? 1.5 : 0.5}
                                        style={{ transition: 'all 0.15s' }}
                                    />
                                    <circle cx={14} cy={18} r={4} fill={riskColors[s.risk]} opacity={0.8} />
                                    <text x={24} y={15} fill="var(--text-primary)" fontSize={9} fontWeight={600}>{s.name.length > 16 ? s.name.slice(0, 16) + '...' : s.name}</text>
                                    <text x={24} y={27} fill="var(--text-tertiary)" fontSize={7}>{s.category} | {s.health}/100</text>
                                </g>
                            );
                        })}

                        {/* Legend */}
                        <g transform={`translate(20, ${svgHeight - 20})`}>
                            {Object.entries(riskColors).map(([label, color], i) => (
                                <g key={label} transform={`translate(${i * 100}, 0)`}>
                                    <circle cx={6} cy={6} r={5} fill={color} opacity={0.8} />
                                    <text x={16} y={10} fill="var(--text-tertiary)" fontSize={8} textTransform="capitalize">{label} risk</text>
                                </g>
                            ))}
                        </g>
                    </svg>
                </div>

                {/* Detail Panel */}
                <div style={{
                    background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                    borderRadius: 6, padding: '20px', position: 'sticky', top: 88,
                }}>
                    {selected ? (
                        <div style={{ animation: 'fadeIn 0.2s var(--ease-out)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: '50%', position: 'relative',
                                    background: `conic-gradient(${riskColors[selected.risk]} ${selected.health * 3.6}deg, var(--bg-primary) 0)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selected.health}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selected.name}</div>
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>Tier {selected.tier} | {selected.category}</div>
                                </div>
                            </div>
                            {[
                                ['Location', selected.location],
                                ['Annual Spend', selected.spend],
                                ['Lead Time', selected.leadTime],
                                ['Risk Level', selected.risk],
                                ['Concentration', `${selected.concentration}%`],
                                ['Financial Score', `${selected.financialScore}/100`],
                            ].map(([label, value]) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-primary)', fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--text-tertiary)' }}>{label}</span>
                                    <span style={{ color: label === 'Risk Level' ? riskColors[value] : 'var(--text-primary)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{value}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 10 }}>
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Click a supplier node to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
