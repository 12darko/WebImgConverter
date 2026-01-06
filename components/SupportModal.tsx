import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
    isPremium: boolean;
    userEmail?: string;
}

export function SupportModal({ isOpen, onClose, isPremium, userEmail }: SupportModalProps) {
    const { t } = useLanguage();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSend = () => {
        const mailtoLink = `mailto:support@vormpixyze.com?subject=${encodeURIComponent(
            isPremium ? `[PREMIUM PRIORITY] ${subject}` : subject
        )}&body=${encodeURIComponent(
            `User ID: ${userEmail || 'Guest'}\n\nMessage:\n${message}`
        )}`;
        window.location.href = mailtoLink;
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#0f1021] border border-slate-700/50 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-[fadeIn_0.3s_ease-out]">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {isPremium ? <span className="text-amber-500">⭐ Premium</span> : '📞'} {t('support_title') || 'Support'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">{t('support_subject') || 'Subject'}</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder={t('support_subject_placeholder') || "Briefly describe the issue..."}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">{t('support_message') || 'Message'}</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t('support_message_placeholder') || "How can we help you?"}
                            rows={4}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        />
                    </div>

                    {isPremium && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-200 flex items-center gap-2">
                            ⚡ {t('support_premium_msg') || 'As a Premium member, your ticket gets Priority Support!'}
                        </div>
                    )}

                    <div className="pt-2 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg text-slate-300 font-medium hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                        >
                            {t('cancel') || 'Cancel'}
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!subject || !message}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all"
                        >
                            {t('send_email') || 'Send Email'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
