import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const mockDocuments = [
    {
        id: 'd1', name: 'Supplier_Audit_TSMC_Q2_2026.pdf', size: '2.4 MB', type: 'Audit Report', status: 'analyzed', date: 'Mar 1, 2026', pages: 14, insights: [
            { type: 'risk', severity: 'high', text: 'Quality deviation rate increased 0.8% from Q1 baseline, exceeding 0.5% threshold in Section 4.2.' },
            { type: 'financial', severity: 'medium', text: 'Capital expenditure reduced by $120M vs guidance, potentially affecting capacity expansion timeline.' },
            { type: 'compliance', severity: 'low', text: 'All ISO 9001 and ISO 14001 certifications current through Q4 2027.' },
            { type: 'contract', severity: 'medium', text: 'Force majeure clause in Section 12.3 does not explicitly cover geopolitical supply corridor disruptions.' },
        ]
    },
    {
        id: 'd2', name: 'Master_Supply_Agreement_v3.2.pdf', size: '1.8 MB', type: 'Contract', status: 'analyzed', date: 'Feb 28, 2026', pages: 42, insights: [
            { type: 'contract', severity: 'high', text: 'Pricing escalation clause caps at 5% annually, but current commodity inflation at 8.3% creates exposure of $2.1M.' },
            { type: 'risk', severity: 'medium', text: 'Termination notice reduced from 120 to 90 days in amendment 2.1, increasing vulnerability window.' },
            { type: 'compliance', severity: 'low', text: 'GDPR and PIPEDA data handling clauses present and compliant.' },
        ]
    },
    {
        id: 'd3', name: 'Insurance_Certificate_2026.pdf', size: '890 KB', type: 'Insurance', status: 'analyzed', date: 'Feb 15, 2026', pages: 4, insights: [
            { type: 'risk', severity: 'medium', text: 'Business interruption coverage capped at $25M, below total supplier exposure of $38M.' },
            { type: 'compliance', severity: 'low', text: 'Additional insured endorsement confirmed for all Tier 1 supplier relationships.' },
        ]
    },
    {
        id: 'd4', name: 'Monthly_KPI_Report_Feb2026.pdf', size: '3.1 MB', type: 'Performance Report', status: 'analyzed', date: 'Mar 2, 2026', pages: 22, insights: [
            { type: 'financial', severity: 'high', text: 'On-time delivery rate dropped to 87.3%, below 95% SLA target for 2nd consecutive month.' },
            { type: 'risk', severity: 'medium', text: 'Defect rate for raw materials from 3 suppliers exceeds 2% threshold.' },
            { type: 'financial', severity: 'low', text: 'Total procurement spend $2.1M under budget due to favorable FX movement.' },
        ]
    },
];

const sevColors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
const typeLabels = { risk: 'Risk Flag', financial: 'Financial', compliance: 'Compliance', contract: 'Contract' };

export default function Insights() {
    const { scenarioInfo: info } = useAuth();
    const [docs, setDocs] = useState(mockDocuments);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedText, setUploadedText] = useState('');
    const [aiAnalyzing, setAiAnalyzing] = useState(false);
    const [geminiKey, setGeminiKey] = useState('');
    const [showKeyInput, setShowKeyInput] = useState(false);
    const fileRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        // Simulate PDF text extraction (client-side OCR placeholder)
        setTimeout(() => {
            const mockExtracted = `[Extracted text from ${file.name}]\n\nDocument Type: ${file.type || 'PDF'}\nFile Size: ${(file.size / 1024).toFixed(0)} KB\nPages: ~${Math.floor(Math.random() * 20) + 5}\n\n--- Content Preview ---\n\nThis document contains supply chain relevant information including supplier performance metrics, contract terms, quality assessments, and financial data.\n\nKey sections detected:\n1. Executive Summary\n2. Supplier Performance Metrics\n3. Risk Assessment\n4. Financial Impact Analysis\n5. Recommendations\n\n[Full OCR text would be extracted here using pdf.js or Tesseract.js in production. The extracted text is then sent to the Gemini API for intelligent analysis.]`;

            setUploadedText(mockExtracted);
            setUploading(false);

            // Add to document list
            const newDoc = {
                id: `d${Date.now()}`, name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`,
                type: 'Uploaded', status: 'pending', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                pages: Math.floor(Math.random() * 20) + 5, insights: [],
            };
            setDocs(prev => [newDoc, ...prev]);
            setSelectedDoc(newDoc.id);
        }, 2000);
    };

    const handleAIAnalysis = () => {
        setAiAnalyzing(true);
        // Simulate Gemini API call
        setTimeout(() => {
            const newInsights = [
                { type: 'risk', severity: 'high', text: 'AI detected supplier concentration risk: 68% of critical components sourced from single geographic region.' },
                { type: 'financial', severity: 'medium', text: 'Projected cost overrun of $340K based on current commodity price trends extracted from document.' },
                { type: 'compliance', severity: 'low', text: 'Document references ISO 22301 business continuity standard. Current certification status should be verified.' },
            ];
            setDocs(prev => prev.map(d => d.id === selectedDoc ? { ...d, status: 'analyzed', insights: newInsights } : d));
            setAiAnalyzing(false);
        }, 3000);
    };

    const active = docs.find(d => d.id === selectedDoc);

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Document Intelligence</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Upload PDFs for AI-powered analysis for {info?.company}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setShowKeyInput(!showKeyInput)} style={{
                        padding: '8px 16px', borderRadius: 4, background: 'transparent',
                        border: '1px solid var(--border-primary)', color: 'var(--text-tertiary)',
                        fontSize: '0.6875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
                        API Key
                    </button>
                    <button onClick={() => fileRef.current?.click()} style={{
                        padding: '8px 16px', borderRadius: 4, background: 'var(--accent-primary)',
                        border: 'none', color: 'var(--bg-primary)', fontSize: '0.6875rem', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                        Upload PDF
                    </button>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
                </div>
            </div>

            {/* API Key Input */}
            {showKeyInput && (
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 6, padding: '16px 20px', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'end', animation: 'slideUp 0.2s var(--ease-out)' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Google Gemini API Key</label>
                        <input value={geminiKey} onChange={e => setGeminiKey(e.target.value)} placeholder="AIzaSy..." style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 4, color: 'var(--text-primary)', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', outline: 'none' }} />
                    </div>
                    <button onClick={() => setShowKeyInput(false)} style={{ padding: '8px 16px', background: 'var(--accent-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: 4, fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Save Key</button>
                </div>
            )}

            {/* Upload Progress */}
            {uploading && (
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 6, padding: '20px', marginBottom: 16, textAlign: 'center', animation: 'fadeIn 0.2s var(--ease-out)' }}>
                    <div style={{ width: 28, height: 28, border: '2px solid var(--accent-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>Extracting text from PDF...</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 4 }}>Running OCR and text extraction</div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
                {/* Document List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, padding: '0 8px', marginBottom: 6 }}>Documents ({docs.length})</div>
                    {docs.map(doc => (
                        <div key={doc.id} onClick={() => setSelectedDoc(doc.id)} style={{
                            padding: '12px 14px', borderRadius: 4, cursor: 'pointer',
                            background: selectedDoc === doc.id ? 'var(--bg-elevated)' : 'transparent',
                            border: `1px solid ${selectedDoc === doc.id ? 'var(--accent-primary)' : 'transparent'}`,
                            transition: 'all 0.15s',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name.length > 28 ? doc.name.slice(0, 28) + '...' : doc.name}</span>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: doc.status === 'analyzed' ? '#10b981' : doc.status === 'pending' ? '#f59e0b' : 'var(--text-tertiary)' }} />
                            </div>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)' }}>{doc.type} | {doc.size} | {doc.date}</div>
                            {doc.insights.length > 0 && (
                                <div style={{ fontSize: '0.5625rem', color: 'var(--accent-primary)', marginTop: 4 }}>{doc.insights.length} insights extracted</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Document Detail / Upload Zone */}
                <div>
                    {active ? (
                        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 6, padding: '24px', animation: 'fadeIn 0.2s var(--ease-out)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{active.name}</h3>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{active.type} | {active.pages} pages | {active.size}</div>
                                </div>
                                {active.status === 'pending' && (
                                    <button onClick={handleAIAnalysis} disabled={aiAnalyzing} style={{
                                        padding: '8px 20px', borderRadius: 4,
                                        background: aiAnalyzing ? 'var(--text-tertiary)' : 'var(--accent-primary)',
                                        color: 'var(--bg-primary)', border: 'none', fontSize: '0.6875rem',
                                        fontWeight: 600, cursor: aiAnalyzing ? 'default' : 'pointer',
                                        display: 'flex', alignItems: 'center', gap: 6,
                                    }}>
                                        {aiAnalyzing && <div style={{ width: 12, height: 12, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />}
                                        {aiAnalyzing ? 'Analyzing with Gemini...' : 'Analyze with AI'}
                                    </button>
                                )}
                            </div>

                            {/* Extracted Text Preview */}
                            {uploadedText && active.status === 'pending' && (
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Extracted Text (OCR)</div>
                                    <pre style={{
                                        padding: '16px', background: 'var(--bg-primary)', borderRadius: 4,
                                        border: '1px solid var(--border-primary)', fontSize: '0.6875rem',
                                        color: 'var(--text-secondary)', lineHeight: 1.7, overflow: 'auto',
                                        maxHeight: 200, fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap',
                                    }}>{uploadedText}</pre>
                                </div>
                            )}

                            {/* AI Insights */}
                            {active.insights.length > 0 && (
                                <>
                                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>AI-Extracted Insights ({active.insights.length})</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {active.insights.map((ins, i) => (
                                            <div key={i} style={{
                                                padding: '14px 16px', borderRadius: 4,
                                                border: `1px solid ${sevColors[ins.severity]}20`,
                                                background: `${sevColors[ins.severity]}05`,
                                                animation: `fadeIn 0.3s var(--ease-out) ${i * 80}ms both`,
                                            }}>
                                                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                                                    <span style={{ fontSize: '0.5rem', fontWeight: 700, color: sevColors[ins.severity], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ins.severity}</span>
                                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>{typeLabels[ins.type]}</span>
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ins.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {active.insights.length === 0 && !uploadedText && (
                                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Click "Analyze with AI" to extract insights using Gemini</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Upload Drop Zone */
                        <div onClick={() => fileRef.current?.click()} style={{
                            background: 'var(--bg-elevated)', border: '2px dashed var(--border-primary)',
                            borderRadius: 6, padding: '80px 40px', textAlign: 'center', cursor: 'pointer',
                            transition: 'border-color 0.15s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 16 }}>
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                            </svg>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Upload a document for analysis</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>PDF, DOCX, or TXT files. Text will be extracted via OCR and analyzed by Gemini AI.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
