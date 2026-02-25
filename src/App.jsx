import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import IngredientDetail from './pages/IngredientDetail';
import SkinQuiz from './pages/SkinQuiz';
import QuizResults from './pages/QuizResults';
import Journal from './pages/Journal';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Science from './pages/Science';
import CinematicIntro from './components/CinematicIntro';

const INTRO_STORAGE_KEY = 'dew_intro_seen';

// Scroll to top on route change component
const ScrollToTopRoute = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="ingredients" element={<Ingredients />} />
                    <Route path="ingredients/:slug" element={<IngredientDetail />} />
                    <Route path="quiz" element={<SkinQuiz />} />
                    <Route path="quiz/results" element={<QuizResults />} />
                    <Route path="journal" element={<Journal />} />
                    <Route path="article" element={<ArticleDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="science" element={<Science />} />
                    <Route path="*" element={<Home />} /> {/* Fallback */}
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    const [introComplete, setIntroComplete] = useState(() => {
        try {
            return localStorage.getItem(INTRO_STORAGE_KEY) === '1';
        } catch {
            return false;
        }
    });

    const handleIntroComplete = useCallback(() => {
        try {
            localStorage.setItem(INTRO_STORAGE_KEY, '1');
        } catch {
            // localStorage unavailable — silently continue
        }
        setIntroComplete(true);
    }, []);

    return (
        <HelmetProvider>
            <BrowserRouter>
                <ScrollToTopRoute />
                <AnimatedRoutes />
                {!introComplete && (
                    <CinematicIntro onComplete={handleIntroComplete} />
                )}
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
