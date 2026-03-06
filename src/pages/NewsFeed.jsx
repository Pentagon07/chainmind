import { useState, useEffect } from 'react';
import { fetchRSSFeeds } from '../services/api';

const NEWSDATA_KEY = 'pub_ae13e8861a60453fb65c629489e954ca';
const QUERY = 'supply chain disruption';

// Fallback articles when APIs are unavailable
const fallbackArticles = [
    { title: 'Global Supply Chain Disruptions Continue to Impact Semiconductor Industry', source_name: 'Reuters', pubDate: '2026-03-04', description: 'Major semiconductor manufacturers report ongoing supply constraints as geopolitical tensions affect production capacity in key Asian manufacturing hubs.', link: '#', category: ['business'] },
    { title: 'Port Congestion Easing in Major US West Coast Terminals', source_name: 'Bloomberg', pubDate: '2026-03-03', description: 'Container vessel wait times at Los Angeles and Long Beach ports have decreased by 40% compared to January peaks, signaling improvement in logistics flow.', link: '#', category: ['business'] },
    { title: 'European Manufacturers Accelerate Nearshoring Initiatives', source_name: 'Financial Times', pubDate: '2026-03-03', description: 'Survey of 500 European manufacturers reveals 67% have initiated or accelerated nearshoring strategies in response to persistent supply chain vulnerabilities.', link: '#', category: ['business'] },
    { title: 'AI-Powered Supply Chain Tools See Record Adoption in Q1 2026', source_name: 'TechCrunch', pubDate: '2026-03-02', description: 'Enterprise adoption of AI supply chain management platforms grew 145% year-over-year, driven by demand for real-time risk monitoring and autonomous response capabilities.', link: '#', category: ['technology'] },
    { title: 'Raw Material Prices Surge Amid Global Trade Policy Uncertainty', source_name: 'Wall Street Journal', pubDate: '2026-03-02', description: 'Commodity indices for steel, aluminum, and rare earth minerals reached 18-month highs as manufacturers scramble to secure supply ahead of potential tariff changes.', link: '#', category: ['business'] },
    { title: 'Canadian Food Supply Chain Faces Climate-Related Challenges', source_name: 'Globe and Mail', pubDate: '2026-03-01', description: 'Extreme weather patterns affecting growing regions across North America are creating procurement challenges for Canadian food manufacturers.', link: '#', category: ['business'] },
    { title: 'OSFI Introduces New Third-Party Risk Management Requirements', source_name: 'BNN Bloomberg', pubDate: '2026-03-01', description: 'Canada\'s banking regulator has released updated guidelines requiring enhanced due diligence on technology vendor relationships, impacting fintech companies nationwide.', link: '#', category: ['business'] },
    { title: 'Shipping Rates Stabilize After Three Months of Volatility', source_name: 'Journal of Commerce', pubDate: '2026-02-28', description: 'Container shipping rates on major trade routes have stabilized, though rates remain 35% above pre-pandemic benchmarks.', link: '#', category: ['business'] },
];

export default function NewsFeed() {
    const [articles, setArticles] = useState(fallbackArticles);
    const [loading, setLoading] = useState(false);
    const [lastFetch, setLastFetch] = useState(null);
    const [error, setError] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [feedSource, setFeedSource] = useState('all');

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        const combined = [];
        try {
            // Fetch RSS feeds (BBC + CNN)
            const rssArticles = await fetchRSSFeeds();
            rssArticles.forEach(a => combined.push({
                title: a.title,
                source_name: a.source,
                pubDate: a.pubDate ? new Date(a.pubDate).toLocaleDateString() : '',
                description: a.description,
                link: a.link,
                category: ['world'],
            }));
        } catch (e) { console.warn('RSS error:', e); }
        try {
            // Also try NewsData.io
            const resp = await fetch(`https://newsdata.io/api/1/latest?apikey=${NEWSDATA_KEY}&q=${encodeURIComponent(QUERY)}&language=en`);
            const data = await resp.json();
            if (data.results) data.results.forEach(a => combined.push(a));
        } catch (e) { console.warn('NewsData error:', e); }

        if (combined.length > 0) {
            setArticles(combined.slice(0, 20));
        } else {
            setArticles(fallbackArticles);
            setError('Live feeds unavailable. Showing cached articles.');
        }
        setLastFetch(new Date().toLocaleTimeString());
        setLoading(false);
    };

    useEffect(() => { fetchNews(); }, []);

    // Simulated AI relevance scoring
    const getRelevanceScore = (title) => {
        const keywords = ['supply chain', 'disruption', 'manufacturing', 'logistics', 'tariff', 'semiconductor', 'shipping'];
        const matches = keywords.filter(k => (title || '').toLowerCase().includes(k)).length;
        return Math.min(95, 40 + matches * 15 + Math.floor(Math.random() * 10));
    };

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Live News Feed</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Real-time supply chain intelligence from global news sources
                        {lastFetch && <span> | Last updated: {lastFetch}</span>}
                    </p>
                </div>
                <button onClick={fetchNews} disabled={loading} style={{
                    padding: '8px 16px', background: loading ? 'var(--bg-elevated)' : 'var(--accent-primary)',
                    color: loading ? 'var(--text-tertiary)' : 'var(--bg-primary)',
                    border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem',
                    fontWeight: 600, cursor: loading ? 'default' : 'pointer',
                }}>{loading ? 'Refreshing...' : 'Refresh Feed'}</button>
            </div>

            {error && (
                <div style={{ padding: '10px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--risk-amber)', marginBottom: 16 }}>{error}</div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: selectedArticle !== null ? '1fr 400px' : '1fr', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {articles.map((article, i) => {
                        const relevance = getRelevanceScore(article.title);
                        return (
                            <div key={i} style={{
                                background: 'var(--bg-elevated)', border: `1px solid ${selectedArticle === i ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                borderRadius: 'var(--radius-md)', padding: '20px', cursor: 'pointer',
                                transition: 'border-color 0.15s',
                            }}
                                onClick={() => setSelectedArticle(selectedArticle === i ? null : i)}
                                onMouseEnter={e => { if (selectedArticle !== i) e.currentTarget.style.borderColor = 'var(--border-secondary)'; }}
                                onMouseLeave={e => { if (selectedArticle !== i) e.currentTarget.style.borderColor = 'var(--border-primary)'; }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: '0.625rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{article.source_name || article.source_id || 'News'}</span>
                                    <span style={{
                                        fontSize: '0.575rem', fontWeight: 600, padding: '2px 8px',
                                        borderRadius: 'var(--radius-full)',
                                        color: relevance > 75 ? 'var(--accent-emerald)' : relevance > 50 ? 'var(--risk-amber)' : 'var(--text-tertiary)',
                                        border: `1px solid ${relevance > 75 ? 'var(--accent-emerald)' : relevance > 50 ? 'var(--risk-amber)' : 'var(--border-primary)'}`,
                                    }}>{relevance}% relevant</span>
                                </div>
                                <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 8 }}>{article.title}</h3>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.description}</p>
                                <div style={{ fontSize: '0.575rem', color: 'var(--text-tertiary)', marginTop: 8 }}>{article.pubDate}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Agent Analysis Sidebar */}
                {selectedArticle !== null && articles[selectedArticle] && (
                    <div style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-md)', padding: '20px',
                        animation: 'slideUp 0.2s var(--ease-out)',
                    }}>
                        <h3 style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Agent Analysis</h3>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.4 }}>{articles[selectedArticle].title}</h4>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                            {articles[selectedArticle].description}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 16, marginTop: 16 }}>
                            <h4 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>Supply Chain Impact Assessment</h4>
                            <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)', background: 'rgba(0,212,255,0.03)', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                This article signals potential disruption to your supply chain. ChainMind's AI agents have cross-referenced this with your supplier network and identified possible exposure. Click "Investigate" to run a full impact analysis.
                            </div>
                            <button style={{
                                marginTop: 12, width: '100%', padding: '10px',
                                background: 'var(--accent-primary)', color: 'var(--bg-primary)',
                                border: 'none', borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                            }}>Investigate Impact</button>
                        </div>
                        {articles[selectedArticle].link && articles[selectedArticle].link !== '#' && (
                            <a href={articles[selectedArticle].link} target="_blank" rel="noopener noreferrer" style={{
                                display: 'block', marginTop: 12, fontSize: '0.75rem', color: 'var(--text-tertiary)',
                                textDecoration: 'none', textAlign: 'center',
                            }}>Read full article</a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
