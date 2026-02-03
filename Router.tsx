import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './LanguageContext';
import App from './App';
import HeicToJpgPage from './pages/HeicToJpg';
import PngToJpgPage from './pages/PngToJpg';
import WebpToJpgPage from './pages/WebpToJpg';
import RemoveBackgroundPage from './pages/RemoveBackground';
import CompressImagePage from './pages/CompressImage';
import HomePage from './pages/Home';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import BlogArticlePage from './pages/BlogArticle';
import NotFoundPage from './pages/NotFound';

import { AnalyticsTracker } from './components/AnalyticsTracker';

import { GlobalSeo } from './components/GlobalSeo';

export default function Router() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <LanguageProvider>
                    <GlobalSeo />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/heic-to-jpg" element={<HeicToJpgPage />} />
                        <Route path="/png-to-jpg" element={<PngToJpgPage />} />
                        <Route path="/webp-to-jpg" element={<WebpToJpgPage />} />
                        <Route path="/remove-background" element={<RemoveBackgroundPage />} />
                        <Route path="/compress-image" element={<CompressImagePage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:slug" element={<BlogArticlePage />} />
                        {/* Fallback to main app for legacy access */}
                        <Route path="/app" element={<App />} />
                        {/* 404 Catch-all */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </LanguageProvider>
            </BrowserRouter>
        </HelmetProvider >
    );
}
