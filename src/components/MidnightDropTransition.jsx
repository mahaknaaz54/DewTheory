import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import SerumDripOverlay from './SerumDripOverlay';

const MidnightDropTransition = () => {
    const [isDark, setIsDark] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const overlayRef = useRef(null);

    // Initial check
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isTransitioning) return;

        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const willBeDark = !isDark;

        const performToggle = () => {
            if (willBeDark) {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            }
            setIsDark(willBeDark);
        };

        if (isReducedMotion) {
            performToggle();
            return;
        }

        if (willBeDark) {
            // Mount the overlay
            setIsOverlayVisible(true);
            setIsTransitioning(true);

            // Need to wait for React to render the overlay into the DOM
            // before we can trigger the GSAP animation on its ref
            setTimeout(() => {
                if (overlayRef.current) {
                    overlayRef.current.playAnimation();
                }

                // Instantly switch theme. Since the overlay animating down is Dark Mode color (#1A1A1A)
                // it acts as a curtain. The layout instantly changes underneath without the user seeing it happen.
                performToggle();

                // Wait for animation to finish (1.4s duration), then unmount the overlay
                setTimeout(() => {
                    setIsOverlayVisible(false);
                    setIsTransitioning(false);
                }, 1400);
            }, 10);
        } else {
            // If going light, just perform the toggle normally without the dark pour overlay
            performToggle();
        }
    };

    return (
        <>
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="fixed bottom-8 left-8 p-3 rounded-full bg-white dark:bg-hikari-dark shadow-clay dark:shadow-glow text-hikari-text dark:text-white z-50 transition-colors"
                aria-label="Toggle dark mode"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {isOverlayVisible && <SerumDripOverlay ref={overlayRef} />}
        </>
    );
};

export default MidnightDropTransition;
