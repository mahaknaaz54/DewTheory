import { Database, Activity, Layers, Microscope, ShieldAlert, Zap, Settings, FlaskConical, TestTube2, Workflow, Baseline, LineChart } from 'lucide-react';
import { allIngredients as ingredients } from '../data/ingredients';
import Container from '../components/Container';
import SectionWrapper from '../components/SectionWrapper';

const Science = () => {
    return (
        <div className="pt-8 pb-24">
            {/* 1. Hero */}
            <Container>
                <div className="bg-hikari-clay/30 dark:bg-white/5 rounded-[2.5rem] p-8 md:p-16 lg:p-24 flex flex-col items-center text-center gap-6 relative overflow-hidden shadow-clay dark:shadow-none mb-24">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-hikari-orange/10 text-hikari-orange text-xs font-bold tracking-wider">
                        SYSTEM ARCHITECTURE
                    </span>
                    <h1 className="font-playfair font-bold text-5xl md:text-7xl leading-tight">
                        How Dew Theory <span className="text-hikari-orange">Works</span>
                    </h1>
                    <p className="text-lg text-hikari-muted dark:text-gray-300 max-w-2xl leading-relaxed font-inter">
                        Structured ingredient intelligence. We map molecular compatibility, irritation risks, and active concentrations to build robust, predictable frameworks for skin health.
                    </p>
                </div>
            </Container>

            {/* 2. Ingredient Classification System */}
            <SectionWrapper id="classification" className="bg-white dark:bg-transparent pt-0 pb-16">
                <Container>
                    <div className="flex justify-between items-end mb-12">
                        <div className="max-w-3xl">
                            <h2 className="font-playfair font-bold text-4xl mb-4">Ingredient Classification System</h2>
                            <p className="text-hikari-muted dark:text-gray-400 text-lg">
                                Every compound in our database is categorized using a multi-dimensional tagging framework to determine its operational behavior.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10">
                            <Zap className="text-hikari-orange mb-6" size={32} />
                            <h3 className="font-bold text-xl mb-3">Actives & Catalysts</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Molecules capable of altering cellular behavior, tracked by their therapeutic window and concentration thresholds.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10">
                            <Baseline className="text-hikari-orange mb-6" size={32} />
                            <h3 className="font-bold text-xl mb-3">pH Dependency</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Acid mantle compatibility mapping. Ingredients are evaluated for their optimal operational pH ranges and buffering capacity.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10">
                            <ShieldAlert className="text-hikari-orange mb-6" size={32} />
                            <h3 className="font-bold text-xl mb-3">Irritation Risk Index</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Sensitization potentials quantified through molecular weight and barrier penetration capabilities.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10">
                            <Activity className="text-hikari-orange mb-6" size={32} />
                            <h3 className="font-bold text-xl mb-3">Hydration Metrics</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Humectant, emollient, and occlusive classifications tracked via transepidermal water loss (TEWL) reduction rates.
                            </p>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. Conflict Detection Engine */}
            <SectionWrapper id="conflict-engine" className="bg-hikari-clay/20 dark:bg-white/5 py-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-hikari-orange/10 text-hikari-orange text-xs font-bold tracking-wider mb-6">
                                COMPATIBILITY MODELING
                            </span>
                            <h2 className="font-playfair font-bold text-4xl md:text-5xl leading-tight mb-6">Conflict Detection Engine</h2>
                            <p className="text-lg text-hikari-muted dark:text-gray-300 mb-8">
                                Cosmetic chemistry relies heavily on sequencing. Our engine analyzes ingredient pair scoring to prevent chemical degradation, excessive exfoliation, and barrier compromise.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-5">
                                    <div className="w-10 h-10 bg-white dark:bg-white/10 text-hikari-orange rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                        <Layers size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Layering Logic</h4>
                                        <p className="text-sm text-hikari-muted dark:text-gray-400">Rule-based sequencing from lowest to highest viscosity and molecular weight.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-10 h-10 bg-white dark:bg-white/10 text-hikari-orange rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                        <Workflow size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">AM/PM Rotation</h4>
                                        <p className="text-sm text-hikari-muted dark:text-gray-400">Scheduling algorithms to separate incompatible actives (e.g., L-Ascorbic Acid vs. Retinoids) across different timeframes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Abstract Visual representation of conflict map */}
                        <div className="bg-white dark:bg-[#151515] rounded-[2.5rem] p-10 md:p-12 shadow-clay border border-transparent dark:border-white/10 aspect-square flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #e8601c 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                            <h3 className="font-bold text-sm tracking-widest text-hikari-muted uppercase mb-8 relative z-10 text-center">Compatibility Matrix Matrix</h3>
                            <div className="flex flex-col gap-4 relative z-10">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-hikari-clay/50 dark:bg-white/5 border border-red-200 dark:border-red-900/30">
                                    <span className="font-medium text-sm">AHA / BHA</span>
                                    <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-md">CONFLICT</span>
                                    <span className="font-medium text-sm">Retinol</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-hikari-clay/50 dark:bg-white/5 border border-green-200 dark:border-green-900/30">
                                    <span className="font-medium text-sm">Vitamin C</span>
                                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-md">SYNERGY</span>
                                    <span className="font-medium text-sm">Vitamin E / Ferulic</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-hikari-clay/50 dark:bg-white/5 border border-yellow-200 dark:border-yellow-900/30">
                                    <span className="font-medium text-sm">Niacinamide</span>
                                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 px-3 py-1 rounded-md">CAUTION</span>
                                    <span className="font-medium text-sm">Pure Vitamin C</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4. Skin Quiz Scoring Engine */}
            <SectionWrapper id="quiz-scoring" className="bg-white dark:bg-transparent py-24 pb-16">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-playfair font-bold text-4xl mb-4">Quiz Scoring Engine</h2>
                        <p className="text-hikari-muted dark:text-gray-400 text-lg">
                            Our diagnostic protocol does not rely on single-axis skin types. We deploy a multi-factor scoring system to build a comprehensive profile of your barrier function.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto bg-hikari-clay dark:bg-white/5 rounded-2xl flex items-center justify-center text-hikari-orange mb-6 font-bold text-xl font-playfair shadow-sm">
                                01
                            </div>
                            <h3 className="font-bold text-lg mb-3">Sebum Production Quotient</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Evaluating lipid secretion patterns to determine baseline requirements for emollients vs. astringents.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto bg-hikari-clay dark:bg-white/5 rounded-2xl flex items-center justify-center text-hikari-orange mb-6 font-bold text-xl font-playfair shadow-sm">
                                02
                            </div>
                            <h3 className="font-bold text-lg mb-3">Environmental Stress Rating</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Calculating required antioxidant protection by indexing local climate, UV exposure frequency, and urban density.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto bg-hikari-clay dark:bg-white/5 rounded-2xl flex items-center justify-center text-hikari-orange mb-6 font-bold text-xl font-playfair shadow-sm">
                                03
                            </div>
                            <h3 className="font-bold text-lg mb-3">Sensitivity Threshold Mapping</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Identifying barrier reactivity and past sensitization events to filter out high-risk botanical and synthetic compounds.
                            </p>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. Evidence & Methodology */}
            <SectionWrapper id="methodology" className="bg-hikari-dark text-white py-24 mb-0 rounded-t-[3rem]">
                <Container>
                    <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
                        <div className="md:w-1/3">
                            <h2 className="font-playfair font-bold text-4xl mb-6">Evidence & Methodology</h2>
                            <p className="text-white/70 text-lg mb-8">
                                All recommendations generated by our engine are anchored in independent dermatological research and standard cosmetic chemistry principles.
                            </p>
                        </div>

                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="border-l border-white/20 pl-6">
                                <TestTube2 className="text-hikari-orange mb-4" size={24} />
                                <h4 className="font-bold text-xl mb-2">Clinical Efficacy</h4>
                                <p className="text-white/60 text-sm">
                                    We prioritize compounds structurally similar to naturally occurring skin lipids and actives with peer-reviewed data demonstrating measurable physiological changes.
                                </p>
                            </div>
                            <div className="border-l border-white/20 pl-6">
                                <LineChart className="text-hikari-orange mb-4" size={24} />
                                <h4 className="font-bold text-xl mb-2">Bioavailability</h4>
                                <p className="text-white/60 text-sm">
                                    An ingredient's presence is insufficient without examining the transport vehicle. We verify delivery systems including encapsulation, liposomes, and penetration enhancers.
                                </p>
                            </div>
                            <div className="border-l border-white/20 pl-6">
                                <Microscope className="text-hikari-orange mb-4" size={24} />
                                <h4 className="font-bold text-xl mb-2">Independent Validation</h4>
                                <p className="text-white/60 text-sm">
                                    We exclude manufacturer-funded clinical trials from our primary data models to mitigate bias, relying instead on independent pharmacological studies.
                                </p>
                            </div>
                            <div className="border-l border-white/20 pl-6">
                                <Settings className="text-hikari-orange mb-4" size={24} />
                                <h4 className="font-bold text-xl mb-2">Algorithm Transparency</h4>
                                <p className="text-white/60 text-sm">
                                    Our correlation models are continuously tested against dermatological best practices to ensure conflict detection remains conservative and safety-first.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>
        </div>
    );
};

export default Science;
