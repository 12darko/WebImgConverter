import React from 'react';
import { Chip } from '../ui/Chip';
import { Slider } from '../ui/Slider';
import { Toggle } from '../ui/Toggle';
import { Input } from '../ui/Input';
import { OutputFormat, FORMAT_LABELS } from '../../services/toolEngine';
import { useLanguage } from '../../LanguageContext';
import { translations } from '../../translations';

export interface FormatOption {
    value: OutputFormat;
    label?: string;
    badge?: string;
    disabled?: boolean;
}

interface OptimizationSettingsPanelProps {
    formats: FormatOption[];
    targetFormat: OutputFormat;
    onTargetFormatChange: (f: OutputFormat) => void;

    quality: number;
    onQualityChange: (q: number) => void;

    width?: number;
    height?: number;
    onWidthChange: (w: number | undefined) => void;
    onHeightChange: (h: number | undefined) => void;

    lockAspectRatio: boolean;
    onLockAspectRatioChange: (v: boolean) => void;

    removeMetadata: boolean;
    onRemoveMetadataChange: (v: boolean) => void;

    className?: string;
}

export const OptimizationSettingsPanel: React.FC<OptimizationSettingsPanelProps> = ({
    formats,
    targetFormat,
    onTargetFormatChange,
    quality,
    onQualityChange,
    width,
    height,
    onWidthChange,
    onHeightChange,
    lockAspectRatio,
    onLockAspectRatioChange,
    removeMetadata,
    onRemoveMetadataChange,
    className = '',
}) => {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as keyof typeof translations;
    const t = translations[activeLang];

    return (
        <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card p-5 ${className}`}>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-5 font-sans">{t.opt_settings}</h3>

            {/* Output Format */}
            <div className="mb-5">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{t.output_format}</div>
                <div className="grid grid-cols-2 gap-2">
                    {formats.map((f) => (
                        <Chip
                            key={f.value}
                            active={targetFormat === f.value}
                            disabled={f.disabled}
                            onClick={() => !f.disabled && onTargetFormatChange(f.value)}
                            badge={f.badge}
                            fullWidth
                        >
                            {f.label || FORMAT_LABELS[f.value]}
                        </Chip>
                    ))}
                </div>
            </div>

            {/* Quality */}
            <div className="mb-5">
                <Slider
                    label={t.quality}
                    value={quality}
                    onChange={onQualityChange}
                    min={10}
                    max={100}
                    step={1}
                    leftLabel={t.smaller_file}
                    rightLabel={t.higher_quality}
                />
            </div>

            {/* Resize Dimensions */}
            <div className="mb-5">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{t.resize_dimensions}</div>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={width || ''}
                        onChange={(e) => onWidthChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder={t.width}
                        rightAddon="px"
                    />
                    <div className="text-slate-400 dark:text-slate-500 font-bold">×</div>
                    <Input
                        type="number"
                        value={height || ''}
                        onChange={(e) => onHeightChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder={t.height}
                        rightAddon="px"
                    />
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="lock-aspect"
                        checked={lockAspectRatio}
                        onChange={(e) => onLockAspectRatioChange(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-700 text-brand-500 focus:ring-brand-500/30 bg-transparent"
                    />
                    <label htmlFor="lock-aspect" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                        {t.lock_aspect_ratio}
                    </label>
                </div>
            </div>

            {/* Remove Metadata */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Toggle
                    checked={removeMetadata}
                    onChange={onRemoveMetadataChange}
                    label={t.strip_metadata}
                />
            </div>
        </div>
    );
};
