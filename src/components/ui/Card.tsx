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
                className={`bg-surface rounded-[28px] p-6 text-foreground border border-black/5 dark:border-white/5 ${className}`}
                {...props}
            >
                {/* No inner lighting gradients, keeping it clean and flat per Material You */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        );

        if (animate) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {CardContent}
                </motion.div>
            );
        }

        return CardContent;
    }
);

Card.displayName = 'Card';
