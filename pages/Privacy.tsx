import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'Gizlilik Politikasý | WebImgConverter',
        description: 'WebImgConverter gizlilik politikasý. Verilerinizi nasýl koruduðumuzu öðrenin.',
        heading: 'Gizlilik Politikasý',
        lastUpdated: 'Son Güncelleme: Ocak 2025',
        sections: [
            {
                title: 'Veri Toplama',
                content: 'WebImgConverter, en yüksek kalite ve performans için tüm görsel iþleme operasyonlarýný (Dönüþtürme, Sýkýþtýrma, Arka Plan Silme) güvenli ve geçici sunucularýnda gerçekleþtirir. Görselleriniz iþlenmek üzere þifreli olarak sunucuya iletilir, iþlem tamamlanýr tamamlanmaz derhal silinir ve asla depolanmaz.'
            },
            {
                title: 'Çerezler',
                content: 'Sitemiz, kullanýcý deneyimini iyileþtirmek için temel çerezler kullanýr. Bu çerezler dil tercihinizi, oturum durumunuzu ve site ayarlarýnýzý hatýrlamak için kullanýlýr. Google Analytics ve Google AdSense de performans ve reklam çerezleri kullanabilir.'
            },
            {
                title: 'Üçüncü Taraf Hizmetler',
                content: 'Premium üyelik ödemeleri Lemon Squeezy tarafýndan iþlenir. Ödeme bilgileriniz doðrudan Lemon Squeezy\'nin güvenli sunucularýnda iþlenir, biz kredi kartý bilgilerinizi görmeyiz veya saklamayýz. Ayrýca Google Analytics (site analizi) ve Google AdSense (reklam) hizmetlerini kullanýyoruz.'
            },
            {
                title: 'Veri Güvenliði',
                content: 'Güvenli sunucu mimarimiz, verilerinizin gizliliðini korurken en yüksek kaliteyi sunar. Sunucu taraflý iþlemlerde veriler þifreli (SSL/TLS) olarak iletilir ve kalýcý olarak saklanmaz. Ýþlem sonrasý dosyalarýnýz otomatik olarak imha edilir.'
            },
            {
                title: 'Ýletiþim',
                content: 'Gizlilik politikamýz hakkýnda sorularýnýz için support@WebImgConverter.com adresinden bize ulaþabilirsiniz.'
            }
        ]
    },
    en: {
        title: 'Privacy Policy | WebImgConverter',
        description: 'WebImgConverter privacy policy. Learn how we protect your data.',
        heading: 'Privacy Policy',
        lastUpdated: 'Last Updated: January 2025',
        sections: [
            {
                title: 'Data Collection',
                content: 'WebImgConverter processes all image operations (Conversion, Compression, Background Removal) on secure, ephemeral servers to ensure highest quality and performance. Your images are transmitted securely (encrypted), processed, and then immediately deleted. We never store your files.'
            },
            {
                title: 'Cookies',
                content: 'Our site uses essential cookies to improve user experience. These cookies are used to remember your language preference, session state, and site settings. Google Analytics and Google AdSense may also use performance and advertising cookies.'
            },
            {
                title: 'Third-Party Services',
                content: 'Premium membership payments are processed by Lemon Squeezy. Your payment information is processed directly on Lemon Squeezy\'s secure servers; we do not see or store your credit card information. We also use Google Analytics (site analytics) and Google AdSense (advertising) services.'
            },
            {
                title: 'Data Security',
                content: 'Our secure server architecture ensures maximum privacy while delivering high quality results. Data is transmitted with encryption (SSL/TLS) and never permanently stored. Your files are automatically destroyed immediately after processing.'
            },
            {
                title: 'Contact',
                content: 'For questions about our privacy policy, you can reach us at support@WebImgConverter.com.'
            }
        ]
    },
    de: {
        title: 'Datenschutzrichtlinie | WebImgConverter',
        description: 'WebImgConverter Datenschutzrichtlinie. Erfahren Sie, wie wir Ihre Daten schützen.',
        heading: 'Datenschutzrichtlinie',
        lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
        sections: [
            {
                title: 'Datenerfassung',
                content: 'WebImgConverter verarbeitet alle Bildoperationen (Konvertierung, Komprimierung, Hintergrundentfernung) auf sicheren, temporären Servern, um höchste Qualität und Leistung zu gewährleisten. Ihre Bilder werden sicher (verschlüsselt) übertragen, verarbeitet und danach sofort gelöscht. Wir speichern Ihre Dateien niemals.'
            },
            {
                title: 'Cookies',
                content: 'Unsere Website verwendet wesentliche Cookies, um die Benutzererfahrung zu verbessern. Diese Cookies werden verwendet, um Ihre Spracheinstellung, den Sitzungsstatus und die Website-Einstellungen zu speichern. Google Analytics und Google AdSense können ebenfalls Leistungs- und Werbe-Cookies verwenden.'
            },
            {
                title: 'Dienste von Drittanbietern',
                content: 'Zahlungen für Premium-Mitgliedschaften werden von Lemon Squeezy abgewickelt. Ihre Zahlungsinformationen werden direkt auf den sicheren Servern von Lemon Squeezy verarbeitet; wir sehen oder speichern Ihre Kreditkarteninformationen nicht. Wir nutzen auch die Dienste von Google Analytics (Website-Analyse) und Google AdSense (Werbung).'
            },
            {
                title: 'Datensicherheit',
                content: 'Unsere sichere Serverarchitektur gewährleistet maximale Privatsphäre bei gleichzeitig hoher Qualität der Ergebnisse. Daten werden verschlüsselt (SSL/TLS) übertragen und nie dauerhaft gespeichert. Ihre Dateien werden nach der Verarbeitung automatisch vernichtet.'
            },
            {
                title: 'Kontakt',
                content: 'Bei Fragen zu unserer Datenschutzrichtlinie erreichen Sie uns unter support@WebImgConverter.com.'
            }
        ]
    },
    fr: {
        title: 'Politique de Confidentialité | WebImgConverter',
        description: 'Politique de confidentialité de WebImgConverter. Découvrez comment nous protégeons vos données.',
        heading: 'Politique de Confidentialité',
        lastUpdated: 'Dernière mise à jour : Janvier 2025',
        sections: [
            {
                title: 'Collecte de Données',
                content: 'WebImgConverter traite toutes les opérations d\'image (Conversion, Compression, Suppression d\'Arrière-plan) sur des serveurs éphémères sécurisés pour garantir la plus haute qualité et performance. Vos images sont transmises de manière sécurisée (cryptées), traitées, puis immédiatement supprimées. Nous ne stockons jamais vos fichiers.'
            },
            {
                title: 'Cookies',
                content: 'Notre site utilise des cookies essentiels pour améliorer l\'expérience utilisateur. Ces cookies sont utilisés pour mémoriser votre préférence linguistique, l\'état de la session et les paramètres du site. Google Analytics et Google AdSense peuvent également utiliser des cookies de performance et publicitaires.'
            },
            {
                title: 'Services Tiers',
                content: 'Les paiements d\'abonnement premium sont traités par Lemon Squeezy. Vos informations de paiement sont traitées directement sur les serveurs sécurisés de Lemon Squeezy; nous ne voyons ni ne stockons vos informations de carte de crédit. Nous utilisons également les services Google Analytics (analyse de site) et Google AdSense (publicité).'
            },
            {
                title: 'Sécurité des Données',
                content: 'Notre architecture de serveur sécurisée garantit une confidentialité maximale tout en fournissant des résultats de haute qualité. Les données sont transmises avec un cryptage (SSL/TLS) et ne sont jamais stockées en permanence. Vos fichiers sont automatiquement détruits immédiatement après le traitement.'
            },
            {
                title: 'Contact',
                content: 'Pour des questions concernant notre politique de confidentialité, vous pouvez nous joindre à support@WebImgConverter.com.'
            }
        ]
    }
};

import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';

export default function PrivacyPage() {
    const { language } = useLanguage();
    const activeLang = typeof language === 'string' && language.startsWith('tr') ? 'tr' : 
                      typeof language === 'string' && language.startsWith('de') ? 'de' : 
                      typeof language === 'string' && language.startsWith('fr') ? 'fr' : 'en';
    const t = content[activeLang as keyof typeof content] || content.tr;
    const navigate = useNavigate();

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel="Hemen Baþla" bg="white">
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/privacy" />
            </Helmet>

            <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-20">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{t.heading}</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.lastUpdated}</p>
                </div>

                <div className="space-y-6">
                    {t.sections.map((section, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-card dark:shadow-none">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{section.title}</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{section.content}</p>
                        </div>
                    ))}
                </div>
            </section>
        </SiteShell>
    );
}
