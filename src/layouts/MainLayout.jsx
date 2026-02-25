import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen bg-hikari-cream dark:bg-hikari-dark text-hikari-text dark:text-white transition-colors duration-300">
            <Navbar />

            {/* We need AnimatePresence here because Outlet changes on route change */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    className="flex-grow pt-[88px]"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <Outlet />
                </motion.main>
            </AnimatePresence>

            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default MainLayout;
