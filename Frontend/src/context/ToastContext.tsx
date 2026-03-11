import { createContext, useState, useCallback, ReactNode, useContext } from 'react';
import { HiCheckCircle, HiXCircle, HiExclamationTriangle, HiInformationCircle, HiXMark } from 'react-icons/hi2';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
    showConfirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
}

export const ToastContext = createContext<ToastContextType>({} as ToastContextType);

const iconMap: Record<ToastType, typeof HiCheckCircle> = {
    success: HiCheckCircle,
    error: HiXCircle,
    warning: HiExclamationTriangle,
    info: HiInformationCircle,
};

const colorMap: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
    success: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-500', text: 'text-green-800' },
    error: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-500', text: 'text-red-800' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500', text: 'text-amber-800' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', text: 'text-blue-800' },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        message: string;
        onConfirm: () => void;
        onCancel?: () => void;
    }>({ isOpen: false, message: '', onConfirm: () => { } });

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const showConfirm = useCallback((message: string, onConfirm: () => void, onCancel?: () => void) => {
        setConfirmDialog({ isOpen: true, message, onConfirm, onCancel });
    }, []);

    const handleConfirm = () => {
        confirmDialog.onConfirm();
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    };

    const handleCancel = () => {
        if (confirmDialog.onCancel) {
            confirmDialog.onCancel();
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    };

    return (
        <ToastContext.Provider value={{ showToast, showConfirm }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => {
                    const Icon = iconMap[toast.type];
                    const colors = colorMap[toast.type];
                    return (
                        <div
                            key={toast.id}
                            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-[slideIn_0.3s_ease-out] ${colors.bg} ${colors.border}`}
                            style={{ animation: 'slideIn 0.3s ease-out' }}
                        >
                            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${colors.icon}`} />
                            <p className={`text-sm font-medium flex-1 ${colors.text}`}>{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 text-surface-400 hover:text-surface-600 transition-colors"
                            >
                                <HiXMark className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Confirm Dialog Modal */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 z-[9999] bg-surface-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-[slideIn_0.3s_ease-out]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                                <HiExclamationTriangle className="w-6 h-6 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-bold text-surface-900">Konfirmasi</h3>
                        </div>
                        <p className="text-surface-600 mb-6">{confirmDialog.message}</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 rounded-xl text-surface-600 font-medium hover:bg-surface-100 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-md shadow-primary-500/20"
                            >
                                Ya, Lanjutkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyframes */}
            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
