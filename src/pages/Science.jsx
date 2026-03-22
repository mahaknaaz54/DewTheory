import { Layers, ShieldAlert, Zap, Baseline, Activity, Microscope, TestTube2, Settings, FlaskConical, LineChart, Workflow } from 'lucide-react';
import Container from '../components/Container';
import SectionWrapper from '../components/SectionWrapper';

const Science = () => {
    return (
        <div className="pt-8 pb-24">

            {/* 1. Hero */}
            <Container>
                <div className="relative rounded-[2.5rem] overflow-hidden min-h-[70vh] flex items-center mb-24">
                    <img
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000&auto=format&fit=crop"
                        alt="Scientific laboratory"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
                    <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-3xl text-white">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-hikari-orange/20 text-hikari-orange text-xs font-bold tracking-wider mb-6 border border-hikari-orange/30">
                            SYSTEM ARCHITECTURE
                        </span>
                        <h1 className="font-playfair font-bold text-5xl md:text-7xl leading-tight mb-6">
                            How Dew Theory <span className="text-hikari-orange">Works</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl leading-relaxed font-inter">
                            Structured ingredient intelligence. We map molecular compatibility, irritation risks, and active concentrations to build robust, predictable frameworks for skin health.
                        </p>
                    </div>
                </div>
            </Container>

            {/* 2. Ingredient Classification System */}
            <SectionWrapper id="classification" className="bg-white dark:bg-transparent pt-0 pb-16">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-hikari-orange/10 text-hikari-orange text-xs font-bold tracking-wider mb-6">
                                CLASSIFICATION ENGINE
                            </span>
                            <h2 className="font-playfair font-bold text-4xl mb-4">Ingredient Classification System</h2>
                            <p className="text-hikari-muted dark:text-gray-400 text-lg">
                                Every compound in our database is categorized using a multi-dimensional tagging framework to determine its operational behavior.
                            </p>
                        </div>
                        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-clay">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
                                alt="Scientific classification lab"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10 hover:-translate-y-1 transition-transform duration-300">
                            <Zap className="text-hikari-orange mb-6" size={32} />
                            <h3 className="font-bold text-xl mb-3">Actives & Catalysts</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Molecules capable of altering cellular behavior, tracked by their therapeutic window and concentration thresholds.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10 hover:-translate-y-1 transition-transform duration-300">
                            <Baseline className="text-hikari-orange mb-6" size={32} />
                            <h3 className="font-bold text-xl mb-3">pH Dependency</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Acid mantle compatibility mapping. Ingredients are evaluated for their optimal operational pH ranges and buffering capacity.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10 hover:-translate-y-1 transition-transform duration-300">
                            <ShieldAlert className="text-hikari-orange mb-6" size={32} />
                            <h3 className="font-bold text-xl mb-3">Irritation Risk Index</h3>
                            <p className="text-sm text-hikari-muted dark:text-gray-400">
                                Sensitization potentials quantified through molecular weight and barrier penetration capabilities.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-clay border border-transparent dark:border-white/10 hover:-translate-y-1 transition-transform duration-300">
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
                        {/* Visual Side */}
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl order-2 lg:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1200&auto=format&fit=crop"
                                alt="Ingredient compatibility testing"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            {/* Overlay Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                <h3 className="font-bold text-sm tracking-widest text-white/70 uppercase mb-4 text-center">Compatibility Matrix</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-red-500/30">
                                        <span className="font-medium text-sm text-white">AHA / BHA</span>
                                        <span className="text-xs font-bold text-red-400 bg-red-900/40 px-3 py-1 rounded-md">CONFLICT</span>
                                        <span className="font-medium text-sm text-white">Retinol</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-green-500/30">
                                        <span className="font-medium text-sm text-white">Vitamin C</span>
                                        <span className="text-xs font-bold text-green-400 bg-green-900/40 px-3 py-1 rounded-md">SYNERGY</span>
                                        <span className="font-medium text-sm text-white">Ferulic Acid</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-yellow-500/30">
                                        <span className="font-medium text-sm text-white">Niacinamide</span>
                                        <span className="text-xs font-bold text-yellow-400 bg-yellow-900/40 px-3 py-1 rounded-md">CAUTION</span>
                                        <span className="font-medium text-sm text-white">Pure Vit C</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="order-1 lg:order-2">
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
                                        <p className="text-sm text-hikari-muted dark:text-gray-400">Scheduling algorithms to separate incompatible actives across different timeframes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4. Skin Quiz Scoring Engine */}
            <SectionWrapper id="quiz-scoring" className="bg-white dark:bg-transparent py-24 pb-16">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-hikari-orange/10 text-hikari-orange text-xs font-bold tracking-wider mb-6">
                                DIAGNOSTIC PROTOCOL
                            </span>
                            <h2 className="font-playfair font-bold text-4xl mb-4">Quiz Scoring Engine</h2>
                            <p className="text-hikari-muted dark:text-gray-400 text-lg mb-12">
                                Our diagnostic protocol does not rely on single-axis skin types. We deploy a multi-factor scoring system to build a comprehensive profile of your barrier function.
                            </p>
                            <div className="space-y-8">
                                {[
                                    { num: '01', title: 'Sebum Production Quotient', desc: 'Evaluating lipid secretion patterns to determine baseline requirements for emollients vs. astringents.' },
                                    { num: '02', title: 'Environmental Stress Rating', desc: 'Calculating required antioxidant protection by indexing local climate, UV exposure frequency, and urban density.' },
                                    { num: '03', title: 'Sensitivity Threshold Mapping', desc: 'Identifying barrier reactivity and past sensitization events to filter out high-risk botanical and synthetic compounds.' },
                                ].map(item => (
                                    <div key={item.num} className="flex gap-6 items-start">
                                        <div className="w-14 h-14 bg-hikari-clay dark:bg-white/5 rounded-2xl flex items-center justify-center text-hikari-orange shrink-0 font-bold text-lg font-playfair shadow-sm">
                                            {item.num}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                            <p className="text-sm text-hikari-muted dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop"
                                alt="Skin analysis and quiz"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-hikari-dark/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="text-xs font-bold tracking-widest uppercase text-hikari-orange mb-2">Multi-Factor Analysis</p>
                                <p className="font-playfair font-bold text-2xl">Personalized to your unique skin biology</p>
                            </div>
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
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?q=80&w=800&auto=format&fit=crop"
                                    alt="Scientific research"
                                    className="w-full h-full object-cover"
                                />
                            </div>
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
