import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Stripe Checkout URL (Test Mode - Stripe Dashboard'dan alınacak)
const STRIPE_CHECKOUT_URL = import.meta.env.VITE_STRIPE_CHECKOUT_URL || '';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // Regional pricing based on browser language
  const pricing = {
    tr: { currency: '₺', amount: '43', label: 'TL/Ay' },
    en: { currency: '$', amount: '0.99', label: '/Mo' }
  };
  const price = pricing[lang] || pricing.en;

  const handleStripeCheckout = () => {
    if (STRIPE_CHECKOUT_URL) {
      // Stripe Checkout sayfasına yönlendir
      window.location.href = STRIPE_CHECKOUT_URL;
    } else {
      // Demo mode - simulate success
      setIsLoading(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        setIsLoading(false);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-[fadeIn_0.3s]">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-bold text-white text-lg">Premium Üyelik</span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl">×</button>
        </div>

        <div className="p-6">
          {/* Price Display */}
          <div className="text-center mb-6">
            <div className="inline-flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{price.currency}{price.amount}</span>
              <span className="text-slate-400">{price.label}</span>
            </div>
            <p className="text-slate-500 text-sm mt-1">İstediğiniz zaman iptal edebilirsiniz</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {[
              t('prem_feature_1'),
              t('prem_feature_2'),
              t('prem_feature_3'),
              t('prem_feature_4'),
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleStripeCheckout}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                İşleniyor...
              </span>
            ) : STRIPE_CHECKOUT_URL ? (
              'Güvenli Ödeme Sayfasına Git'
            ) : (
              `Premium'a Geç (${price.currency}${price.amount})`
            )}
          </button>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit SSL ile korunan güvenli ödeme</span>
          </div>

          {!STRIPE_CHECKOUT_URL && (
            <p className="text-[10px] text-center text-amber-500/70 mt-3">
              ⚠️ Demo Modu: Stripe entegrasyonu için VITE_STRIPE_CHECKOUT_URL ayarlayın
            </p>
          )}
        </div>

        {/* Footer with payment providers */}
        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 flex justify-center gap-3">
          <div className="h-6 w-12 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold text-slate-400">VISA</div>
          <div className="h-6 w-12 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold text-slate-400">MASTER</div>
          <div className="h-6 w-12 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold text-slate-400">AMEX</div>
          <div className="h-6 w-14 bg-[#635BFF] rounded flex items-center justify-center text-[8px] font-bold text-white">STRIPE</div>
        </div>
      </div>
    </div>
  );
};