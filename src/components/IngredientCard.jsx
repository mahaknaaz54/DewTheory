import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import IngredientMockup from './IngredientMockup';

const IngredientCard = ({ ingredient }) => {
    return (
        <Link to={`/ingredients/${ingredient.slug || ingredient.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative bg-white dark:bg-white/5 rounded-3xl p-5 shadow-sm hover:shadow-glow dark:border dark:border-white/10 transition-all duration-500 flex flex-col h-full cursor-pointer"
            >
                {/* Ingredient Image Mockup */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 flex items-center justify-center group/mockup">
                    <IngredientMockup ingredient={ingredient} className="absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2 z-30">
                        {ingredient.safeForPregnancy && (
                            <span className="text-white text-[10px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-center">
                                Pregnancy Safe
                            </span>
                        )}
                        <span className="text-white font-medium text-sm text-center">
                            Explore Science
                        </span>
                    </div>
                </div>
                {/* Info */}
                <div className="flex flex-col flex-1 text-center px-2">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-hikari-orange mb-1">
                        {ingredient.category}
                    </p>
                    <h3 className="font-playfair font-bold text-xl md:text-2xl mb-1 text-hikari-text dark:text-white group-hover:text-hikari-orange transition-colors">
                        {ingredient.name}
                    </h3>
                    <p className="text-[10px] text-hikari-muted dark:text-gray-400 font-mono tracking-wider mb-4">
                        INCI: {ingredient.inciName}
                    </p>

                    <p className="text-hikari-muted dark:text-gray-300 text-sm flex-1 leading-relaxed">
                        {ingredient.benefits?.[0]} — {ingredient.description?.substring(0, 60)}...
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};

export default IngredientCard;
