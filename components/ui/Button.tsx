import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    as?: 'button' | 'a';
    href?: string;
}

const variantClasses: Record<Variant, string> = {
    primary:
        'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-cta border border-brand-600/0 dark:bg-brand-600 dark:hover:bg-brand-500 dark:active:bg-brand-400 dark:shadow-none',
    secondary:
        'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-100 dark:border-slate-700/80 dark:hover:bg-slate-800 dark:hover:border-slate-600 dark:active:bg-slate-900',
    ghost:
        'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60 dark:active:bg-slate-800',
    outline:
        'bg-white text-brand-700 border border-brand-200 hover:border-brand-400 hover:bg-brand-50 dark:bg-slate-900/30 dark:text-brand-400 dark:border-brand-900/50 dark:hover:bg-brand-950/20 dark:hover:border-brand-500/80',
    dark:
        'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 dark:active:bg-slate-300',
};

const sizeClasses: Record<Size, string> = {
    sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
    md: 'h-10 px-4 text-sm rounded-xl gap-2',
    lg: 'h-12 px-6 text-[15px] rounded-xl gap-2',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', leftIcon, rightIcon, fullWidth, className = '', children, ...rest }, ref) => {
        const cls = [
            'inline-flex items-center justify-center font-semibold transition-all duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
            variantClasses[variant],
            sizeClasses[size],
            fullWidth ? 'w-full' : '',
            className,
        ].filter(Boolean).join(' ');

        return (
            <button ref={ref} className={cls} {...rest}>
                {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                <span>{children}</span>
                {rightIcon && <span className="shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);
Button.displayName = 'Button';
