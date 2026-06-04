import React from 'react';

interface ToolDropzoneProps {
    onFiles: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    title?: string;
    subtitle?: string;
    className?: string;
}

const ImageIcon = (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
);

export const ToolDropzone: React.FC<ToolDropzoneProps> = ({
    onFiles,
    accept = 'image/*',
    multiple = false,
    title = 'Drag & Drop Images Here',
    subtitle = 'or click to browse',
    className = '',
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = React.useState(false);

    const handleFiles = (files: FileList | File[] | null) => {
        if (!files) return;
        const arr = Array.from(files);
        if (arr.length > 0) onFiles(arr);
    };

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={[
                'group relative flex flex-col items-center justify-center text-center cursor-pointer transition-all',
                'rounded-3xl border-2 border-dashed bg-brand-50/40 dark:bg-brand-950/10',
                dragOver
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/20 ring-4 ring-brand-500/10'
                    : 'border-brand-200 dark:border-brand-900/50 hover:border-brand-400 hover:bg-brand-50/70 dark:hover:bg-brand-950/20',
                'p-10 sm:p-12 min-h-[260px]',
                className,
            ].join(' ')}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="w-20 h-20 mb-5 rounded-2xl bg-white dark:bg-slate-800 border border-brand-200 dark:border-slate-700 flex items-center justify-center text-brand-500 dark:text-brand-400 shadow-card dark:shadow-none group-hover:scale-105 transition-transform">
                {ImageIcon}
            </div>
            <div className="text-base font-semibold text-slate-800 dark:text-slate-200">{title}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</div>
        </div>
    );
};
