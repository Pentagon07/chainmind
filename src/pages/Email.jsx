import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const templates = [
    { id: 'negotiation', name: 'Supplier Negotiation', subject: 'Volume Allocation Discussion for Q3 2026', body: 'Dear [Supplier],\n\nThank you for our continued partnership. Given recent supply chain developments, we would like to discuss adjusting our volume allocation for Q3 2026.\n\nSpecifically, we are evaluating:\n- Increasing our committed volume by [X]% to secure capacity\n- Negotiating improved pricing terms based on our expanded commitment\n- Establishing clearer lead time guarantees for priority orders\n\nWe believe this adjustment benefits both parties by providing you with demand certainty while ensuring our supply continuity.\n\nCould we schedule a call this week to review terms? Our procurement team is available [dates].\n\nBest regards,\n[Your Name]\nProcurement' },
    { id: 'compliance', name: 'Compliance Request', subject: 'Required Compliance Documentation Update', body: 'Dear [Supplier],\n\nAs part of our ongoing vendor management program, we require updated documentation for the following compliance areas:\n\n1. Current SOC 2 Type II report (or equivalent security audit)\n2. Updated certificate of insurance with our company named as additional insured\n3. Completed vendor risk assessment questionnaire (attached)\n4. Business continuity plan summary\n\nPlease provide the requested documentation by [Deadline]. Failure to comply may affect order processing per our vendor management policy.\n\nBest regards,\n[Your Name]\nVendor Management' },
    { id: 'escalation', name: 'Disruption Escalation', subject: 'URGENT: Supply Disruption Impact Assessment Required', body: 'Dear [Supplier],\n\nWe are writing to formally escalate concerns regarding the current supply disruption affecting our operations.\n\n**Situation:**\nOur monitoring systems have detected a significant disruption. This event is impacting our expected deliveries.\n\n**Required Response (within 48 hours):**\n1. Updated delivery timeline for all open purchase orders\n2. Assessment of your current capacity and allocation constraints\n3. Proposed mitigation plan with committed dates\n4. Escalation contact for real-time updates\n\nWe value our partnership and are committed to working collaboratively through this disruption.\n\nRegards,\n[Your Name]\nSupply Chain Operations' },
    { id: 'inquiry', name: 'Status Inquiry', subject: 'Purchase Order Status Update Request', body: 'Dear [Supplier],\n\nWe are requesting a status update on the following open purchase orders:\n\n[PO Numbers and Line Items]\n\nSpecifically, we need confirmation of:\n- Current production status\n- Expected ship dates\n- Any anticipated delays or quantity shortfalls\n- Tracking information for shipped orders\n\nThank you for your prompt attention.\n\nBest regards,\n[Your Name]\nProcurement' },
];

export default function Email() {
    const { user, scenarioData: sc, scenarioInfo: info } = useAuth();
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState(templates[0].subject);
    const [body, setBody] = useState(templates[0].body);
    const [sent, setSent] = useState([]);
    const [sending, setSending] = useState(false);

    const selectTemplate = (t) => {
        setSelectedTemplate(t);
        setSubject(t.subject);
        setBody(t.body.replace(/\[Your Name\]/g, user?.name || '[Your Name]'));
    };

    const handleSend = () => {
        setSending(true);
        setTimeout(() => {
            setSent(prev => [...prev, { to, subject, date: new Date().toLocaleString(), template: selectedTemplate.name }]);
            setSending(false);
            setTo('');
        }, 1500);
    };

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Email Drafting</h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Pre-drafted supplier communications for {info?.company}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 280px', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Templates</h3>
                    {templates.map(t => (
                        <button key={t.id} onClick={() => selectTemplate(t)} style={{
                            padding: '10px 14px', textAlign: 'left', borderRadius: 'var(--radius-sm)',
                            background: selectedTemplate.id === t.id ? 'var(--bg-elevated)' : 'transparent',
                            border: `1px solid ${selectedTemplate.id === t.id ? 'var(--accent-primary)' : 'transparent'}`,
                            color: selectedTemplate.id === t.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                            fontSize: '0.8125rem', cursor: 'pointer', transition: 'all 0.15s',
                        }}>{t.name}</button>
                    ))}

                    <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 24, marginBottom: 8 }}>Quick Recipients</h3>
                    {sc.suppliers.slice(0, 5).map(s => (
                        <button key={s.id} onClick={() => setTo(s.name.toLowerCase().replace(/\s+/g, '.') + '@supplier.com')} style={{
                            padding: '6px 10px', textAlign: 'left', borderRadius: 'var(--radius-sm)',
                            background: 'transparent', border: 'none', color: 'var(--text-tertiary)',
                            fontSize: '0.6875rem', cursor: 'pointer', transition: 'color 0.15s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                        >{s.name}</button>
                    ))}
                </div>

                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                        <label style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>To</label>
                        <input value={to} onChange={e => setTo(e.target.value)} placeholder="recipient@supplier.com" style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Subject</label>
                        <input value={subject} onChange={e => setSubject(e.target.value)} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Body</label>
                        <textarea value={body} onChange={e => setBody(e.target.value)} style={{ width: '100%', height: 'calc(100% - 20px)', minHeight: 300, padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: 1.7, outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
                    </div>
                    <button onClick={handleSend} disabled={sending || !to} style={{
                        padding: '10px 24px', background: sending ? 'var(--text-tertiary)' : 'var(--accent-primary)',
                        color: 'var(--bg-primary)', border: 'none', borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8125rem', fontWeight: 600, cursor: sending ? 'default' : 'pointer',
                    }}>{sending ? 'Sending...' : 'Send Email'}</button>
                </div>

                <div>
                    <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Sent ({sent.length})</h3>
                    {sent.length === 0 && <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>No emails sent yet.</p>}
                    {sent.map((s, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-sm)', padding: '12px', marginBottom: 8,
                            animation: 'fadeIn 0.2s var(--ease-out)',
                        }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{s.subject}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>To: {s.to}</div>
                            <div style={{ fontSize: '0.575rem', color: 'var(--text-tertiary)', marginTop: 4 }}>{s.date} | {s.template}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
