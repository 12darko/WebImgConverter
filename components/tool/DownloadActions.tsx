import React from 'react';
import { Button } from '../ui/Button';

interface DownloadActionsProps {
    onDownload: () => void;
    onBatch?: () => void;
    canDownload: boolean;
    isProcessing?: boolean;
    statusText?: string;
    showBatch?: boolean;
}

const DownloadIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const BatchIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
        <path d="M8 6H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
);

const CheckIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const DownloadActions: React.FC<DownloadActionsProps> = ({
    onDownload,
    onBatch,
    canDownload,
    isProcessing,
    statusText,
    showBatch = true,
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card p-4 space-y-2">
            <Button
                onClick={onDownload}
                disabled={!canDownload || isProcessing}
                fullWidth
                leftIcon={DownloadIcon}
                size="md"
            >
                Download Processed Image
            </Button>
            {showBatch && (
                <Button
                    onClick={onBatch}
                    variant="secondary"
                    fullWidth
                    leftIcon={BatchIcon}
                    size="md"
                >
                    Batch Convert (Pro)
                </Button>
            )}
            <div className="text-center pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    {canDownload && !isProcessing && (
                        <span className="text-brand-500">{CheckIcon}</span>
                    )}
                    <span>
                        {isProcessing ? 'Processing...' : statusText || (canDownload ? 'Ready to Download' : 'Upload an image to start')}
                    </span>
                </span>
            </div>
        </div>
    );
};
