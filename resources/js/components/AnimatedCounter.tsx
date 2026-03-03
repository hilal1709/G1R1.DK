import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface AnimatedCounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
    /** Only start once the element is visible in the viewport */
    observeVisibility?: boolean;
}

export default function AnimatedCounter({
    target,
    suffix = '',
    prefix = '',
    duration = 1800,
    className = '',
    observeVisibility = true,
}: AnimatedCounterProps) {
    const elRef = useRef<HTMLSpanElement>(null);
    const animatedRef = useRef({ value: 0 });
    const [hasStarted, setHasStarted] = useState(false);

    const runAnimation = () => {
        if (!elRef.current) return;
        animatedRef.current.value = 0;

        animate(animatedRef.current, {
            value: target,
            duration,
            ease: 'outExpo',
            onUpdate: () => {
                if (elRef.current) {
                    elRef.current.textContent =
                        prefix + Math.round(animatedRef.current.value).toLocaleString('id-ID') + suffix;
                }
            },
        });
    };

    useEffect(() => {
        if (!observeVisibility) {
            runAnimation();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    runAnimation();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (elRef.current) observer.observe(elRef.current);

        return () => observer.disconnect();
    }, [hasStarted]);

    return (
        <span ref={elRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
}
