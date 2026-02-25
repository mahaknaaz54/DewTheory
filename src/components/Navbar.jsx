import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Ingredients', path: '/ingredients' },
        { name: 'Skin Quiz', path: '/quiz' },
        { name: 'Science', path: '/science' },
        { name: 'About', path: '/about' },
        { name: 'Blog', path: '/journal' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-hikari-cream/90 dark:bg-hikari-dark/90 backdrop-blur-md shadow-sm py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 -ml-2 text-hikari-text dark:text-hikari-cream"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    <div className="w-8 h-8 rounded-full bg-hikari-orange flex items-center justify-center text-white font-bold">
                        <span className="text-sm leading-none tracking-tight">DT</span>
                    </div>
                    <span className="font-playfair font-bold text-2xl tracking-widest hidden sm:block">Dew Theory</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm tracking-wide hover:text-hikari-orange transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons (User) */}
                <div className="flex items-center gap-4">
                    <button className="hidden sm:block p-2 rounded-full bg-white dark:bg-white/10 shadow-sm hover:shadow-md transition-shadow">
                        <User size={18} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-hikari-cream dark:bg-hikari-dark z-50 shadow-2xl flex flex-col pt-24 px-8 pb-8 md:hidden"
                        >
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/50 dark:bg-white/10"
                            >
                                <X size={20} />
                            </button>

                            <nav className="flex flex-col gap-6 text-xl font-playfair mb-auto">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="hover:text-hikari-orange transition-colors border-b border-hikari-clay dark:border-white/10 pb-4"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-8">
                                <div className="flex gap-4">
                                    <button className="flex-1 flex justify-center items-center py-3 rounded-xl bg-hikari-orange text-white">
                                        <User size={20} className="mr-2" /> Sign In
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
