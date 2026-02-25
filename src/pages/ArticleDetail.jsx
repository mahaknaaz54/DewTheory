import { Link } from 'react-router-dom';
import { ArrowRight, Share2, Facebook, Twitter } from 'lucide-react';
import Container from '../components/Container';
import SectionWrapper from '../components/SectionWrapper';

const ArticleDetail = () => {
    return (
        <div className="pt-0">

            {/* Hero Image */}
            <div className="relative w-full h-[60vh] md:h-[80vh] bg-hikari-dark">
                <img
                    src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop"
                    alt="Mountains at dawn"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hikari-dark via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p className="text-hikari-orange font-bold uppercase tracking-widest text-xs md:text-sm mb-4">
                        Philosophy · Rituals
                    </p>
                    <h1 className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                        The Ritual of <br /><span className="text-hikari-orange italic">Renewal</span>
                    </h1>
                    <p className="text-white/80 font-medium text-sm">
                        By Dr. Emi Nakamura <span className="mx-2">•</span> 8 Min Read
                    </p>
                </div>
            </div>

            <Container className="py-20">

                {/* Breadcrumb */}
                <div className="max-w-3xl mx-auto flex gap-2 text-xs font-bold uppercase tracking-widest mb-16 text-hikari-muted">
                    <Link to="/journal" className="hover:text-hikari-orange">Journal</Link>
                    <span>&gt;</span>
                    <span className="text-hikari-orange">Skincare Rituals</span>
                </div>

                {/* Article Body */}
                <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-playfair prose-headings:font-bold prose-a:text-hikari-orange prose-p:text-hikari-text dark:prose-p:text-gray-300">

                    <p className="text-2xl md:text-3xl font-playfair leading-relaxed italic text-hikari-text dark:text-white mb-10 border-l-4 border-hikari-orange pl-6">
                        "In the quiet moments before the sun breaks the horizon, there exists a profound opportunity for transformation. This is the essence of 'Shin-sei' — the Japanese art of renewal."
                    </p>

                    <p>
                        Modern life often demands constant output, leaving little space for internal replenishment required to maintain both physical radiance and mental clarity. At Dew Theory, we believe that skincare is more than a sequence of products; it is a sacred pause in the day, a physical manifestation of self-respect.
                    </p>

                    <h3 className="text-3xl mt-12 mb-6">The Foundations of Shin-sei</h3>

                    <p>
                        The ritual begins with cleansing, not merely as a hygienic necessity but as a symbolic shedding of the day's burdens. Our Zen Cleansing Oil utilizes cold-pressed Camellia Japonica seeds, an ingredient cherished by Geishas for centuries. It dissolves impurities while respecting the skin's delicate moisture barrier.
                    </p>

                    <div className="my-16 flex justify-center">
                        <h4 className="text-center font-playfair font-bold text-3xl md:text-4xl text-hikari-text dark:text-white max-w-2xl leading-snug">
                            <span className="text-hikari-orange text-5xl block mb-4">"</span>
                            True beauty is the reflection of a spirit that has found its center amidst the chaos.
                            <span className="block text-sm font-inter text-hikari-orange uppercase tracking-widest mt-6">
                                — Ancient Zen Proverb
                            </span>
                        </h4>
                    </div>

                    {/* Inline Ingredient Feature Card */}
                    <div className="my-16 bg-hikari-clay/50 dark:bg-white/5 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center justify-between border border-transparent dark:border-white/10 group">
                        <div className="w-full md:w-1/3 aspect-[4/5] rounded-2xl bg-white dark:bg-black/20 overflow-hidden relative shadow-clay">
                            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop" alt="Niacinamide" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="w-full md:w-2/3 not-prose">
                            <span className="text-hikari-orange font-bold text-xs uppercase tracking-widest mb-2 block">Featured Ingredient</span>
                            <h4 className="font-playfair font-bold text-3xl text-hikari-text dark:text-white mb-4">Niacinamide <br />(Vitamin B3)</h4>
                            <p className="text-hikari-muted dark:text-gray-400 mb-6">
                                The ultimate multi-tasker. It minimizes pore appearance, evens skin tone, and strengthens the skin barrier.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link to="/ingredients/niacinamide">
                                    <button className="bg-hikari-orange text-white px-8 py-3 rounded-xl font-bold hover:shadow-glow transition-all">
                                        Explore Science
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-3xl mt-12 mb-6">Embracing the Evening</h3>

                    <p>
                        As the light fades, the skin enters its peak restorative phase. Application should be deliberate. Use the warmth of your fingertips to press — not rub — the product into the skin. This stimulates lymphatic drainage and ensures deeper penetration of the bioactive compounds.
                    </p>

                    <div className="grid grid-cols-2 gap-4 my-10 not-prose">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-hikari-clay">
                            <img src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800&auto=format&fit=crop" alt="Applying cream" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-hikari-clay">
                            <img src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop" alt="Zen Garden" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <p>
                        By aligning our habits with the natural rhythms of the Earth, we achieve a glow that is more than skin deep. It is a luminosity born of balance, persistence, and the quiet power of the Dew Theory ritual.
                    </p>

                </article>

                {/* Author & Share */}
                <div className="max-w-3xl mx-auto mt-20 pt-10 border-t border-hikari-clay dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Dr. Emi Nakamura" className="w-14 h-14 rounded-full object-cover border-2 border-hikari-clay dark:border-white/20" />
                        <div>
                            <h5 className="font-bold text-hikari-text dark:text-white">Dr. Emi Nakamura</h5>
                            <p className="text-xs text-hikari-muted dark:text-gray-400">Lead Formulator & Holistic Wellness Expert</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full border border-hikari-clay dark:border-white/10 flex items-center justify-center text-hikari-muted hover:text-hikari-orange hover:border-hikari-orange transition-colors">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>

            </Container>


            {/* Related Articles */}
            <SectionWrapper id="related" className="bg-hikari-clay/30 dark:bg-white/5 py-24">
                <Container>
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-hikari-orange font-bold text-xs uppercase tracking-widest mb-2">Explore More</p>
                            <h2 className="font-playfair font-bold text-4xl">Continue Your Journey</h2>
                        </div>
                        <Link to="/journal" className="hidden md:flex items-center text-hikari-orange font-medium hover:gap-3 transition-all">
                            View All Articles <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="group cursor-pointer">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-white dark:bg-black/20 px-10 pt-10 flex items-end justify-center pt-8">
                                <img src="https://images.unsplash.com/photo-1512496015851-a1cbfb9fb9cd?q=80&w=800&auto=format&fit=crop" alt="Face" className="w-full h-auto object-cover rounded-t-2xl group-hover:translate-y-2 transition-transform duration-700" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-hikari-orange mb-2">Technique</p>
                            <h4 className="font-playfair font-bold text-2xl mb-2 group-hover:text-hikari-orange transition-colors">The Art of Kobido Massage</h4>
                            <p className="text-sm text-hikari-muted dark:text-gray-400 line-clamp-2">Learn the 500-year-old technique for naturally lifting and firming facial contours.</p>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-black">
                                <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop" alt="Tea" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-hikari-orange mb-2">Ingredients</p>
                            <h4 className="font-playfair font-bold text-2xl mb-2 group-hover:text-hikari-orange transition-colors">Botanical Alchemy: Green Tea</h4>
                            <p className="text-sm text-hikari-muted dark:text-gray-400 line-clamp-2">Why Matcha is the ultimate antioxidant shield for modern urban skin.</p>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-black">
                                <img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=800&auto=format&fit=crop" alt="Meditation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-hikari-orange mb-2">Mindfulness</p>
                            <h4 className="font-playfair font-bold text-2xl mb-2 group-hover:text-hikari-orange transition-colors">Morning Zen: A 5-Minute Guide</h4>
                            <p className="text-sm text-hikari-muted dark:text-gray-400 line-clamp-2">Reset your nervous system before starting your daily skincare routine.</p>
                        </div>

                    </div>
                </Container>
            </SectionWrapper>

        </div>
    );
};

export default ArticleDetail;
