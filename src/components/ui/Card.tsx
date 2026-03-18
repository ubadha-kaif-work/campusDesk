import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    animate?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', children, animate = false, ...props }, ref) => {

        const CardContent = (
            <div
                ref={ref}
                className={`glass-card rounded-2xl p-8 relative overflow-hidden ${className}`}
                {...props}
            >
                {/* Subtle inner gradient lighting */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        );

        if (animate) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {CardContent}
                </motion.div>
            );
        }

        return CardContent;
    }
);

Card.displayName = 'Card';
