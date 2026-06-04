import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BillingToggle } from '../components/ui/BillingToggle';
import { useLanguage } from '../LanguageContext';
import { supabase, getUserProfile } from '../services/supabase';
import { AuthModal } from '../components/AuthModal';

const CheckIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const CrossIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

interface PlanFeature {
    text: string;
    included: boolean;
}

interface Plan {
    id: 'free' | 'starter' | 'pro' | 'business';
    name: string;
    description: string;
    monthlyPrice: number | string;
    annualPrice: number | string;
    currency: string;
    priceSuffix: string;
    cta: string;
    ctaVariant: 'primary' | 'secondary';
    popular?: boolean;
    features: PlanFeature[];
    color: string;
    activeLabel?: string;
}

interface PricingCardProps {
    plan: Plan;
    billing: 'monthly' | 'annually';
    onCta: () => void;
    isCurrentPlan: boolean;
    t: any;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, billing, onCta, isCurrentPlan, t }) => {
    const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    const isCustom = typeof price === 'string';
    const isFree = price === 0;

    return (
        <div
            className={[
                'relative bg-white dark:bg-slate-800/50 border rounded-3xl p-7 flex flex-col transition-all duration-300',
                plan.popular
                    ? 'border-slate-900 dark:border-brand-500/50 shadow-pop ring-1 ring-slate-900 dark:ring-brand-500/30 md:-translate-y-2'
                    : 'border-slate-200 dark:border-slate-700/50 shadow-card hover:shadow-lg hover:-translate-y-1',
                isCurrentPlan ? 'ring-2 ring-emerald-500/50' : '',
            ].join(' ')}
        >
            {plan.popular && (
                <div className="absolute -top-3 right-7">
                    <Badge tone="dark">{t('most_popular')}</Badge>
                </div>
            )}
            {isCurrentPlan && (
                <div className="absolute -top-3 left-7">
                    <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        ✓ {t('profile_active') || 'Active'}
                    </span>
                </div>
            )}

            <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-6">
                {isCustom ? (
                    <div className="font-serif text-4xl font-extrabold text-slate-900 dark:text-white">{t('custom_plan')}</div>
                ) : isFree ? (
                    <div className="flex items-baseline gap-1">
                        <span className="font-serif text-5xl font-extrabold text-slate-900 dark:text-white">{plan.currency}0</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{plan.priceSuffix}</span>
                    </div>
                ) : (
                    <div className="flex items-baseline gap-1">
                        <span className="font-serif text-5xl font-extrabold text-slate-900 dark:text-white">{plan.currency}{price}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{plan.priceSuffix}</span>
                    </div>
                )}
                {billing === 'annually' && !isFree && !isCustom && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">
                        {t('annually_save') || '🎉 %20 tasarruf edin!'}
                    </p>
                )}
            </div>

            {isCurrentPlan ? (
                <div className="w-full h-11 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm border border-emerald-200 dark:border-emerald-800/50">
                    ✓ {plan.activeLabel || t('profile_active')}
                </div>
            ) : (
                <Button
                    onClick={onCta}
                    variant={plan.ctaVariant === 'primary' ? 'primary' : 'secondary'}
                    fullWidth
                    size="md"
                >
                    {plan.cta}
                </Button>
            )}

            <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm ${f.included ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                        <span className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                            f.included
                                ? 'bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                        }`}>
                            {f.included ? CheckIcon : CrossIcon}
                        </span>
                        <span className={f.included ? '' : 'line-through'}>{f.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function PricingPage() {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const activeLang = typeof language === 'string' && language.startsWith('tr') ? 'tr' : 'en';
    const [billing, setBilling] = React.useState<'monthly' | 'annually'>('monthly');
    const [session, setSession] = useState<any>(null);
    const [currentTier, setCurrentTier] = useState<string>('free');
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session: s } }) => {
            setSession(s);
            if (s?.user) {
                try {
                    const profile = await getUserProfile(s.user.id);
                    if (profile && !profile.requiresActivation) {
                        setCurrentTier(profile.premiumTier || 'free');
                    }
                } catch (e) {
                    console.error('Error fetching profile for pricing:', e);
                }
            }
        });
    }, []);

    const isTR = activeLang === 'tr';
    const currency = isTR ? '₺' : '$';

    const handleCheckout = (planId: 'free' | 'starter' | 'pro' | 'business') => {
        if (planId === 'free') {
            navigate('/tools');
            return;
        }

        if (!session?.user) {
            setIsAuthOpen(true);
            return;
        }

        let checkoutUrl = '';
        switch (planId) {
            case 'starter':
                checkoutUrl = import.meta.env.VITE_LEMON_CHECKOUT_STARTER || import.meta.env.VITE_LEMON_CHECKOUT_URL || '';
                break;
            case 'pro':
                checkoutUrl = import.meta.env.VITE_LEMON_CHECKOUT_PRO || import.meta.env.VITE_LEMON_CHECKOUT_URL || '';
                break;
            case 'business':
                checkoutUrl = import.meta.env.VITE_LEMON_CHECKOUT_BUSINESS || import.meta.env.VITE_LEMON_CHECKOUT_URL || '';
                break;
        }

        if (checkoutUrl) {
            const separator = checkoutUrl.includes('?') ? '&' : '?';
            const finalUrl = `${checkoutUrl}${separator}checkout[custom][user_id]=${session.user.id}`;
            window.open(finalUrl, '_blank');
        } else {
            // Fallback: navigate to app with upgrade param
            navigate(`/app?upgrade=${planId}`);
        }
    };

    const PLANS: Plan[] = [
        {
            id: 'free',
            name: isTR ? 'Ücretsiz' : 'Free',
            description: isTR ? 'Hemen başlayın, kayıt gerekmez.' : 'Get started instantly, no signup required.',
            monthlyPrice: 0,
            annualPrice: 0,
            currency,
            priceSuffix: isTR ? '/ay' : '/mo',
            cta: t('free_start'),
            ctaVariant: 'secondary',
            color: 'slate',
            activeLabel: isTR ? 'Mevcut Plan' : 'Current Plan',
            features: [
                { text: isTR ? 'Günlük 25 Kredi' : '25 Credits/Day', included: true },
                { text: isTR ? 'Temel formatlar (JPG, PNG, WebP)' : 'Basic formats (JPG, PNG, WebP)', included: true },
                { text: isTR ? 'Standart kalite dönüştürme' : 'Standard quality conversion', included: true },
                { text: t('feat_remove_bg'), included: false },
                { text: t('feat_no_ads'), included: false },
                { text: t('feat_zip_download'), included: false },
                { text: t('feat_batch_ai'), included: false },
            ],
        },
        {
            id: 'starter',
            name: t('plan_starter'),
            description: t('starter_desc'),
            monthlyPrice: isTR ? 43 : 0.99,
            annualPrice: isTR ? 34 : 0.79,
            currency,
            priceSuffix: isTR ? '/ay' : '/mo',
            cta: t('btn_select_starter'),
            ctaVariant: 'secondary',
            color: 'brand',
            features: [
                { text: t('feat_credits_30'), included: true },
                { text: t('feat_remove_bg'), included: true },
                { text: t('feat_no_ads'), included: true },
                { text: isTR ? 'Temel formatlar (JPG, PNG, WebP, PDF)' : 'Basic formats (JPG, PNG, WebP, PDF)', included: true },
                { text: t('feat_watermark'), included: false },
                { text: t('feat_batch_ai'), included: false },
                { text: t('feat_zip_download'), included: false },
                { text: t('feat_crop'), included: false },
            ],
        },
        {
            id: 'pro',
            name: t('plan_pro'),
            description: t('pro_plus_desc'),
            monthlyPrice: isTR ? 172 : 3.99,
            annualPrice: isTR ? 138 : 3.19,
            currency,
            priceSuffix: isTR ? '/ay' : '/mo',
            cta: t('btn_select_pro'),
            ctaVariant: 'primary',
            popular: true,
            color: 'amber',
            features: [
                { text: t('feat_credits_100'), included: true },
                { text: t('feat_remove_bg'), included: true },
                { text: t('feat_no_ads'), included: true },
                { text: t('feat_watermark'), included: true },
                { text: t('feat_batch_ai'), included: true },
                { text: t('feat_zip_download'), included: true },
                { text: t('feat_crop'), included: true },
                { text: t('feat_special_formats'), included: false },
                { text: t('feat_history'), included: false },
            ],
        },
        {
            id: 'business',
            name: t('plan_business'),
            description: t('business_desc'),
            monthlyPrice: isTR ? 431 : 9.99,
            annualPrice: isTR ? 345 : 7.99,
            currency,
            priceSuffix: isTR ? '/ay' : '/mo',
            cta: t('btn_select_business'),
            ctaVariant: 'secondary',
            color: 'blue',
            features: [
                { text: t('feat_credits_unlimited'), included: true },
                { text: t('feat_all_prem'), included: true },
                { text: t('feat_watermark'), included: true },
                { text: t('feat_batch_ai'), included: true },
                { text: t('feat_special_formats'), included: true },
                { text: t('feat_advanced_formats'), included: true },
                { text: t('feat_cloud_storage'), included: true },
                { text: t('feat_history'), included: true },
                { text: t('feat_support_247'), included: true },
            ],
        },
    ];

    const FAQ = [
        { q: t('faq_1_q'), a: t('faq_1_a') },
        { q: t('faq_2_q'), a: t('faq_2_a') },
        { q: t('faq_3_q'), a: t('faq_3_a') },
        { q: t('faq_4_q'), a: t('faq_4_a') },
    ];

    return (
        <SiteShell onCta={() => navigate('/tools')} ctaLabel={t('free_start')} bg="white">
            <Helmet>
                <title>{t('nav_pricing')} | WebImgConverter</title>
                <meta name="description" content={t('pricing_subtitle')} />
                <link rel="canonical" href="https://WebImgConverter.com/pricing" />
            </Helmet>

            <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
                {/* Hero */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                        {t('pricing_title')}
                    </h1>
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t('pricing_subtitle')}
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center mb-10">
                    <BillingToggle value={billing} onChange={setBilling} />
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                    {PLANS.map((p) => (
                        <PricingCard
                            key={p.id}
                            plan={p}
                            billing={billing}
                            onCta={() => handleCheckout(p.id)}
                            isCurrentPlan={currentTier === p.id || (currentTier === 'free' && p.id === 'free')}
                            t={t}
                        />
                    ))}
                </div>

                {/* Guarantee banner */}
                <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold px-5 py-2.5 rounded-full">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        {isTR ? '7 gün para iade garantisi • Güvenli ödeme' : '7-day money-back guarantee • Secure checkout'}
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-10">
                        {t('faq_title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {FAQ.map((item, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-2">{item.q}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onSuccess={() => {
                    setIsAuthOpen(false);
                    // After login, refresh session and let user pick plan again
                    supabase.auth.getSession().then(({ data: { session: s } }) => {
                        setSession(s);
                    });
                }}
            />
        </SiteShell>
    );
}
