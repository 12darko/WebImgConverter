import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'İletişim | VormPixyze',
        description: 'VormPixyze ile iletişime geçin. Destek ve sorularınız için bize ulaşın.',
        heading: 'İletişim',
        intro: 'Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçebilirsiniz.',
        email: 'E-posta',
        emailDesc: 'Genel sorular ve destek için:',
        response: 'Yanıt Süresi',
        responseDesc: 'E-postalara genellikle 24-48 saat içinde yanıt veriyoruz.',
        faq: 'Sık Sorulan Sorular',
        faqs: [
            { q: 'Dosyalarım güvende mi?', a: 'Evet. Çoğu işlem tarayıcınızda yapılır. Yapay zeka işlemleri ise güvenli geçici sunucularda anlık olarak işlenir ve hemen silinir.' },
            { q: 'Premium üyelik nasıl iptal edilir?', a: 'Premium üyeliğinizi Lemon Squeezy müşteri portalından iptal edebilirsiniz.' },
            { q: 'Hangi formatları destekliyorsunuz?', a: 'HEIC, PNG, JPG, WEBP, AVIF ve daha fazlasını destekliyoruz.' }
        ]
    },
    en: {
        title: 'Contact | VormPixyze',
        description: 'Get in touch with VormPixyze. Contact us for support and questions.',
        heading: 'Contact',
        intro: 'You can contact us for your questions, suggestions, or support requests.',
        email: 'Email',
        emailDesc: 'For general questions and support:',
        response: 'Response Time',
        responseDesc: 'We typically respond to emails within 24-48 hours.',
        faq: 'Frequently Asked Questions',
        faqs: [
            { q: 'Are my files safe?', a: 'Yes. Most processing happens in your browser. AI tasks are processed instantly on secure ephemeral servers and deleted immediately.' },
            { q: 'How do I cancel my premium membership?', a: 'You can cancel your premium membership through the Lemon Squeezy customer portal.' },
            { q: 'What formats do you support?', a: 'We support HEIC, PNG, JPG, WEBP, AVIF and more.' }
        ]
    },
    de: {
        title: 'Kontakt | VormPixyze',
        description: 'Kontaktieren Sie VormPixyze. Wenden Sie sich an uns für Support und Fragen.',
        heading: 'Kontakt',
        intro: 'Sie können uns für Ihre Fragen, Vorschläge oder Support-Anfragen kontaktieren.',
        email: 'E-Mail',
        emailDesc: 'Für allgemeine Fragen und Support:',
        response: 'Antwortzeit',
        responseDesc: 'Wir antworten normalerweise innerhalb von 24-48 Stunden auf E-Mails.',
        faq: 'Häufig gestellte Fragen',
        faqs: [
            { q: 'Sind meine Dateien sicher?', a: 'Ja. Die meiste Verarbeitung erfolgt im Browser. KI-Aufgaben werden sofort auf sicheren temporären Servern verarbeitet und gelöscht.' },
            { q: 'Wie kündige ich meine Premium-Mitgliedschaft?', a: 'Sie können Ihre Premium-Mitgliedschaft über das Lemon Squeezy Kundenportal kündigen.' },
            { q: 'Welche Formate unterstützen Sie?', a: 'Wir unterstützen HEIC, PNG, JPG, WEBP, AVIF und mehr.' }
        ]
    },
    fr: {
        title: 'Contact | VormPixyze',
        description: 'Contactez VormPixyze. Contactez-nous pour le support et les questions.',
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

export default function ContactPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = content[activeLang] || content.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/contact" />
            </Helmet>

            <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-200 font-sans">
                <nav className="glass-panel sticky top-0 z-40 border-b border-white/5">
                    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
                        <Link to="/" className="text-xl font-bold text-white">
                            ← Vorm<span className="text-indigo-400">Pixyze</span>
                        </Link>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold text-white mb-4">{t.heading}</h1>
                    <p className="text-slate-400 mb-8">{t.intro}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-2">📧 {t.email}</h2>
                            <p className="text-slate-400 mb-3">{t.emailDesc}</p>
                            <a href="mailto:support@vormpixyze.com" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                support@vormpixyze.com
                            </a>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-2">⏱️ {t.response}</h2>
                            <p className="text-slate-400">{t.responseDesc}</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-4">{t.faq}</h2>
                    <div className="space-y-4">
                        {t.faqs.map((faq, i) => (
                            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                                <p className="text-slate-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </main>

                <LegalFooter />
            </div>
        </>
    );
}
