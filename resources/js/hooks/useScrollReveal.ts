import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
    y?: number;
    x?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    start?: string;
}

/**
 * Hook to animate elements into view using GSAP ScrollTrigger.
 * Pass childSelector to animate child elements with stagger.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
    childSelector?: string,
    options: ScrollRevealOptions = {}
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const {
            y = 40,
            x = 0,
            duration = 0.7,
            stagger = 0.12,
            delay = 0,
            ease = 'power3.out',
            start = 'top 85%',
        } = options;

        const targets = childSelector ? el.querySelectorAll(childSelector) : [el];

        gsap.fromTo(
            targets,
            { opacity: 0, y, x },
            {
                opacity: 1,
                y: 0,
                x: 0,
                duration,
                delay,
                stagger,
                ease,
                scrollTrigger: {
                    trigger: el,
                    start,
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return ref;
}

export { gsap, ScrollTrigger };
