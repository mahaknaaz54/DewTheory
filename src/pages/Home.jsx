import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Container from '../components/Container';
import SectionWrapper from '../components/SectionWrapper';
import { motion } from 'framer-motion';
import { allIngredients as ingredients } from '../data/ingredients';
import IngredientMockup from '../components/IngredientMockup';
import IngredientCard from '../components/IngredientCard';

const Home = () => {
    return (
        <div className="overflow-hidden bg-hikari-cream dark:bg-hikari-dark text-hikari-text dark:text-hikari-cream transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
                <Container>
                    <div className="bg-white dark:bg-white/5 rounded-[2.5rem] shadow-clay dark:shadow-none dark:border dark:border-white/10 p-8 md:p-16 lg:p-24 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">

                        {/* Left Content */}
                        <div className="flex-1 z-10">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-hikari-orange/10 text-hikari-orange text-xs font-bold tracking-wider mb-6">
                                INGREDIENT INTELLIGENCE
                            </span>
                            <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                                Understand Your Skin.<br />
                                <span className="text-hikari-orange">Decode Your Ingredients.</span>
                            </h1>
                            <p className="text-lg text-hikari-muted dark:text-gray-300 max-w-lg mb-10 leading-relaxed font-inter">
                                We believe skincare is a science, not a secret. Explore our comprehensive library to learn what each ingredient does, who it's for, and how to use it.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/ingredients">
                                    <Button>Explore Ingredients</Button>
                                </Link>
                                <Link to="/quiz">
                                    <Button variant="secondary">Take Skin Quiz</Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 w-full relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square w-full shadow-2xl bg-white dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10"
                            >
                                <div className="absolute inset-0 bg-[#A66F43] mix-blend-multiply opacity-5 z-10 pointer-events-none"></div>
                                <IngredientMockup ingredient={ingredients[1]} className="w-full h-full max-w-sm max-h-[85%] mix-blend-multiply dark:mix-blend-normal object-contain" />
                            </motion.div>
                        </div>

                        {/* Background blob */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-hikari-clay/50 to-transparent dark:from-white/5 -z-0 pointer-events-none rounded-[2.5rem]"></div>
                    </div>
                </Container>
            </section>

            {/* Categories Section */}
            <SectionWrapper id="categories" className="bg-white dark:bg-transparent">
                <Container>
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-3">Featured Ingredients</h2>
                            <p className="text-hikari-muted dark:text-gray-400 font-inter">Discover the science behind our most potent actives.</p>
                        </div>
                        <Link to="/ingredients" className="hidden md:flex items-center text-hikari-orange font-medium hover:gap-3 transition-all font-inter">
                            View All Library
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ingredients.slice(0, 4).map((ingredient) => (
                            <IngredientCard key={ingredient.id} ingredient={ingredient} />
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* Philosophy Section */}
            <SectionWrapper id="philosophy">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">

                        <div className="w-16 h-16 bg-hikari-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8601c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h2 className="font-playfair font-bold text-4xl md:text-5xl leading-tight mb-8">
                            Our Educational Philosophy
                        </h2>
                        <p className="text-lg text-hikari-muted dark:text-gray-300 mb-12 leading-relaxed font-inter">
                            At Dew Theory, we believe that understanding your skin is the first step to radiance. We demystify complex scientific research into accessible, structured knowledge so you can build a ritual with confidence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-12 justify-center pb-20">
                            <div>
                                <h3 className="font-playfair font-bold text-4xl mb-2">100+</h3>
                                <p className="text-xs uppercase tracking-widest text-hikari-orange font-bold font-inter">Ingredients Decoded</p>
                            </div>
                            <div>
                                <h3 className="font-playfair font-bold text-4xl mb-2">Clinical</h3>
                                <p className="text-xs uppercase tracking-widest text-hikari-orange font-bold font-inter">Scientific Validation</p>
                            </div>
                        </div>

                    </div>
                </Container>
            </SectionWrapper>
        </div>
    );
};

export default Home;
