import React from 'react';

interface TabItem {
    id: string;
    label: string;
    badge?: string | number;
}

interface TabsProps {
    items: TabItem[];
    active: string;
    onChange: (id: string) => void;
    variant?: 'underline' | 'pill';
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, active, onChange, variant = 'underline', className = '' }) => {
    if (variant === 'pill') {
        return (
            <div className={`inline-flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-card ${className}`}>
                {items.map((it) => (
                    <button
                        key={it.id}
                        onClick={() => onChange(it.id)}
                        className={[
                            'px-4 h-9 rounded-full text-sm font-semibold transition-all',
                            active === it.id ? 'bg-brand-500 text-white' : 'text-slate-500 hover:text-slate-700',
                        ].join(' ')}
                    >
                        {it.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {items.map((it) => {
                const isActive = active === it.id;
                return (
                    <button
                        key={it.id}
                        onClick={() => onChange(it.id)}
                        className={[
                            'relative inline-flex items-center gap-1.5 h-10 px-3 text-sm font-semibold transition-colors',
                            isActive ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900',
                        ].join(' ')}
                    >
                        {it.label}
                        {it.badge != null && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{it.badge}</span>
                        )}
                        {isActive && (
                            <span className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-brand-500" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
