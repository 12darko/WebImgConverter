import React from 'react';

interface BillingToggleProps {
    value: 'monthly' | 'annually';
    onChange: (v: 'monthly' | 'annually') => void;
    saveLabel?: string;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ value, onChange, saveLabel = 'Save 20%' }) => {
    return (
        <div className="inline-flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1 shadow-card dark:shadow-none">
            <button
                type="button"
                onClick={() => onChange('monthly')}
                className={[
                    'px-5 h-9 rounded-full text-sm font-semibold transition-all',
                    value === 'monthly' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                ].join(' ')}
            >
                Monthly
            </button>
            <button
                type="button"
                onClick={() => onChange('annually')}
                className={[
                    'px-5 h-9 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-2',
                    value === 'annually' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                ].join(' ')}
            >
                Annually
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-500 text-white">{saveLabel}</span>
            </button>
        </div>
    );
};
