
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

interface ReferralWidgetProps {
  onReferralSuccess: () => void;
  userId?: string;
}

export const ReferralWidget: React.FC<ReferralWidgetProps> = ({ onReferralSuccess, userId }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // Gerçek Kullanıcı ID'si ile link oluştur
    const code = userId || 'guest';
    const referralLink = `https://webimgconverter.com/?ref=${code}`;
    navigator.clipboard.writeText(referralLink);

    setCopied(true);
    // onReferralSuccess(); // Exploit fix: Only reward on actual signup (Backend logic needed)

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative group overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-6 text-center shadow-sm">

      {/* Background FX */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-200/30 rounded-full blur-2xl -mr-10 -mt-10"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-tr from-brand-500 to-emerald-400 rounded-full flex items-center justify-center mb-3 shadow-sm shadow-brand-500/20">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        <h3 className="text-slate-900 font-bold text-lg mb-1">{t('ref_title')}</h3>
        <p className="text-slate-600 text-xs mb-4 leading-relaxed">
          {t('ref_desc')}
        </p>

        <button
          onClick={handleCopyLink}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${copied
            ? 'bg-green-500 text-white shadow-sm'
            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
            }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {t('ref_success')}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              {t('ref_btn')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
