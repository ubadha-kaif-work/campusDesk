import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-foreground/80 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary-500 transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300 ${icon ? 'pl-11' : ''} ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''} ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs text-red-400 ml-1 animate-pulse">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
