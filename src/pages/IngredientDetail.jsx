import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import Container from '../components/Container';
import { allIngredients as ingredients } from '../data/ingredients';
import IngredientMockup from '../components/IngredientMockup';

const IngredientDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const ingredient = ingredients.find(ing => ing.slug === slug || ing.id === slug);

    if (!ingredient) {
        return (
            <Container className="pt-32 pb-24 text-center">
                <h1 className="font-playfair text-4xl mb-4">Ingredient Not Found</h1>
                <button onClick={() => navigate('/ingredients')} className="text-hikari-orange font-bold uppercase tracking-widest border-b border-hikari-orange pb-1">
                    Return to Library
                </button>
            </Container>
        );
    }

    return (
        <div className="pt-24 pb-24">
            {ingredient.seo && (
                <Helmet>
                    <title>{ingredient.seo.title}</title>
                    <meta name="description" content={ingredient.seo.description} />
                    <meta property="og:title" content={ingredient.seo.title} />
                    <meta property="og:description" content={ingredient.seo.description} />
                </Helmet>
            )}
            <Container>

                {/* Back Navigation */}
                <button
                    onClick={() => navigate('/ingredients')}
                    className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-hikari-muted dark:text-gray-400 hover:text-hikari-orange transition-colors mb-12"
                >
                    <ArrowLeft size={16} /> Back to Library
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left: Aesthetic Bottle Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="sticky top-32 aspect-[3/4] rounded-[2.5rem] bg-hikari-clay/30 dark:bg-white/5 overflow-hidden flex flex-col items-center justify-center p-8 shadow-clay dark:shadow-none border border-transparent dark:border-white/10 relative">
                            <IngredientMockup ingredient={ingredient} className="absolute inset-0 transform scale-125" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none"></div>
                            <div className="absolute bottom-10 left-0 right-0 text-center text-white px-6 z-30 pointer-events-none">
                                <span className="text-xs font-bold tracking-widest uppercase border border-white/40 rounded-full px-4 py-1.5 backdrop-blur-md">
                                    {ingredient.category}
                                </span>
                                <p className="mt-4 font-mono text-sm tracking-wider opacity-80 backdrop-blur-md rounded-full px-4 py-1 inline-block border border-transparent dark:border-white/10 dark:bg-black/40">
                                    INCI: {ingredient.inciName}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Ingredient Data */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >
                        <p className="text-hikari-orange font-bold text-sm tracking-widest uppercase mb-4">Clinical Grade Extraction</p>
                        <h1 className="font-playfair font-bold text-5xl md:text-7xl mb-6 leading-tight">
                            {ingredient.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-hikari-muted dark:text-gray-300 font-playfair italic mb-12">
                            "{ingredient.shortDescription}"
                        </p>

                        {/* Quick Facts Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-16">
                            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-transparent dark:border-white/10">
                                <div className="flex items-center gap-2 text-hikari-orange mb-3">
                                    <ShieldCheck size={20} />
                                    <span className="font-bold text-sm uppercase tracking-widest">Best For</span>
                                </div>
                                <ul className="text-hikari-text dark:text-gray-300 text-sm space-y-1">
                                    {ingredient.skinTypes.map(type => <li key={type}>• {type}</li>)}
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-transparent dark:border-white/10">
                                <div className="flex items-center gap-2 text-hikari-orange mb-3">
                                    <Clock size={20} />
                                    <span className="font-bold text-sm uppercase tracking-widest">Origin & Safety</span>
                                </div>
                                <p className="text-xl font-medium text-hikari-text dark:text-gray-300">
                                    {ingredient.origin} {ingredient.countryOfOrigin ? `(${ingredient.countryOfOrigin})` : ''}
                                </p>
                                <div className="mt-3 flex gap-2">
                                    {ingredient.safeForPregnancy && <span className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 px-2 py-1 rounded-md">Pregnancy Safe</span>}
                                    {ingredient.fungalAcneSafe && <span className="text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md">FA Safe</span>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">

                            {/* Scientific Summary */}
                            <section className="border-b border-hikari-clay dark:border-white/10 pb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="text-hikari-orange" size={24} />
                                    <h2 className="font-playfair font-bold text-3xl">The Science</h2>
                                </div>
                                <p className="text-lg leading-relaxed text-hikari-muted dark:text-gray-300">
                                    {ingredient.scientificSummary}
                                </p>
                                <div className="mt-6 bg-hikari-clay/50 dark:bg-white/5 p-6 rounded-2xl">
                                    <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Mechanism of Action</h4>
                                    <p className="text-hikari-text dark:text-gray-300">{ingredient.howItWorks}</p>
                                </div>
                            </section>

                            {/* Targets */}
                            <section className="border-b border-hikari-clay dark:border-white/10 pb-12">
                                <h2 className="font-playfair font-bold text-3xl mb-6">Addresses Concerns</h2>
                                <div className="flex flex-wrap gap-3">
                                    {ingredient.concerns.map(concern => (
                                        <span key={concern} className="bg-white dark:bg-white/10 border border-hikari-clay dark:border-white/20 text-hikari-text dark:text-white px-6 py-2 rounded-full font-medium shadow-sm text-sm">
                                            {concern}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Usage & Layering */}
                            <section className="border-b border-hikari-clay dark:border-white/10 pb-12">
                                <h2 className="font-playfair font-bold text-3xl mb-6">Usage & Layering</h2>
                                <p className="text-hikari-text dark:text-gray-300 mb-8 p-4 bg-hikari-clay/30 dark:bg-white/5 border-l-4 border-hikari-orange rounded-r-xl">
                                    {ingredient.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Works Well With
                                        </h4>
                                        <ul className="space-y-2 text-hikari-text dark:text-gray-300">
                                            {ingredient.pairingIngredients?.map(pair => (
                                                <li key={pair} className="flex items-center gap-2 text-sm">
                                                    <span className="text-green-500">+</span> {pair}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span> Formulation Conflicts
                                        </h4>
                                        <ul className="space-y-2 text-hikari-text dark:text-gray-300">
                                            {ingredient.conflictsWith?.map(avoid => (
                                                <li key={avoid} className="flex items-center gap-2 text-sm">
                                                    <span className="text-red-500">×</span> {avoid}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};

export default IngredientDetail;
