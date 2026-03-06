import { useEffect, useState, useRef } from 'react';

export default function TypewriterText({ text, speed = 15, onComplete }) {
    const [displayed, setDisplayed] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayed('');
        indexRef.current = 0;
        const interval = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayed(text.slice(0, indexRef.current + 1));
                indexRef.current++;
            } else {
                clearInterval(interval);
                onComplete?.();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span>
            {displayed}
            {displayed.length < text.length && (
                <span style={{
                    display: 'inline-block',
                    width: 2,
                    height: '1em',
                    background: 'var(--accent-primary)',
                    marginLeft: 2,
                    verticalAlign: 'text-bottom',
                    animation: 'typingCursor 0.8s step-end infinite',
                }} />
            )}
        </span>
    );
}
