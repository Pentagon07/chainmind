import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { chatLLM } from '../../services/api';

const industries = [
    { id: 'semiconductors', label: 'Semiconductors / Electronics' },
    { id: 'import-export', label: 'Import / Export Trade' },
    { id: 'agriculture', label: 'Food & Agriculture' },
    { id: 'hospitality', label: 'Hospitality & Tourism' },
    { id: 'manufacturing', label: 'Heavy Manufacturing' },
    { id: 'saas', label: 'Software / SaaS' },
    { id: 'fintech', label: 'Financial Services / Fintech' },
];

const erpSystems = ['SAP S/4HANA', 'Oracle Cloud ERP', 'NetSuite', 'Microsoft Dynamics 365', 'Sage Intacct', 'Odoo', 'Manual / Spreadsheets', 'Custom / In-House'];
const regions = ['North America', 'Europe', 'East Asia', 'Southeast Asia', 'South Asia', 'Middle East', 'Africa', 'South America', 'Oceania'];

const stepTitles = ['Company Profile', 'Supply Chain Profile', 'Risk & Compliance', 'ERP & Systems', 'Initial Suppliers'];

function ProgressBar({ step, total }) {
    return (
        <div style={{ display: 'flex', gap: 2, marginBottom: 40 }}>
            {Array.from({ length: total }, (_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? 'var(--accent-primary)' : 'var(--border-primary)', transition: 'background 0.3s' }} />
            ))}
        </div>
    );
}

export default function Onboarding() {
    const navigate = useNavigate();
    const { createAccount } = useAuth();
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({
        companyName: '', industry: '', revenue: '', employees: '', location: '', website: '',
        supplierCount: '', primaryRegions: [], avgLeadTime: '', inventoryPolicy: '',
        riskTolerance: 50, slaRequirements: '', bufferPolicy: '', complianceFrameworks: [],
        erpSystem: '', erpConnected: false, apiKey: '',
        suppliers: [{ name: '', category: '', location: '', spend: '', tier: '1' }],
    });

    const update = (key, val) => setProfile(p => ({ ...p, [key]: val }));
    const toggleArr = (key, val) => {
        setProfile(p => ({ ...p, [key]: p[key].includes(val) ? p[key].filter(v => v !== val) : [...p[key], val] }));
    };

    const classifyIndustry = () => {
        if (profile.industry) return profile.industry;
        const name = profile.companyName.toLowerCase();
        if (name.includes('tech') || name.includes('chip') || name.includes('semi')) return 'semiconductors';
        if (name.includes('trade') || name.includes('import') || name.includes('export')) return 'import-export';
        if (name.includes('food') || name.includes('farm') || name.includes('agri')) return 'agriculture';
        if (name.includes('hotel') || name.includes('resort') || name.includes('tourism')) return 'hospitality';
        if (name.includes('steel') || name.includes('industrial') || name.includes('mfg')) return 'manufacturing';
        if (name.includes('software') || name.includes('saas') || name.includes('app')) return 'saas';
        if (name.includes('bank') || name.includes('pay') || name.includes('fin')) return 'fintech';
        return 'manufacturing';
    };

    const handleComplete = async () => {
        const scenarioId = classifyIndustry();
        // Use LLM to personalize the onboarding if API key is available
        let personalizedTitle = 'Account Admin';
        try {
            const result = await chatLLM(
                [{ role: 'user', content: `Based on this company profile, suggest a one-line personalized welcome message (just the message, no quotes): Company: ${profile.companyName}, Industry: ${profile.industry}, Revenue: ${profile.revenue}, Suppliers: ${profile.supplierCount}, Risk Tolerance: ${profile.riskTolerance}%` }],
                'You are a supply chain platform onboarding assistant. Be concise.'
            );
            if (result.text) personalizedTitle = result.text.slice(0, 60);
        } catch (e) { /* LLM optional */ }
        createAccount({
            companyName: profile.companyName || 'My Company',
            scenarioId,
            name: 'Admin',
            title: 'Account Admin',
        });
        navigate('/app/dashboard');
    };

    const canNext = () => {
        if (step === 0) return profile.companyName && profile.industry;
        if (step === 1) return profile.supplierCount && profile.primaryRegions.length > 0;
        return true;
    };

    const inputStyle = {
        width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)',
        color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
        transition: 'border-color 0.15s', fontFamily: 'var(--font-sans)',
    };

    const labelStyle = {
        fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase',
        letterSpacing: '0.08em', display: 'block', marginBottom: 6,
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '80px 48px',
            background: 'radial-gradient(ellipse 50% 30% at 50% 30%, rgba(0,212,255,0.04), transparent 70%)',
        }}>
            <div style={{
                width: 640, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                borderRadius: 8, padding: '48px 40px', boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
                animation: 'fadeIn 0.4s var(--ease-out)',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 4,
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.875rem', fontWeight: 800, color: 'var(--bg-primary)',
                    }}>C</div>
                    <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>ChainMind</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>Step {step + 1} of {stepTitles.length}</span>
                </div>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, letterSpacing: '-0.02em' }}>{stepTitles[step]}</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 8 }}>
                    {step === 0 && 'Tell us about your company so we can tailor your supply chain intelligence.'}
                    {step === 1 && 'Help us understand your supply chain structure and sourcing patterns.'}
                    {step === 2 && 'Define your risk appetite and compliance requirements.'}
                    {step === 3 && 'Connect your ERP system for real-time signal monitoring.'}
                    {step === 4 && 'Add your key suppliers to begin monitoring.'}
                </p>
                <ProgressBar step={step} total={stepTitles.length} />

                {/* Step 0: Company Profile */}
                {step === 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeIn 0.3s var(--ease-out)' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={labelStyle}>Company Name</label>
                            <input value={profile.companyName} onChange={e => update('companyName', e.target.value)} placeholder="Your company name" style={inputStyle} />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={labelStyle}>Industry</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                                {industries.map(ind => (
                                    <button key={ind.id} onClick={() => update('industry', ind.id)} style={{
                                        padding: '10px 14px', textAlign: 'left', borderRadius: 4,
                                        background: profile.industry === ind.id ? 'rgba(0,212,255,0.08)' : 'transparent',
                                        border: `1px solid ${profile.industry === ind.id ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                        color: profile.industry === ind.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        fontSize: '0.8125rem', cursor: 'pointer', transition: 'all 0.15s',
                                    }}>{ind.label}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Annual Revenue</label>
                            <select value={profile.revenue} onChange={e => update('revenue', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select range</option>
                                <option value="<10M">Under $10M</option><option value="10-50M">$10M - $50M</option>
                                <option value="50-200M">$50M - $200M</option><option value="200-500M">$200M - $500M</option>
                                <option value="500M+">$500M+</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Employees</label>
                            <select value={profile.employees} onChange={e => update('employees', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select range</option>
                                <option value="1-50">1-50</option><option value="51-200">51-200</option>
                                <option value="201-1000">201-1000</option><option value="1000+">1000+</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Headquarters</label>
                            <input value={profile.location} onChange={e => update('location', e.target.value)} placeholder="City, Country" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Website</label>
                            <input value={profile.website} onChange={e => update('website', e.target.value)} placeholder="https://..." style={inputStyle} />
                        </div>
                    </div>
                )}

                {/* Step 1: Supply Chain Profile */}
                {step === 1 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeIn 0.3s var(--ease-out)' }}>
                        <div>
                            <label style={labelStyle}>Number of Active Suppliers</label>
                            <select value={profile.supplierCount} onChange={e => update('supplierCount', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select</option>
                                <option value="1-10">1-10</option><option value="11-50">11-50</option>
                                <option value="51-200">51-200</option><option value="200+">200+</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Average Lead Time</label>
                            <select value={profile.avgLeadTime} onChange={e => update('avgLeadTime', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select</option>
                                <option value="days">Days</option><option value="1-4weeks">1-4 Weeks</option>
                                <option value="1-3months">1-3 Months</option><option value="3months+">3+ Months</option>
                            </select>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={labelStyle}>Primary Sourcing Regions</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {regions.map(r => (
                                    <button key={r} onClick={() => toggleArr('primaryRegions', r)} style={{
                                        padding: '6px 14px', borderRadius: 20, fontSize: '0.75rem', cursor: 'pointer',
                                        background: profile.primaryRegions.includes(r) ? 'rgba(0,212,255,0.1)' : 'transparent',
                                        border: `1px solid ${profile.primaryRegions.includes(r) ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                        color: profile.primaryRegions.includes(r) ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                                        transition: 'all 0.15s',
                                    }}>{r}</button>
                                ))}
                            </div>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={labelStyle}>Inventory Policy</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                {['Just-in-Time (JIT)', 'Safety Stock Buffer', 'Vendor Managed Inventory', 'Consignment'].map(p => (
                                    <button key={p} onClick={() => update('inventoryPolicy', p)} style={{
                                        padding: '10px 14px', textAlign: 'left', borderRadius: 4,
                                        background: profile.inventoryPolicy === p ? 'rgba(0,212,255,0.08)' : 'transparent',
                                        border: `1px solid ${profile.inventoryPolicy === p ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                        color: profile.inventoryPolicy === p ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        fontSize: '0.8125rem', cursor: 'pointer', transition: 'all 0.15s',
                                    }}>{p}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Risk & Compliance */}
                {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeIn 0.3s var(--ease-out)' }}>
                        <div>
                            <label style={labelStyle}>Risk Tolerance</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>
                                <span>Conservative</span><span>Moderate</span><span>Aggressive</span>
                            </div>
                            <div style={{ position: 'relative', height: 6, background: 'var(--bg-primary)', borderRadius: 3 }}>
                                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${profile.riskTolerance}%`, background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-primary), var(--risk-critical))', borderRadius: 3 }} />
                                <input type="range" min={0} max={100} value={profile.riskTolerance} onChange={e => update('riskTolerance', Number(e.target.value))} style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer' }} />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: 4, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{profile.riskTolerance}%</div>
                        </div>
                        <div>
                            <label style={labelStyle}>SLA Requirements</label>
                            <select value={profile.slaRequirements} onChange={e => update('slaRequirements', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select delivery SLA</option>
                                <option value="next-day">Next Day Delivery</option><option value="3-day">3-Day Delivery</option>
                                <option value="weekly">Weekly Delivery</option><option value="flexible">Flexible / No SLA</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Buffer Policy</label>
                            <select value={profile.bufferPolicy} onChange={e => update('bufferPolicy', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select buffer strategy</option>
                                <option value="none">No Buffer (0 weeks)</option><option value="light">Light (1-2 weeks)</option>
                                <option value="moderate">Moderate (2-4 weeks)</option><option value="heavy">Heavy (4+ weeks)</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Compliance Frameworks</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {['SOC 2', 'ISO 27001', 'GDPR', 'PIPEDA', 'CFIA', 'OSFI', 'SEC', 'Custom'].map(f => (
                                    <button key={f} onClick={() => toggleArr('complianceFrameworks', f)} style={{
                                        padding: '6px 14px', borderRadius: 20, fontSize: '0.75rem', cursor: 'pointer',
                                        background: profile.complianceFrameworks.includes(f) ? 'rgba(0,212,255,0.1)' : 'transparent',
                                        border: `1px solid ${profile.complianceFrameworks.includes(f) ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                        color: profile.complianceFrameworks.includes(f) ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                                        transition: 'all 0.15s',
                                    }}>{f}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: ERP & Systems */}
                {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeIn 0.3s var(--ease-out)' }}>
                        <div>
                            <label style={labelStyle}>ERP System</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                                {erpSystems.map(erp => (
                                    <button key={erp} onClick={() => update('erpSystem', erp)} style={{
                                        padding: '10px 14px', textAlign: 'left', borderRadius: 4,
                                        background: profile.erpSystem === erp ? 'rgba(0,212,255,0.08)' : 'transparent',
                                        border: `1px solid ${profile.erpSystem === erp ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                        color: profile.erpSystem === erp ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        fontSize: '0.8125rem', cursor: 'pointer', transition: 'all 0.15s',
                                    }}>{erp}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Gemini API Key (for AI features)</label>
                            <input value={profile.apiKey} onChange={e => update('apiKey', e.target.value)} placeholder="AIza..." style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} />
                            <p style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', marginTop: 4 }}>Optional. Required to enable AI-powered analysis, PDF processing, and agent features.</p>
                        </div>
                    </div>
                )}

                {/* Step 4: Initial Suppliers */}
                {step === 4 && (
                    <div style={{ animation: 'fadeIn 0.3s var(--ease-out)' }}>
                        {profile.suppliers.map((sup, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px 40px', gap: 8, marginBottom: 8, alignItems: 'end' }}>
                                <div>
                                    {i === 0 && <label style={labelStyle}>Name</label>}
                                    <input value={sup.name} onChange={e => { const s = [...profile.suppliers]; s[i] = { ...s[i], name: e.target.value }; update('suppliers', s); }} placeholder="Supplier name" style={inputStyle} />
                                </div>
                                <div>
                                    {i === 0 && <label style={labelStyle}>Category</label>}
                                    <input value={sup.category} onChange={e => { const s = [...profile.suppliers]; s[i] = { ...s[i], category: e.target.value }; update('suppliers', s); }} placeholder="Category" style={inputStyle} />
                                </div>
                                <div>
                                    {i === 0 && <label style={labelStyle}>Location</label>}
                                    <input value={sup.location} onChange={e => { const s = [...profile.suppliers]; s[i] = { ...s[i], location: e.target.value }; update('suppliers', s); }} placeholder="City, Country" style={inputStyle} />
                                </div>
                                <div>
                                    {i === 0 && <label style={labelStyle}>Tier</label>}
                                    <select value={sup.tier} onChange={e => { const s = [...profile.suppliers]; s[i] = { ...s[i], tier: e.target.value }; update('suppliers', s); }} style={{ ...inputStyle, cursor: 'pointer' }}>
                                        <option value="1">T1</option><option value="2">T2</option>
                                    </select>
                                </div>
                                <button onClick={() => { const s = profile.suppliers.filter((_, j) => j !== i); update('suppliers', s.length ? s : [{ name: '', category: '', location: '', spend: '', tier: '1' }]); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '1rem', paddingBottom: 10 }}>x</button>
                            </div>
                        ))}
                        <button onClick={() => update('suppliers', [...profile.suppliers, { name: '', category: '', location: '', spend: '', tier: '1' }])} style={{
                            padding: '8px 16px', background: 'transparent', border: '1px dashed var(--border-primary)',
                            borderRadius: 4, color: 'var(--text-tertiary)', fontSize: '0.75rem',
                            cursor: 'pointer', width: '100%', marginTop: 8, transition: 'all 0.15s',
                        }}>+ Add Another Supplier</button>
                    </div>
                )}

                {/* Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                    {step > 0 ? (
                        <button onClick={() => setStep(step - 1)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: 4, color: 'var(--text-secondary)', fontSize: '0.8125rem', cursor: 'pointer' }}>Back</button>
                    ) : (
                        <Link to="/login" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', alignSelf: 'center' }}>Already have an account? Sign in</Link>
                    )}
                    {step < stepTitles.length - 1 ? (
                        <button onClick={() => setStep(step + 1)} disabled={!canNext()} style={{
                            padding: '10px 24px', background: canNext() ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                            color: 'var(--bg-primary)', border: 'none', borderRadius: 4,
                            fontSize: '0.8125rem', fontWeight: 600, cursor: canNext() ? 'pointer' : 'default',
                        }}>Continue</button>
                    ) : (
                        <button onClick={handleComplete} style={{
                            padding: '10px 24px', background: 'var(--accent-primary)',
                            color: 'var(--bg-primary)', border: 'none', borderRadius: 4,
                            fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                        }}>Launch Dashboard</button>
                    )}
                </div>
            </div>
        </div>
    );
}
