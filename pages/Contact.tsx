import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'İletişim | WebImgConverter',
        description: 'WebImgConverter ile iletişime geçin. Destek ve sorularınız için bize ulaşın.',
        heading: 'İletişim',
        intro: 'Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçebilirsiniz.',
        email: 'E-posta',
        emailDesc: 'Genel sorular ve destek için:',
        response: 'Yanıt Süresi',
        responseDesc: 'E-postalara genellikle 24-48 saat içinde yanıt veriyoruz.',
        faq: 'Sık Sorulan Sorular',
        faqs: [
            { q: 'Dosyalarım güvende mi?', a: 'Evet. Tüm işlemler güvenli geçici sunucularda anlık olarak işlenir ve hemen silinir.' },
            { q: 'Premium üyelik nasıl iptal edilir?', a: 'Premium üyeliğinizi Lemon Squeezy müşteri portalından iptal edebilirsiniz.' },
            { q: 'Hangi formatları destekliyorsunuz?', a: 'HEIC, PNG, JPG, WEBP, AVIF ve daha fazlasını destekliyoruz.' }
        ]
    },
    en: {
        title: 'Contact | WebImgConverter',
        description: 'Get in touch with WebImgConverter. Contact us for support and questions.',
        heading: 'Contact',
        intro: 'You can contact us for your questions, suggestions, or support requests.',
        email: 'Email',
        emailDesc: 'For general questions and support:',
        response: 'Response Time',
        responseDesc: 'We typically respond to emails within 24-48 hours.',
        faq: 'Frequently Asked Questions',
        faqs: [
            { q: 'Are my files safe?', a: 'Yes. All processing happens instantly on secure ephemeral servers and files are deleted immediately.' },
            { q: 'How do I cancel my premium membership?', a: 'You can cancel your premium membership through the Lemon Squeezy customer portal.' },
            { q: 'What formats do you support?', a: 'We support HEIC, PNG, JPG, WEBP, AVIF and more.' }
        ]
    },
    de: {
        title: 'Kontakt | WebImgConverter',
        description: 'Kontaktieren Sie WebImgConverter. Wenden Sie sich an uns für Support und Fragen.',
        heading: 'Kontakt',
        intro: 'Sie können uns für Ihre Fragen, Vorschläge oder Support-Anfragen kontaktieren.',
        email: 'E-Mail',
        emailDesc: 'Für allgemeine Fragen und Support:',
        response: 'Antwortzeit',
        responseDesc: 'Wir antworten normalerweise innerhalb von 24-48 Stunden auf E-Mails.',
        faq: 'Häufig gestellte Fragen',
        faqs: [
            { q: 'Sind meine Dateien sicher?', a: 'Ja. Die gesamte Verarbeitung erfolgt sofort auf sicheren temporären Servern und Dateien werden sofort gelöscht.' },
            { q: 'Wie kündige ich meine Premium-Mitgliedschaft?', a: 'Sie können Ihre Premium-Mitgliedschaft über das Lemon Squeezy Kundenportal kündigen.' },
            { q: 'Welche Formate unterstützen Sie?', a: 'Wir unterstützen HEIC, PNG, JPG, WEBP, AVIF und mehr.' }
        ]
    },
    fr: {
        title: 'Contact | WebImgConverter',
        description: 'Contactez WebImgConverter. Contactez-nous pour le support et les questions.',
        heading: 'Contact',
        intro: 'Vous pouvez nous contacter pour vos questions, suggestions ou demandes de support.',
        email: 'E-mail',
        emailDesc: 'Pour les questions générales et le support:',
        response: 'Temps de réponse',
        responseDesc: 'Nous répondons généralement aux e-mails dans les 24-48 heures.',
        faq: 'Questions Fréquentes',
        faqs: [
            { q: 'Mes fichiers sont-ils en sécurité?', a: 'Oui. La plupart des traitements se font dans le navigateur. Les tâches IA sont traitées sur des serveurs sécurisés et supprimées immédiatement.' },
            { q: 'Comment annuler mon abonnement premium?', a: 'Vous pouvez annuler votre abonnement premium via le portail client Lemon Squeezy.' },
            { q: 'Quels formats supportez-vous?', a: 'Nous supportons HEIC, PNG, JPG, WEBP, AVIF et plus.' }
        ]
    }
};

type LangKey = keyof typeof content;

import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';

export default function ContactPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = content[activeLang] || content.tr;
    const navigate = useNavigate();
    const ctaLabel = activeLang === 'tr' ? 'Hemen Başla' : activeLang === 'de' ? 'Jetzt Starten' : activeLang === 'fr' ? 'Commencer' : 'Start Now';

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel={ctaLabel} bg="white">
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/contact" />
            </Helmet>

            <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-20">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{t.heading}</h1>
                    <p className="text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{t.intro}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-card rounded-2xl p-6 md:p-8 text-center hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 text-xl">
                            📧
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.email}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t.emailDesc}</p>
                        <a href="mailto:support@WebImgConverter.com" className="text-brand-600 hover:text-brand-700 font-semibold transition-colors">
                            support@WebImgConverter.com
                        </a>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-card rounded-2xl p-6 md:p-8 text-center hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 text-xl">
                            ⏱️
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.response}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t.responseDesc}</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">{t.faq}</h2>
                    <div className="space-y-4">
                        {t.faqs.map((faq, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-card transition-shadow">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
