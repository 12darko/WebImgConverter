
import React, { useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
  acceptTypes?: string; // e.g. "image/png, .heic" or undefined for all
  formatBadges?: string[]; // e.g. ["HEIC", "JPG"] for display
  title?: string;
  description?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFilesAdded, disabled, acceptTypes, formatBadges, title, description }) => {
  const { t } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer rounded-[24px] p-12 transition-all duration-300 ease-out
        flex flex-col items-center justify-center text-center overflow-hidden border-2 border-dashed
        ${disabled
          ? 'opacity-60 cursor-not-allowed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600'
          : isDragOver
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/20 scale-[1.02] shadow-[0_0_40px_rgba(16,185,129,0.15)]'
            : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-brand-50/30 dark:hover:bg-brand-950/10'
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
        accept={acceptTypes || "image/png, image/jpeg, image/webp, .heic, .heif"}
        multiple
      />

      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-brand-400/5 via-emerald-400/5 to-transparent dark:from-brand-500/10 dark:via-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className={`relative z-10 p-5 rounded-full mb-6 shadow-sm border border-brand-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300 ${isDragOver ? 'bg-brand-600 dark:bg-brand-500 text-white' : 'bg-white dark:bg-slate-800 text-brand-500 dark:text-brand-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>

      <h3 className={`relative z-10 text-2xl font-bold mb-2 tracking-tight ${disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100'}`}>
        {disabled ? t('drop_limit') : (title || t('drop_title'))}
      </h3>
      <p className="relative z-10 text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed font-medium">
        {disabled ? t('drop_limit_desc') : (description || t('drop_desc'))}
      </p>

      {!disabled && (
        <div className="relative z-10 mt-6 flex gap-3 opacity-80">
          {(formatBadges || ['HEIC', 'JPG', 'PNG']).map((badge) => (
            <span key={badge} className="px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 shadow-sm">{badge}</span>
          ))}
        </div>
      )}
    </div>
  );
};
