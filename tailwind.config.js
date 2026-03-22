/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                hikari: {
                    orange: 'var(--accent-color)',
                    dark: 'var(--bg-color)', /* Re-mapped so dark utilities use active background */
                    cream: 'var(--bg-color)', /* Re-mapped so light utilities use active background */
                    clay: 'var(--surface-color)',
                    text: 'var(--text-color)',
                    muted: 'var(--muted-color)'
                }
            },
            fontFamily: {
                playfair: ['"Playfair Display"', 'serif'],
                inter: ['"Inter"', 'sans-serif'],
            },
            boxShadow: {
                'clay': '0 10px 40px -10px rgba(0,0,0,0.08), 0 4px 12px -5px rgba(0,0,0,0.04)',
                'clay-hover': '0 20px 50px -10px rgba(0,0,0,0.1), 0 8px 24px -5px rgba(0,0,0,0.06)',
                'glow': '0 0 20px rgba(232, 96, 28, 0.3)',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
