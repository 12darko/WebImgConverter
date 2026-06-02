import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { getHistory, clearHistory, ConversionRecord } from '../services/historyService';

interface HistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [history, setHistory] = useState<ConversionRecord[]>([]);
    const [loading, setLoading] = useState(false);

    // Scroll Lock Effect
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            fetchHistory();
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const fetchHistory = async () => {
        setLoading(true);
        const data = await getHistory();
        setHistory(data);
        setLoading(false);
    };

    const handleClear = async () => {
        if (confirm("Geçmişi temizlemek istediğinize emin misiniz?")) {
            setLoading(true);
            const success = await clearHistory();
            if (success) {
                setHistory([]);
            }
            setLoading(false);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('tr-TR', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden touch-none">
            <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md transition-opacity" onClick={onClose} />

            <div className="relative z-10 w-full max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col max-h-[85vh] animate-[fadeIn_0.3s_ease-out]">

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            📜 {t('feat_history') || 'Dönüşüm Geçmişi'}
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Veriler gizlilik politikası gereği 7 gün sonra otomatik silinir.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white p-2 text-xl">✕</button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-slate-600">
                    {loading ? (
                        <div className="flex justify-center p-10">
                            <div className="w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="text-center py-16 text-slate-500">
                            <p className="text-4xl mb-2">🕵️‍♂️</p>
                            <p>{t('history_empty') || 'Henüz bir işlem geçmişi bulunamadı.'}</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-slate-500 uppercase border-b border-white/5">
                                    <th className="pb-3 pl-2">Tarih</th>
                                    <th className="pb-3">Dosya</th>
                                    <th className="pb-3">Format</th>
                                    <th className="pb-3">Boyut (Önce/Sonra)</th>
                                    <th className="pb-3 text-right pr-2">Tasarruf</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {history.map((item, idx) => {
                                    const saved = item.file_size - item.converted_size;
                                    const percent = Math.round((saved / item.file_size) * 100);
                                    return (
                                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="py-3 pl-2 text-slate-400 font-mono text-xs whitespace-nowrap">{formatDate(item.created_at)}</td>
                                            <td className="py-3 text-white font-medium truncate max-w-[200px]" title={item.file_name}>{item.file_name}</td>
                                            <td className="py-3">
                                                <span className="text-[10px] px-2 py-1 rounded bg-slate-700/50 text-slate-300 border border-slate-600/50">
                                                    {item.format.split('/')[1]?.toUpperCase() || item.format}
                                                </span>
                                            </td>
                                            <td className="py-3 text-slate-300">
                                                {formatSize(item.file_size)} ➝ <span className="text-emerald-400">{formatSize(item.converted_size)}</span>
                                            </td>
                                            <td className="py-3 text-right pr-2">
                                                {saved > 0 ? (
                                                    <span className="text-emerald-400 font-bold">%{percent}</span>
                                                ) : (
                                                    <span className="text-slate-500">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 flex justify-between bg-slate-900/50 rounded-b-2xl">
                    <button
                        onClick={fetchHistory}
                        className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"
                    >
                        🔄 Yenile
                    </button>

                    {history.length > 0 && (
                        <button
                            onClick={handleClear}
                            className="text-xs px-4 py-2 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                        >
                            Geçmişi Temizle
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
