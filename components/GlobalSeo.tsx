import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const GlobalSeo = () => {
    const location = useLocation();
    const { language } = useLanguage();

    const siteUrl = 'https://webimgconverter.com';
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const langParam = searchParams.get('lang');
    const canonicalUrl = langParam ? `${siteUrl}${currentPath}?lang=${langParam}` : `${siteUrl}${currentPath}`;

    // JSON-LD: SoftwareApplication
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WebImgConverter",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Free online HEIC to JPG, WebP converter and AI photo background remover. Privacy-focused, secure server processing.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        }
    };

    // JSON-LD: BreadcrumbList (dynamic per route)
    const pageNames: Record<string, string> = {
        '/': 'Home',
        '/heic-to-jpg': 'HEIC to JPG Converter',
        '/webp-to-jpg': 'WebP to JPG Converter',
        '/png-to-jpg': 'PNG to JPG Converter',
        '/remove-background': 'AI Background Remover',
        '/compress-image': 'Image Compressor',
        '/blog': 'Blog & Guides',
        '/about': 'About Us',
        '/privacy': 'Privacy Policy',
        '/terms': 'Terms of Service',
        '/contact': 'Contact',
    };

    const breadcrumbItems = [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl }
    ];

    if (currentPath !== '/') {
        const pageName = pageNames[currentPath] || currentPath.replace(/^\//, '').replace(/-/g, ' ');
        breadcrumbItems.push({
            "@type": "ListItem",
            "position": 2,
            "name": pageName,
            "item": `${siteUrl}${currentPath}`
        });
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
    };

    return (
        <Helmet>
            {/* SoftwareApplication Schema */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>

            {/* BreadcrumbList Schema */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>

            {/* Hreflang Tags */}
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${currentPath}`} />
            <link rel="alternate" hrefLang="en" href={`${siteUrl}${currentPath}?lang=en`} />
            <link rel="alternate" hrefLang="tr" href={`${siteUrl}${currentPath}?lang=tr`} />
            <link rel="alternate" hrefLang="de" href={`${siteUrl}${currentPath}?lang=de`} />
            <link rel="alternate" hrefLang="fr" href={`${siteUrl}${currentPath}?lang=fr`} />

            {/* Dynamic Canonical */}
            <link rel="canonical" href={canonicalUrl} />

        </Helmet>
    );
};
