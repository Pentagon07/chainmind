import { useState, useEffect, useRef } from 'react';
export default function AnimatedNumber({ value, decimals = 0, duration = 1200 }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        let start = 0;
        const end = Number(value) || 0;
        const startTime = performance.now();
        const step = (ts) => {
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(start + (end - start) * eased);
            if (progress < 1) ref.current = requestAnimationFrame(step);
        };
        ref.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(ref.current);
    }, [value, duration]);
    return <>{display.toFixed(decimals)}</>;
}
