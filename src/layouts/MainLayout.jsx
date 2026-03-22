import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import MidnightDropTransition from '../components/MidnightDropTransition';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-hikari-cream dark:bg-hikari-dark text-hikari-text dark:text-white">
            <Navbar />
            <main className="flex-grow pt-[88px]">
                <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
            <MidnightDropTransition />
        </div>
    );
};

export default MainLayout;
