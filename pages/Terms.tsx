import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'Kullanım Şartları | WebImgConverter',
        description: 'WebImgConverter kullanım Şartları ve koşulları.',
        heading: 'Kullanım Şartları',
        lastUpdated: 'Son Güncelleme: Ocak 2025',
        sections: [
            {
                title: 'Hizmet Tanımı',
                content: 'WebImgConverter, gelişmiş bir online görsel dönüştürme ve düzenleme aracıdır. Hizmetimiz HEIC, PNG, JPG, WEBP ve diğer formatlarda görsel dönüşümü, arka plan kaldırma ve görsel sıkıştırma özelliklerini içerir.'
            },
            {
                title: 'Kabul Edilebilir Kullanım',
                content: 'Hizmetimizi yalnızca yasal amaçlarla kullanabilirsiniz. Telif hakkı ihlali içeren, yasa desc veya zararlı içeriklerin işlenmesi için hizmetimizin kullanılması yasaktır.'
            },
            {
                title: 'üyelik ve Krediler',
                content: 'Ücretsiz kullanıcılar günlük kredi limitlerine tabidir. Premium üyeler ek özellikler ve artırılmış limitler alır. Ödeme işlemleri Lemon Squeezy tarafından güvenli bir şekilde gerçekleştirilir.'
            },
            {
                title: 'Sorumluluk Reddi',
                content: 'Hizmetimiz "olduğu gibi" sunulmaktadır. Dönüştürme sonuçlarının doğruluğu veya uygunluğu konusunda garanti vermiyoruz. Hizmetin kullanımından kaynaklanan veri kaybı veya hasardan sorumlu değiliz.'
            },
            {
                title: 'made Politikası (Refund Policy)',
                content: 'Dijital hizmetlerimizin anında teslimi ve kullanıma sebebiyle, premium aboneliklerde genel bir iade politikamız bulunmamaktadır. Ancak teknik bir sorun yaşamanız durumunda, satın alma işleminden sonraki 7 gen içinde support@WebImgConverter.com adresi üzerinden iade talebinde bulunabilirsiniz. Aboneliğinizi istediğiniz zaman iptal edebilirsiniz.'
            },
            {
                title: 'Değişiklikler',
                content: 'Bu Şartları önceden haber vermeksizin değiştirme hakkını saklı tutarız. Önemli değişiklikler sitemizde duyurulacaktır.'
            },
            {
                title: 'İletişim',
                content: 'Sorularınız için support@WebImgConverter.com adresinden bize ulaşabilirsiniz.'
            }
        ]
    },
    en: {
        title: 'Terms of Service | WebImgConverter',
        description: 'WebImgConverter terms of service and conditions.',
        heading: 'Terms of Service',
        lastUpdated: 'Last Updated: January 2025',
        sections: [
            {
                title: 'Service Description',
                content: 'WebImgConverter is an advanced online image conversion and editing tool. Our service includes image conversion for HEIC, PNG, JPG, WEBP and other formats, background removal, and image compression features.'
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
                title: 'Refund Policy',
                content: 'Due to the immediate delivery and nature of our digital services, we generally do not offer refunds for premium subscriptions. However, if you experience technical issues, you may request a refund within 7 days of purchase by contacting support@WebImgConverter.com. You can cancel your subscription at any time.'
            },
            {
                title: 'Changes',
                content: 'We reserve the right to modify these terms without prior notice. Significant changes will be announced on our site.'
            },
            {
                title: 'Contact',
                content: 'For questions, you can reach us at support@WebImgConverter.com.'
            }
        ]
    },
    de: {
        title: 'Nutzungsbedingungen | WebImgConverter',
        description: 'WebImgConverter Nutzungsbedingungen.',
        heading: 'Nutzungsbedingungen',
        lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
        sections: [
            {
                title: 'Servicebeschreibung',
                content: 'WebImgConverter ist ein fortschrittliches Online-Tool zur Bildkonvertierung und -bearbeitung. Unser Service umfasst die Bildkonvertierung for HEIC, PNG, JPG, WEBP und andere Formate, Hintergrundentfernung und Bildkomprimierungsfunktionen.'
            },
            {
                title: 'Zulässige Nutzung',
                content: 'Sie dürfen unseren Service nur for rechtmäßige Zwecke nutzen. Die Nutzung unseres Dienstes zur Verarbeitung von Inhalten, die Urheberrechte verletzen, illegal oder schädlich sind, ist untersagt.'
            },
            {
                title: 'Mitgliedschaft und Credits',
                content: 'Kostenlose Nutzer unterliegen täglichen Credit-Limits. Premium-Mitglieder erhalten zusätzliche Funktionen und erhöhte Limits. Zahlungstransaktionen werden von Lemon Squeezy sicher verarbeitet.'
            },
            {
                title: 'Haftungsausschluss',
                content: 'Unser Service wird "wie besehen" zur Verfügung gestellt. Wir garantieren nicht die Richtigkeit oder Eignung der Konvertierungsergebnisse. Wir sind nicht verantwortlich for Datenverlust oder Schäden, die sich aus der Nutzung des Dienstes ergeben.'
            },
            {
                title: 'Rückerstattungsrichtlinie',
                content: 'Aufgrund der sofortigen Bereitstellung unserer digitalen Dienste bieten wir im Allgemeinen keine Rückerstattungen for Premium-Abonnements an. Wenn Sie jedoch technische Probleme haben, können Sie innerhalb von 7 Tagen nach dem Kauf unter support@WebImgConverter.com eine Rückerstattung beantragen. Sie können Ihr Abonnement jederzeit kündigen.'
            },
            {
                title: 'Änderungen',
                content: 'Wir behalten uns das Recht vor, diese Bedingungen ohne vorherige Ankündigung zu ändern. Wesentliche Änderungen werden auf unserer Website bekannt gegeben.'
            },
            {
                title: 'Kontakt',
                content: 'Bei Fragen erreichen Sie uns unter support@WebImgConverter.com.'
            }
        ]
    },
    fr: {
        title: 'Conditions d\'utilisation | WebImgConverter',
        description: 'Conditions d\'utilisation de WebImgConverter.',
        heading: 'Conditions d\'utilisation',
        lastUpdated: 'Dernière mise h jour : Janvier 2025',
        sections: [
            {
                title: 'Description du Service',
                content: 'WebImgConverter est un outil avancé de conversion et d\'édition d\'images en ligne. Notre service comprend la conversion d\'images pour HEIC, PNG, JPG, WEBP et autres formats, la suppression d\'arrière-plan et les fonctionnalités de compression d\'images.'
            },
            {
                title: 'Utilisation Acceptable',
                content: 'Vous ne pouvez utiliser notre service qu\'h des fins licites. L\'utilisation de notre service pour le traitement de contenu enfreignant le droit d\'auteur, illegal ou nuisible est interdite.'
            },
            {
                title: 'Adhésion et Credits',
                content: 'Les utilisateurs gratuits sont soumis h des limites de credits quotidiennes. Les membres Premium bénéficient de fonctionnalités supplémentaires et de limites augmentées. Les transactions de paiement sont traitées de manière sécurisée par Lemon Squeezy.'
            },
            {
                title: 'Avis de Non-responsabilité',
                content: 'Notre service est fourni "tel quel". Nous ne garantissons pas l\'exactitude ou la pertinence des résultats de conversion. Nous ne sommes pas responsables de la perte de données ou des dommages résultant de l\'utilisation du service.'
            },
            {
                title: 'Politique de Remboursement',
                content: 'En raison de la livraison immédiate de nos services numériques, nous n\'offrons généralement pas de remboursements pour les abonnements premium. Toutefois, en cas de Probleme technique, vous pouvez demander un remboursement dans les 7 jours suivant l\'achat. Vous pouvez annuler votre abonnement h tout moment.'
            },
            {
                title: 'Modifications',
                content: 'Nous nous réservons le droit de modifier ces conditions sans préavis. Les changements importants seront annoncés sur notre site.'
            },
            {
                title: 'Contact',
                content: 'Pour des questions, vous pouvez nous joindre h support@WebImgConverter.com.'
            }
        ]
    }
};

import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';

export default function TermsPage() {
    const { language } = useLanguage();
    const activeLang = typeof language === 'string' && language.startsWith('tr') ? 'tr' : 
                      typeof language === 'string' && language.startsWith('de') ? 'de' : 
                      typeof language === 'string' && language.startsWith('fr') ? 'fr' : 'en';
    const t = content[activeLang as keyof typeof content] || content.tr;
    const navigate = useNavigate();

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel="Hemen Başla" bg="white">
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/terms" />
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
