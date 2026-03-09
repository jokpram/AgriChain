import { HiCalendar, HiUser, HiScale } from 'react-icons/hi2';
import { ReactNode } from 'react';

interface BatchCardProps {
    batchCode: string;
    commodity: string;
    quantity: number;
    unit: string;
    status: string;
    harvestDate: string;
    farmerName?: string;
    actions?: ReactNode;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    available: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'Tersedia' },
    distributed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Distribusi' },
    sold: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Terjual' },
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'Pending' },
};

const BatchCard = ({ batchCode, commodity, quantity, unit, status, harvestDate, farmerName, actions }: BatchCardProps) => {
    const statusStyle = statusConfig[status] || { bg: 'bg-surface-50', text: 'text-surface-600', dot: 'bg-surface-400', label: status };

    return (
        <div className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-md transition-all duration-200 flex flex-col">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">Batch ID</p>
                    <p className="text-sm font-bold text-surface-800 font-mono mt-0.5">{batchCode}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                    {statusStyle.label}
                </span>
            </div>

            <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                        <HiScale className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                        <p className="text-xs text-surface-400">Komoditas</p>
                        <p className="text-sm font-semibold text-surface-700">{commodity}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-500">Kuantitas</span>
                    <span className="font-semibold text-surface-700">{quantity} {unit}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-surface-400">
                    <HiCalendar className="w-3.5 h-3.5" />
                    <span>{new Date(harvestDate).toLocaleDateString('id-ID')}</span>
                </div>

                {farmerName && (
                    <div className="flex items-center gap-1.5 text-xs text-surface-400">
                        <HiUser className="w-3.5 h-3.5" />
                        <span>{farmerName}</span>
                    </div>
                )}
            </div>

            {actions && <div className="mt-3 pt-3 border-t border-surface-100">{actions}</div>}
        </div>
    );
};

export default BatchCard;
