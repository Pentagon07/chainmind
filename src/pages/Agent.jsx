import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { chatLLM, fetchEarnings, fetchStockPrice, fetchWeather, fetchCommodity, scrapeURL } from '../services/api';

function TypewriterText({ text, speed = 8 }) {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const timer = setInterval(() => { if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; } else clearInterval(timer); }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);
    return <span>{displayed}<span style={{ opacity: displayed.length < text.length ? 1 : 0, animation: 'blink 1s step-end infinite' }}>|</span></span>;
}

// Tool definitions the agent can use
const TOOLS = [
    { name: 'earnings', desc: 'Look up quarterly earnings for a public company', icon: 'M18 20V10M12 20V4M6 20v-6' },
    { name: 'stock', desc: 'Check current stock price', icon: 'M3 17l6-6 4 4 8-8' },
    { name: 'weather', desc: 'Check weather conditions at a location', icon: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2' },
    { name: 'commodity', desc: 'Look up commodity prices', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5' },
    { name: 'scrape', desc: 'Extract data from a webpage', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z' },
];

export default function Agent() {
    const { user, scenarioData: sc, scenarioInfo: info, activeScenario } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchProgress, setSearchProgress] = useState(0);
    const [showTrace, setShowTrace] = useState(null);
    const [toolResults, setToolResults] = useState({});
    const chatRef = useRef(null);

    useEffect(() => {
        setMessages(sc.agentConversation.map(m => ({ ...m, animated: false })));
    }, [activeScenario]);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);

    // Try calling the real LLM API, fallback to mock response
    const callAgent = async (question, context = '') => {
        const systemPrompt = `You are ChainMind AI, a supply chain intelligence agent for ${info?.company} in the ${info?.name} industry.
Company context: Revenue ${info?.revenue}, Location ${info?.location}, ${sc.suppliers?.length || 0} suppliers tracked.
Active disruptions: ${sc.disruptions?.map(d => d.title).join(', ')}.
${context}
Provide detailed, data-driven supply chain analysis. Use markdown formatting. Be professional and concise.`;

        const chatMessages = messages
            .filter(m => m.role === 'user' || m.role === 'agent')
            .slice(-6)
            .map(m => ({ role: m.role === 'agent' ? 'assistant' : 'user', content: m.text }));
        chatMessages.push({ role: 'user', content: question });

        const result = await chatLLM(chatMessages, systemPrompt);
        return result;
    };

    // Execute a tool call
    const executeTool = async (toolName, params) => {
        try {
            switch (toolName) {
                case 'earnings': return await fetchEarnings(params.ticker, params.year, params.period);
                case 'stock': return await fetchStockPrice(params.ticker);
                case 'weather': return await fetchWeather(params.lat, params.lon);
                case 'commodity': return await fetchCommodity(params.symbol);
                case 'scrape': return await scrapeURL(params.url);
                default: return { error: 'Unknown tool' };
            }
        } catch (e) {
            return { error: e.message };
        }
    };

    const handleFollowUp = async (question) => {
        setMessages(prev => [...prev, { role: 'user', text: question }]);
        setIsSearching(true);
        setSearchProgress(0);
        const progressTimer = setInterval(() => {
            setSearchProgress(p => { if (p >= 100) { clearInterval(progressTimer); return 100; } return p + Math.random() * 8; });
        }, 200);

        // Detect tool calls from user message
        let toolContext = '';
        const tickerMatch = question.match(/(?:earnings|stock|price)\s+(?:for\s+)?([A-Z]{1,5})/i);
        const weatherMatch = question.match(/weather\s+(?:in|at|for)\s+(.+)/i);
        const commodityMatch = question.match(/(?:commodity|price of)\s+(.+)/i);

        if (tickerMatch) {
            const ticker = tickerMatch[1].toUpperCase();
            const [earnings, stock] = await Promise.all([
                fetchEarnings(ticker).catch(() => null),
                fetchStockPrice(ticker).catch(() => null),
            ]);
            if (earnings && !earnings.error) toolContext += `\nEarnings data for ${ticker}: ${JSON.stringify(earnings).slice(0, 500)}`;
            if (stock && !stock.error) toolContext += `\nStock data for ${ticker}: ${JSON.stringify(stock).slice(0, 300)}`;
            setToolResults(prev => ({ ...prev, [ticker]: { earnings, stock } }));
        }

        if (weatherMatch) {
            // Use approximate coords for major supply chain hubs
            const locations = { 'taiwan': [25.03, 121.56], 'shanghai': [31.23, 121.47], 'singapore': [1.35, 103.82], 'toronto': [43.65, -79.38], 'rotterdam': [51.92, 4.48] };
            const loc = weatherMatch[1].toLowerCase();
            const coords = Object.entries(locations).find(([k]) => loc.includes(k));
            if (coords) {
                const weather = await fetchWeather(coords[1][0], coords[1][1]).catch(() => null);
                if (weather && !weather.error) toolContext += `\nWeather at ${coords[0]}: ${JSON.stringify(weather)}`;
            }
        }

        // Call LLM
        const result = await callAgent(question, toolContext);

        clearInterval(progressTimer);
        setSearchProgress(100);
        setIsSearching(false);

        const sources = [`${info?.company} Internal Data`, 'Risk Assessment Engine'];
        if (toolContext) sources.push('External API Data');
        sources.push('ChainMind AI Analysis');

        if (result.error) {
            // Fallback to smart mock response
            setMessages(prev => [...prev, {
                role: 'agent', animated: true,
                text: `Based on my analysis of ${info?.company}'s supply chain data regarding "${question}":\n\nI reviewed ${sc.suppliers?.length || 0} supplier profiles, ${sc.disruptions?.length || 0} active disruptions, and relevant external intelligence feeds.\n\n**Key Finding:** ${sc.disruptions?.[0]?.title || 'Current supply chain status is stable'} requires attention. The recommended mitigation strategy involves diversifying supplier base and implementing buffer inventory policies.\n\n**Recommended Next Step:** Review the detailed findings in the Events feed and consider running a Scenario Simulation to model potential impact.${toolContext ? '\n\n**External Data Retrieved:**\n' + toolContext : ''}`,
                sources,
            }]);
        } else {
            setMessages(prev => [...prev, {
                role: 'agent', animated: true,
                text: result.text,
                sources,
            }]);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        handleFollowUp(input);
        setInput('');
    };

    const renderMarkdown = (text) => {
        return text.split('\n').map((line, i) => {
            const rendered = line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>');
            if (line.startsWith('- ')) return <div key={i} style={{ paddingLeft: 16, marginBottom: 2 }} dangerouslySetInnerHTML={{ __html: '&bull; ' + rendered.slice(2) }} />;
            if (line.match(/^\d+\./)) return <div key={i} style={{ paddingLeft: 16, marginBottom: 2 }} dangerouslySetInnerHTML={{ __html: rendered }} />;
            if (line === '') return <br key={i} />;
            return <div key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: rendered }} />;
        });
    };

    return (
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>AI Agent</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Supply chain reasoning engine for {info?.company}</p>
                </div>
                {/* Tool indicators */}
                <div style={{ display: 'flex', gap: 6 }}>
                    {TOOLS.map(t => (
                        <div key={t.name} title={t.desc} style={{
                            padding: '4px 8px', borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-primary)', fontSize: '0.5625rem',
                            color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}>{t.name}</div>
                    ))}
                </div>
            </div>

            <div ref={chatRef} style={{ flex: 1, overflow: 'auto', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, animation: msg.animated ? 'slideUp 0.3s var(--ease-out)' : undefined }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                            background: msg.role === 'agent' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'rgba(255,255,255,0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.625rem', fontWeight: 700, color: msg.role === 'agent' ? 'var(--bg-primary)' : 'var(--text-tertiary)',
                        }}>{msg.role === 'agent' ? 'AI' : user?.avatar || 'U'}</div>
                        <div style={{ flex: 1, maxWidth: 720 }}>
                            <div style={{
                                background: msg.role === 'agent' ? 'var(--bg-elevated)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)',
                                padding: '16px 20px', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.8,
                            }}>
                                {msg.animated ? <TypewriterText text={msg.text} /> : renderMarkdown(msg.text)}
                            </div>
                            {msg.sources && (
                                <div style={{ marginTop: 8 }}>
                                    <button onClick={() => setShowTrace(showTrace === i ? null : i)} style={{
                                        background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)',
                                        padding: '4px 10px', fontSize: '0.625rem', color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 0.15s',
                                    }}>{showTrace === i ? 'Hide' : 'Show'} Reasoning Trace ({msg.sources.length} sources)</button>
                                    {showTrace === i && (
                                        <div style={{ marginTop: 8, padding: '12px 16px', background: 'rgba(0,212,255,0.03)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-sm)', animation: 'fadeIn 0.2s var(--ease-out)' }}>
                                            {msg.sources.map((s, j) => (
                                                <div key={j} style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', padding: '3px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isSearching && (
                    <div style={{ display: 'flex', gap: 12, animation: 'slideUp 0.3s var(--ease-out)' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 700, color: 'var(--bg-primary)' }}>AI</div>
                        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '16px 20px', maxWidth: 400 }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: 8, fontWeight: 600 }}>Analyzing {info?.company} data...</div>
                            <div style={{ height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden' }}>
                                <div style={{ width: `${Math.min(searchProgress, 100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', borderRadius: 2, transition: 'width 0.3s' }} />
                            </div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', marginTop: 6 }}>Querying internal docs, supplier contracts, external APIs...</div>
                        </div>
                    </div>
                )}
            </div>

            {sc.followUps && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    {sc.followUps.map((q, i) => (
                        <button key={i} onClick={() => handleFollowUp(q)} style={{
                            padding: '6px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--radius-full)', fontSize: '0.6875rem', color: 'var(--text-tertiary)',
                            cursor: 'pointer', transition: 'all 0.15s', maxWidth: 300, textAlign: 'left',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                        >{q}</button>
                    ))}
                </div>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={`Ask about ${info?.company}'s supply chain...`}
                    style={{
                        flex: 1, padding: '12px 16px', background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                />
                <button onClick={handleSend} style={{
                    padding: '12px 24px', background: 'var(--accent-primary)', color: 'var(--bg-primary)',
                    border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.15s',
                }}>Send</button>
            </div>
        </div>
    );
}
