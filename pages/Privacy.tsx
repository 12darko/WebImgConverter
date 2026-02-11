import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'Gizlilik Politikası | VormPixyze',
        description: 'VormPixyze gizlilik politikası. Verilerinizi nasıl koruduğumuzu öğrenin.',
        heading: 'Gizlilik Politikası',
        lastUpdated: 'Son Güncelleme: Ocak 2025',
        sections: [
            {
                title: 'Veri Toplama',
                content: 'VormPixyze, en yüksek kalite ve performans için tüm görsel işleme operasyonlarını (Dönüştürme, Sıkıştırma, Arka Plan Silme) güvenli ve geçici sunucularında gerçekleştirir. Görselleriniz işlenmek üzere şifreli olarak sunucuya iletilir, işlem tamamlanır tamamlanmaz derhal silinir ve asla depolanmaz.'
            },
            {
                title: 'Çerezler',
                content: 'Sitemiz, kullanıcı deneyimini iyileştirmek için temel çerezler kullanır. Bu çerezler dil tercihinizi, oturum durumunuzu ve site ayarlarınızı hatırlamak için kullanılır. Google Analytics ve Google AdSense de performans ve reklam çerezleri kullanabilir.'
            },
            {
                title: 'Üçüncü Taraf Hizmetler',
                content: 'Premium üyelik ödemeleri Lemon Squeezy tarafından işlenir. Ödeme bilgileriniz doğrudan Lemon Squeezy\'nin güvenli sunucularında işlenir, biz kredi kartı bilgilerinizi görmeyiz veya saklamayız. Ayrıca Google Analytics (site analizi) ve Google AdSense (reklam) hizmetlerini kullanıyoruz.'
            },
            {
                title: 'Veri Güvenliği',
                content: 'Güvenli sunucu mimarimiz, verilerinizin gizliliğini korurken en yüksek kaliteyi sunar. Sunucu taraflı işlemlerde veriler şifreli (SSL/TLS) olarak iletilir ve kalıcı olarak saklanmaz. İşlem sonrası dosyalarınız otomatik olarak imha edilir.'
            },
            {
                title: 'İletişim',
                content: 'Gizlilik politikamız hakkında sorularınız için support@vormpixyze.com adresinden bize ulaşabilirsiniz.'
            }
        ]
    },
    en: {
        title: 'Privacy Policy | VormPixyze',
        description: 'VormPixyze privacy policy. Learn how we protect your data.',
        heading: 'Privacy Policy',
        lastUpdated: 'Last Updated: January 2025',
        sections: [
            {
                title: 'Data Collection',
                content: 'VormPixyze processes all image operations (Conversion, Compression, Background Removal) on secure, ephemeral servers to ensure highest quality and performance. Your images are transmitted securely (encrypted), processed, and then immediately deleted. We never store your files.'
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
                content: 'For questions about our privacy policy, you can reach us at support@vormpixyze.com.'
            }
        ]
    }
};

export default function PrivacyPage() {
    const { language } = useLanguage();
    const t = content[language] || content.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/privacy" />
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
                    <h1 className="text-3xl font-bold text-white mb-2">{t.heading}</h1>
                    <p className="text-sm text-slate-500 mb-8">{t.lastUpdated}</p>

                    <div className="space-y-8">
                        {t.sections.map((section, i) => (
                            <section key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
                                <p className="text-slate-400 leading-relaxed">{section.content}</p>
                            </section>
                        ))}
                    </div>
                </main>

                <LegalFooter />
            </div>
        </>
    );
}
