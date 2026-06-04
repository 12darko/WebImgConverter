import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useLanguage, useLocalizedPath } from '../../LanguageContext';

interface FooterLink {
    labelKey: string;
    path: string;
}

const FOOTER_LINKS: FooterLink[] = [
    { labelKey: 'footer_privacy', path: '/privacy' },
    { labelKey: 'footer_terms', path: '/terms' },
    { labelKey: 'footer_contact', path: '/support' },
    { labelKey: 'footer_about', path: '/about' },
];

export const SiteFooter: React.FC = () => {
    const { t } = useLanguage();
    const localizedPath = useLocalizedPath();

    return (
        <footer className="mt-auto">
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Logo size={16} />
                        <span className="hidden sm:inline">·</span>
                        <span>© {new Date().getFullYear()} WebImgConverter Inc. {t('footer_rights')}</span>
                    </div>
                    <nav className="flex items-center gap-5 text-xs">
                        {FOOTER_LINKS.map((l) => (
                            <Link
                                key={l.path}
                                to={localizedPath(l.path)}
                                className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors uppercase tracking-wider font-semibold"
                            >
                                {t(l.labelKey)}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
};
