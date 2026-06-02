import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    interactive?: boolean;
    padded?: boolean;
    bordered?: boolean;
    elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
    interactive = false,
    padded = true,
    bordered = true,
    elevated = false,
    className = '',
    children,
    ...rest
}) => {
    const cls = [
        'bg-white rounded-2xl',
        bordered ? 'border border-slate-200' : '',
        padded ? 'p-6' : '',
        elevated ? 'shadow-card' : '',
        interactive ? 'transition-all duration-200 hover:border-slate-300 hover:shadow-card-hover cursor-pointer' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={cls} {...rest}>
            {children}
        </div>
    );
};
