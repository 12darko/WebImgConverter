import React from 'react';
import { Badge } from '../ui/Badge';
import { formatBytes } from '../../services/toolEngine';
import { useLanguage } from '../../LanguageContext';
import { translations } from '../../translations';

interface FileInfoBarProps {
    filename: string;
    originalBytes: number;
    convertedBytes?: number;
    targetFormat: string;
    savedPercent?: number;
}

const FileIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

export const FileInfoBar: React.FC<FileInfoBarProps> = ({
    filename,
    originalBytes,
    convertedBytes,
    targetFormat,
    savedPercent,
}) => {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as keyof typeof translations;
    const t = translations[activeLang];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                {FileIcon}
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{filename}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.original}: {formatBytes(originalBytes)} {targetFormat && <>• {targetFormat.toUpperCase()}</>}
                </div>
            </div>
            {convertedBytes != null && (
                <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{formatBytes(convertedBytes)}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.predicted} • {targetFormat.toUpperCase()}</div>
                </div>
            )}
            {savedPercent != null && savedPercent > 0 && (
                <Badge tone="mint" icon={
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                }>
                    {savedPercent}% {t.saved}
                </Badge>
            )}
        </div>
    );
};
