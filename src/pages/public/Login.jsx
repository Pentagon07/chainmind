import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { authenticate } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = authenticate(email, pass);
        if (success) {
            navigate('/app/dashboard');
        } else {
            setError('Invalid credentials. Please check your email and password.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '120px 48px',
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0, 212, 255, 0.04) 0%, transparent 70%)',
        }}>
            <div style={{
                width: 400, background: 'var(--bg-elevated)',
                border: '1px solid var(--border-primary)', borderRadius: 8,
                padding: '48px 36px', backdropFilter: 'blur(20px)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
                animation: 'fadeIn 0.4s var(--ease-out)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 4,
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', fontWeight: 800, color: 'var(--bg-primary)',
                    }}>C</div>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>ChainMind</span>
                </div>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 8, letterSpacing: '-0.02em' }}>
                    Sign in to your account
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 32 }}>
                    Access your supply chain intelligence dashboard
                </p>

                {error && (
                    <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 4, fontSize: '0.75rem', color: 'var(--risk-critical)', marginBottom: 16 }}>{error}</div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Email</label>
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="you@company.com" required
                            style={{
                                width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-primary)', borderRadius: 4,
                                color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
                                transition: 'border-color 0.15s',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Password</label>
                        <input
                            type="password" value={pass} onChange={e => setPass(e.target.value)}
                            placeholder="Enter your password" required
                            style={{
                                width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-primary)', borderRadius: 4,
                                color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
                                transition: 'border-color 0.15s',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                        />
                    </div>
                    <button type="submit" style={{
                        padding: '12px', borderRadius: 4,
                        background: 'var(--text-primary)', color: 'var(--bg-primary)',
                        border: 'none', fontSize: '0.875rem', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s', marginTop: 8,
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >Sign In</button>
                </form>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: 24 }}>
                    Don't have an account? <Link to="/onboarding" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Create Account</Link>
                </p>
            </div>
        </div>
    );
}
