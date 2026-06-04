import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { SeoContent } from '../components/SeoContent';
import { useLanguage } from '../LanguageContext';

const seoContent = {
    tr: {
        title: 'Görsel Sıkıştırma - Ücretsiz Online | WebImgConverter',
        description: 'Görsellerinizi kalite kaybı olmadan %90\'a kadar sıkıştırın. JPG, PNG, WebP destekli. Güvenli sunucu işlemeli.',
        h1: 'Görsel Sıkıştırma',
    },
    en: {
        title: 'Free Image Compressor Online | WebImgConverter',
        description: 'Compress images up to 90% without losing quality. Supports JPG, PNG, WebP. Secure server processing.',
        h1: 'Image Compressor',
    },
    de: {
        title: 'Kostenloser Bildkomprimierer Online | WebImgConverter',
        description: 'Komprimieren Sie Bilder bis zu 90% ohne Qualitätsverlust. Unterstützt JPG, PNG, WebP. Sichere Serververarbeitung.',
        h1: 'Bildkomprimierer',
    },
    fr: {
        title: 'Compresseur d\'Images Gratuit en Ligne | WebImgConverter',
        description: 'Compressez vos images jusqu\'à 90% sans perte de qualité. Prend en charge JPG, PNG, WebP. Traitement serveur sécurisé.',
        h1: 'Compresseur d\'Images',
    },
};

const richContent = {
    tr: {
        features: [
            { icon: '📉', title: '%90 Küçültme', desc: 'Görsel kalitesini korurken dosya boyutunu %90\'a kadar azaltın. Web siteleriniz artık çok daha hızlı.' },
            { icon: '🎛️', title: 'Kalite Kontrolü', desc: 'Sıkıştırma oranını kendiniz ayarlayın. Dengeli, yüksek kalite veya maksimum sıkıştırma seçenekleri.' },
            { icon: '🔒', title: 'Gizlilik Garantisi', desc: 'Görselleriniz anlık işlenir ve hemen silinir. Kalıcı depolama yapılmaz.' },
        ],
        howToTitle: 'Görsel Nasıl Sıkıştırılır?',
        steps: [
            { num: 1, title: 'Görsel Yükle', desc: 'JPG, PNG veya WebP dosyalarınızı sürükleyin.' },
            { num: 2, title: 'Kalite Seç', desc: 'İstediğiniz sıkıştırma seviyesini ayarlayın.' },
            { num: 3, title: 'İndir', desc: 'Küçültülmüş dosyayı tek tıkla indirin.' },
        ],
        whyTitle: 'Neden Görsel Sıkıştırma Önemlidir?',
        whyText: 'Büyük dosya boyutları web sitenizi yavaşlatır, mobil kullanıcıları kaybetmenize neden olur ve Google sıralamalarınızı olumsuz etkiler. Görsel sıkıştırma ile sayfa yüklenme süresini %50+ azaltabilir, SEO performansınızı artırabilir ve ziyaretçi deneyimini iyileştirebilirsiniz.',
        useCasesTitle: 'Kullanım Alanları',
        useCases: [
            { icon: '🌐', title: 'Web Siteleri', desc: 'E-ticaret, blog ve kurumsal siteler için hızlı yüklenen görseller.' },
            { icon: '📧', title: 'E-posta', desc: 'Ek boyut sınırlarına takılmadan fotoğraf gönderin.' },
            { icon: '📱', title: 'Mobil Uygulamalar', desc: 'Uygulama boyutunu küçültün, daha hızlı indirme sağlayın.' },
            { icon: '💾', title: 'Depolama', desc: 'Bulut depolama alanından tasarruf edin.' },
        ],
        statsTitle: 'Sıkıştırma Performansı',
    },
    en: {
        features: [
            { icon: '📉', title: '90% Reduction', desc: 'Reduce file size up to 90% while preserving visual quality. Your websites load much faster.' },
            { icon: '🎛️', title: 'Quality Control', desc: 'Adjust compression ratio yourself. Balanced, high quality, or maximum compression options.' },
            { icon: '🔒', title: 'Privacy Guaranteed', desc: 'Your images are processed instantly and deleted immediately. No permanent storage.' },
        ],
        howToTitle: 'How to Compress Images?',
        steps: [
            { num: 1, title: 'Upload Image', desc: 'Drag your JPG, PNG or WebP files.' },
            { num: 2, title: 'Set Quality', desc: 'Adjust your desired compression level.' },
            { num: 3, title: 'Download', desc: 'Download compressed file with one click.' },
        ],
        whyTitle: 'Why is Image Compression Important?',
        whyText: 'Large file sizes slow down your website, cause you to lose mobile users, and negatively impact your Google rankings. With image compression, you can reduce page load time by 50%+, improve SEO performance, and enhance visitor experience.',
        useCasesTitle: 'Use Cases',
        useCases: [
            { icon: '🌐', title: 'Websites', desc: 'Fast-loading images for e-commerce, blogs, and corporate sites.' },
            { icon: '📧', title: 'Email', desc: 'Send photos without hitting attachment size limits.' },
            { icon: '📱', title: 'Mobile Apps', desc: 'Reduce app size, enable faster downloads.' },
            { icon: '💾', title: 'Storage', desc: 'Save cloud storage space.' },
        ],
        statsTitle: 'Compression Performance',
    },
    de: {
        features: [
            { icon: '📉', title: '90% Reduktion', desc: 'Reduzieren Sie die Dateigröße um bis zu 90% bei erhaltener visueller Qualität. Ihre Websites laden viel schneller.' },
            { icon: '🎛️', title: 'Qualitätskontrolle', desc: 'Passen Sie das Komprimierungsverhältnis selbst an. Ausgewogene, hohe Qualität oder maximale Komprimierung.' },
            { icon: '🔒', title: 'Datenschutz Garantiert', desc: 'Ihre Bilder werden sofort verarbeitet und gelöscht. Keine dauerhafte Speicherung.' },
        ],
        howToTitle: 'Wie komprimiert man Bilder?',
        steps: [
            { num: 1, title: 'Bild Hochladen', desc: 'Ziehen Sie Ihre JPG, PNG oder WebP-Dateien.' },
            { num: 2, title: 'Qualität Einstellen', desc: 'Stellen Sie Ihre gewünschte Komprimierungsstufe ein.' },
            { num: 3, title: 'Herunterladen', desc: 'Laden Sie komprimierte Datei mit einem Klick herunter.' },
        ],
        whyTitle: 'Warum ist Bildkomprimierung wichtig?',
        whyText: 'Große Dateigrößen verlangsamen Ihre Website, führen zum Verlust mobiler Nutzer und beeinträchtigen Ihre Google-Rankings negativ. Mit Bildkomprimierung können Sie die Seitenladezeit um 50%+ reduzieren.',
        useCasesTitle: 'Anwendungsfälle',
        useCases: [
            { icon: '🌐', title: 'Websites', desc: 'Schnell ladende Bilder für E-Commerce, Blogs und Unternehmensseiten.' },
            { icon: '📧', title: 'E-Mail', desc: 'Senden Sie Fotos ohne Größenbeschränkungen.' },
            { icon: '📱', title: 'Mobile Apps', desc: 'Reduzieren Sie die App-Größe, ermöglichen Sie schnellere Downloads.' },
            { icon: '💾', title: 'Speicher', desc: 'Sparen Sie Cloud-Speicherplatz.' },
        ],
        statsTitle: 'Komprimierungsleistung',
    },
    fr: {
        features: [
            { icon: '📉', title: 'Réduction 90%', desc: 'Réduisez la taille des fichiers jusqu\'à 90% tout en préservant la qualité visuelle. Vos sites web se chargent beaucoup plus vite.' },
            { icon: '🎛️', title: 'Contrôle Qualité', desc: 'Ajustez vous-même le taux de compression. Options équilibrées, haute qualité ou compression maximale.' },
            { icon: '🔒', title: 'Confidentialité Garantie', desc: 'Vos images sont traitées instantanément et supprimées immédiatement. Pas de stockage permanent.' },
        ],
        howToTitle: 'Comment compresser des images?',
        steps: [
            { num: 1, title: 'Télécharger', desc: 'Glissez vos fichiers JPG, PNG ou WebP.' },
            { num: 2, title: 'Régler Qualité', desc: 'Ajustez le niveau de compression souhaité.' },
            { num: 3, title: 'Télécharger', desc: 'Téléchargez le fichier compressé en un clic.' },
        ],
        whyTitle: 'Pourquoi la compression d\'image est-elle importante?',
        whyText: 'Les fichiers volumineux ralentissent votre site web, vous font perdre des utilisateurs mobiles et impactent négativement votre classement Google. Avec la compression d\'images, vous pouvez réduire le temps de chargement de 50%+.',
        useCasesTitle: 'Cas d\'utilisation',
        useCases: [
            { icon: '🌐', title: 'Sites Web', desc: 'Images à chargement rapide pour e-commerce, blogs et sites d\'entreprise.' },
            { icon: '📧', title: 'E-mail', desc: 'Envoyez des photos sans limite de taille de pièce jointe.' },
            { icon: '📱', title: 'Apps Mobiles', desc: 'Réduisez la taille de l\'app, permettez des téléchargements plus rapides.' },
            { icon: '💾', title: 'Stockage', desc: 'Économisez de l\'espace de stockage cloud.' },
        ],
        statsTitle: 'Performance de Compression',
    },
};

type LangKey = keyof typeof seoContent;

export default function CompressImagePage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent['en'];
    const r = richContent[activeLang] || richContent['en'];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/compress-image" />
            </Helmet>
            <App
                defaultTool="compress-image"
                pageH1={t.h1}
                acceptTypes="image/png, image/jpeg, image/webp"
                formatBadges={['JPG', 'PNG', 'WEBP']}
                hideFormatSelector={true}
                allowedSettings={['quality', 'maxKb']}
            >
                {/* Rich Content for SEO */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {r.features.map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white text-center">{r.howToTitle}</h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            {r.steps.map((step, idx) => (
                                <div key={idx} className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">
                                        {step.num}
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{step.desc}</p>
                                </div>
                            ))}
                            <div className="hidden md:block w-full h-0.5 bg-brand-200 dark:bg-brand-800 absolute top-1/2 -translate-y-1/2 -z-0"></div>
                        </div>
                    </div>

                    {/* Why Compress Section */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{r.whyTitle}</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{r.whyText}</p>
                    </div>

                    {/* Use Cases */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">{r.useCasesTitle}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {r.useCases.map((uc, idx) => (
                                <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center hover:shadow-card transition-all">
                                    <div className="text-3xl mb-2">{uc.icon}</div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{uc.title}</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">{uc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compression Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">90%</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Maks Sıkıştırma' : activeLang === 'de' ? 'Max Komprimierung' : activeLang === 'fr' ? 'Compression Max' : 'Max Compression'}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100+</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Toplu Dosya' : activeLang === 'de' ? 'Stapel-Dateien' : activeLang === 'fr' ? 'Fichiers par lot' : 'Batch Files'}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-amber-500 dark:text-amber-400">3</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Desteklenen Format' : activeLang === 'de' ? 'Unterstützte Formate' : activeLang === 'fr' ? 'Formats pris en charge' : 'Supported Formats'}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-rose-500 dark:text-rose-400">0</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Sunucu Yüklemesi' : activeLang === 'de' ? 'Server-Upload' : activeLang === 'fr' ? 'Upload serveur' : 'Server Upload'}</div>
                        </div>
                    </div>
                </div>

                <SeoContent pageType="compress-image" />
            </App>
        </>
    );
}
