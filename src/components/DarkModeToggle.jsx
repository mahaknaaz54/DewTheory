import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check initial preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="fixed bottom-8 left-8 p-3 rounded-full bg-white dark:bg-hikari-dark shadow-clay dark:shadow-glow text-hikari-text dark:text-white z-50 transition-colors"
            aria-label="Toggle dark mode"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
    );
};

export default DarkModeToggle;
