import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, leftAddon, rightAddon, className = '', ...rest }, ref) => {
        return (
            <div className="w-full">
                {label && <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>}
                <div className={[
                    'flex items-center w-full bg-white border rounded-xl transition-all',
                    'h-11 px-3.5',
                    error ? 'border-rose-300 focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-500/10' : 'border-slate-200 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/10',
                ].join(' ')}>
                    {leftAddon && <span className="text-slate-400 mr-2 text-sm">{leftAddon}</span>}
                    <input
                        ref={ref}
                        {...rest}
                        className={`flex-1 bg-transparent outline-none placeholder:text-slate-400 text-sm text-slate-900 min-w-0 ${className}`}
                    />
                    {rightAddon && <span className="text-slate-400 ml-2 text-xs">{rightAddon}</span>}
                </div>
                {error && <div className="text-xs text-rose-600 mt-1">{error}</div>}
                {hint && !error && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
            </div>
        );
    }
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = '', ...rest }, ref) => {
        return (
            <div className="w-full">
                {label && <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>}
                <textarea
                    ref={ref}
                    {...rest}
                    className={[
                        'w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none resize-y transition-all',
                        'placeholder:text-slate-400',
                        error ? 'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10' : 'border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10',
                        className,
                    ].join(' ')}
                />
                {error && <div className="text-xs text-rose-600 mt-1">{error}</div>}
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';
