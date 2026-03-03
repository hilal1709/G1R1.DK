import { useEffect, useRef } from 'react';
import { animate, stagger, remove } from 'animejs';

interface Lantern {
    id: number;
    x: number;
    size: number;
    delay: number;
    color: string;
    opacity: number;
}

const COLORS = [
    '#f59e0b', // amber-400
    '#f97316', // orange-500
    '#fbbf24', // amber-400
    '#fb923c', // orange-400
    '#fcd34d', // amber-300
    '#fdba74', // orange-300
];

function generateLanterns(count: number): Lantern[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,          // % from left
        size: 12 + Math.random() * 22,    // px
        delay: Math.random() * 5000,      // ms
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.25 + Math.random() * 0.45,
    }));
}

export default function FloatingLanterns({ count = 18 }: { count?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lanterns = useRef<Lantern[]>(generateLanterns(count));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = container.querySelectorAll<HTMLElement>('.lantern-item');

        elements.forEach((el) => {
            const delay = parseFloat(el.dataset.delay || '0');

            animate(el, {
                translateY: [
                    { to: 0,       duration: 0 },
                    { to: '-110vh', duration: 8000 + Math.random() * 6000 },
                ],
                translateX: [
                    { to: 0 },
                    { to: (Math.random() - 0.5) * 80 },
                    { to: (Math.random() - 0.5) * 40 },
                ],
                opacity: [
                    { to: 0, duration: 400 },
                    { to: parseFloat(el.dataset.opacity || '0.35'), duration: 1200 },
                    { to: 0, duration: 1200, delay: 5000 },
                ],
                rotate: { to: (Math.random() - 0.5) * 30, duration: 3000, ease: 'inOutSine' },
                delay,
                loop: true,
                ease: 'inOutSine',
            });
        });

        return () => {
            remove(elements);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-10"
            aria-hidden="true"
        >
            {lanterns.current.map((lantern) => (
                <div
                    key={lantern.id}
                    className="lantern-item absolute bottom-0"
                    data-delay={lantern.delay}
                    data-opacity={lantern.opacity}
                    style={{
                        left: `${lantern.x}%`,
                        width: lantern.size,
                        height: lantern.size * 1.4,
                        opacity: 0,
                    }}
                >
                    {/* Lantern body SVG */}
                    <svg viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                        {/* Top cap */}
                        <rect x="13" y="0" width="14" height="5" rx="2" fill={lantern.color} opacity="0.9" />
                        {/* String top */}
                        <line x1="20" y1="5" x2="20" y2="10" stroke={lantern.color} strokeWidth="1.5" />
                        {/* Body */}
                        <ellipse cx="20" cy="33" rx="16" ry="20" fill={lantern.color} opacity="0.85" />
                        {/* Glow center */}
                        <ellipse cx="20" cy="30" rx="9" ry="12" fill="white" opacity="0.25" />
                        {/* Ribs */}
                        <line x1="10" y1="22" x2="10" y2="44" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                        <line x1="16" y1="14" x2="16" y2="52" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                        <line x1="24" y1="14" x2="24" y2="52" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                        <line x1="30" y1="22" x2="30" y2="44" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                        {/* Bottom tassel */}
                        <line x1="20" y1="53" x2="20" y2="56" stroke={lantern.color} strokeWidth="2" />
                        <line x1="18" y1="56" x2="22" y2="56" stroke={lantern.color} strokeWidth="2" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
