import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'glass';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {

        const baseStyles = "relative overflow-hidden font-medium rounded-xl px-6 py-3 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-primary-600 text-white hover:bg-primary-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-primary-500/50",
            secondary: "bg-white/10 text-foreground hover:bg-white/20 border border-white/10 backdrop-blur-md",
            glass: "glass text-foreground hover:bg-white/10"
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                disabled={isLoading || props.disabled}
                {...(props as HTMLMotionProps<"button">)}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
