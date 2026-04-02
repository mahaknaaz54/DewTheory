import { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import Container from '../components/Container';
import IngredientCard from '../components/IngredientCard';
import { allIngredients as ingredientsData } from '../data/ingredients';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 12;

// Custom hook for debouncing search input
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const Ingredients = () => {
    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Filter states
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeConcern, setActiveConcern] = useState('All');
    const [isPregnancySafe, setIsPregnancySafe] = useState(false);
    const [isFASafe, setIsFASafe] = useState(false);

    // Pagination state
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Extract unique categories and concerns for dropdowns/pills
    const categories = ['All', ...new Set(ingredientsData.map(i => i.category))];
    const allConcerns = [...new Set(ingredientsData.flatMap(i => i.concerns))].sort();

    // Reset pagination when filters change
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [debouncedSearch, activeCategory, activeConcern, isPregnancySafe, isFASafe]);

    // Main filtering logic (Optimized with useMemo)
    const filteredIngredients = useMemo(() => {
        return ingredientsData.filter(ing => {
            // 1. Search Query (checks Name OR INCI Name)
            const matchesSearch =
                !debouncedSearch ||
                ing.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                ing.inciName.toLowerCase().includes(debouncedSearch.toLowerCase());

            // 2. Category Filter
            const matchesCategory = activeCategory === 'All' || ing.category === activeCategory;

            // 3. Concern Filter
            const matchesConcern = activeConcern === 'All' || ing.concerns.includes(activeConcern);

            // 4. Boolean Flags
            const matchesPregnancy = !isPregnancySafe || ing.safeForPregnancy === true;
            const matchesFA = !isFASafe || ing.fungalAcneSafe === true;

            return matchesSearch && matchesCategory && matchesConcern && matchesPregnancy && matchesFA;
        });
    }, [debouncedSearch, activeCategory, activeConcern, isPregnancySafe, isFASafe]);

    const visibleIngredients = filteredIngredients.slice(0, visibleCount);
    const hasMore = visibleCount < filteredIngredients.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setActiveCategory('All');
        setActiveConcern('All');
        setIsPregnancySafe(false);
        setIsFASafe(false);
    };

    const activeFiltersCount =
        (activeCategory !== 'All' ? 1 : 0) +
        (activeConcern !== 'All' ? 1 : 0) +
        (isPregnancySafe ? 1 : 0) +
        (isFASafe ? 1 : 0) +
        (searchQuery !== '' ? 1 : 0);

    return (
        <div className="pt-12 pb-24">
            <Container>

                {/* Header Section */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-hikari-orange/10 text-hikari-orange text-xs font-bold tracking-wider mb-6">
                        GLOBAL DATABASE
                    </span>
                    <h1 className="font-playfair font-bold text-5xl md:text-7xl mb-6">
                        Ingredient <span className="text-hikari-orange italic">Intelligence</span>
                    </h1>
                    <p className="text-lg md:text-xl text-hikari-muted dark:text-gray-400 font-inter leading-relaxed">
                        Search thousands of clinically-proven INCI ingredients to understand exactly what touches your skin.
                    </p>
                </div>

                {/* Controls Section */}
                <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8">

                    {/* Robust Debounced Search Bar */}
                    <div className="relative w-full lg:w-96 shrink-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-hikari-muted" size={20} />
                        <input
                            type="text"
                            placeholder="Search by Common Name or INCI..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full pl-12 pr-10 py-4 shadow-sm outline-none focus:border-hikari-orange focus:shadow-glow transition-all dark:text-white"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-hikari-orange"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Category Pills (Horizontal Scroll on Mobile) */}
                    <div className="w-full flex-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0 flex gap-3 lg:justify-end">
                        {categories.slice(0, 6).map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveCategory(type)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === type
                                    ? 'bg-hikari-orange text-white shadow-glow'
                                    : 'bg-white dark:bg-white/5 text-hikari-text dark:text-white hover:bg-hikari-clay dark:hover:bg-white/10 shadow-sm border border-transparent dark:border-white/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Advanced Filters Row */}
                <div className="flex flex-wrap items-center gap-4 mb-12 py-6 border-y border-hikari-clay dark:border-white/10">
                    <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-hikari-muted mr-2">
                        <SlidersHorizontal size={16} /> Filters
                    </div>

                    {/* Concern Dropdown */}
                    <div className="relative group">
                        <select
                            value={activeConcern}
                            onChange={(e) => setActiveConcern(e.target.value)}
                            className="appearance-none bg-white dark:bg-white/5 pl-5 pr-10 py-2.5 rounded-xl text-sm font-medium shadow-sm border border-transparent dark:border-white/10 hover:border-hikari-orange transition-colors outline-none cursor-pointer"
                        >
                            <option value="All">All Skin Concerns</option>
                            {allConcerns.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-hikari-muted pointer-events-none" />
                    </div>

                    {/* Boolean Toggles */}
                    <button
                        onClick={() => setIsPregnancySafe(!isPregnancySafe)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-colors border ${isPregnancySafe
                            ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30'
                            : 'bg-white dark:bg-white/5 border-transparent dark:border-white/10 text-hikari-text dark:text-white hover:border-hikari-orange'
                            }`}
                    >
                        Pregnancy Safe {isPregnancySafe && '✓'}
                    </button>

                    <button
                        onClick={() => setIsFASafe(!isFASafe)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-colors border ${isFASafe
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30'
                            : 'bg-white dark:bg-white/5 border-transparent dark:border-white/10 text-hikari-text dark:text-white hover:border-hikari-orange'
                            }`}
                    >
                        Fungal Acne Safe {isFASafe && '✓'}
                    </button>

                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-xs font-bold uppercase tracking-widest text-hikari-orange hover:text-orange-700 underline underline-offset-4 ml-auto"
                        >
                            Clear All ({activeFiltersCount})
                        </button>
                    )}
                </div>

                {/* Results Info */}
                <div className="mb-8 text-sm font-medium text-hikari-muted dark:text-gray-400 flex justify-between items-center">
                    <span>
                        Showing {visibleIngredients.length} of {filteredIngredients.length} {filteredIngredients.length === 1 ? 'ingredient' : 'ingredients'}
                    </span>
                </div>

                {/* Ingredients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
                    <AnimatePresence mode="sync">
                        {visibleIngredients.map((ingredient, index) => (
                            <motion.div
                                key={ingredient.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, delay: Math.min(index % ITEMS_PER_PAGE, 8) * 0.04 }}
                            >
                                <IngredientCard ingredient={ingredient} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Zero State */}
                {filteredIngredients.length === 0 && (
                    <div className="text-center py-24 w-full">
                        <div className="w-16 h-16 rounded-full bg-hikari-clay dark:bg-white/10 flex items-center justify-center mx-auto mb-6 text-2xl">
                            🔍
                        </div>
                        <h3 className="text-2xl font-playfair font-bold mb-2">No Ingredients Found</h3>
                        <p className="text-hikari-muted mb-6">We couldn't find any ingredients matching your exact criteria.</p>
                        <button
                            onClick={clearFilters}
                            className="text-hikari-orange font-bold border-b-2 border-hikari-orange pb-1 hover:text-orange-700 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Pagination / Load More */}
                {hasMore && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-white dark:bg-white/5 border border-hikari-clay dark:border-white/20 text-hikari-text dark:text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-sm hover:shadow-md hover:border-hikari-orange transition-all duration-300"
                        >
                            Load More Ingredients
                        </button>
                    </div>
                )}

            </Container>
        </div>
    );
};

export default Ingredients;
