import { motion } from 'framer-motion';

const SectionWrapper = ({ id, children, className = '', dark = false }) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`py-20 md:py-32 ${dark ? 'bg-hikari-dark text-hikari-cream' : 'bg-transparent text-hikari-text dark:text-hikari-cream'} ${className}`}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
