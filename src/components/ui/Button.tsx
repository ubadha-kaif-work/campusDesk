import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tonal' | 'text';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {

        const baseStyles = "relative overflow-hidden font-medium rounded-full px-6 py-3 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-primary-600 text-white hover:bg-primary-700",
            secondary: "bg-white text-gray-800 border border-gray-300 dark:bg-[#1e1f20] dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#282a2c]",
            tonal: "bg-primary-100 text-primary-700 dark:bg-primary-600/20 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-600/30",
            text: "bg-transparent text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-600/10"
        };

        // Fallback for glass variant
        const actualVariant = (variant as string) === 'glass' ? 'tonal' : variant;

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                className={`${baseStyles} ${variants[actualVariant as keyof typeof variants]} ${className}`}
                disabled={isLoading || props.disabled}
                {...(props as HTMLMotionProps<"button">)}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
