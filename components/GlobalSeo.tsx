import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const GlobalSeo = () => {
    const location = useLocation();
    const { language } = useLanguage();

    const siteUrl = 'https://webimgconverter.com';
    
    // Extract base path for hreflang calculation
    const pathParts = location.pathname.split('/');
    const firstPart = pathParts[1];
    
    let basePath = location.pathname;
    if (['en'].includes(firstPart)) {
       pathParts.splice(1, 1);
       basePath = pathParts.join('/') || '/';
    }

    const getLocalizedUrl = (lang: string) => {
        if (lang === 'tr') return `${siteUrl}${basePath}`;
        return `${siteUrl}/${lang}${basePath === '/' ? '' : basePath}`;
    };

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

    if (basePath !== '/') {
        const pageName = pageNames[basePath] || basePath.replace(/^\//, '').replace(/-/g, ' ');
        breadcrumbItems.push({
            "@type": "ListItem",
            "position": 2,
            "name": pageName,
            "item": `${siteUrl}${location.pathname}`
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
            <link rel="alternate" hrefLang="x-default" href={getLocalizedUrl('tr')} />
            <link rel="alternate" hrefLang="tr" href={getLocalizedUrl('tr')} />
            <link rel="alternate" hrefLang="en" href={getLocalizedUrl('en')} />

            {/* Dynamic Canonical */}
            <link rel="canonical" href={`${siteUrl}${location.pathname}`} />

        </Helmet>
    );
};
