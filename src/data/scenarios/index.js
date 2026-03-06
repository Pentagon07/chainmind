// 7 industry scenarios for the ChainMind platform
// Each scenario = a mock company with suppliers, disruptions, agent conversations

export const scenarioList = [
    { id: 'semiconductors', name: 'Semiconductors', company: 'NovaTech Devices', location: 'Hsinchu, Taiwan', revenue: '$420M', employees: 1200 },
    { id: 'import-export', name: 'Import & Export', company: 'Pacific Trade Solutions', location: 'Vancouver, BC', revenue: '$120M', employees: 85 },
    { id: 'agriculture', name: 'Canadian Agriculture', company: 'Great Lakes Foods Corp', location: 'Mississauga, ON', revenue: '$180M', employees: 450 },
    { id: 'hospitality', name: 'Hospitality & Tourism', company: 'Alpine Resorts Group', location: 'Whistler, BC', revenue: '$95M', employees: 680 },
    { id: 'manufacturing', name: 'Heavy Manufacturing', company: 'Titan Industrial Works', location: 'Detroit, MI', revenue: '$280M', employees: 900 },
    { id: 'saas', name: 'Software Startup', company: 'CartFlow', location: 'Toronto, ON', revenue: '$22M', employees: 120 },
    { id: 'fintech', name: 'Fintech', company: 'PayBridge Financial', location: 'Toronto, ON', revenue: '$45M', employees: 200 },
];

export const scenarios = {
    semiconductors: {
        suppliers: [
            { id: 's1', name: 'TSMC', tier: 1, location: 'Hsinchu, Taiwan', health: 72, risk: 'high', leadTime: '18 weeks', spend: '$85M/yr', category: 'Foundry', concentration: 78, financialScore: 92 },
            { id: 's2', name: 'ASE Group', tier: 1, location: 'Kaohsiung, Taiwan', health: 81, risk: 'medium', leadTime: '12 weeks', spend: '$32M/yr', category: 'Packaging', concentration: 65, financialScore: 78 },
            { id: 's3', name: 'Sumitomo Chemical', tier: 2, location: 'Osaka, Japan', health: 88, risk: 'low', leadTime: '8 weeks', spend: '$14M/yr', category: 'Materials', concentration: 42, financialScore: 91 },
            { id: 's4', name: 'Entegris', tier: 2, location: 'Billerica, MA', health: 85, risk: 'low', leadTime: '6 weeks', spend: '$11M/yr', category: 'Chemicals', concentration: 38, financialScore: 87 },
            { id: 's5', name: 'Shin-Etsu Chemical', tier: 2, location: 'Tokyo, Japan', health: 90, risk: 'low', leadTime: '10 weeks', spend: '$18M/yr', category: 'Wafers', concentration: 55, financialScore: 94 },
            { id: 's6', name: 'Nanya Technology', tier: 1, location: 'New Taipei, Taiwan', health: 68, risk: 'high', leadTime: '16 weeks', spend: '$28M/yr', category: 'DRAM', concentration: 72, financialScore: 65 },
            { id: 's7', name: 'GlobalFoundries', tier: 1, location: 'Malta, NY', health: 82, risk: 'medium', leadTime: '14 weeks', spend: '$45M/yr', category: 'Foundry (Alt)', concentration: 22, financialScore: 76 },
            { id: 's8', name: 'Amkor Technology', tier: 1, location: 'Tempe, AZ', health: 79, risk: 'medium', leadTime: '10 weeks', spend: '$22M/yr', category: 'Assembly', concentration: 48, financialScore: 72 },
        ],
        disruptions: [
            { id: 'd1', type: 'Geopolitical', severity: 'critical', title: 'Taiwan Strait Military Exercises', revenueAtRisk: '$45.2M', timeToImpact: '72 hours', summary: 'PLA announced 5-day naval exercises near Taiwan, affecting commercial shipping lanes used by TSMC and ASE Group logistics. AIS data shows 34% vessel diversion from standard routes.', sources: ['MarineTraffic AIS', 'Reuters Geopolitical', 'Ministry of National Defense Taiwan'] },
            { id: 'd2', type: 'Supply', severity: 'high', title: 'Nanya DRAM Yield Issue', revenueAtRisk: '$8.4M', timeToImpact: '2 weeks', summary: 'Nanya Technology reports 15% yield degradation on 1z-nm DRAM node. Expected to affect Q3 allocation by 20%. Stock price dropped 8.3% on announcement.', sources: ['Nanya IR Filing', 'D&B Financial Alert', 'SEMI Market Intelligence'] },
            { id: 'd3', type: 'Logistics', severity: 'medium', title: 'Port of Kaohsiung Congestion', revenueAtRisk: '$3.1M', timeToImpact: '1 week', summary: 'Container vessel backlog at Kaohsiung port reaches 12 vessels. Average dwell time increased from 2.1 to 4.7 days. Affects ASE Group outbound shipments.', sources: ['MarineTraffic Port Data', 'project44 Visibility'] },
            { id: 'd4', type: 'Financial', severity: 'medium', title: 'JPY/USD Exchange Rate Volatility', revenueAtRisk: '$2.8M', timeToImpact: '30 days', summary: 'Yen weakened to 158/USD, affecting procurement costs from Sumitomo Chemical and Shin-Etsu Chemical. Hedging positions expire in 30 days.', sources: ['Bloomberg FX', 'Treasury Management System'] },
        ],
        agentConversation: [
            { role: 'user', text: 'What is our biggest supply chain risk right now?' },
            { role: 'agent', text: 'Your highest priority risk is the **Taiwan Strait Military Exercises** (Critical severity). Based on my analysis:\n\n**Revenue at Risk:** $45.2M across TSMC and ASE Group supply lines\n**Time to Impact:** 72 hours from exercise commencement\n**Confidence:** 87% based on 3 corroborating signals\n\n**Signal Analysis:**\n1. MarineTraffic AIS shows 34% vessel diversion from Taiwan Strait shipping lanes\n2. Reuters confirms PLA Navy exercise notification for 5-day window\n3. Historical pattern matching: Previous exercises in 2024 caused 8-12 day shipping delays\n\n**Immediate Recommendations:**\n- Expedite 2 in-transit TSMC wafer shipments via air freight ($180K cost)\n- Activate GlobalFoundries allocation buffer (14-week lead time)\n- Pre-position safety stock for 12 critical SKUs\n\nShall I generate a detailed mitigation strategy with cost-risk trade-off analysis?', sources: ['MarineTraffic AIS Feed', 'Reuters Intelligence', 'SEMI Historical Database', 'Internal ERP Data'] },
            { role: 'user', text: 'Yes, show me the mitigation strategies.' },
            { role: 'agent', text: 'I\'ve generated 3 mitigation strategies ranked by risk-adjusted ROI:\n\n**Strategy A: Expedite & Buffer (Recommended)**\n- Air freight 2 critical TSMC shipments: $180K\n- Activate GlobalFoundries 15% capacity buffer: $0 (pre-negotiated)\n- Increase safety stock for 12 SKUs by 3 weeks: $420K carrying cost\n- **Total Cost:** $600K | **Risk Reduction:** 73% | **ROI:** 74x\n\n**Strategy B: Full Diversification**\n- Shift 30% TSMC volume to GlobalFoundries: $2.1M qualification cost\n- Dual-source ASE Group with Amkor: $850K setup\n- **Total Cost:** $2.95M | **Risk Reduction:** 91% | **ROI:** 14x\n\n**Strategy C: Wait & Monitor**\n- Enhanced monitoring only, respond if exercises extend beyond 5 days\n- **Total Cost:** $0 | **Risk Reduction:** 0% | **Downside:** $45.2M exposure\n\nBased on Monte Carlo simulation (10,000 iterations), Strategy A has the best risk-adjusted outcome with 87% probability of avoiding production impact.', sources: ['Monte Carlo Simulation Engine', 'GlobalFoundries Contract Terms', 'Air Freight Rate Database', 'Inventory Carrying Cost Model'] },
        ],
        followUps: [
            'What alternative foundries could we qualify within 6 months?',
            'Show me the full financial impact breakdown by product line',
            'What did we learn from the last Taiwan exercise disruption?',
            'Draft an email to TSMC requesting expedited delivery confirmation',
            'How does this affect our Q3 delivery commitments to customers?',
        ],
    },

    'import-export': {
        suppliers: [
            { id: 's1', name: 'Shenzhen Electronics Hub', tier: 1, location: 'Shenzhen, China', health: 74, risk: 'high', leadTime: '6 weeks', spend: '$28M/yr', category: 'Electronics', concentration: 68, financialScore: 71 },
            { id: 's2', name: 'Yokohama Auto Parts', tier: 1, location: 'Yokohama, Japan', health: 86, risk: 'low', leadTime: '4 weeks', spend: '$18M/yr', category: 'Auto Parts', concentration: 32, financialScore: 88 },
            { id: 's3', name: 'Seoul Textile Co', tier: 1, location: 'Seoul, South Korea', health: 79, risk: 'medium', leadTime: '5 weeks', spend: '$12M/yr', category: 'Textiles', concentration: 45, financialScore: 77 },
            { id: 's4', name: 'Vancouver Customs Broker', tier: 1, location: 'Vancouver, BC', health: 92, risk: 'low', leadTime: '1 week', spend: '$1.2M/yr', category: 'Services', concentration: 88, financialScore: 95 },
            { id: 's5', name: 'Maersk Line', tier: 1, location: 'Copenhagen, Denmark', health: 84, risk: 'medium', leadTime: '3 weeks', spend: '$8M/yr', category: 'Shipping', concentration: 55, financialScore: 82 },
            { id: 's6', name: 'Ningbo Plastic Mfg', tier: 2, location: 'Ningbo, China', health: 66, risk: 'high', leadTime: '8 weeks', spend: '$6M/yr', category: 'Packaging', concentration: 72, financialScore: 58 },
        ],
        disruptions: [
            { id: 'd1', type: 'Trade Policy', severity: 'critical', title: '25% Tariff on Chinese Electronics', revenueAtRisk: '$7.0M', timeToImpact: '30 days', summary: 'USTR announces 25% tariff on HS Code 8542 (electronic integrated circuits) from China effective in 30 days. Affects $28M in annual procurement from Shenzhen Electronics Hub.', sources: ['USTR Federal Register', 'CBSA Tariff Database', 'Bloomberg Trade'] },
            { id: 'd2', type: 'Logistics', severity: 'high', title: 'Port of Vancouver Labor Action', revenueAtRisk: '$4.2M', timeToImpact: '48 hours', summary: 'ILWU Local 502 votes to begin work-to-rule action. Expected to reduce port throughput by 40%. 6 containers with $4.2M in goods currently at port.', sources: ['ILWU Press Release', 'Port of Vancouver Operations', 'project44'] },
            { id: 'd3', type: 'Financial', severity: 'medium', title: 'CNY/CAD Exchange Spike', revenueAtRisk: '$1.8M', timeToImpact: '60 days', summary: 'Canadian dollar weakened 6% against Chinese yuan in 30 days. Forward contracts expire in 60 days covering only 40% of China-origin procurement.', sources: ['Bloomberg FX', 'Treasury Report'] },
        ],
        agentConversation: [
            { role: 'user', text: 'What is the impact of the new tariff on our operations?' },
            { role: 'agent', text: 'The **25% tariff on Chinese electronics** will significantly impact your cost structure:\n\n**Direct Impact:**\n- Affected procurement: $28M annually from Shenzhen Electronics Hub\n- Tariff cost increase: $7.0M (25% on dutiable value)\n- Per-unit COGS increase: 18-22% depending on product line\n\n**Cascading Effects:**\n- Customer contract margins erode from 24% to 6.2% on affected products\n- 3 customer contracts have fixed-price terms expiring Q4 2026\n- Competitive disadvantage vs. Vietnam-sourcing competitors\n\n**Mitigation Options I\'ve Identified:**\n1. **FTA Reclassification:** 4 product categories may qualify for CPTPP preferential rates if sourced from Vietnam. Estimated savings: $3.2M\n2. **Tariff Engineering:** Modify 2 products to shift HS classification from 8542 to 8534 (lower rate). Requires engineering review.\n3. **Supplier Diversification:** Qualify Vietnamese alternative for 60% of volume within 6 months. Quote requested from 3 suppliers.\n\nWould you like me to generate a detailed transition plan?', sources: ['USTR Federal Register Notice', 'CBSA Tariff Schedule', 'CPTPP Agreement Text', 'HS Classification Database'] },
        ],
        followUps: [
            'Which products can be reclassified under CPTPP?',
            'What are the lead times for Vietnamese supplier qualification?',
            'Show me FX hedging recommendations for the next quarter',
            'Draft a notification to affected customers about potential price adjustments',
        ],
    },

    agriculture: {
        suppliers: [
            { id: 's1', name: 'California Sun Tomatoes', tier: 1, location: 'Fresno, CA', health: 71, risk: 'high', leadTime: '4 weeks', spend: '$24M/yr', category: 'Tomato Paste', concentration: 42, financialScore: 68 },
            { id: 's2', name: 'Mutti S.p.A.', tier: 1, location: 'Parma, Italy', health: 87, risk: 'low', leadTime: '8 weeks', spend: '$18M/yr', category: 'Tomato Paste', concentration: 32, financialScore: 92 },
            { id: 's3', name: 'Saskatchewan Mustard Co', tier: 1, location: 'Saskatoon, SK', health: 82, risk: 'medium', leadTime: '3 weeks', spend: '$8M/yr', category: 'Mustard Seed', concentration: 65, financialScore: 76 },
            { id: 's4', name: 'Rajasthan Spice Traders', tier: 2, location: 'Jaipur, India', health: 64, risk: 'high', leadTime: '10 weeks', spend: '$4M/yr', category: 'Mustard Seed (Alt)', concentration: 35, financialScore: 55 },
            { id: 's5', name: 'Ontario Vinegar Works', tier: 1, location: 'Hamilton, ON', health: 93, risk: 'low', leadTime: '1 week', spend: '$6M/yr', category: 'Vinegar', concentration: 88, financialScore: 90 },
            { id: 's6', name: 'McCormick Canada', tier: 1, location: 'London, ON', health: 91, risk: 'low', leadTime: '2 weeks', spend: '$5M/yr', category: 'Spice Blends', concentration: 45, financialScore: 94 },
            { id: 's7', name: 'Xinjiang Tomato Processing', tier: 2, location: 'Urumqi, China', health: 58, risk: 'critical', leadTime: '12 weeks', spend: '$8M/yr', category: 'Tomato Paste (Budget)', concentration: 14, financialScore: 48 },
            { id: 's8', name: 'Great Plains Packaging', tier: 1, location: 'Winnipeg, MB', health: 85, risk: 'low', leadTime: '2 weeks', spend: '$7M/yr', category: 'Glass & Plastic Bottles', concentration: 55, financialScore: 80 },
            { id: 's9', name: 'Sugar Maple Sweeteners', tier: 2, location: 'Montreal, QC', health: 78, risk: 'medium', leadTime: '2 weeks', spend: '$3M/yr', category: 'Sweeteners', concentration: 70, financialScore: 73 },
        ],
        disruptions: [
            { id: 'd1', type: 'Weather', severity: 'critical', title: 'California Drought Alert: Tomato Crop at Risk', revenueAtRisk: '$12.4M', timeToImpact: '6 weeks', summary: 'USDA Drought Monitor classifies San Joaquin Valley as D3 (Extreme Drought). California Sun Tomatoes reports expected 30% yield reduction for processing tomato harvest. 42% of annual tomato paste supply affected.', sources: ['USDA Drought Monitor', 'California Dept. of Food & Agriculture', 'Supplier Direct Report'] },
            { id: 'd2', type: 'Regulatory', severity: 'high', title: 'CFIA Import Alert on Chinese Tomato Products', revenueAtRisk: '$3.2M', timeToImpact: '2 weeks', summary: 'Canadian Food Inspection Agency issues import alert on tomato products from Xinjiang region citing forced labor concerns under Modern Slavery Act compliance. Affects $8M annual procurement from Xinjiang Tomato Processing.', sources: ['CFIA Import Alert IA-2026-018', 'Global Affairs Canada', 'Supply Chain Due Diligence Database'] },
            { id: 'd3', type: 'Supply', severity: 'medium', title: 'Saskatchewan Mustard Seed Shortage', revenueAtRisk: '$2.1M', timeToImpact: '4 weeks', summary: 'Grasshopper infestation in southern Saskatchewan reduces projected yellow mustard seed harvest by 22%. Saskatchewan Mustard Co warns of allocation limits starting next month.', sources: ['Saskatchewan Agriculture Crop Report', 'Supplier Allocation Notice', 'Weather Pattern Analysis'] },
            { id: 'd4', type: 'Logistics', severity: 'low', title: 'CN Rail Maintenance: Ontario Corridor', revenueAtRisk: '$0.8M', timeToImpact: '2 weeks', summary: 'CN Rail announces 10-day maintenance closure on Hamilton-Mississauga corridor. Affects inbound shipments from Ontario Vinegar Works and McCormick Canada. Truck alternative available at 15% premium.', sources: ['CN Rail Service Advisory', 'project44 Logistics'] },
        ],
        agentConversation: [
            { role: 'user', text: 'The California drought is threatening our tomato paste supply. What should we do?' },
            { role: 'agent', text: 'This is a critical situation. Here\'s my assessment of the **California drought impact** on your ketchup and sauce production:\n\n**Current Exposure:**\n- California Sun Tomatoes supplies 42% of your annual tomato paste ($24M)\n- Expected yield reduction: 30%, translating to 12.6% shortfall in total tomato paste supply\n- Revenue at risk: $12.4M from production line downtime if paste runs out\n\n**Compounding Factor:** The CFIA import alert on Xinjiang tomato products removes your budget alternative supplier simultaneously, eliminating 14% of backup supply.\n\n**Recommended Actions (in priority order):**\n\n1. **Increase Mutti S.p.A. orders immediately** -- they have 15% surge capacity available. Lead time: 8 weeks. Cost premium: 8% over California pricing. I\'ve already drafted a purchase order.\n\n2. **Secure forward contracts** with California Sun for confirmed allocation at current pricing. Their competitors will be facing the same yield issues.\n\n3. **Qualify Portuguese alternative** -- I\'ve identified Sugal Group (Almeirim, Portugal) as a potential Tier 1 replacement. 36 Brix specification match, EU food safety certified.\n\n4. **Adjust production schedule** -- Prioritize ketchup (highest margin) over economy sauce lines if paste becomes constrained.\n\n**Financial Impact of Recommended Strategy:**\n- Cost increase: $1.9M annually (8% premium on shifted volume)\n- Risk reduction: 67%\n- ROI: 5.5x against $12.4M downside', sources: ['USDA Drought Monitor', 'Mutti S.p.A. Capacity Database', 'Sugal Group Profile', 'Internal Production Planning System', 'Ingredient Cost Model'] },
        ],
        followUps: [
            'Show me the full tomato paste supply chain map including sub-tier suppliers',
            'What is the CFIA compliance timeline for qualifying a new European supplier?',
            'Can we reformulate any products to reduce tomato paste dependency?',
            'Draft a memo to the production team about the schedule adjustment',
            'What crop forecasts are available for Italian and Portuguese tomato harvests?',
        ],
    },

    hospitality: {
        suppliers: [
            { id: 's1', name: 'Sysco Foodservice', tier: 1, location: 'Houston, TX', health: 88, risk: 'low', leadTime: '3 days', spend: '$12M/yr', category: 'Food & Beverage', concentration: 72, financialScore: 92 },
            { id: 's2', name: 'BC Linen Services', tier: 1, location: 'Burnaby, BC', health: 76, risk: 'medium', leadTime: '1 week', spend: '$3.2M/yr', category: 'Linens', concentration: 85, financialScore: 70 },
            { id: 's3', name: 'Whistler Wine Distributors', tier: 1, location: 'Whistler, BC', health: 81, risk: 'medium', leadTime: '2 days', spend: '$4.5M/yr', category: 'Beverages', concentration: 60, financialScore: 78 },
            { id: 's4', name: 'Pacific Seafood Group', tier: 1, location: 'Portland, OR', health: 69, risk: 'high', leadTime: '2 days', spend: '$5.8M/yr', category: 'Seafood', concentration: 55, financialScore: 64 },
            { id: 's5', name: 'Mountain Equipment Co', tier: 1, location: 'Vancouver, BC', health: 90, risk: 'low', leadTime: '1 week', spend: '$2.1M/yr', category: 'Recreation Equipment', concentration: 40, financialScore: 88 },
            { id: 's6', name: 'BC Hydro Commercial', tier: 1, location: 'Vancouver, BC', health: 95, risk: 'low', leadTime: 'N/A', spend: '$1.8M/yr', category: 'Utilities', concentration: 100, financialScore: 98 },
        ],
        disruptions: [
            { id: 'd1', type: 'Weather', severity: 'high', title: 'Atmospheric River Warning: BC South Coast', revenueAtRisk: '$3.5M', timeToImpact: '48 hours', summary: 'Environment Canada issues extreme weather alert. Sea-to-Sky Highway (Hwy 99) at risk of closure. Could cut off Whistler from Vancouver supply corridor for 3-5 days.', sources: ['Environment Canada', 'BC Ministry of Transportation', 'Highway Webcams'] },
            { id: 'd2', type: 'Labor', severity: 'high', title: 'Seasonal Staff Shortage: Peak Season', revenueAtRisk: '$2.8M', timeToImpact: '2 weeks', summary: 'Seasonal hiring at 62% of target for peak ski season. Federal TFW program processing delays average 14 weeks. Room service and F&B operations at risk.', sources: ['Internal HR System', 'IRCC Processing Times', 'Tourism Industry Association BC'] },
            { id: 'd3', type: 'Supply', severity: 'medium', title: 'Pacific Seafood Recall Notice', revenueAtRisk: '$1.4M', timeToImpact: '24 hours', summary: 'Pacific Seafood Group issues voluntary recall on oyster and mussel products due to Vibrio concerns. Affects 3 restaurant menus and 2 banquet contracts.', sources: ['CFIA Recall Notice', 'Supplier Direct Alert', 'Menu Engineering System'] },
        ],
        agentConversation: [
            { role: 'user', text: 'The atmospheric river could close the highway. What is our contingency?' },
            { role: 'agent', text: 'I\'ve assessed the **atmospheric river impact** on Alpine Resorts Group operations:\n\n**Critical Vulnerability:** The Sea-to-Sky Highway (Hwy 99) is your single logistics corridor to Vancouver. A closure would cut off:\n- Daily food deliveries from Sysco ($32K/day)\n- Linen service from BC Linen Services (3x/week rotation)\n- Emergency procurement from any Vancouver-based supplier\n\n**On-site Inventory Assessment:**\n- Dry goods: 8 days supply\n- Fresh produce: 2 days supply\n- Frozen proteins: 5 days supply\n- Linens: 4 days of clean inventory\n- Beverages: 6 days supply\n\n**Recommended Immediate Actions:**\n1. **Emergency procurement run today:** Order 5-day surge inventory from Sysco via Vancouver distribution. Estimated cost: $160K (includes $28K in cold storage premium).\n2. **Activate local supply network:** I\'ve identified 3 Whistler-based producers (Pemberton farm produce, Whistler brewery, local bakery) for emergency protein and grain procurement.\n3. **Menu simplification plan:** Pre-approve a reduced menu using shelf-stable ingredients, reducing food dependency by 40%.\n4. **Guest communication:** Draft weather advisory for in-house guests with activity alternatives.\n\nApprove the emergency procurement run?', sources: ['Environment Canada Forecast Models', 'Sysco Order Management API', 'Internal Inventory System', 'Local Supplier Database'] },
        ],
        followUps: [
            'What local suppliers in Whistler can we use as emergency backup?',
            'Show me historical Sea-to-Sky Highway closure patterns',
            'Draft the guest weather advisory communication',
            'How do we optimize the reduced menu for food cost?',
        ],
    },

    manufacturing: {
        suppliers: [
            { id: 's1', name: 'US Steel Corp', tier: 1, location: 'Pittsburgh, PA', health: 77, risk: 'medium', leadTime: '8 weeks', spend: '$62M/yr', category: 'Hot-Rolled Steel', concentration: 45, financialScore: 74 },
            { id: 's2', name: 'Alcoa Corporation', tier: 1, location: 'Pittsburgh, PA', health: 82, risk: 'medium', leadTime: '6 weeks', spend: '$38M/yr', category: 'Aluminum', concentration: 52, financialScore: 80 },
            { id: 's3', name: 'Nucor Corporation', tier: 1, location: 'Charlotte, NC', health: 89, risk: 'low', leadTime: '6 weeks', spend: '$28M/yr', category: 'Structural Steel', concentration: 25, financialScore: 91 },
            { id: 's4', name: 'Parker Hannifin', tier: 1, location: 'Cleveland, OH', health: 91, risk: 'low', leadTime: '4 weeks', spend: '$15M/yr', category: 'Hydraulics', concentration: 60, financialScore: 93 },
            { id: 's5', name: 'Timken Company', tier: 1, location: 'Canton, OH', health: 85, risk: 'low', leadTime: '5 weeks', spend: '$9M/yr', category: 'Bearings', concentration: 48, financialScore: 86 },
            { id: 's6', name: 'Grainger', tier: 1, location: 'Lake Forest, IL', health: 94, risk: 'low', leadTime: '3 days', spend: '$4M/yr', category: 'MRO Supplies', concentration: 30, financialScore: 96 },
            { id: 's7', name: 'ArcelorMittal USA', tier: 1, location: 'Chicago, IL', health: 73, risk: 'high', leadTime: '10 weeks', spend: '$22M/yr', category: 'Specialty Steel', concentration: 38, financialScore: 69 },
            { id: 's8', name: 'Thyssenkrupp Materials', tier: 2, location: 'Dusseldorf, Germany', health: 80, risk: 'medium', leadTime: '12 weeks', spend: '$16M/yr', category: 'Alloy Steel', concentration: 55, financialScore: 77 },
        ],
        disruptions: [
            { id: 'd1', type: 'Trade Policy', severity: 'critical', title: 'Section 232 Steel Tariff Increase to 50%', revenueAtRisk: '$18.5M', timeToImpact: '60 days', summary: 'Commerce Department announces Section 232 tariff increase on imported steel from 25% to 50%, effective in 60 days. Directly affects $16M in annual procurement from Thyssenkrupp, and indirectly raises domestic pricing.', sources: ['Federal Register', 'Commerce Dept. Press Release', 'American Iron and Steel Institute'] },
            { id: 'd2', type: 'Supply', severity: 'high', title: 'US Steel Blast Furnace Shutdown', revenueAtRisk: '$8.2M', timeToImpact: '3 weeks', summary: 'US Steel announces emergency maintenance shutdown of No. 4 blast furnace at Granite City Works. Expected 6-week repair timeline. Hot-rolled coil allocation reduced by 30%.', sources: ['US Steel Operations Advisory', 'LME Steel Futures', 'ArcelorMittal Spot Pricing'] },
            { id: 'd3', type: 'Financial', severity: 'medium', title: 'Aluminum Price Surge', revenueAtRisk: '$4.1M', timeToImpact: '90 days', summary: 'LME aluminum 3-month futures hit $2,850/mt, up 18% in 60 days. Driven by Chinese smelter curtailments and Indonesian export ban rumors. Affects $38M Alcoa procurement.', sources: ['LME Market Data', 'Bloomberg Commodities', 'Alcoa Quarterly Report'] },
        ],
        agentConversation: [
            { role: 'user', text: 'How will the tariff increase and US Steel shutdown affect us simultaneously?' },
            { role: 'agent', text: 'This is a compound disruption scenario. Let me model the combined impact:\n\n**Combined Exposure Assessment:**\n\nThe tariff increase and blast furnace shutdown are creating a steel supply squeeze:\n\n1. **Tariff Impact (60 days):** $16M in Thyssenkrupp imports face 50% tariff (up from 25%), adding $4M annual cost\n2. **US Steel Shutdown (3 weeks):** 30% allocation cut on $62M contract, creating $18.6M in exposed procurement\n3. **Secondary Effect:** Both events will drive domestic pricing up 12-18% as demand shifts to remaining capacity\n\n**Combined Revenue at Risk:** $26.7M over next 90 days\n**Margin Impact:** COGS increase of 8.3%, eroding operating margin from 14.2% to 5.9%\n\n**Recommended Compound Strategy:**\n\n- **Immediate:** Lock in 90-day forward contracts with Nucor at current pricing (+$2.1M in prepayment carrying cost but saves $5.4M vs. spot pricing in 60 days)\n- **30-day:** Shift 40% of Thyssenkrupp volume to domestic sources pre-tariff effective date. Negotiate with ArcelorMittal for specialty steel allocation.\n- **60-day:** Evaluate product redesign for 3 assemblies to substitute structural for hot-rolled where engineering spec allows.\n\n**Net Savings of Strategy vs. Inaction:** $12.8M over 6 months', sources: ['LME Steel Index', 'Federal Register', 'US Steel Advisory', 'Nucor Sales Portal', 'Internal BOM Database'] },
        ],
        followUps: [
            'Run a Monte Carlo simulation on steel price scenarios for the next 6 months',
            'Which assemblies can be redesigned to use alternative steel grades?',
            'Show me the BOM explosion for our top 10 products by steel content',
            'What is our total tariff exposure across all imported materials?',
        ],
    },

    saas: {
        suppliers: [
            { id: 's1', name: 'Amazon Web Services', tier: 1, location: 'Seattle, WA', health: 95, risk: 'low', leadTime: 'N/A', spend: '$2.8M/yr', category: 'Cloud Infrastructure', concentration: 92, financialScore: 99 },
            { id: 's2', name: 'Stripe', tier: 1, location: 'San Francisco, CA', health: 90, risk: 'low', leadTime: 'N/A', spend: '$1.2M/yr', category: 'Payments', concentration: 95, financialScore: 88 },
            { id: 's3', name: 'Twilio', tier: 1, location: 'San Francisco, CA', health: 78, risk: 'medium', leadTime: 'N/A', spend: '$340K/yr', category: 'Communications', concentration: 80, financialScore: 65 },
            { id: 's4', name: 'Algolia', tier: 1, location: 'San Francisco, CA', health: 74, risk: 'medium', leadTime: 'N/A', spend: '$180K/yr', category: 'Search', concentration: 100, financialScore: 62 },
            { id: 's5', name: 'Datadog', tier: 1, location: 'New York, NY', health: 87, risk: 'low', leadTime: 'N/A', spend: '$220K/yr', category: 'Observability', concentration: 70, financialScore: 81 },
            { id: 's6', name: 'Canada Post / ShipStation', tier: 1, location: 'Ottawa, ON', health: 72, risk: 'medium', leadTime: '1 day', spend: '$850K/yr', category: 'Shipping Labels', concentration: 55, financialScore: 70 },
        ],
        disruptions: [
            { id: 'd1', type: 'Infrastructure', severity: 'critical', title: 'AWS us-east-1 Degradation', revenueAtRisk: '$840K', timeToImpact: 'Immediate', summary: 'AWS reports elevated error rates in us-east-1 affecting DynamoDB and Lambda. CartFlow primary infrastructure runs in this region. 15,000 active merchants affected.', sources: ['AWS Health Dashboard', 'Datadog Alerts', 'Internal Status Page'] },
            { id: 'd2', type: 'Financial', severity: 'high', title: 'Algolia Acquisition: Vendor Lock-in Risk', revenueAtRisk: '$2.1M', timeToImpact: '6 months', summary: 'Algolia announces acquisition by Salesforce. Pricing expected to increase 40-60% upon contract renewal. CartFlow search infrastructure relies 100% on Algolia with no abstraction layer.', sources: ['TechCrunch', 'Algolia Account Manager', 'Contract Terms Database'] },
            { id: 'd3', type: 'Regulatory', severity: 'medium', title: 'Canadian Digital Services Tax', revenueAtRisk: '$1.3M', timeToImpact: '90 days', summary: 'Canada implements 3% Digital Services Tax on international SaaS tools used by Canadian businesses. Affects pricing competitiveness for Canadian merchant segment.', sources: ['Canada Revenue Agency', 'Finance Canada Budget Notice'] },
        ],
        agentConversation: [
            { role: 'user', text: 'Our entire search is on Algolia and they just got acquired. What is our migration risk?' },
            { role: 'agent', text: 'This is a significant vendor concentration risk. Here\'s my assessment:\n\n**Current State:**\n- Algolia provides 100% of CartFlow\'s merchant product search functionality\n- 15,000 merchants, 2.3M product queries per day\n- **No abstraction layer** between your application code and Algolia\'s API\n- Contract renewal: 8 months away\n\n**Risk Assessment:**\n- Post-acquisition price increase probability: 85% (based on historical SaaS acquisition patterns)\n- Expected increase: 40-60%, adding $72K-$108K to annual cost\n- Migration effort if needed: 3-4 months engineering, $180K fully loaded cost\n- **Vendor lock-in score: 9.2/10 (Critical)**\n\n**Recommended Strategy:**\n\n1. **Immediate (This Sprint):** Build a search abstraction layer between CartFlow and Algolia. This makes future migration possible regardless of vendor choice. Estimated effort: 2 weeks, 1 engineer.\n\n2. **30 Days:** Evaluate alternatives: Elasticsearch (self-hosted), Meilisearch (open-source), Typesense. I\'ve prepared a comparison matrix.\n\n3. **60 Days:** Run parallel search infrastructure with top alternative candidate on 5% of queries for quality comparison.\n\n4. **Pre-Renewal:** Negotiate from position of strength with proven alternative in hand.\n\n**Cost of Abstraction Layer Now:** $28K (2 weeks engineering)\n**Cost of Emergency Migration Later:** $180K + 3 months of degraded search quality', sources: ['TechCrunch Acquisition Analysis', 'Historical SaaS Acquisition Pricing Data', 'Internal Code Repository Analysis', 'Search Provider Comparison Database'] },
        ],
        followUps: [
            'Show me the comparison matrix for Elasticsearch vs Meilisearch vs Typesense',
            'What other vendors have single-source concentration risk above 90%?',
            'How quickly can we implement multi-region AWS failover?',
            'Draft a vendor diversification proposal for the board',
        ],
    },

    fintech: {
        suppliers: [
            { id: 's1', name: 'Visa Inc', tier: 1, location: 'San Francisco, CA', health: 96, risk: 'low', leadTime: 'N/A', spend: '$3.2M/yr', category: 'Card Network', concentration: 50, financialScore: 99 },
            { id: 's2', name: 'Mastercard', tier: 1, location: 'Purchase, NY', health: 95, risk: 'low', leadTime: 'N/A', spend: '$2.8M/yr', category: 'Card Network', concentration: 48, financialScore: 98 },
            { id: 's3', name: 'Peoples Trust Company', tier: 1, location: 'Vancouver, BC', health: 78, risk: 'medium', leadTime: 'N/A', spend: '$1.5M/yr', category: 'Issuing Bank', concentration: 85, financialScore: 72 },
            { id: 's4', name: 'Interac Corp', tier: 1, location: 'Toronto, ON', health: 92, risk: 'low', leadTime: 'N/A', spend: '$980K/yr', category: 'Debit Network', concentration: 100, financialScore: 90 },
            { id: 's5', name: 'Fiserv', tier: 1, location: 'Milwaukee, WI', health: 84, risk: 'low', leadTime: 'N/A', spend: '$1.8M/yr', category: 'Core Processing', concentration: 75, financialScore: 88 },
            { id: 's6', name: 'Plaid', tier: 1, location: 'San Francisco, CA', health: 79, risk: 'medium', leadTime: 'N/A', spend: '$420K/yr', category: 'Open Banking', concentration: 90, financialScore: 71 },
            { id: 's7', name: 'Jumio', tier: 2, location: 'Palo Alto, CA', health: 73, risk: 'medium', leadTime: 'N/A', spend: '$280K/yr', category: 'KYC/AML', concentration: 100, financialScore: 66 },
        ],
        disruptions: [
            { id: 'd1', type: 'Regulatory', severity: 'critical', title: 'OSFI Enhanced Third-Party Risk Management Guidelines', revenueAtRisk: '$8.5M', timeToImpact: '90 days', summary: 'OSFI issues B-10 Guideline update requiring enhanced due diligence on all material technology vendors. PayBridge must complete comprehensive risk assessments for 14 critical vendors within 90 days or face regulatory action.', sources: ['OSFI B-10 Guideline', 'Compliance Team Assessment', 'Legal Notice'] },
            { id: 'd2', type: 'Financial', severity: 'high', title: 'Peoples Trust Capital Adequacy Warning', revenueAtRisk: '$5.2M', timeToImpact: '30 days', summary: 'Peoples Trust Company, PayBridge\'s issuing bank partner, receives OSFI Stage 1 intervention for capital adequacy concerns. Risk of card program suspension if not resolved.', sources: ['OSFI Financial Institutions Report', 'Peoples Trust Annual Report', 'Banking Industry Sources'] },
            { id: 'd3', type: 'Security', severity: 'high', title: 'Plaid Data Breach Notification', revenueAtRisk: '$3.8M', timeToImpact: '24 hours', summary: 'Plaid notifies partners of unauthorized access to open banking connection metadata. While transaction data was not compromised, the incident requires immediate privacy impact assessment and potential PIPEDA notification.', sources: ['Plaid Security Incident Notice', 'PIPEDA Breach Requirements', 'Internal Security Team'] },
        ],
        agentConversation: [
            { role: 'user', text: 'We have 90 days to comply with OSFI B-10 for 14 vendors. How do we manage this?' },
            { role: 'agent', text: 'I\'ve analyzed the **OSFI B-10 compliance requirement** and created a structured approach:\n\n**Scope Assessment:**\n- Material vendors requiring full B-10 assessment: 14\n- Critical path vendors (service disruption = business impact): 7\n- Vendors with existing SOC 2 reports (partial coverage): 9\n- Vendors requiring new assessments from scratch: 5\n\n**Prioritized Vendor Assessment Schedule:**\n\n**Month 1 (Days 1-30): Critical Path Vendors**\n1. Fiserv (Core Processing) -- SOC 2 available, needs OSFI-specific addendum\n2. Peoples Trust (Issuing Bank) -- Risk elevated due to capital adequacy concerns\n3. Visa/Mastercard (Card Networks) -- Standardized assessment templates available\n4. Interac (Debit Network) -- Canadian regulated entity, streamlined process\n\n**Month 2 (Days 31-60): Technology Vendors**\n5. Plaid (Open Banking) -- Needs fresh assessment given recent security incident\n6. Jumio (KYC/AML) -- No existing SOC 2, will require comprehensive review\n7-10. Four additional technology vendors\n\n**Month 3 (Days 61-90): Remaining + Documentation**\n11-14. Non-critical vendors\n- Complete OSFI reporting package\n- Board risk committee presentation\n\n**Resources Required:**\n- Compliance team: 2.5 FTE for 90 days\n- External auditor support: $85K budget\n- Legal review: $35K budget\n\n**I\'ve pre-drafted assessment questionnaires** for each vendor category. Shall I send the initial requests to vendors this week?', sources: ['OSFI B-10 Guideline Text', 'Vendor Contract Database', 'SOC 2 Report Repository', 'Compliance Resource Planning'] },
        ],
        followUps: [
            'Show me the contingency plan if Peoples Trust loses its charter',
            'What alternative issuing banks could we partner with in Canada?',
            'Draft the PIPEDA breach notification for the Plaid incident',
            'How does this affect our upcoming FINTRAC audit?',
        ],
    },
};
