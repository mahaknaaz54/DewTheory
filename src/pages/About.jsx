import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionWrapper from '../components/SectionWrapper';
import Button from '../components/Button';

const About = () => {
    return (
        <div className="bg-white dark:bg-hikari-dark text-hikari-text dark:text-hikari-cream min-h-screen pt-20">

            {/* 1. Hero Section */}
            <Container className="py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-hikari-orange font-bold text-sm tracking-widest uppercase mb-6">Ingredient Intelligence</p>
                        <h1 className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
                            The Science Behind<br />
                            <span className="text-hikari-orange">Better Skin</span>
                        </h1>
                        <p className="text-lg text-hikari-text/80 dark:text-white/80 max-w-lg mb-12 leading-relaxed font-inter">
                            We believe skincare is a science, not a secret. By understanding exactly what goes onto your skin, you can build a ritual that truly works for you.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/ingredients">
                                <Button>Explore Library</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1541391882-09f8d5d41a70?q=80&w=1000&auto=format&fit=crop"
                                alt="Skincare science close up"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -left-6 bg-hikari-orange text-white px-6 py-4 rounded-2xl shadow-glow font-bold">
                            <p className="text-3xl font-playfair">90+</p>
                            <p className="text-xs tracking-widest uppercase opacity-80">Ingredients Decoded</p>
                        </div>
                    </div>
                </div>
            </Container>

            {/* 2. Philosophy Section */}
            <SectionWrapper id="philosophy" className="border-t border-black/10 dark:border-white/10 py-24 bg-hikari-clay/30 dark:bg-black/20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-playfair font-bold text-5xl mb-2">Our Philosophy:</h2>
                            <h3 className="font-playfair font-bold text-4xl text-hikari-orange italic mb-10">Ingredients Over Products</h3>
                            <p className="text-lg text-hikari-text/80 dark:text-white/80 max-w-lg leading-relaxed font-inter mb-6">
                                The beauty industry thrives on endless product cycles, convincing you that the next miracle jar is the answer. We believe that chasing products is a flawed approach.
                            </p>
                            <p className="text-lg text-hikari-text/80 dark:text-white/80 max-w-lg leading-relaxed font-inter">
                                True skin transformation happens when you understand <span className="font-bold">ingredients</span>. By shifting the focus from brand marketing to clinical science, we empower you to decode your skincare and give your skin exactly what it needs.
                            </p>
                        </div>
                        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1556228724-dba3dff6cf7f?q=80&w=1200&auto=format&fit=crop"
                                alt="Natural skincare philosophy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/20 w-fit">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                    <span className="font-bold tracking-widest uppercase text-sm">Evidence Based</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. What We Do */}
            <SectionWrapper id="what-we-do" className="py-24">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="font-playfair font-bold text-4xl mb-6">The Intelligence Engine</h2>
                        <p className="text-hikari-text/70 dark:text-white/70 max-w-2xl mx-auto font-inter">
                            We bridge the gap between complex dermatological research and your daily routine. Here is how our system works for you.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=600&auto=format&fit=crop',
                                title: 'Structured Logic',
                                desc: 'A centralized, easy-to-navigate database classifying ingredients by category, target concern, and clinical safety scores.',
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop',
                                title: 'Compatibility Detection',
                                desc: 'Our conflict engine instantly identifies harmful combinations and powerful synergies before they touch your skin.',
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop',
                                title: 'Routine Intelligence',
                                desc: 'Personalised architecture for your morning and evening rituals, built dynamically based on your unique skin profile.',
                            }
                        ].map((item) => (
                            <div key={item.title} className="flex flex-col rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-clay dark:shadow-none overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-8">
                                    <h3 className="font-playfair font-bold text-2xl mb-4">{item.title}</h3>
                                    <p className="text-hikari-text/70 dark:text-white/70 font-inter text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4. How It Works Section */}
            <SectionWrapper id="how-it-works" className="py-24 bg-hikari-clay/30 dark:bg-black/20 border-t border-black/5 dark:border-white/10">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=1000&auto=format&fit=crop"
                                alt="Skincare architecture"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-hikari-dark/70 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 text-white">
                                <p className="font-playfair font-bold text-2xl">Architecture of Safety</p>
                                <p className="text-white/60 text-sm mt-2">Three pillars of our scoring system</p>
                            </div>
                        </div>
                        <div className="max-w-2xl">
                            <h2 className="font-playfair font-bold text-4xl mb-12">The Architecture of Safety</h2>
                            <div className="space-y-12">
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-full bg-hikari-orange flex items-center justify-center font-bold text-white shrink-0 mt-1 shadow-glow">1</div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-3 text-hikari-text dark:text-white">Safety-First Scoring</h4>
                                        <p className="text-hikari-text/70 dark:text-white/70 font-inter">Every ingredient in our database is evaluated against aggregate clinical data. We calculate safety scores based on comedogenic ratings, irritation potential, and long-term barrier impact.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-full bg-hikari-orange flex items-center justify-center font-bold text-white shrink-0 mt-1 shadow-glow">2</div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-3 text-hikari-text dark:text-white">The Conflict Engine</h4>
                                        <p className="text-hikari-text/70 dark:text-white/70 font-inter">Skincare isn't just about what you use, but how you combine it. Mixing Retinol with Vitamin C or layering multiple exfoliating acids can damage your skin. Our engine flags these conflicts automatically.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-full bg-hikari-orange flex items-center justify-center font-bold text-white shrink-0 mt-1 shadow-glow">3</div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-3 text-hikari-text dark:text-white">Data-Driven Personalisation</h4>
                                        <p className="text-hikari-text/70 dark:text-white/70 font-inter">Through our Comprehensive Skin Quiz, we build a multi-variable profile of your skin state, genetic predispositions, and current environments to recommend precise active ingredients.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. Vision / CTA Section */}
            <SectionWrapper id="vision" className="py-24">
                <Container className="text-center">
                    <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-hikari-dark to-black p-12 md:p-20 text-white relative overflow-hidden shadow-2xl border border-white/10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-hikari-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-hikari-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                        <div className="relative z-10">
                            <h2 className="font-playfair font-bold text-4xl md:text-6xl mb-6">Explore the Database</h2>
                            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-inter">
                                We are continuously expanding Dew Theory to become the world's most comprehensive, accessible ingredient intelligence platform. Start your journey today.
                            </p>
                            <Link to="/ingredients">
                                <Button variant="primary" className="text-lg px-10 py-4 shadow-glow">Access Library</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

        </div>
    );
};

export default About;
