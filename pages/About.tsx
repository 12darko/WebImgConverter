import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'Hakkımızda | VormPixyze',
        description: 'VormPixyze hakkında bilgi edinin. Misyonumuz ve değerlerimiz.',
        heading: 'Hakkımızda',
        mission: 'Misyonumuz',
        missionText: 'VormPixyze, görsel dönüştürme işlemlerini herkes için erişilebilir, hızlı ve güvenli hale getirmek amacıyla kuruldu. Gizliliğinizi korurken en iyi kullanıcı deneyimini sunmayı hedefliyoruz.',
        whyUs: 'Neden VormPixyze?',
        features: [
            { icon: '🔒', title: '%100 Gizlilik', desc: 'Dosyalarınız sunucuya yüklenmez. Tüm işlemler tarayıcınızda gerçekleşir.' },
            { icon: '⚡', title: 'Anında Dönüşüm', desc: 'Yükleme beklemeye gerek yok. Saniyeler içinde sonuç alın.' },
            { icon: '🎨', title: 'AI Teknolojisi', desc: 'Yapay zeka destekli arka plan silme ve akıllı dosya isimlendirme.' },
            { icon: '💎', title: 'Premium Kalite', desc: 'Profesyonel düzeyde dönüşüm kalitesi ve gelişmiş özellikler.' }
        ],
        team: 'Ekibimiz',
        teamText: 'VormPixyze, kullanıcı deneyimi ve gizlilik odaklı bir yazılım ekibi tarafından geliştirilmektedir. Sürekli iyileştirme ve yeni özellikler üzerinde çalışıyoruz.',
        contact: 'Bizimle iletişime geçmek için support@vormpixyze.com adresini kullanabilirsiniz.'
    },
    en: {
        title: 'About Us | VormPixyze',
        description: 'Learn about VormPixyze. Our mission and values.',
        heading: 'About Us',
        mission: 'Our Mission',
        missionText: 'VormPixyze was founded to make image conversion accessible, fast, and secure for everyone. We aim to provide the best user experience while protecting your privacy.',
        whyUs: 'Why VormPixyze?',
        features: [
            { icon: '🔒', title: '100% Privacy', desc: 'Your files are never uploaded to servers. All processing happens in your browser.' },
            { icon: '⚡', title: 'Instant Conversion', desc: 'No upload wait times. Get results in seconds.' },
            { icon: '🎨', title: 'AI Technology', desc: 'AI-powered background removal and smart file naming.' },
            { icon: '💎', title: 'Premium Quality', desc: 'Professional-grade conversion quality and advanced features.' }
        ],
        team: 'Our Team',
        teamText: 'VormPixyze is developed by a software team focused on user experience and privacy. We continuously work on improvements and new features.',
        contact: 'To get in touch with us, use support@vormpixyze.com.'
    }
};

export default function AboutPage() {
    const { language } = useLanguage();
    const t = content[language] || content.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/about" />
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
                    <h1 className="text-3xl font-bold text-white mb-8">{t.heading}</h1>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-3">{t.mission}</h2>
                        <p className="text-slate-400 leading-relaxed">{t.missionText}</p>
                    </section>

                    <h2 className="text-xl font-bold text-white mb-4">{t.whyUs}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {t.features.map((feature, i) => (
                            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                                <div className="text-2xl mb-2">{feature.icon}</div>
                                <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                                <p className="text-sm text-slate-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-3">{t.team}</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">{t.teamText}</p>
                        <p className="text-slate-400">{t.contact}</p>
                    </section>
                </main>

                <LegalFooter />
            </div>
        </>
    );
}
