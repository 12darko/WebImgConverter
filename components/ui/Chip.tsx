import React from 'react';

interface ChipProps {
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    badge?: string;
    fullWidth?: boolean;
    className?: string;
}

export const Chip: React.FC<ChipProps> = ({ active, disabled, onClick, children, badge, fullWidth, className = '' }) => {
    const cls = [
        'inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold transition-all duration-150',
        'border',
        active
            ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.4)]'
            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        fullWidth ? 'w-full' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button type="button" onClick={onClick} disabled={disabled} className={cls}>
            <span>{children}</span>
            {badge && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-brand-500 text-white text-[10px] font-bold leading-none uppercase tracking-wider">
                    {badge}
                </span>
            )}
        </button>
    );
};
