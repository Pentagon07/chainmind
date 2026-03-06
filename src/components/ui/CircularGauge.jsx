import { useEffect, useState, useRef } from 'react';

export default function CircularGauge({ value, max = 100, size = 80, strokeWidth = 6, color }) {
    const [animatedValue, setAnimatedValue] = useState(0);
    const ref = useRef(null);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const startTime = performance.now();
        function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / 1000, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedValue(Math.floor(eased * value));
            if (progress < 1) ref.current = requestAnimationFrame(animate);
        }
        ref.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(ref.current);
    }, [value]);

    const dashOffset = circumference - (animatedValue / max) * circumference;
    const autoColor = color || (value >= 80 ? 'var(--risk-low)' : value >= 60 ? 'var(--risk-medium)' : value >= 40 ? 'var(--risk-high)' : 'var(--risk-critical)');

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke="var(--border-primary)" strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={autoColor} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.3s var(--ease-out)', filter: `drop-shadow(0 0 4px ${autoColor})` }}
                />
            </svg>
            <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: size * 0.22, color: autoColor,
            }}>
                {animatedValue}
            </div>
        </div>
    );
}
