import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage, useLocalizedPath } from '../../LanguageContext';

interface UserMenuProps {
    session: any;
    stats: any;
    onSignOut: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ session, stats, onSignOut }) => {
    const { t } = useLanguage();
    const localizedPath = useLocalizedPath();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!session?.user) return null;

    const email = session.user.email || '';
    const username = email.split('@')[0];
    const initial = username.charAt(0).toUpperCase();
    const isPremium = stats?.isPremium || false;
    const credits = stats?.credits ?? 0;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-850/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm hover:shadow active:scale-95 outline-none"
                aria-label="User menu"
            >
                {/* Avatar Circle with initial */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-sm select-none">
                    {initial}
                </div>
                {/* Email / Username and Credits (Desktop only) */}
                <div className="hidden md:flex flex-col items-start text-left leading-none">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[90px] truncate">{username}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                        {isPremium ? (stats.premiumTier === 'business' ? 'Business' : 'Premium') : `${credits} Kredi`}
                    </span>
                </div>
                {/* Arrow */}
                <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-600 dark:text-slate-350' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-2xl p-2 z-50 animate-[fadeIn_0.15s_ease-out] flex flex-col gap-0.5">
                    {/* Header */}
                    <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1.5 text-left">
                        <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">{t('account') || 'Hesap'}</p>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5" title={email}>{email}</p>
                        {isPremium ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/20 dark:text-brand-400 border border-brand-100/50 dark:border-brand-900/50 px-2 py-0.5 rounded-md mt-1.5 uppercase select-none">
                                👑 {stats.premiumTier || 'Premium'}
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/40 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50 px-2 py-0.5 rounded-md mt-1.5 uppercase select-none">
                                {t('free_plan') || 'Ücretsiz Plan'}
                            </span>
                        )}
                    </div>

                    {/* Credits/Usage info */}
                    <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-100/50 dark:border-slate-850/40 mx-1 mb-2 text-left">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">{t('credits_label') || 'Krediler'}</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{stats?.premiumTier === 'business' ? '∞' : credits}</span>
                        </div>
                        {!isPremium && (
                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-brand-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (credits / 25) * 100)}%` }} />
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <Link
                        to={localizedPath('/profile')}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                    >
                        👤 {t('profile_title') || 'Profilim'}
                    </Link>
                    {!isPremium && (
                        <Link
                            to={localizedPath('/pricing')}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50/50 dark:hover:bg-brand-950/20 transition-colors text-left"
                        >
                            ⚡ {t('profile_upgrade_btn') || 'Premium\'a Yükselt'}
                        </Link>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

                    {/* Logout */}
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onSignOut();
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/15 transition-colors text-left w-full outline-none"
                    >
                        🚪 {t('logout_btn') || 'Çıkış Yap'}
                    </button>
                </div>
            )}
        </div>
    );
};
