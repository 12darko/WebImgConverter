import React from 'react';

export interface DocsSidebarItem {
    id: string;
    label: string;
    href?: string;
    onClick?: () => void;
}

export interface DocsSidebarGroup {
    title?: string;
    items: DocsSidebarItem[];
}

interface DocsSidebarProps {
    groups: DocsSidebarGroup[];
    activeId: string;
    onChange?: (id: string) => void;
    headerSlot?: React.ReactNode;
    className?: string;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
    groups,
    activeId,
    onChange,
    headerSlot,
    className = '',
}) => {
    return (
        <aside className={`w-full lg:w-60 shrink-0 ${className}`}>
            <div className="lg:sticky lg:top-24 space-y-6">
                {headerSlot && <div>{headerSlot}</div>}
                {groups.map((group, gi) => (
                    <div key={gi}>
                        {group.title && (
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                                {group.title}
                            </div>
                        )}
                        <nav className="flex flex-col gap-0.5">
                            {group.items.map((item) => {
                                const active = item.id === activeId;
                                const cls = [
                                    'h-9 px-3 inline-flex items-center text-sm rounded-lg transition-colors text-left',
                                    active
                                        ? 'bg-brand-50 text-brand-700 font-semibold'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                                ].join(' ');

                                if (item.href) {
                                    return (
                                        <a key={item.id} href={item.href} className={cls}>
                                            {active && <span className="w-1 h-1 rounded-full bg-brand-500 mr-2" />}
                                            <span>{item.label}</span>
                                        </a>
                                    );
                                }

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => { item.onClick?.(); onChange?.(item.id); }}
                                        className={cls}
                                    >
                                        {active && <span className="w-1 h-1 rounded-full bg-brand-500 mr-2" />}
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                ))}
            </div>
        </aside>
    );
};
