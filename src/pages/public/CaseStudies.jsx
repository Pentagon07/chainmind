export default function CaseStudies() {
    const cases = [
        { title: 'Semiconductor Supply Chain', industry: 'Semiconductors', client: 'NovaTech Devices', result: '73% faster disruption response', problem: 'Single-source dependency on Taiwan foundries with 18-month lead times. Geopolitical risk from Taiwan Strait tensions threatening $45M in annual chip procurement.', solution: 'ChainMind mapped the full 4-tier semiconductor supply chain, identified 7 hidden single-source dependencies, and deployed real-time monitoring of maritime AIS data for Asia-Pacific shipping lanes.', metrics: [{ label: 'Response Time Reduction', val: '73%' }, { label: 'Alternative Suppliers Found', val: '12' }, { label: 'Annual Savings', val: '$2.4M' }] },
        { title: 'Canadian Food Manufacturing', industry: 'Agriculture & Food', client: 'Great Lakes Foods Corp', result: '52% reduction in sourcing risk', problem: 'Complex multi-ingredient supply chain for condiment manufacturing. Tomato paste from 3 countries, mustard seed from 2 continents, spices from 11 nations. Seasonal crop dependency and CFIA compliance complexity.', solution: 'Deployed crop yield monitoring, weather pattern analysis, and automated CFIA regulatory tracking. Identified and resolved 3 critical single-source dependencies through AI-recommended dual-sourcing strategies.', metrics: [{ label: 'Supply Risk Reduction', val: '52%' }, { label: 'Cost Increase', val: '3.2%' }, { label: 'Compliance Gaps Fixed', val: '8' }] },
        { title: 'Heavy Manufacturing', industry: 'Heavy Manufacturing', client: 'Titan Industrial Works', result: '45% fewer disruption incidents', problem: 'Steel and aluminum procurement representing 60% of COGS subject to extreme price volatility, tariff uncertainty, and increasing lead times from domestic mills.', solution: 'ChainMind agents continuously monitor LME prices, mill capacity utilization, scrap indices, and tariff policy. Automated procurement strategy optimization balancing spot, forward, and inventory build decisions.', metrics: [{ label: 'Disruption Reduction', val: '45%' }, { label: 'Procurement Savings', val: '$1.8M' }, { label: 'Analysis Time Saved', val: '65%' }] },
        { title: 'Cross-Border Trade', industry: 'Import & Export', client: 'Pacific Trade Solutions', result: '40% reduction in customs delays', problem: '$120M in annual goods movement between Asia and North America. Complex customs classification, FX exposure, and missed free trade agreement utilization costing hundreds of thousands annually.', solution: 'Automated customs pre-clearance workflows, real-time FX monitoring with hedging recommendations, and FTA utilization analysis that identified $350K in missed savings.', metrics: [{ label: 'Customs Delay Reduction', val: '40%' }, { label: 'FTA Savings Found', val: '$350K' }, { label: 'ROI (60 days)', val: '380%' }] },
    ];
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Case Studies</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>Real results from real manufacturers</h1>
            </section>
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px', display: 'flex', flexDirection: 'column', gap: 32 }}>
                {cases.map(c => (
                    <div key={c.title} style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)', padding: '48px 40px', backdropFilter: 'blur(16px)',
                    }}>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                            <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-primary)', fontSize: '0.625rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{c.industry}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{c.client}</span>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{c.title}</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: 24 }}>{c.result}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                            <div>
                                <h4 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Challenge</h4>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{c.problem}</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Solution</h4>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{c.solution}</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                            {c.metrics.map(m => (
                                <div key={m.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center', border: '1px solid var(--border-primary)' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{m.val}</div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 4 }}>{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
