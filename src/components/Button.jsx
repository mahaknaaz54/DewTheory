import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    onClick,
    type = 'button',
    icon = null
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hikari-orange focus:ring-opacity-50";

    const variants = {
        primary: "bg-hikari-orange text-white shadow-glow hover:bg-orange-600 hover:-translate-y-0.5",
        secondary: "bg-white text-hikari-text shadow-clay hover:shadow-clay-hover dark:bg-hikari-dark dark:text-white dark:border dark:border-white/10 dark:hover:bg-white/5",
        outline: "border-2 border-hikari-text text-hikari-text hover:bg-hikari-text hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-hikari-dark",
        ghost: "bg-transparent text-hikari-text hover:bg-hikari-clay dark:text-white dark:hover:bg-white/10"
    };

    const sizes = "px-8 py-3.5 text-sm uppercase tracking-wider";

    const appliedVariant = variants[variant] || variants.primary;
    const appliedWidth = fullWidth ? "w-full" : "";

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            type={type}
            className={`${baseStyles} ${sizes} ${appliedVariant} ${appliedWidth} ${className}`}
            onClick={onClick}
        >
            {children}
            {icon && <span className="ml-2">{icon}</span>}
        </motion.button>
    );
};

export default Button;
