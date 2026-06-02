import React from 'react';

type BadgeTone = 'brand' | 'mint' | 'slate' | 'warning' | 'red' | 'dark';

interface BadgeProps {
    tone?: BadgeTone;
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
    brand: 'bg-brand-500 text-white',
    mint: 'bg-brand-50 text-brand-700 border border-brand-200',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    red: 'bg-rose-50 text-rose-700 border border-rose-200',
    dark: 'bg-slate-900 text-white',
};

export const Badge: React.FC<BadgeProps> = ({ tone = 'mint', children, icon, className = '' }) => {
    const cls = [
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider',
        toneClasses[tone],
        className,
    ].join(' ');
    return (
        <span className={cls}>
            {icon}
            {children}
        </span>
    );
};
