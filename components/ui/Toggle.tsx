import React from 'react';

interface ToggleProps {
    checked: boolean;
    onChange: (v: boolean) => void;
    label?: string;
    description?: string;
    disabled?: boolean;
    className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description, disabled, className = '' }) => {
    return (
        <label className={`flex items-center justify-between gap-4 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="min-w-0 flex-1">
                {label && <div className="text-sm font-semibold text-slate-800">{label}</div>}
                {description && <div className="text-xs text-slate-500 mt-0.5">{description}</div>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={[
                    'relative inline-flex shrink-0 h-6 w-11 rounded-full transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2',
                    checked ? 'bg-brand-500' : 'bg-slate-200',
                ].join(' ')}
            >
                <span
                    className={[
                        'inline-block h-5 w-5 transform rounded-full bg-white shadow-card transition-transform duration-200 mt-0.5',
                        checked ? 'translate-x-5' : 'translate-x-0.5',
                    ].join(' ')}
                />
            </button>
        </label>
    );
};
