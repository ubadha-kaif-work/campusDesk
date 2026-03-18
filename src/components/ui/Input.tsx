import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label className="text-sm font-medium text-foreground ml-2">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-600 transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        // Use fully rounded, filled-style input matching Material 3 Search bars
                        className={`w-full bg-surface-container rounded-full px-5 py-4 text-foreground placeholder-gray-500 focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary-600 transition-all duration-200 border border-transparent focus:border-transparent ${icon ? 'pl-12' : ''} ${error ? 'ring-2 ring-red-500' : ''} ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs text-red-500 ml-2 mt-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
