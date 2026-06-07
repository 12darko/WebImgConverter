import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdsterraNativeBanner } from '../ads/AdsterraNativeBanner';
import { useLanguage } from '../../LanguageContext';
import { serverConversionService } from '../../services/serverConversionService';

interface InlineWatermarkRemoverProps {
    imageUrl: string;
    initialMode?: 'normal' | 'gemini';
    hideModeSwitcher?: boolean;
    onCancel: () => void;
}

const translations = {
    tr: {
        title: "✨ Yapay Zeka Filigran Silici",
        brushSize: "Fırça Boyutu",
        undo: "Geri Al (Ctrl+Z)",
        modeNormal: "Normal Silici",
        modeGemini: "Gemini Filigranı",
        clear: "Temizle",
        remove: "Filigranı Sil",
        removing: "Yapay Zeka İşliyor...",
        success: "Silindi ✓",
        download: "İndir"
    },
    en: {
        title: "✨ AI Watermark Remover",
        brushSize: "Brush Size",
        undo: "Undo (Ctrl+Z)",
        modeNormal: "Normal Remover",
        modeGemini: "Gemini Watermark",
        clear: "Clear",
        remove: "Remove Watermark",
        removing: "AI is Processing...",
        success: "Removed ✓",
        download: "Download"
    },
    de: {
        title: "✨ KI Wasserzeichen Entferner",
        brushSize: "Pinselgröße",
        undo: "Rückgängig (Strg+Z)",
        modeNormal: "Normaler Entferner",
        modeGemini: "Gemini Wasserzeichen",
        clear: "Löschen",
        remove: "Wasserzeichen Entfernen",
        removing: "KI Verarbeitet...",
        success: "Entfernt ✓",
        download: "Herunterladen"
    },
    fr: {
        title: "✨ Suppresseur de Filigrane IA",
        brushSize: "Taille du Pinceau",
        undo: "Annuler (Ctrl+Z)",
        modeNormal: "Suppresseur Normal",
        modeGemini: "Filigrane Gemini",
        clear: "Effacer",
        remove: "Supprimer le Filigrane",
        removing: "Traitement IA...",
        success: "Supprimé ✓",
        download: "Télécharger"
    }
};

export const InlineWatermarkRemover: React.FC<InlineWatermarkRemoverProps> = ({ imageUrl, initialMode = 'normal', hideModeSwitcher = false, onCancel }) => {
    const { language } = useLanguage();
    // @ts-ignore
    const loc = translations[language] || translations.en;
    
    const [brushSize, setBrushSize] = useState(20);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    
    // Added states for Undo and Modes
    const [mode, setMode] = useState<'normal' | 'gemini'>(initialMode);
    type Point = { x: number, y: number };
    type Stroke = { points: Point[], size: number };
    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const currentStrokeRef = useRef<Stroke | null>(null);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize Canvas
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            imageRef.current = img;
            initCanvas();
        };
        img.src = imageUrl;
    }, [imageUrl]);

    const redrawCanvas = useCallback(() => {
        if (!canvasRef.current || !imageRef.current || !containerRef.current) return;
        const canvas = canvasRef.current;
        const img = imageRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = Math.min(600, window.innerHeight * 0.6);
        
        const ratio = Math.min(containerWidth / img.width, containerHeight / img.height);
        const drawWidth = img.width * ratio;
        const drawHeight = img.height * ratio;

        canvas.width = drawWidth;
        canvas.height = drawHeight;

        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)'; 

        // Draw saved strokes
        strokes.forEach(stroke => {
            if (!stroke) return;
            ctx.lineWidth = stroke.size;
            ctx.beginPath();
            stroke.points.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
        });
    }, [strokes]);

    useEffect(() => {
        if (imageRef.current) {
            redrawCanvas();
        }
    }, [redrawCanvas, mode]);

    const initCanvas = () => {
        setStrokes([]);
        redrawCanvas();
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (mode === 'gemini') return;
        setIsDrawing(true);
        currentStrokeRef.current = { points: [], size: brushSize };
        draw(e);
    };

    const stopDrawing = () => {
        if (isDrawing && currentStrokeRef.current && currentStrokeRef.current.points.length > 0) {
            setStrokes(prev => [...prev, currentStrokeRef.current!]);
        }
        setIsDrawing(false);
        currentStrokeRef.current = null;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.beginPath(); // Reset path
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !canvasRef.current || mode === 'gemini') return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.lineWidth = brushSize;

        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        if (currentStrokeRef.current) {
            currentStrokeRef.current.points.push({ x, y });
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const handleUndo = useCallback(() => {
        setStrokes(prev => prev.slice(0, -1));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'z') {
                handleUndo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleUndo]);

    const handleClear = () => {
        initCanvas();
    };

    const generateMask = async (): Promise<Blob | null> => {
        if (!canvasRef.current || !imageRef.current) return null;
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = imageRef.current.width;
        maskCanvas.height = imageRef.current.height;
        const mctx = maskCanvas.getContext('2d');
        if (!mctx) return null;
        
        mctx.fillStyle = 'black';
        mctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
        
        if (mode === 'gemini') {
            mctx.fillStyle = 'white';
            // Gemini watermark is a square sparkle at the bottom right.
            // It scales with the image, so we use a percentage instead of a hard limit.
            const size = Math.max(120, maskCanvas.width * 0.1); 
            mctx.fillRect(maskCanvas.width - size, maskCanvas.height - size, size, size);
        } else {
            const canvasW = canvasRef.current.width;
            const scaleX = maskCanvas.width / canvasW;
            
            mctx.lineCap = 'round';
            mctx.lineJoin = 'round';
            mctx.strokeStyle = 'white';
            
            strokes.forEach(stroke => {
                if (!stroke) return;
                mctx.lineWidth = stroke.size * scaleX;
                mctx.beginPath();
                stroke.points.forEach((p, i) => {
                    if (i === 0) mctx.moveTo(p.x * scaleX, p.y * scaleX);
                    else mctx.lineTo(p.x * scaleX, p.y * scaleX);
                });
                mctx.stroke();
            });
        }
        
        return new Promise(resolve => maskCanvas.toBlob(resolve, 'image/png'));
    };

    const handleRemove = async () => {
        if (mode === 'normal' && strokes.length === 0) return;
        setIsProcessing(true);
        try {
            const maskBlob = await generateMask();
            const imgBlob = await fetch(imageUrl).then(r => r.blob());
            
            const file = new File([imgBlob], 'image.jpg', { type: imgBlob.type });
            const maskFile = new File([maskBlob!], 'mask.png', { type: 'image/png' });
            
            const resultBlob = await serverConversionService.removeWatermark(file, maskFile);
            setResultUrl(URL.createObjectURL(resultBlob));
        } catch (error: any) {
            console.error('Watermark removal failed:', error);
            if (error.response && error.response.data instanceof Blob) {
                const text = await error.response.data.text();
                alert(`Server Error: ${text}`);
            } else {
                alert("Error removing watermark. Ensure the backend is running.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = `watermark_removed.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col animate-[fadeIn_0.3s]">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                    <button onClick={onCancel} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-250 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{loc.title}</h3>
                </div>

                {!resultUrl && (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {!hideModeSwitcher && (
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                            <button 
                                onClick={() => { setMode('normal'); setStrokes([]); }}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${mode === 'normal' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-500'}`}
                            >
                                {loc.modeNormal}
                            </button>
                            <button 
                                onClick={() => { setMode('gemini'); setStrokes([]); }}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${mode === 'gemini' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-500'}`}
                            >
                                {loc.modeGemini}
                            </button>
                        </div>
                        )}
                        {mode === 'normal' && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 font-medium">{loc.brushSize}</span>
                                    <input 
                                        type="range" min="5" max="50" value={brushSize} 
                                        onChange={(e) => setBrushSize(Number(e.target.value))}
                                        className="w-24 accent-brand-500"
                                    />
                                </div>
                                <button onClick={handleUndo} disabled={strokes.length === 0} className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30">
                                    {loc.undo}
                                </button>
                                <button onClick={handleClear} className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                    {loc.clear}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {!resultUrl ? (
                    <button
                        onClick={handleRemove}
                        disabled={isProcessing}
                        className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {loc.removing}
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                {loc.remove}
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={handleDownload}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        {loc.download}
                    </button>
                )}
            </div>

            {/* Canvas Area */}
            <div 
                ref={containerRef}
                className="bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex items-center justify-center min-h-[400px] border-t border-slate-100 dark:border-slate-850 relative" 
                style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            >
                {!resultUrl ? (
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onMouseMove={draw}
                        onTouchStart={startDrawing}
                        onTouchEnd={stopDrawing}
                        onTouchMove={draw}
                        className={`max-w-full shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900 touch-none ${mode === 'gemini' ? 'cursor-default pointer-events-none' : 'cursor-crosshair'}`}
                    />
                ) : (
                    <img 
                        src={resultUrl} 
                        alt="Result" 
                        className="max-w-full shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900"
                    />
                )}
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 p-2 bg-slate-50 dark:bg-slate-900/50 mt-auto">
                <AdsterraNativeBanner />
            </div>
        </div>
    );
};
