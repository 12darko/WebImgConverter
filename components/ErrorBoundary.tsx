import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary - Catches JavaScript errors and displays a fallback UI
 * Also logs errors for debugging (can be extended to send to Sentry)
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console (and optionally to external service)
        console.error('🚨 VormPixyze Error:', error);
        console.error('Component Stack:', errorInfo.componentStack);

        // TODO: Send to Sentry or other error tracking service
        // if (window.Sentry) {
        //   window.Sentry.captureException(error, { extra: errorInfo });
        // }
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
                    <div className="glass-panel max-w-md w-full p-8 rounded-2xl text-center">
                        <div className="text-6xl mb-4">😵</div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Bir şeyler yanlış gitti
                        </h1>
                        <p className="text-slate-400 mb-6">
                            Beklenmedik bir hata oluştu. Lütfen sayfayı yenileyin.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <pre className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-left text-xs text-red-300 mb-4 overflow-auto max-h-32">
                                {this.state.error.toString()}
                            </pre>
                        )}
                        <button
                            onClick={this.handleReload}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                        >
                            Sayfayı Yenile
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export { ErrorBoundary };
