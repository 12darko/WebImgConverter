import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './LanguageContext';
import App from './AppMain';
import HeicConverterPage from './pages/HeicConverter';
import PngConverterPage from './pages/PngConverter';
import RemoveBackgroundPage from './pages/RemoveBackground';
import CompressImagePage from './pages/CompressImage';
import SvgConverterPage from './pages/SvgConverter';
import SmartCropperPage from './pages/SmartCropper';
import FaviconGeneratorPage from './pages/FaviconGenerator';
import RotateImagePage from './pages/RotateImage';
import WatermarkImagePage from './pages/WatermarkImage';
import BlackAndWhitePage from './pages/BlackAndWhite';
import WebpConverterPage from './pages/WebpConverter';
import JpgConverterPage from './pages/JpgConverter';
import AvifConverterPage from './pages/AvifConverter';
import ImageResizerPage from './pages/ImageResizer';
import HomePage from './pages/Home';
import ToolsPage from './pages/Tools';
import PricingPage from './pages/Pricing';
import ApiDocsPage from './pages/ApiDocs';
import SupportPage from './pages/Support';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import BlogArticlePage from './pages/BlogArticle';
import NotFoundPage from './pages/NotFound';
import ProfilePage from './pages/Profile';

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
                        <Route path="/tools" element={<ToolsPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/api" element={<ApiDocsPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/heic-converter" element={<HeicConverterPage />} />
                        <Route path="/png-converter" element={<PngConverterPage />} />
                        <Route path="/remove-background" element={<RemoveBackgroundPage />} />
                        <Route path="/compress-image" element={<CompressImagePage />} />
                        <Route path="/svg-converter" element={<SvgConverterPage />} />
                        <Route path="/smart-cropper" element={<SmartCropperPage />} />
                        <Route path="/favicon-generator" element={<FaviconGeneratorPage />} />
                        <Route path="/rotate-image" element={<RotateImagePage />} />
                        <Route path="/watermark-image" element={<WatermarkImagePage />} />
                        <Route path="/black-and-white" element={<BlackAndWhitePage />} />
                        <Route path="/webp-converter" element={<WebpConverterPage />} />
                        <Route path="/jpg-converter" element={<JpgConverterPage />} />
                        <Route path="/avif-converter" element={<AvifConverterPage />} />
                        <Route path="/resize-image" element={<ImageResizerPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:slug" element={<BlogArticlePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        {/* Fallback to main app for legacy access */}
                        <Route path="/app" element={<App />} />
                        {/* 404 Catch-all */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </LanguageProvider>
            </BrowserRouter>
        </HelmetProvider>
    );
}
