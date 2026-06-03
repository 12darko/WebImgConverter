import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdsterraNativeBanner } from '../ads/AdsterraNativeBanner';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface InlineCropProps {
    imageUrl: string;
    onCropComplete: (cropData: { x: number; y: number; width: number; height: number }) => void;
    onCancel: () => void;
}

export const InlineCrop: React.FC<InlineCropProps> = ({ imageUrl, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState<Crop>();
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        const initialCrop = centerCrop(
            makeAspectCrop(
                { unit: '%', width: 80 },
                aspectRatio || width / height,
                width,
                height
            ),
            width,
            height
        );
        setCrop(initialCrop);
    };

    // Canvas-based crop & download — no server needed
    const handleCropAndDownload = useCallback(() => {
        if (!crop || !imgRef.current) return;
        setIsDownloading(true);

        const img = imgRef.current;

        // Calculate pixel coordinates from the crop (which may be in % or px)
        let cropX: number, cropY: number, cropW: number, cropH: number;
        if (crop.unit === '%') {
            cropX = (crop.x / 100) * img.naturalWidth;
            cropY = (crop.y / 100) * img.naturalHeight;
            cropW = (crop.width / 100) * img.naturalWidth;
            cropH = (crop.height / 100) * img.naturalHeight;
        } else {
            // crop is in display pixels — scale to natural
            const scaleX = img.naturalWidth / img.width;
            const scaleY = img.naturalHeight / img.height;
            cropX = (crop.x || 0) * scaleX;
            cropY = (crop.y || 0) * scaleY;
            cropW = (crop.width || 0) * scaleX;
            cropH = (crop.height || 0) * scaleY;
        }

        // Clamp to image bounds
        cropX = Math.max(0, Math.round(cropX));
        cropY = Math.max(0, Math.round(cropY));
        cropW = Math.min(img.naturalWidth - cropX, Math.round(cropW));
        cropH = Math.min(img.naturalHeight - cropY, Math.round(cropH));

        if (cropW <= 0 || cropH <= 0) {
            setIsDownloading(false);
            return;
        }

        // Draw cropped region onto a canvas
        const canvas = document.createElement('canvas');
        canvas.width = cropW;
        canvas.height = cropH;
        const ctx = canvas.getContext('2d');
        if (!ctx) { setIsDownloading(false); return; }

        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        // Download as PNG (lossless)
        canvas.toBlob((blob) => {
            if (!blob) { setIsDownloading(false); return; }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cropped_${cropW}x${cropH}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 2000);

            setIsDownloading(false);
            setDownloadSuccess(true);

            // Also notify parent so it can update state
            onCropComplete({ x: cropX, y: cropY, width: cropW, height: cropH });
        }, 'image/png');
    }, [crop, onCropComplete]);

    // Reset crop when aspect ratio changes
    useEffect(() => {
        if (imgRef.current && aspectRatio !== undefined) {
            const { width, height } = imgRef.current;
            const newCrop = centerCrop(
                makeAspectCrop(
                    { unit: '%', width: 80 },
                    aspectRatio,
                    width,
                    height
                ),
                width,
                height
            );
            setCrop(newCrop);
        }
    }, [aspectRatio]);

    // Crop dimensions info
    const getCropInfo = (): string => {
        if (!crop || !imgRef.current) return '';
        const img = imgRef.current;
        let w: number, h: number;
        if (crop.unit === '%') {
            w = Math.round((crop.width / 100) * img.naturalWidth);
            h = Math.round((crop.height / 100) * img.naturalHeight);
        } else {
            const scaleX = img.naturalWidth / img.width;
            const scaleY = img.naturalHeight / img.height;
            w = Math.round((crop.width || 0) * scaleX);
            h = Math.round((crop.height || 0) * scaleY);
        }
        return `${w} × ${h} px`;
    };

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col animate-[fadeIn_0.3s]">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                    <button onClick={onCancel} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-250 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors" title="İptal">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">✂️ Akıllı Kırpıcı</h3>
                    {crop && (
                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-lg">
                            {getCropInfo()}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    <button onClick={() => setAspectRatio(undefined)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!aspectRatio ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Serbest</button>
                    <button onClick={() => setAspectRatio(1)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${aspectRatio === 1 ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>1:1</button>
                    <button onClick={() => setAspectRatio(16 / 9)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${aspectRatio === 16 / 9 ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>16:9</button>
                    <button onClick={() => setAspectRatio(4 / 3)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${aspectRatio === 4 / 3 ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>4:3</button>
                    <button onClick={() => setAspectRatio(9 / 16)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${aspectRatio === 9 / 16 ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>9:16</button>
                </div>

                <button
                    onClick={handleCropAndDownload}
                    disabled={isDownloading || !crop}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${
                        downloadSuccess
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                            : 'bg-brand-600 hover:bg-brand-500 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isDownloading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Kırpılıyor...
                        </>
                    ) : downloadSuccess ? (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            İndirildi ✓
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Kırp ve İndir
                        </>
                    )}
                </button>
            </div>

            {/* Canvas Area */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex items-center justify-center min-h-[400px] border-t border-slate-100 dark:border-slate-850" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                <ReactCrop
                    crop={crop}
                    onChange={(c) => { setCrop(c); setDownloadSuccess(false); }}
                    aspect={aspectRatio}
                    className="max-w-full shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900"
                >
                    <img
                        ref={imgRef}
                        src={imageUrl}
                        onLoad={onImageLoad}
                        alt="Crop preview"
                        crossOrigin="anonymous"
                        className="max-w-full max-h-[60vh] object-contain dark:brightness-90 dark:opacity-90"
                    />
                </ReactCrop>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 p-2 bg-slate-50 dark:bg-slate-900/50 mt-auto">
                <AdsterraNativeBanner />
            </div>
        </div>
    );
};
