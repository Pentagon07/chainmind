import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { scenarios } from '../data/scenarios';

function TradeoffSlider({ label, value, onChange, min = 0, max = 100, unit = '' }) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>{value}{unit}</span>
            </div>
            <div style={{ position: 'relative', height: 6, background: 'var(--bg-primary)', borderRadius: 'var(--radius-full)' }}>
                <div style={{
                    position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 'var(--radius-full)',
                    width: `${pct}%`, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                    transition: 'width 0.15s var(--ease-out)',
                }} />
                <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', margin: 0 }}
                />
            </div>
        </div>
    );
}

const simStrategies = {
    semiconductors: [
        { name: 'Expedite & Buffer', costDelta: '+$600K', timeImpact: '-2 weeks', riskReduction: 73, recommended: true, tradeoffs: 'Fastest response with moderate cost. Uses air freight and existing capacity buffers. Best risk-adjusted ROI.' },
        { name: 'Full Diversification', costDelta: '+$2.95M', timeImpact: '-6 months', riskReduction: 91, recommended: false, tradeoffs: 'Highest risk reduction but requires significant capital and foundry qualification timeline.' },
        { name: 'Wait & Monitor', costDelta: '$0', timeImpact: '0', riskReduction: 0, recommended: false, tradeoffs: 'No cost but maximum exposure. Only viable if geopolitical signals de-escalate within 48 hours.' },
    ],
    'import-export': [
        { name: 'FTA Reclassification', costDelta: '-$3.2M/yr', timeImpact: '+4 months', riskReduction: 45, recommended: true, tradeoffs: 'Long-term savings through trade agreement utilization. Requires customs broker coordination and product documentation.' },
        { name: 'Vietnam Sourcing Shift', costDelta: '+$850K', timeImpact: '+6 months', riskReduction: 78, recommended: false, tradeoffs: 'Eliminates tariff exposure but requires new supplier qualification and initial quality risk.' },
        { name: 'Price Pass-Through', costDelta: '$0', timeImpact: 'Immediate', riskReduction: 20, recommended: false, tradeoffs: 'Preserves margins but risks customer defection. Only viable for products with limited competition.' },
    ],
    agriculture: [
        { name: 'European Surge Order', costDelta: '+$1.9M/yr', timeImpact: '+8 weeks', riskReduction: 67, recommended: true, tradeoffs: '8% cost premium on Italian paste but ensures supply continuity. Mutti has confirmed 15% surge capacity.' },
        { name: 'Multi-Region Diversification', costDelta: '+$3.4M', timeImpact: '+12 months', riskReduction: 85, recommended: false, tradeoffs: 'Qualifies Portuguese and Turkish alternatives. Long-term play with food safety certification timeline.' },
        { name: 'Reformulation', costDelta: '-$200K', timeImpact: '+4 months', riskReduction: 35, recommended: false, tradeoffs: 'Reduces tomato paste content in 3 economy products. Saves cost but requires consumer testing and relabeling.' },
    ],
    hospitality: [
        { name: 'Emergency Procurement Run', costDelta: '+$160K', timeImpact: 'Today', riskReduction: 72, recommended: true, tradeoffs: 'Immediate 5-day buffer including cold storage premium. Best option given 48-hour closure window.' },
        { name: 'Local Supply Activation', costDelta: '+$40K', timeImpact: '+2 days', riskReduction: 48, recommended: false, tradeoffs: 'Leverages Whistler-area producers but limited capacity. Supplement to emergency procurement.' },
        { name: 'Menu Simplification Only', costDelta: '-$12K', timeImpact: 'Immediate', riskReduction: 30, recommended: false, tradeoffs: 'Reduces dependency 40% but impacts guest experience. Last resort for extended highway closures.' },
    ],
    manufacturing: [
        { name: 'Forward Contract Lock', costDelta: '+$2.1M', timeImpact: '-1 week', riskReduction: 65, recommended: true, tradeoffs: 'Locks Nucor pricing for 90 days. Prepayment cost offset by $5.4M savings vs. future spot prices.' },
        { name: 'Import Acceleration', costDelta: '+$4M tariff', timeImpact: '-30 days', riskReduction: 40, recommended: false, tradeoffs: 'Pre-position Thyssenkrupp volume before tariff effective date. High upfront cost but avoids 50% tariff.' },
        { name: 'Design Substitution', costDelta: '-$800K', timeImpact: '+3 months', riskReduction: 30, recommended: false, tradeoffs: 'Engineering redesign for 3 assemblies to use domestic-only steel grades. ROI only if tariffs persist 12+ months.' },
    ],
    saas: [
        { name: 'Search Abstraction Layer', costDelta: '+$28K', timeImpact: '+2 weeks', riskReduction: 60, recommended: true, tradeoffs: 'Low-cost insurance against vendor lock-in. Enables migration to any search provider with zero application changes.' },
        { name: 'Full Migration to Typesense', costDelta: '+$180K', timeImpact: '+3 months', riskReduction: 95, recommended: false, tradeoffs: 'Complete Algolia dependency elimination. Open-source with self-hosted option. Requires significant engineering.' },
        { name: 'Negotiate Status Quo', costDelta: '+$72K/yr', timeImpact: '0', riskReduction: 10, recommended: false, tradeoffs: 'Accept price increase. Only viable if price increase stays below 40%.' },
    ],
    fintech: [
        { name: 'Phased B-10 Compliance', costDelta: '+$120K', timeImpact: '-90 days', riskReduction: 82, recommended: true, tradeoffs: 'Prioritized vendor assessment program. Addresses critical path vendors first.' },
        { name: 'Outsourced Compliance', costDelta: '+$280K', timeImpact: '-60 days', riskReduction: 90, recommended: false, tradeoffs: 'Big 4 firm end-to-end. Faster but 2.3x more expensive. Board approval required.' },
        { name: 'Extension Request', costDelta: '+$5K', timeImpact: '+60 days', riskReduction: 25, recommended: false, tradeoffs: 'Request OSFI extension. Low probability but minimal cost.' },
    ],
};

export default function Simulation() {
    const { activeScenario, scenarioData: sc, scenarioInfo: info } = useAuth();
    const [costTolerance, setCostTolerance] = useState(20);
    const [delayTolerance, setDelayTolerance] = useState(10);
    const [resiliencePriority, setResiliencePriority] = useState(7);

    const strategies = simStrategies[activeScenario] || simStrategies.semiconductors;

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Scenario Simulation</h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Model disruption scenarios and compare mitigation strategies for {info?.company}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
                <div>
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 16 }}>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Active Scenario</div>
                        <div style={{
                            padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg-hover)',
                            border: '1px solid var(--accent-primary)',
                        }}>
                            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{info?.name}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{info?.company}</div>
                        </div>
                        <div style={{ marginTop: 12, fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                                <span>Suppliers</span><span style={{ color: 'var(--text-primary)' }}>{sc.suppliers?.length || 0}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                                <span>Active Disruptions</span><span style={{ color: 'var(--risk-critical)' }}>{sc.disruptions?.length || 0}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                                <span>Revenue</span><span style={{ color: 'var(--text-primary)' }}>{info?.revenue}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Trade-off Parameters</div>
                    <TradeoffSlider label="Cost Tolerance" value={costTolerance} onChange={setCostTolerance} unit="%" />
                    <TradeoffSlider label="Delay Tolerance (days)" value={delayTolerance} onChange={setDelayTolerance} max={30} unit=" days" />
                    <TradeoffSlider label="Resilience Priority" value={resiliencePriority} onChange={setResiliencePriority} min={1} max={10} />
                </div>
            </div>

            <div>
                <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{info?.company} -- {info?.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
                        Active disruptions: {sc?.disruptions?.length || 0} | Revenue at risk: {sc?.disruptions?.[0]?.revenueAtRisk || 'N/A'}
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {strategies.map((st, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-elevated)', border: `1px solid ${st.recommended ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                            borderRadius: 'var(--radius-md)', padding: '20px', position: 'relative',
                            animation: `fadeIn 0.4s var(--ease-out) ${i * 100}ms both`,
                        }}>
                            {st.recommended && (
                                <div style={{
                                    position: 'absolute', top: 0, right: 0, padding: '3px 12px',
                                    borderRadius: '0 var(--radius-md) 0 var(--radius-md)',
                                    background: 'var(--accent-primary)', fontSize: '0.5625rem',
                                    fontWeight: 700, color: 'var(--bg-primary)', textTransform: 'uppercase', letterSpacing: '0.08em',
                                }}>Recommended</div>
                            )}
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12, paddingRight: st.recommended ? 80 : 0 }}>{st.name}</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                                {[
                                    { label: 'Cost', value: st.costDelta, color: st.costDelta.startsWith('-') ? 'var(--accent-emerald)' : st.costDelta === '$0' ? 'var(--text-tertiary)' : 'var(--risk-amber)' },
                                    { label: 'Timeline', value: st.timeImpact, color: 'var(--text-primary)' },
                                    { label: 'Risk Cut', value: `${st.riskReduction}%`, color: 'var(--accent-emerald)' },
                                ].map(m => (
                                    <div key={m.label}>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{m.label}</div>
                                        <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: m.color }}>{m.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
                                <div style={{ width: `${st.riskReduction}%`, height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-primary))', transition: 'width 0.6s var(--ease-out)' }} />
                            </div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{st.tradeoffs}</div>
                            <button style={{
                                marginTop: 12, width: '100%', padding: '8px',
                                background: st.recommended ? 'var(--accent-primary)' : 'transparent',
                                color: st.recommended ? 'var(--bg-primary)' : 'var(--text-tertiary)',
                                border: st.recommended ? 'none' : '1px solid var(--border-primary)',
                                borderRadius: 'var(--radius-sm)', fontSize: '0.75rem',
                                fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                            }}>{st.recommended ? 'Apply Strategy' : 'Simulate'}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
