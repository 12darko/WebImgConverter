
import React from 'react';
import { useLanguage } from '../LanguageContext';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string; // Add userId to pass to checkout
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, userId }) => {
  const { t } = useLanguage();

  // Scroll Lock Effect
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  // Checkout handler
  const handleUpgrade = (plan: 'starter' | 'pro' | 'business') => {
    let checkoutUrl = '';

    // Plan-specific URLs (User needs to set these in .env)
    switch (plan) {
      case 'starter':
        checkoutUrl = import.meta.env.VITE_LEMON_CHECKOUT_STARTER || import.meta.env.VITE_LEMON_CHECKOUT_URL;
        break;
      case 'pro':
        checkoutUrl = import.meta.env.VITE_LEMON_CHECKOUT_PRO || import.meta.env.VITE_LEMON_CHECKOUT_URL;
        break;
      case 'business':
        checkoutUrl = import.meta.env.VITE_LEMON_CHECKOUT_BUSINESS || import.meta.env.VITE_LEMON_CHECKOUT_URL;
        break;
    }

    if (checkoutUrl) {
      const separator = checkoutUrl.includes('?') ? '&' : '?';
      const finalUrl = userId ? `${checkoutUrl}${separator}checkout[custom][user_id]=${userId}` : checkoutUrl;
      window.open(finalUrl, '_blank');
    } else {
      alert("Checkout configuration missing. Please check .env settings.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden touch-none">
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl mx-auto animate-[fadeIn_0.3s_ease-out] my-8 md:my-0">
        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">{t('premium_plans_title')}</h2>
          <p className="text-slate-400">{t('premium_plans_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20 md:pb-0">
          {/* STARTER PLAN */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group">
            <h3 className="text-xl font-bold text-indigo-400 mb-2">{t('plan_starter')}</h3>
            <div className="text-3xl font-bold text-white mb-4">$4.99<span className="text-sm font-normal text-slate-500">{t('price_mo')}</span></div>
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-2"><span className="text-indigo-500">✓</span> {t('feat_credits_30')}</li>
              <li className="flex items-center gap-2"><span className="text-indigo-500">✓</span> {t('feat_remove_bg')}</li>
              <li className="flex items-center gap-2"><span className="text-indigo-500">✓</span> {t('feat_no_ads')}</li>
            </ul>
            <button onClick={() => handleUpgrade('starter')} className="w-full py-3 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all font-bold">
              {t('btn_select_starter')}
            </button>
          </div>

          {/* PRO PLAN (Featured) */}
          <div className="bg-slate-800/80 border border-amber-500/50 rounded-2xl p-8 transform md:-translate-y-4 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-amber-500 text-xs font-bold text-slate-900 px-3 py-1 rounded-bl-lg">{t('popular_badge')}</div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">{t('plan_pro')}</h3>
            <div className="text-4xl font-bold text-white mb-4">$9.99<span className="text-sm font-normal text-slate-500">{t('price_mo')}</span></div>
            <ul className="space-y-3 mb-8 text-base text-slate-200">
              <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>{t('feat_credits_100')}</strong></li>
              <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> {t('feat_priority_ai')}</li>
              <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> {t('feat_all_prem')}</li>
              <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> {t('feat_support_247')}</li>
            </ul>
            <button onClick={() => handleUpgrade('pro')} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-500 transform transition-all active:scale-95">
              {t('btn_select_pro')}
            </button>
          </div>

          {/* BUSINESS PLAN */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all group mb-8 md:mb-0">
            <h3 className="text-xl font-bold text-blue-400 mb-2">{t('plan_business')}</h3>
            <div className="text-3xl font-bold text-white mb-4">$19.99<span className="text-sm font-normal text-slate-500">{t('price_mo')}</span></div>
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> <strong>{t('feat_credits_unlimited')}</strong></li>
              <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> {t('feat_batch_50')}</li>
              <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> {t('feat_api_access')}</li>
            </ul>
            <button onClick={() => handleUpgrade('business')} className="w-full py-3 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all font-bold">
              {t('btn_select_business')}
            </button>
          </div>
        </div>

        <div className="absolute top-4 right-4 md:hidden">
          <button onClick={onClose} className="bg-slate-800 text-white p-2 rounded-full shadow-lg">✕</button>
        </div>

        <div className="text-center mt-4 md:mt-8 pb-8">
          <button onClick={onClose} className="text-slate-500 hover:text-slate-400 text-sm">{t('maybe_later')}</button>
        </div>
      </div>
    </div>
  );
};
