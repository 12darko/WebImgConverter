import React from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (value: string) => void;
    buttonLabel?: string;
    icon?: React.ReactNode;
    sizeVariant?: 'md' | 'lg';
}

const SearchIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
    </svg>
);

export const SearchInput: React.FC<SearchInputProps> = ({
    onSearch,
    buttonLabel = 'Search',
    icon = SearchIcon,
    sizeVariant = 'md',
    className = '',
    placeholder = 'Search...',
    ...rest
}) => {
    const [value, setValue] = React.useState((rest.defaultValue as string) || '');
    const sizeStyles = sizeVariant === 'lg' ? 'h-14 pr-1 pl-5 text-[15px]' : 'h-12 pr-1 pl-4 text-sm';
    const btnSize = sizeVariant === 'lg' ? 'h-12 px-6 text-sm' : 'h-10 px-5 text-sm';

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSearch?.(value);
            }}
            className={`flex items-center w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card dark:shadow-none focus-within:border-brand-400 dark:focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all ${sizeStyles} ${className}`}
        >
            <span className="text-slate-400 dark:text-slate-500 mr-3">{icon}</span>
            <input
                {...rest}
                value={value}
                onChange={(e) => { setValue(e.target.value); rest.onChange?.(e); }}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100 min-w-0"
            />
            <button
                type="submit"
                className={`shrink-0 inline-flex items-center justify-center font-semibold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500 dark:active:bg-brand-400 rounded-xl transition-colors ${btnSize}`}
            >
                {buttonLabel}
            </button>
        </form>
    );
};
