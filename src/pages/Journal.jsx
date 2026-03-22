import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';

const Journal = () => {
    return (
        <div className="pt-8">

            {/* Featured Hero Article */}
            <Container>
                <div className="relative rounded-[2.5rem] overflow-hidden min-h-[60vh] flex items-center mb-24 cursor-pointer group">
                    <img
                        src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000&auto=format&fit=crop"
                        alt="Cherry blossoms"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                    <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-3xl text-white">
                        <span className="inline-block px-3 py-1 bg-hikari-orange text-white text-xs font-bold uppercase tracking-widest mb-6 rounded-md">
                            Featured Story
                        </span>
                        <h1 className="font-playfair font-bold text-5xl md:text-7xl leading-tight mb-6">
                            The Art of <br />
                            <span className="text-hikari-orange italic">Double Cleansing</span>
                        </h1>
                        <p className="text-lg text-white/80 mb-8 max-w-xl line-clamp-2 md:line-clamp-none">
                            Discover the foundational Japanese ritual for luminous, clear skin that bridges ancient tradition and modern science.
                        </p>
                        <Link to="/article" className="inline-flex items-center text-sm font-bold tracking-widest uppercase border-b-2 border-white pb-1 hover:text-hikari-orange hover:border-hikari-orange transition-colors">
                            Read The Article <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </Container>


            {/* Ingredient Spotlight Strip */}
            <SectionWrapper id="ingredients" className="py-12 bg-hikari-clay/30 dark:bg-white/5 overflow-hidden">
                <Container>
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="font-playfair font-bold text-3xl mb-2">Ingredient Spotlight</h2>
                            <p className="text-hikari-muted dark:text-gray-400">Potent botanicals harvested for radiance.</p>
                        </div>
                        <div className="flex gap-2 hidden md:flex">
                            <button className="w-10 h-10 rounded-full border border-hikari-text/20 dark:border-white/20 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-hikari-text/20 dark:border-white/20 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Sakura Extract', sub: 'Soothing & Brightening', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop' },
                            { title: 'Pure Vitamin C', sub: 'Antioxidant Power', img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=600&auto=format&fit=crop' },
                            { title: 'Fermented Rice Bran', sub: 'Smooth Texture', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop' },
                            { title: 'Uji Matcha', sub: 'Detoxifying Therapy', img: 'https://images.unsplash.com/photo-1582787869325-1e4df6a8eec3?q=80&w=600&auto=format&fit=crop' }
                        ].map((ing, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-4 bg-white dark:bg-black/20">
                                    <img src={ing.img} alt={ing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <h3 className="font-bold text-lg">{ing.title}</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-hikari-orange mt-1">{ing.sub}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* Latest Articles */}
            <SectionWrapper id="latest">
                <Container>
                    <h2 className="font-playfair font-bold text-4xl mb-12">Latest From The Journal</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Main Featured Sub-Article */}
                        <div className="lg:col-span-8 flex flex-col group cursor-pointer">
                            <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-6 bg-hikari-clay">
                                <img
                                    src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200&auto=format&fit=crop"
                                    alt="Zen Garden"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-hikari-orange mb-3">
                                <span>Mindfulness</span>
                                <span className="w-1 h-1 rounded-full bg-hikari-orange"></span>
                                <span className="text-hikari-muted dark:text-gray-500">8 min read</span>
                            </div>
                            <h3 className="font-playfair font-bold text-3xl md:text-4xl mb-4 group-hover:text-hikari-orange transition-colors">
                                Skin-Deep Meditation: The Soul of Skincare
                            </h3>
                            <p className="text-hikari-muted dark:text-gray-400 text-lg mb-6 line-clamp-2">
                                In Japanese culture, skincare is not a chore but a moment of 'ma' — the space between. Learn how to transform your evening routine into a meditative practice...
                            </p>
                            <Link to="/article" className="text-sm font-bold tracking-widest uppercase hover:text-hikari-orange transition-colors inline-flex items-center gap-2">
                                Continue Reading <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Sidebar Articles */}
                        <div className="lg:col-span-4 flex flex-col gap-10">

                            <div className="group cursor-pointer">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-hikari-clay">
                                    <img src="https://images.unsplash.com/photo-1615397323758-c0b0ee31288c?q=80&w=600&auto=format&fit=crop" alt="Morning vs Night" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-hikari-orange mb-2">Rituals</p>
                                <h4 className="font-playfair font-bold text-2xl mb-2 group-hover:text-hikari-orange transition-colors">Morning vs. Night: The Circadian Rhythm of Skin</h4>
                                <p className="text-sm text-hikari-muted dark:text-gray-400 line-clamp-2">Optimizing your ingredient absorption based on the sun's cycle...</p>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-hikari-clay">
                                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop" alt="Water" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-hikari-orange mb-2">Essays</p>
                                <h4 className="font-playfair font-bold text-2xl mb-2 group-hover:text-hikari-orange transition-colors">The Science of Hydration: Water as a Healer</h4>
                                <p className="text-sm text-hikari-muted dark:text-gray-400 line-clamp-2">Understanding the molecular weight of hyaluronic acid...</p>
                            </div>

                        </div>

                    </div>
                </Container>
            </SectionWrapper>

            {/* Newsletter Block */}
            <Container className="pb-32">
                <div className="bg-hikari-dark rounded-[2.5rem] p-12 text-center text-white border-2 border-hikari-orange/20 shadow-glow relative overflow-hidden">
                    <div className="absolute inset-x-0 -top-40 h-80 bg-hikari-orange/30 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <svg className="w-8 h-8 mx-auto mb-6 text-hikari-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <h2 className="font-playfair font-bold text-4xl mb-4">Enter The Inner Sanctum</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Subscribe to receive seasonal skincare guides, exclusive access to new rituals, and mindfulness prompts delivered to your inbox.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 bg-white/5 border border-white/10 focus:border-white/30 rounded-full px-6 py-4 text-white placeholder-gray-500 outline-none transition-all"
                                required
                            />
                            <Button type="submit" className="whitespace-nowrap sm:w-auto w-full">Join The Ritual</Button>
                        </form>
                        <p className="text-xs text-gray-500 mt-6 uppercase tracking-widest">
                            By joining, you agree to our private skincare policy.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Journal;
