import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'Kullanım Şartları | VormPixyze',
        description: 'VormPixyze kullanım şartları ve koşulları.',
        heading: 'Kullanım Şartları',
        lastUpdated: 'Son Güncelleme: Ocak 2025',
        sections: [
            {
                title: 'Hizmet Tanımı',
                content: 'VormPixyze, tarayıcı tabanlı bir görsel dönüştürme ve düzenleme aracıdır. Hizmetimiz HEIC, PNG, JPG, WEBP ve diğer formatlarda görsel dönüşümü, arka plan kaldırma ve görsel sıkıştırma özelliklerini içerir.'
            },
            {
                title: 'Kabul Edilebilir Kullanım',
                content: 'Hizmetimizi yalnızca yasal amaçlarla kullanabilirsiniz. Telif hakkı ihlali içeren, yasa dışı veya zararlı içeriklerin işlenmesi için hizmetimizin kullanılması yasaktır.'
            },
            {
                title: 'Üyelik ve Krediler',
                content: 'Ücretsiz kullanıcılar günlük kredi limitlerine tabidir. Premium üyeler ek özellikler ve artırılmış limitler alır. Ödeme işlemleri Lemon Squeezy tarafından güvenli bir şekilde gerçekleştirilir.'
            },
            {
                title: 'Sorumluluk Reddi',
                content: 'Hizmetimiz "olduğu gibi" sunulmaktadır. Dönüştürme sonuçlarının doğruluğu veya uygunluğu konusunda garanti vermiyoruz. Hizmetin kullanımından kaynaklanan veri kaybı veya hasardan sorumlu değiliz.'
            },
            {
                title: 'Değişiklikler',
                content: 'Bu şartları önceden haber vermeksizin değiştirme hakkını saklı tutarız. Önemli değişiklikler sitemizde duyurulacaktır.'
            },
            {
                title: 'İletişim',
                content: 'Sorularınız için support@vormpixyze.com adresinden bize ulaşabilirsiniz.'
            }
        ]
    },
    en: {
        title: 'Terms of Service | VormPixyze',
        description: 'VormPixyze terms of service and conditions.',
        heading: 'Terms of Service',
        lastUpdated: 'Last Updated: January 2025',
        sections: [
            {
                title: 'Service Description',
                content: 'VormPixyze is a browser-based image conversion and editing tool. Our service includes image conversion for HEIC, PNG, JPG, WEBP and other formats, background removal, and image compression features.'
            },
            {
                title: 'Acceptable Use',
                content: 'You may only use our service for lawful purposes. Using our service for processing content that infringes copyright, is illegal, or harmful is prohibited.'
            },
            {
                title: 'Membership and Credits',
                content: 'Free users are subject to daily credit limits. Premium members receive additional features and increased limits. Payment transactions are securely processed by Lemon Squeezy.'
            },
            {
                title: 'Disclaimer',
                content: 'Our service is provided "as is". We do not guarantee the accuracy or suitability of conversion results. We are not responsible for data loss or damage resulting from use of the service.'
            },
            {
                title: 'Changes',
                content: 'We reserve the right to modify these terms without prior notice. Significant changes will be announced on our site.'
            },
            {
                title: 'Contact',
                content: 'For questions, you can reach us at support@vormpixyze.com.'
            }
        ]
    }
};

export default function TermsPage() {
    const { language } = useLanguage();
    const t = content[language] || content.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/terms" />
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
