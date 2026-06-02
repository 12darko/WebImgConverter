import React, { useState, useRef, useEffect } from 'react';
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

    const handleApply = () => {
        if (!crop || !imgRef.current) return;

        const img = imgRef.current;
        let displayX: number, displayY: number, displayWidth: number, displayHeight: number;

        if (crop.unit === '%') {
            displayX = (crop.x / 100) * img.width;
            displayY = (crop.y / 100) * img.height;
            displayWidth = (crop.width / 100) * img.width;
            displayHeight = (crop.height / 100) * img.height;
        } else {
            displayX = crop.x || 0;
            displayY = crop.y || 0;
            displayWidth = crop.width || 0;
            displayHeight = crop.height || 0;
        }

        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        const pixelCrop = {
            x: Math.round(displayX * scaleX),
            y: Math.round(displayY * scaleY),
            width: Math.round(displayWidth * scaleX),
            height: Math.round(displayHeight * scaleY)
        };

        onCropComplete(pixelCrop);
    };

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

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col animate-[fadeIn_0.3s]">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                    <button onClick={onCancel} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-250 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors" title="İptal">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">✂️ Akıllı Kırpıcı</h3>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    <button onClick={() => setAspectRatio(undefined)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!aspectRatio ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Serbest</button>
                    <button onClick={() => setAspectRatio(1)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${aspectRatio === 1 ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>1:1</button>
                    <button onClick={() => setAspectRatio(16 / 9)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${aspectRatio === 16 / 9 ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>16:9</button>
                    <button onClick={() => setAspectRatio(4 / 3)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${aspectRatio === 4 / 3 ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>4:3</button>
                </div>

                <button onClick={handleApply} className="w-full sm:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Uygula ve İndir
                </button>
            </div>

            {/* Canvas Area */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex items-center justify-center min-h-[400px] border-t border-slate-100 dark:border-slate-850" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={aspectRatio}
                    className="max-w-full shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900"
                >
                    <img
                        ref={imgRef}
                        src={imageUrl}
                        onLoad={onImageLoad}
                        alt="Crop preview"
                        className="max-w-full max-h-[60vh] object-contain dark:brightness-90 dark:opacity-90"
                    />
                </ReactCrop>
            </div>
        </div>
    );
};
