import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';
import { Button } from '../components/ui/Button';
import { supabase, getUserProfile } from '../services/supabase';
import { useLanguage } from '../LanguageContext';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        credits: 0,
        totalConverted: 0,
        isPremium: false,
        premiumTier: 'free'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/');
                return;
            }
            setUser(session.user);

            try {
                // Get proper profile mapped data (credits, tier, etc.)
                const profile = await getUserProfile(session.user.id);
                
                // Fetch actual conversion count from history
                const { count } = await supabase
                    .from('vormpixize_conversion_history')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', session.user.id);

                if (profile && !profile.requiresActivation) {
                    setStats({
                        credits: profile.credits || 0,
                        totalConverted: count || 0,
                        isPremium: profile.isPremium || false,
                        premiumTier: profile.premiumTier || 'free'
                    });
                }
            } catch(e) {
                console.error('Error fetching profile:', e);
            }
            setLoading(false);
        }

        fetchProfile();
    }, [navigate]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) {
        return (
            <SiteShell>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                </div>
            </SiteShell>
        );
    }

    return (
        <SiteShell>
            <Helmet>
                <title>{t('profile_title')} | WebImgConverter</title>
                <meta name="description" content={t('profile_seo_desc')} />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <section className="bg-slate-50/50 dark:bg-slate-950/40 min-h-[80vh] py-12 md:py-20 border-t border-slate-100 dark:border-slate-800/80">
                <div className="max-w-3xl mx-auto px-5 md:px-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                        {/* Header */}
                        <div className="bg-slate-950 px-8 py-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
                            <h1 className="text-3xl font-bold font-serif mb-2 relative z-10">{t('profile_title')}</h1>
                            <p className="text-slate-300 dark:text-slate-400 text-sm relative z-10">{t('profile_desc')}</p>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Profil Bilgileri */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-500">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        {t('profile_info')}
                                    </h2>
                                    <div className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800/60 space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('profile_email')}</label>
                                            <p className="text-slate-900 dark:text-white font-medium">{user?.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('profile_id')}</label>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{user?.id}</p>
                                        </div>
                                        <div className="pt-2">
                                            <button onClick={handleSignOut} className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors">
                                                {t('profile_logout')}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Üyelik Durumu */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500 dark:text-brand-400">
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                        {t('profile_membership')}
                                    </h2>
                                    <div className="bg-brand-50/50 dark:bg-brand-950/10 rounded-2xl p-5 border border-brand-100/50 dark:border-brand-900/30 space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-600/70 dark:text-brand-400/80 uppercase tracking-wider mb-1">{t('profile_current_plan')}</label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-brand-900 dark:text-brand-400 font-bold uppercase text-lg">{stats.premiumTier}</span>
                                                {stats.isPremium && (
                                                    <span className="bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{t('profile_active')}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('credits_label')}</label>
                                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.premiumTier === 'business' ? '∞' : stats.credits}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('profile_total_operations')}</label>
                                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalConverted}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            {stats.isPremium ? (
                                                <a 
                                                    href={import.meta.env.VITE_LEMON_CUSTOMER_PORTAL || "#"} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center w-full h-10 px-4 rounded-xl text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                                                >
                                                    {language === 'tr' ? 'Aboneliği Yönet' : 'Manage Subscription'}
                                                </a>
                                            ) : (
                                                <Button fullWidth onClick={() => navigate('/pricing')}>
                                                    {t('profile_upgrade_btn')}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
