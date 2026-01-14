import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    onCropComplete: (cropData: { x: number; y: number; width: number; height: number }) => void;
}

export const CropModal: React.FC<CropModalProps> = ({ isOpen, onClose, imageUrl, onCropComplete }) => {
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

        // If unit is '%', convert to display pixels first
        let displayX: number, displayY: number, displayWidth: number, displayHeight: number;

        if (crop.unit === '%') {
            // Percentage values (0-100) -> display pixels
            displayX = (crop.x / 100) * img.width;
            displayY = (crop.y / 100) * img.height;
            displayWidth = (crop.width / 100) * img.width;
            displayHeight = (crop.height / 100) * img.height;
        } else {
            // Already in pixels
            displayX = crop.x || 0;
            displayY = crop.y || 0;
            displayWidth = crop.width || 0;
            displayHeight = crop.height || 0;
        }

        // Scale from display pixels to natural image pixels
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        const pixelCrop = {
            x: Math.round(displayX * scaleX),
            y: Math.round(displayY * scaleY),
            width: Math.round(displayWidth * scaleX),
            height: Math.round(displayHeight * scaleY)
        };

        onCropComplete(pixelCrop);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Recalculate crop when aspect ratio changes
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
        } else if (imgRef.current && aspectRatio === undefined) {
            // Serbest mod - mevcut crop'u koru
        }
    }, [aspectRatio]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-[#0B0F19] rounded-2xl border border-slate-700 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-800">
                    <h3 className="text-white font-bold text-lg">✂️ Kırpma Aracı</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
                </div>

                {/* Aspect Ratio Buttons */}
                <div className="flex gap-2 p-4 border-b border-slate-800">
                    <button onClick={() => setAspectRatio(undefined)} className={`px-3 py-1.5 rounded text-xs ${!aspectRatio ? 'bg-indigo-600' : 'bg-slate-700'}`}>Serbest</button>
                    <button onClick={() => setAspectRatio(1)} className={`px-3 py-1.5 rounded text-xs ${aspectRatio === 1 ? 'bg-indigo-600' : 'bg-slate-700'}`}>1:1</button>
                    <button onClick={() => setAspectRatio(16 / 9)} className={`px-3 py-1.5 rounded text-xs ${aspectRatio === 16 / 9 ? 'bg-indigo-600' : 'bg-slate-700'}`}>16:9</button>
                    <button onClick={() => setAspectRatio(4 / 3)} className={`px-3 py-1.5 rounded text-xs ${aspectRatio === 4 / 3 ? 'bg-indigo-600' : 'bg-slate-700'}`}>4:3</button>
                    <button onClick={() => setAspectRatio(3 / 2)} className={`px-3 py-1.5 rounded text-xs ${aspectRatio === 3 / 2 ? 'bg-indigo-600' : 'bg-slate-700'}`}>3:2</button>
                </div>

                {/* Crop Area */}
                <div className="p-4 max-h-[60vh] overflow-auto flex justify-center">
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        aspect={aspectRatio}
                        className="max-w-full"
                    >
                        <img
                            ref={imgRef}
                            src={imageUrl}
                            onLoad={onImageLoad}
                            alt="Crop preview"
                            className="max-w-full max-h-[50vh] object-contain"
                        />
                    </ReactCrop>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-4 border-t border-slate-800">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm">İptal</button>
                    <button onClick={handleApply} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Uygula</button>
                </div>
            </div>
        </div>
    );
};
