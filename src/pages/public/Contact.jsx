import { useState } from 'react';
export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    return (
        <div>
            <section style={{ padding: '160px 48px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 16 }}>Contact</p>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                    Let's protect your supply chain
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-tertiary)', lineHeight: 1.8 }}>
                    Request a demo, ask a question, or start a free trial. Our team responds within 24 hours.
                </p>
            </section>
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px 120px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48 }}>
                    {/* Form */}
                    <div style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)', padding: '40px 32px', backdropFilter: 'blur(16px)',
                    }}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 16px' }}><circle cx="24" cy="24" r="22" stroke="var(--accent-emerald)" strokeWidth="2" /><path d="M16 24L22 30L32 18" stroke="var(--accent-emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Message sent</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Our team will be in touch within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    {[['First Name', 'text'], ['Last Name', 'text']].map(([label, type]) => (
                                        <div key={label}>
                                            <label style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>{label}</label>
                                            <input type={type} required className="glass-input" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                                        </div>
                                    ))}
                                </div>
                                {[['Work Email', 'email'], ['Company', 'text'], ['Job Title', 'text']].map(([label, type]) => (
                                    <div key={label}>
                                        <label style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>{label}</label>
                                        <input type={type} required className="glass-input" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                                    </div>
                                ))}
                                <div>
                                    <label style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Message</label>
                                    <textarea rows={4} className="glass-input" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }} />
                                </div>
                                <button type="submit" style={{
                                    padding: '12px 24px', borderRadius: 'var(--radius-full)',
                                    background: 'var(--text-primary)', color: 'var(--bg-primary)',
                                    border: 'none', fontSize: '0.875rem', fontWeight: 600,
                                    cursor: 'pointer', transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >Send Message</button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {[
                            { label: 'Toronto (HQ)', detail: 'MaRS Discovery District, 101 College St, Suite 300, Toronto, ON' },
                            { label: 'Berlin', detail: 'Friedrichstrasse 68, 10117 Berlin, Germany' },
                            { label: 'Email', detail: 'hello@chainmind.ai' },
                            { label: 'Sales', detail: 'sales@chainmind.ai' },
                        ].map(c => (
                            <div key={c.label}>
                                <h4 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{c.label}</h4>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{c.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
