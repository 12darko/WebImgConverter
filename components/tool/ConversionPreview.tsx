import React from 'react';
import { formatBytes } from '../../services/toolEngine';
import { useLanguage } from '../../LanguageContext';
import { translations } from '../../translations';

interface ConversionPreviewProps {
    originalUrl?: string;
    convertedUrl?: string;
    originalSize?: number;
    convertedSize?: number;
    isProcessing?: boolean;
    placeholder?: React.ReactNode;
    className?: string;
}

/**
 * Before/after image preview with a draggable vertical slider.
 */
export const ConversionPreview: React.FC<ConversionPreviewProps> = ({
    originalUrl,
    convertedUrl,
    originalSize,
    convertedSize,
    isProcessing,
    placeholder,
    className = '',
}) => {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as keyof typeof translations;
    const t = translations[activeLang];

    const containerRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState(50);
    const [isDragging, setIsDragging] = React.useState(false);

    const updatePosition = React.useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(pct);
    }, []);

    React.useEffect(() => {
        if (!isDragging) return;
        const handleMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            updatePosition(clientX);
        };
        const handleUp = () => setIsDragging(false);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchend', handleUp);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isDragging, updatePosition]);

    if (!originalUrl) {
        return (
            <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card overflow-hidden ${className}`}>
                <div className="aspect-[4/3] flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/50">
                    {placeholder || (
                        <div className="text-center text-slate-400 dark:text-slate-500 text-sm">
                            {t.upload_to_preview}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card overflow-hidden ${className}`}>
            <div
                ref={containerRef}
                className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950 select-none overflow-hidden"
            >
                {/* Original image (full) */}
                <img
                    src={originalUrl}
                    alt="Original"
                    className="absolute inset-0 w-full h-full object-contain dark:brightness-90 dark:opacity-90"
                    draggable={false}
                />

                {/* Converted image (clipped on right side) */}
                {convertedUrl && (
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
                    >
                        <img
                            src={convertedUrl}
                            alt="Converted"
                            className="absolute inset-0 w-full h-full object-contain dark:brightness-90 dark:opacity-90"
                            draggable={false}
                        />
                    </div>
                )}

                {/* Slider line */}
                {convertedUrl && (
                    <div
                        className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none"
                        style={{ left: `${position}%`, boxShadow: '0 0 0 1px rgba(15,23,42,0.15)' }}
                    />
                )}

                {/* Slider handle */}
                {convertedUrl && (
                    <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onTouchStart={(e) => { e.preventDefault(); setIsDragging(true); }}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-pop flex items-center justify-center cursor-ew-resize active:scale-95 transition-transform"
                        style={{ left: `${position}%` }}
                        aria-label="Compare slider"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-300">
                            <polyline points="9 18 3 12 9 6" /><polyline points="15 18 21 12 15 6" />
                        </svg>
                    </button>
                )}

                {/* Processing overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-350">{t.processing}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom labels */}
            <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {t.original} {originalSize != null && <>({formatBytes(originalSize)})</>}
                </span>
                {convertedUrl && convertedSize != null && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 text-[11px] font-semibold border border-brand-200 dark:border-brand-800">
                        {t.converted} ({formatBytes(convertedSize)})
                    </span>
                )}
            </div>
        </div>
    );
};
