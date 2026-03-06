import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Radar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);
const chartOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: 'rgba(255,255,255,0.6)', font: { size: 10 } } } }, scales: { x: { ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.04)' } }, y: { ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.04)' } } } };
const radarOpts = { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { color: 'rgba(255,255,255,0.4)', backdropColor: 'transparent', font: { size: 8 } }, grid: { color: 'rgba(255,255,255,0.06)' }, pointLabels: { color: 'rgba(255,255,255,0.6)', font: { size: 9 } } } }, plugins: { legend: { labels: { color: 'rgba(255,255,255,0.6)', font: { size: 10 } } } } };

export default function Charts() {
    const { scenarioData: sc, scenarioInfo: info } = useAuth();

    const riskDist = { low: 0, medium: 0, high: 0, critical: 0 };
    sc.suppliers.forEach(s => riskDist[s.risk] = (riskDist[s.risk] || 0) + 1);
    const riskData = { labels: ['Low', 'Medium', 'High', 'Critical'], datasets: [{ data: Object.values(riskDist), backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#dc2626'], borderWidth: 0 }] };

    const healthData = { labels: sc.suppliers.map(s => s.name.length > 15 ? s.name.slice(0, 15) + '...' : s.name), datasets: [{ label: 'Health Score', data: sc.suppliers.map(s => s.health), backgroundColor: sc.suppliers.map(s => s.health > 80 ? '#10b98180' : s.health > 60 ? '#f59e0b80' : '#ef444480'), borderColor: sc.suppliers.map(s => s.health > 80 ? '#10b981' : s.health > 60 ? '#f59e0b' : '#ef4444'), borderWidth: 1 }] };

    const topSups = sc.suppliers.slice(0, 4);
    const radarData = {
        labels: ['Health', 'Financial Score', 'Lead Time (inv)', 'Concentration', 'Tier (inv)'], datasets: topSups.map((s, i) => ({
            label: s.name.length > 12 ? s.name.slice(0, 12) + '...' : s.name,
            data: [s.health, s.financialScore, 100 - Math.min(parseInt(s.leadTime) || 0, 20) * 5, 100 - s.concentration, (4 - s.tier) * 33],
            backgroundColor: [`rgba(0,212,255,0.1)`, `rgba(99,102,241,0.1)`, `rgba(16,185,129,0.1)`, `rgba(245,158,11,0.1)`][i],
            borderColor: ['#00d4ff', '#6366f1', '#10b981', '#f59e0b'][i], borderWidth: 1.5, pointRadius: 3,
        }))
    };

    const trends = Array.from({ length: 12 }, (_, i) => ({ month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i], crit: Math.floor(Math.random() * 3), high: Math.floor(Math.random() * 5) + 1, med: Math.floor(Math.random() * 8) + 2 }));
    const trendData = {
        labels: trends.map(t => t.month), datasets: [
            { label: 'Critical', data: trends.map(t => t.crit), borderColor: '#dc2626', backgroundColor: '#dc262620', fill: true, tension: 0.4 },
            { label: 'High', data: trends.map(t => t.high), borderColor: '#f59e0b', backgroundColor: '#f59e0b20', fill: true, tension: 0.4 },
            { label: 'Medium', data: trends.map(t => t.med), borderColor: '#10b981', backgroundColor: '#10b98120', fill: true, tension: 0.4 },
        ]
    };

    return (
        <div style={{ padding: 24, animation: 'fadeIn 0.3s var(--ease-out)' }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Analytics</h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Supply chain intelligence for {info?.company}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                    <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Risk Distribution</h3>
                    <div style={{ height: 240 }}><Doughnut data={riskData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,0.6)', font: { size: 10 } } } } }} /></div>
                </div>
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                    <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Supplier Comparison (Radar)</h3>
                    <div style={{ height: 240 }}><Radar data={radarData} options={radarOpts} /></div>
                </div>
            </div>

            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: 16 }}>
                <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Supplier Health Scores</h3>
                <div style={{ height: 280 }}><Bar data={healthData} options={chartOpts} /></div>
            </div>

            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Disruption Trend (12-Month)</h3>
                <div style={{ height: 280 }}><Line data={trendData} options={chartOpts} /></div>
            </div>

            <div style={{ marginTop: 16, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <h3 style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Supply Chain Hierarchy</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 64, paddingTop: 16 }}>
                    {[1, 2].map(tier => (
                        <div key={tier}>
                            <div style={{ fontSize: '0.625rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 12, textAlign: 'center' }}>Tier {tier}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {sc.suppliers.filter(s => s.tier === tier).map(s => (
                                    <div key={s.id} style={{
                                        padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                                        border: `1px solid ${s.risk === 'critical' ? '#dc2626' : s.risk === 'high' ? '#ef4444' : s.risk === 'medium' ? '#f59e0b' : 'var(--border-primary)'}`,
                                        fontSize: '0.6875rem', color: 'var(--text-secondary)', minWidth: 140,
                                        background: 'rgba(255,255,255,0.02)',
                                    }}>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{s.name.length > 18 ? s.name.slice(0, 18) + '...' : s.name}</div>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary)' }}>{s.category} | {s.location}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
