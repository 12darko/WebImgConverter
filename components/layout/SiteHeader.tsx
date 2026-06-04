import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { useLanguage, useLocalizedPath } from '../../LanguageContext';

interface NavItem {
    labelKey: string;
    path: string;
}

const NAV_ITEMS: NavItem[] = [
    { labelKey: 'nav_tools', path: '/tools' },
    { labelKey: 'nav_pricing', path: '/pricing' },
    { labelKey: 'nav_blog', path: '/blog' },
];

interface SiteHeaderProps {
    onSignIn?: () => void;
    onCta?: () => void;
    ctaLabel?: string;
    showCta?: boolean;
    session?: any;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
    onSignIn,
    onCta,
    ctaLabel,
    showCta = true,
    session,
}) => {
    const { t } = useLanguage();
    const location = useLocation();
    const localizedPath = useLocalizedPath();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const isActive = (path: string) => {
        const localized = localizedPath(path);
        if (localized === '/' || localized === '/en' || localized === '/de' || localized === '/fr') {
            return location.pathname === localized || location.pathname === localized + '/';
        }
        return location.pathname.startsWith(localized);
    };

    return (
        <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
                <Logo />

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={localizedPath(item.path)}
                                className={[
                                    'relative h-10 px-3 inline-flex items-center text-sm font-semibold transition-colors',
                                    active ? 'text-brand-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                                ].join(' ')}
                            >
                                {t(item.labelKey)}
                                {active && (
                                    <span className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-brand-500" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side actions */}
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2 h-10 inline-flex items-center transition-colors text-lg"
                        title={isDark ? "Aydınlık Mod" : "Karanlık Mod"}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>
                    {session ? (
                        <Link
                            to={localizedPath('/profile')}
                            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 px-3 h-10 inline-flex items-center transition-colors"
                        >
                            {t('nav_profile')} ({session.user.email?.split('@')[0]})
                        </Link>
                    ) : (
                        <button
                            onClick={onSignIn}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 h-10 inline-flex items-center transition-colors"
                        >
                            {t('nav_login')}
                        </button>
                    )}
                    {showCta && (
                        <Button onClick={onCta} size="md">
                            {ctaLabel || t('nav_tools')}
                        </Button>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.path}
                                to={localizedPath(item.path)}
                                onClick={() => setMobileOpen(false)}
                                className={[
                                    'h-11 px-3 inline-flex items-center text-sm font-semibold rounded-xl transition-colors',
                                    isActive(item.path) ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
                                ].join(' ')}
                            >
                                {t(item.labelKey)}
                            </Link>
                        ))}
                        <div className="flex gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={toggleTheme}
                                className="h-10 px-4 text-lg border border-slate-200 dark:border-slate-700 rounded-xl"
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>
                            {session ? (
                                <Link
                                    to={localizedPath('/profile')}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1 h-10 flex items-center justify-center text-sm font-semibold text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700 rounded-xl"
                                >
                                    {session.user.user_metadata?.full_name?.split(' ')[0] || session.user.email?.split('@')[0]}
                                </Link>
                            ) : (
                                <button
                                    onClick={onSignIn}
                                    className="flex-1 h-10 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl"
                                >
                                    {t('nav_login')}
                                </button>
                            )}
                            {showCta && (
                                <Button onClick={onCta} size="md" fullWidth>
                                    {ctaLabel || t('nav_tools')}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
