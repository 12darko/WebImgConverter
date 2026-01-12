import React from 'react';
import { useLanguage } from '../LanguageContext';

export const SeoContent = () => {
    const { language } = useLanguage();

    if (language === 'tr') {
        return (
            <section className="bg-slate-900 border-t border-slate-800 py-16 px-4 md:px-8 mt-20">
                <div className="max-w-4xl mx-auto space-y-12 text-slate-300">

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white">HEIC Dosyasını JPG'ye Çevirme ve AI Araçları</h2>
                        <p className="leading-relaxed">
                            VormPixyze, modern fotoğraf formatı olan HEIC (High Efficiency Image Coding) dosyalarını saniyeler içinde evrensel olarak kabul gören JPG, PNG veya WEBP formatlarına dönüştürmenizi sağlayan güçlü bir çevrimiçi araçtır. Apple cihazlarınızda (iPhone, iPad) çektiğiniz fotoğrafları Windows, Android veya web sitelerinde sorunsuzca kullanmak için format değişikliği yapmanız gerekebilir. VormPixyze bu süreci güvenli, hızlı ve ücretsiz hale getirir.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-xl font-semibold text-white mb-3">Neden HEIC'i JPG'ye Çevirmeliyim?</h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                HEIC formatı yüksek kalitede sıkıştırma sunsa da, birçok eski yazılım, web sitesi ve işletim sistemi tarafından doğrudan desteklenmez. Fotoğraflarınızı paylaşmak, düzenlemek veya web'e yüklemek için JPG en güvenli ve en uyumlu formattır. VormPixyze ile kalite kaybı yaşamadan bu dönüşümü gerçekleştirebilirsiniz.
                            </p>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-xl font-semibold text-white mb-3">AI Destekli Arka Plan Silme</h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                Sadece format dönüştürme değil, VormPixyze aynı zamanda gelişmiş yapay zeka algoritmaları kullanarak fotoğraflarınızın arka planını tek tıkla silebilir. E-ticaret ürün fotoğrafları, profil resimleri veya grafik tasarım projeleriniz için mükemmel sonuçlar elde edersiniz.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Sıkça Sorulan Sorular (SSS)</h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-indigo-400">VormPixyze Kullanmak Ücretli mi?</h4>
                                <p>Hayır, temel dönüştürme ve araç özellikleri tamamen ücretsizdir. Daha yüksek limitler ve gelişmiş özellikler (toplu işlem, filigran ekleme) için Premium planlarımızı inceleyebilirsiniz.</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-indigo-400">Dosyalarım Güvende mi?</h4>
                                <p>Kesinlikle. Tüm işlemler tarayıcınızda (Client-Side) ve güvenli sunucularımızda anlık olarak yapılır. Dosyalarınız asla kalıcı olarak depolanmaz ve işlem bittikten sonra sunucularımızdan otomatik olarak silinir. Gizliliğiniz bizim için önceliktir.</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-indigo-400">Hangi Formatları Destekliyorsunuz?</h4>
                                <p>Girdi olarak HEIC, PNG, JPG, WEBP, AVIF ve SVG formatlarını destekliyoruz. Çıktı olarak ise JPG, PNG, WEBP ve daha fazlasına dönüştürme yapabilirsiniz.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        );
    }

    return (
        <section className="bg-slate-900 border-t border-slate-800 py-16 px-4 md:px-8 mt-20">
            <div className="max-w-4xl mx-auto space-y-16 text-slate-300">

                {/* Intro */}
                <article className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Convert HEIC to JPG Online: The Ultimate Guide & Tool</h2>
                    <p className="leading-relaxed text-lg text-slate-400">
                        Welcome to <strong>VormPixyze</strong>, the most advanced, privacy-focused online content converter. In a world dominating by high-efficiency formats like HEIC and AVIF, compatibility remains a challenge. Our tool bridges the gap, allowing you to convert <strong>HEIC to JPG</strong>, remove backgrounds using AI, and optimize images for the web—all directly in your browser without uploading files to a server.
                    </p>
                </article>

                {/* How to Use Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl group-hover:scale-110 transition-transform">1</div>
                        <h3 className="text-xl font-bold text-white mb-4 relative z-10">Upload Sources</h3>
                        <p className="text-sm text-slate-400 relative z-10">Drag and drop your .HEIC, .PNG, or .WEBP files into the zone. We support batch processing for hundreds of files at once.</p>
                    </div>
                    <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl group-hover:scale-110 transition-transform">2</div>
                        <h3 className="text-xl font-bold text-white mb-4 relative z-10">Customize & Edit</h3>
                        <p className="text-sm text-slate-400 relative z-10">Choose your output format (JPG, PDF, PNG). Use our toggle to <strong>Remove Background</strong> with AI or crop images before converting.</p>
                    </div>
                    <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl group-hover:scale-110 transition-transform">3</div>
                        <h3 className="text-xl font-bold text-white mb-4 relative z-10">Download Zip</h3>
                        <p className="text-sm text-slate-400 relative z-10">Get your converted files instantly. Download them individually or grab everything as a single ZIP archive. Fast and efficient.</p>
                    </div>
                </div>

                {/* Value Proposition - Unique Content */}
                <article className="space-y-8">
                    <h2 className="text-2xl font-bold text-white">Why VormPixyze is Different?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-400 mb-2">🔒 100% Client-Side Privacy</h3>
                            <p className="text-sm leading-relaxed">Most online converters upload your personal photos to a cloud server to process them. This creates a privacy risk. <strong>VormPixyze runs entirely in your browser using WebAssembly technology.</strong> Your photos never leave your device.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-400 mb-2">⚡ Lightning Fast AI</h3>
                            <p className="text-sm leading-relaxed">By leveraging your device's GPU, we can perform complex tasks like <strong>AI Background Removal</strong> in milliseconds. No queuing, no waiting for server slots.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-400 mb-2">💎 Quality Retention</h3>
                            <p className="text-sm leading-relaxed">We use advanced compression algorithms (MozJPEG and OxiPNG) to ensure that while your file size drops, the visual quality remains indistinguishable from the original.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-400 mb-2">📱 Cross-Platform</h3>
                            <p className="text-sm leading-relaxed">Whether you are on an iPhone trying to open HEIC files on Windows, or a designer on a Mac needing WebP for a site, VormPixyze works seamlessly across all modern browsers.</p>
                        </div>
                    </div>
                </article>

                {/* Educational Content: HEIC vs JPG */}
                <article className="bg-slate-800/30 p-8 rounded-3xl border border-slate-800">
                    <h2 className="text-2xl font-bold text-white mb-6">HEIC vs JPG: Which should you use?</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="py-4 font-semibold text-slate-300">Feature</th>
                                    <th className="py-4 font-semibold text-indigo-400">HEIC (High Efficiency)</th>
                                    <th className="py-4 font-semibold text-emerald-400">JPG (Joint Photographic)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                <tr>
                                    <td className="py-4 text-slate-400">File Size</td>
                                    <td className="py-4 text-slate-200">Very Small (~50% of JPG)</td>
                                    <td className="py-4 text-slate-200">Larger</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-slate-400">Compatibility</td>
                                    <td className="py-4 text-slate-200">Limited (Apple ecosystem)</td>
                                    <td className="py-4 text-slate-200">Universal (Every device)</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-slate-400">Color Depth</td>
                                    <td className="py-4 text-slate-200">16-bit (Deep Color)</td>
                                    <td className="py-4 text-slate-200">8-bit</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-slate-400">Transparency</td>
                                    <td className="py-4 text-slate-200">Supported (HEIF)</td>
                                    <td className="py-4 text-slate-200">Not Supported</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </article>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>

                    <div className="space-y-4">
                        <details className="group bg-slate-950 border border-slate-800 rounded-xl">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
                                <span>How do I open HEIC files on Windows?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="text-slate-400 mt-0 px-4 pb-4 leading-relaxed">
                                Windows 10 and 11 require a paid extension to open HEIC files essentially. The free and fastest way is to use <strong>VormPixyze</strong> to convert them to JPG. Just drag your files above, click download, and you can view them anywhere.
                            </div>
                        </details>

                        <details className="group bg-slate-950 border border-slate-800 rounded-xl">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
                                <span>Is there a limit to how many files I can convert?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="text-slate-400 mt-0 px-4 pb-4 leading-relaxed">
                                Our free tier allows for generous daily usage. For power users needing to convert thousands of images or requiring API access, we offer <span className="text-indigo-400">Premium Plans</span> that unlock unlimited batch processing and faster priority support.
                            </div>
                        </details>

                        <details className="group bg-slate-950 border border-slate-800 rounded-xl">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
                                <span>Can I remove background from JPGs?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="text-slate-400 mt-0 px-4 pb-4 leading-relaxed">
                                Yes! When you upload a JPG, PNG, or HEIC file, toggle the <strong>"Remove Background"</strong> switch on the file card. Our AI will automatically detect the subject and create a transparent PNG for you.
                            </div>
                        </details>
                    </div>
                </div>

            </div>
        </section>
    );
};
