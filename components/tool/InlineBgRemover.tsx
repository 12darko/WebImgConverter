import React, { useState } from 'react';
import { AdsterraNativeBanner } from '../ads/AdsterraNativeBanner';

interface InlineBgRemoverProps {
    file: {
        id: string;
        previewUrl: string;
        status: string;
        convertedUrl?: string;
        bgModel?: string;
    };
    onProcess: () => void;
    onCancel: () => void;
    onDownload: () => void;
    onModelChange?: (model: string) => void;
}

export const InlineBgRemover: React.FC<InlineBgRemoverProps> = ({ file, onProcess, onCancel, onDownload, onModelChange }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (e: React.MouseEvent | React.TouchEvent, container: HTMLDivElement) => {
        const rect = container.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const pos = ((clientX - rect.left) / rect.width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, pos)));
    };

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col animate-[fadeIn_0.3s]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <button onClick={onCancel} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-250 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors" title="İptal">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">✨ Arka Plan Silici</h3>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    {file.status === 'idle' && (
                        <>
                            {onModelChange && (
                                <select
                                    value={file.bgModel || 'birefnet-massive'}
                                    onChange={(e) => onModelChange(e.target.value)}
                                    className="bg-brand-50 dark:bg-brand-950/30 text-[13px] font-medium text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none"
                                >
                                    <option value="birefnet-massive">🤖 Kusursuz Yapay Zeka (En İyi)</option>
                                    <option value="birefnet-portrait">🧑 Portre Modu (İnsan & Saç)</option>
                                    <option value="birefnet-dis">🎨 Logo & Metin (Keskin)</option>
                                </select>
                            )}
                            <button onClick={onProcess} className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Arka Planı Sil
                            </button>
                        </>
                    )}
                    {file.status === 'done' && (
                        <button onClick={onDownload} className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            İndir
                        </button>
                    )}
                </div>
            </div>

            {/* Canvas / Preview Area */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex items-center justify-center min-h-[400px] border-t border-slate-100 dark:border-slate-850 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                
                {file.status === 'analyzing' || file.status === 'converting' ? (
                    <div className="flex flex-col items-center gap-4 bg-white/90 dark:bg-slate-850/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-500 rounded-full animate-spin"></div>
                        <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">Yapay Zeka İşliyor...</p>
                    </div>
                ) : file.status === 'done' && file.convertedUrl ? (
                    <div 
                        className="relative w-full max-w-2xl h-[400px] cursor-ew-resize select-none overflow-hidden rounded-xl shadow-lg border border-slate-200 dark:border-slate-850 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWVlIi8+PHJlY3QgeD0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==')]"
                        onMouseMove={(e) => isDragging && handleMove(e, e.currentTarget)}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        onTouchMove={(e) => handleMove(e, e.currentTarget)}
                    >
                        {/* After Image (Transparent BG) */}
                        <img src={file.convertedUrl} className="absolute inset-0 w-full h-full object-contain pointer-events-none dark:brightness-90 dark:opacity-90" alt="After" />
                        
                        {/* Before Image (Original) using clipPath for perfect alignment */}
                        <img 
                            src={file.previewUrl} 
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none dark:brightness-90 dark:opacity-90 border-r-2 border-white/80 dark:border-slate-700/80 shadow-[1px_0_4px_rgba(0,0,0,0.2)]" 
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} 
                            alt="Before" 
                        />
                        
                        {/* Slider Handle */}
                        <div className="absolute top-0 bottom-0 w-1 bg-white dark:bg-slate-750 cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10" style={{ left: `${sliderPosition}%` }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-lg text-brand-900 dark:text-brand-400 font-bold text-xs">
                                ↔
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-2xl w-full">
                        <img src={file.previewUrl} className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:brightness-90 dark:opacity-90" alt="Original preview" />
                    </div>
                )}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 p-2 bg-slate-50 dark:bg-slate-900/50">
                <AdsterraNativeBanner />
            </div>
        </div>
    );
};
