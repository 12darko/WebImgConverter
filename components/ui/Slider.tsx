import React from 'react';

interface SliderProps {
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    leftLabel?: string;
    rightLabel?: string;
    showValue?: boolean;
    label?: string;
    valueSuffix?: string;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    leftLabel,
    rightLabel,
    showValue = true,
    label,
    valueSuffix = '%',
    className = '',
}) => {
    const pct = ((value - min) / (max - min)) * 100;

    return (
        <div className={`w-full ${className}`}>
            {(label || showValue) && (
                <div className="flex justify-between items-center mb-2">
                    {label && <span className="text-xs font-semibold text-slate-700">{label}</span>}
                    {showValue && (
                        <span className="text-xs font-semibold text-brand-600">{value}{valueSuffix}</span>
                    )}
                </div>
            )}

            <div className="relative h-1.5 rounded-full bg-slate-100 group">
                <div
                    className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                    style={{ width: `${pct}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                    className="absolute top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border-2 border-brand-500 shadow-card pointer-events-none transition-transform group-hover:scale-110"
                    style={{ left: `${pct}%` }}
                />
            </div>

            {(leftLabel || rightLabel) && (
                <div className="flex justify-between mt-2 text-[11px] text-slate-500">
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>
            )}
        </div>
    );
};
