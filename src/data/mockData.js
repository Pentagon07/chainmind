export const companyProfile = {
    name: 'Müller Precision Parts GmbH',
    industry: 'Automotive Parts',
    region: 'Germany',
    revenue: '$180M',
    riskAppetite: 'Moderate',
    suppliersTotal: 47,
    singleSourceComponents: 3,
};

export const kpiData = {
    revenueAtRisk: 2140000,
    activeDisruptions: 3,
    supplierHealthIndex: 78,
    agentActionsToday: 12,
    resolvedThisWeek: 7,
    avgResponseTime: '4.2 min',
};

export const suppliers = [
    { id: 1, name: 'Taiwan Semiconductor Co.', location: 'Hsinchu, Taiwan', tier: 1, healthScore: 42, risk: 'critical', leadTime: '12 weeks', financialScore: 58, category: 'ECU Chips', lat: 24.8, lng: 120.97, concentration: 92, status: 'At Risk — Geopolitical exposure + single source' },
    { id: 2, name: 'Rhine Metals AG', location: 'Düsseldorf, Germany', tier: 1, healthScore: 91, risk: 'low', leadTime: '3 weeks', financialScore: 94, category: 'Aluminum Castings', lat: 51.22, lng: 6.77, concentration: 45, status: 'Stable — Diversified, strong financials' },
    { id: 3, name: 'Shenzhen Flex Components', location: 'Shenzhen, China', tier: 2, healthScore: 63, risk: 'high', leadTime: '8 weeks', financialScore: 71, category: 'PCB Assemblies', lat: 22.54, lng: 114.06, concentration: 78, status: 'Watch — Tariff impact + lead time volatility' },
    { id: 4, name: 'Istanbul Plastics Ltd.', location: 'Istanbul, Turkey', tier: 1, healthScore: 85, risk: 'low', leadTime: '4 weeks', financialScore: 88, category: 'Injection Molds', lat: 41.01, lng: 28.97, concentration: 30, status: 'Stable — Recently diversified tooling sources' },
    { id: 5, name: 'Yokohama Steel Works', location: 'Yokohama, Japan', tier: 2, healthScore: 55, risk: 'medium', leadTime: '10 weeks', financialScore: 76, category: 'Specialty Steel', lat: 35.44, lng: 139.64, concentration: 67, status: 'Monitor — Port congestion delays detected' },
    { id: 6, name: 'Chennai Auto Electric', location: 'Chennai, India', tier: 2, healthScore: 71, risk: 'medium', leadTime: '6 weeks', financialScore: 69, category: 'Wiring Harnesses', lat: 13.08, lng: 80.27, concentration: 55, status: 'Monitor — Monsoon season approaching logistics risk' },
    { id: 7, name: 'Guadalajara Components SA', location: 'Guadalajara, Mexico', tier: 1, healthScore: 88, risk: 'low', leadTime: '2 weeks', financialScore: 82, category: 'Stamped Parts', lat: 20.67, lng: -103.35, concentration: 25, status: 'Stable — Nearshore advantage, USMCA compliant' },
    { id: 8, name: 'Baltic Rare Earths OÜ', location: 'Tallinn, Estonia', tier: 3, healthScore: 48, risk: 'high', leadTime: '14 weeks', financialScore: 52, category: 'Rare Earth Magnets', lat: 59.44, lng: 24.75, concentration: 88, status: 'At Risk — Chinese dependency in raw materials' },
];

export const disruptions = [
    {
        id: 1, severity: 'critical', title: 'Red Sea Shipping Route Disruption',
        description: 'Houthi attacks force rerouting via Cape of Good Hope. +14 day transit time for all Asia-Europe shipments.',
        timestamp: '2 hours ago', affectedSuppliers: ['Taiwan Semiconductor Co.', 'Shenzhen Flex Components', 'Yokohama Steel Works'],
        probability: 0.94, revenueImpact: '$1.2M', region: 'Red Sea',
        lat: 13.0, lng: 42.5,
        reasoning: 'AIS data confirms 87% of container vessels now diverting. Our Tier 1 chip supplier ships exclusively via Suez. Historical pattern: Q1 2024 same disruption caused 3-week delays and $800K in expedited freight costs.'
    },
    {
        id: 2, severity: 'high', title: 'Taiwan Semiconductor — Financial Distress Signal',
        description: 'D&B credit score dropped 18 points in 30 days. Missed payment reported by sub-supplier.',
        timestamp: '6 hours ago', affectedSuppliers: ['Taiwan Semiconductor Co.'],
        probability: 0.72, revenueImpact: '$620K', region: 'Taiwan',
        lat: 24.8, lng: 120.97,
        reasoning: 'CreditSafe alert: payment delinquency flagged. Combined with geopolitical tension (cross-strait military exercises), our single-source ECU chip dependency creates compounding risk. Recommend immediate qualification of backup supplier.'
    },
    {
        id: 3, severity: 'medium', title: 'Yokohama Port Congestion',
        description: 'Vessel dwell times up 40% at Yokohama. Specialty steel shipments may face 5–8 day delays.',
        timestamp: '1 day ago', affectedSuppliers: ['Yokohama Steel Works'],
        probability: 0.58, revenueImpact: '$320K', region: 'Japan',
        lat: 35.44, lng: 139.64,
        reasoning: 'Port congestion data from MarineTraffic shows berthing delays averaging 3.2 days (up from 1.8). Our specialty steel orders for Q2 production are in transit. Buffer stock covers 2 weeks; delay tolerance is 8 days.'
    },
    {
        id: 4, severity: 'low', title: 'EU CSRD Compliance Deadline Approaching',
        description: 'Scope 3 emissions data due from Tier 1 suppliers by Q2. 3 of 5 suppliers have not submitted.',
        timestamp: '2 days ago', affectedSuppliers: ['Rhine Metals AG', 'Istanbul Plastics Ltd.', 'Guadalajara Components SA'],
        probability: 0.35, revenueImpact: '$0', region: 'EU',
        lat: 50.85, lng: 4.35,
        reasoning: 'CSRD reporting requirement effective 2025 for large companies. Non-compliance risk: audit flags, potential customer contract penalties. 3 suppliers need reminder communications.'
    },
];

export const scenarios = [
    {
        id: 'red-sea',
        name: 'Red Sea Route Blocked (30+ Days)',
        description: 'Complete closure of Suez Canal route forces all Asia-Europe freight via Cape of Good Hope.',
        strategies: [
            { name: 'Reroute via Cape + Expedite Critical', costDelta: '+$180K', timeImpact: '+10 days avg', riskReduction: 65, tradeoffs: 'Higher freight cost; moderate delay; maintains all supply relationships', recommended: true },
            { name: 'Activate Mexico Nearshore Backup', costDelta: '+$95K', timeImpact: '-5 days for 40% of parts', riskReduction: 82, tradeoffs: 'Lower unit cost long-term; requires 2-week supplier qualification; partial coverage only', recommended: false },
            { name: 'Strategic Buffer Build (8 Weeks)', costDelta: '+$310K', timeImpact: '0 days (preemptive)', riskReduction: 90, tradeoffs: 'Highest upfront cost; ties up working capital; provides strongest protection', recommended: false },
        ],
    },
    {
        id: 'supplier-fail',
        name: 'Taiwan Semiconductor Insolvency',
        description: 'Primary ECU chip supplier ceases operations. Single-source dependency triggers production halt risk.',
        strategies: [
            { name: 'Emergency Re-Source to Samsung Semi', costDelta: '+$420K', timeImpact: '+6 weeks qualification', riskReduction: 75, tradeoffs: 'Higher cost; qualification delay; specs 96% compatible', recommended: false },
            { name: 'Dual-Source (Samsung + Texas Instruments)', costDelta: '+$280K ongoing', timeImpact: '+8 weeks setup', riskReduction: 95, tradeoffs: 'Highest long-term resilience; eliminates single-source risk permanently', recommended: true },
            { name: 'Redesign PCB for Multi-Chip Compatibility', costDelta: '+$150K one-time', timeImpact: '+12 weeks R&D', riskReduction: 98, tradeoffs: 'Longest implementation; lowest ongoing cost; future-proofs architecture', recommended: false },
        ],
    },
    {
        id: 'tariff-shock',
        name: 'China Tariff +25% Shock',
        description: 'New trade policy imposes 25% tariff on all Chinese-origin components. Immediate cost impact on PCBs and rare earth magnets.',
        strategies: [
            { name: 'Absorb Cost (Short-Term)', costDelta: '+$210K/quarter', timeImpact: '0 days', riskReduction: 10, tradeoffs: 'No disruption; erodes margin by 4.2%; unsustainable beyond 2 quarters', recommended: false },
            { name: 'Nearshore to Mexico + Vietnam', costDelta: '+$85K transition', timeImpact: '+8 weeks transition', riskReduction: 80, tradeoffs: 'Moderate transition cost; long-term cost savings; USMCA/CPTPP benefits', recommended: true },
            { name: 'Renegotiate with Shenzhen + Tariff Engineering', costDelta: '+$40K legal', timeImpact: '+4 weeks negotiation', riskReduction: 45, tradeoffs: 'Lowest cost; partial relief only; regulatory risk if misclassified', recommended: false },
        ],
    },
];

export const agentTimeline = [
    { id: 1, time: '09:14 AM', action: 'Detected Red Sea shipping disruption via MarineTraffic AIS data', type: 'perception', icon: '📡' },
    { id: 2, time: '09:15 AM', action: 'Classified as CRITICAL — affects 3 Tier 1/2 suppliers', type: 'risk', icon: '⚠️' },
    { id: 3, time: '09:17 AM', action: 'Calculated revenue-at-risk: $1.2M based on downstream SLAs', type: 'risk', icon: '💰' },
    { id: 4, time: '09:19 AM', action: 'Generated 3 mitigation strategies via scenario simulation', type: 'planning', icon: '🧠' },
    { id: 5, time: '09:22 AM', action: 'Drafted rerouting notification email to Taiwan Semiconductor Co.', type: 'action', icon: '📧' },
    { id: 6, time: '09:22 AM', action: 'Suggested ERP safety stock increase: ECU chips +15%', type: 'action', icon: '📦' },
    { id: 7, time: '09:25 AM', action: 'Escalated to VP Operations — risk threshold exceeded', type: 'escalation', icon: '🔔' },
    { id: 8, time: '10:30 AM', action: 'Detected Taiwan Semi credit score drop via CreditSafe API', type: 'perception', icon: '📡' },
    { id: 9, time: '10:32 AM', action: 'Cross-referenced with geopolitical intelligence — compounding risk flagged', type: 'risk', icon: '🌐' },
    { id: 10, time: '10:35 AM', action: 'Recommended dual-sourcing strategy with Samsung Semi qualification', type: 'planning', icon: '🧠' },
    { id: 11, time: '11:00 AM', action: 'Sent CSRD compliance reminder to 3 Tier 1 suppliers', type: 'action', icon: '📋' },
    { id: 12, time: '11:45 AM', action: 'Reflection: Updated strategy weights based on Q1 disruption outcomes', type: 'memory', icon: '🔄' },
];

export const agentChat = [
    {
        role: 'user', content: "What's my biggest risk right now?",
    },
    {
        role: 'agent',
        content: `**Your #1 risk is the Red Sea shipping disruption**, which I detected 2 hours ago via MarineTraffic AIS data confirming 87% of container vessels diverting from the Suez Canal.

**Why this is critical for you specifically:**
- Your Tier 1 chip supplier (Taiwan Semiconductor Co.) ships exclusively via Suez
- Expected transit delay: **+14 days** on a 12-week lead time
- Revenue at risk: **$1.2M** based on your BMW OEM SLA penalties ($50K/day late)
- Your current ECU chip buffer stock covers only **2 weeks**

**What I've already done:**
1. ✅ Drafted a rerouting coordination email to Taiwan Semiconductor (awaiting your approval)
2. ✅ Recommended ERP safety stock increase of +15% for ECU chips
3. ✅ Generated 3 mitigation strategies — I recommend "Reroute + Expedite Critical" as the optimal cost/risk balance
4. ✅ Escalated to VP Operations since this exceeds your configured risk threshold

**Recommended next step:** Review and approve the supplier email draft, then open the Scenario Simulator to explore trade-offs.`,
        reasoning: {
            signal: 'MarineTraffic AIS: 87% vessel diversion detected at coordinates 13.0°N, 42.5°E',
            riskScore: 'Probability: 0.94 | Revenue Impact: $1.2M | Time to Impact: 14 days',
            decision: 'Auto-escalate (risk > threshold) + Generate mitigation strategies + Draft communications',
            sources: ['MarineTraffic AIS Feed', 'Reuters Geopolitical Alert', 'GDELT Event Database', 'Company SLA Contracts (RAG)']
        }
    },
    {
        role: 'user', content: 'Show me the email draft for Taiwan Semiconductor.',
    },
    {
        role: 'agent',
        content: `Here's the draft email:

**To:** supply.chain@taiwansemi.co.tw
**Subject:** URGENT: Shipping Route Disruption — Coordination Required

Dear Supply Chain Team,

We are writing regarding the ongoing Red Sea shipping disruption affecting Suez Canal transit routes. Our monitoring systems indicate that 87% of container vessels are now diverting via the Cape of Good Hope, adding approximately 14 days to Asia-Europe transit times.

As this directly impacts our scheduled Q2 ECU chip shipments (PO #MUL-2026-0847, PO #MUL-2026-0851), we would like to discuss:

1. **Current shipment status** — Can you confirm the routing status of our active orders?
2. **Expedited shipping options** — What air freight or express routing alternatives are available?
3. **Buffer order** — We are considering a 15% increase in our next order to build safety stock. Can you accommodate accelerated production?

We value our partnership and want to ensure minimal disruption to both operations. Please respond at your earliest convenience or schedule a call this week.

Best regards,
Operations Team — Müller Precision Parts GmbH`,
        action: {
            type: 'email',
            status: 'pending_approval',
            recipient: 'Taiwan Semiconductor Co.',
            subject: 'URGENT: Shipping Route Disruption — Coordination Required'
        }
    },
];

export const supplyRoutes = [
    { from: { lat: 24.8, lng: 120.97 }, to: { lat: 51.22, lng: 6.77 }, supplier: 'Taiwan Semi → Germany', risk: 'critical', active: true },
    { from: { lat: 22.54, lng: 114.06 }, to: { lat: 51.22, lng: 6.77 }, supplier: 'Shenzhen Flex → Germany', risk: 'high', active: true },
    { from: { lat: 35.44, lng: 139.64 }, to: { lat: 51.22, lng: 6.77 }, supplier: 'Yokohama Steel → Germany', risk: 'medium', active: true },
    { from: { lat: 41.01, lng: 28.97 }, to: { lat: 51.22, lng: 6.77 }, supplier: 'Istanbul Plastics → Germany', risk: 'low', active: true },
    { from: { lat: 13.08, lng: 80.27 }, to: { lat: 51.22, lng: 6.77 }, supplier: 'Chennai Auto → Germany', risk: 'medium', active: true },
    { from: { lat: 20.67, lng: -103.35 }, to: { lat: 51.22, lng: 6.77 }, supplier: 'Guadalajara → Germany', risk: 'low', active: true },
    { from: { lat: 59.44, lng: 24.75 }, to: { lat: 51.22, lng: 6.77 }, supplier: 'Baltic Rare Earths → Germany', risk: 'high', active: true },
];
