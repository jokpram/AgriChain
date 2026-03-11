import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useToast } from '../../hooks/useToast';
import { HiArrowRight } from 'react-icons/hi2';

interface Distribution {
    id: number;
    status: string;
    pickup_date: string;
    delivery_date: string;
    batch: {
        batch_code: string;
        quantity: number;
        unit: string;
        price_per_unit: number;
        commodity: { name: string };
        farm: { farm_name: string };
    };
    distributionBuyer: { name: string; email: string } | null;
}

const statusFlow = ['pending', 'picked', 'in_transit', 'delivered'];
const statusLabels: Record<string, string> = {
    pending: 'Pending',
    picked: 'Diambil',
    in_transit: 'Dalam Perjalanan',
    delivered: 'Terkirim',
};

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    picked: 'bg-indigo-100 text-indigo-700',
    in_transit: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
};

const DistributionPage = () => {
    const { showToast } = useToast();
    const [distributions, setDistributions] = useState<Distribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    useEffect(() => { fetchDistributions(); }, []);

    const fetchDistributions = async () => {
        try {
            const res = await api.get('/distributor/distributions');
            setDistributions(res.data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const updateStatus = async (distId: number, currentStatus: string) => {
        const currentIdx = statusFlow.indexOf(currentStatus);
        if (currentIdx === -1 || currentIdx >= statusFlow.length - 1) return;
        const nextStatus = statusFlow[currentIdx + 1];

        setUpdatingId(distId);
        try {
            await api.patch('/distributor/status', { distribution_id: distId, status: nextStatus });
            showToast(`Status berhasil diubah ke ${statusLabels[nextStatus]}`, 'success');
            fetchDistributions();
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal update status', 'error');
        } finally { setUpdatingId(null); }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Distribusi Saya</h1>
                <p className="text-surface-500 text-sm mt-1">Kelola dan lacak distribusi batch</p>
            </div>

            <div className="bg-white rounded-xl border border-surface-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="bg-surface-50 border-b border-surface-200">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase whitespace-nowrap">Batch</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase whitespace-nowrap">Asal</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase whitespace-nowrap">Komoditas</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase whitespace-nowrap">Kuantitas</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase whitespace-nowrap">Status</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase whitespace-nowrap">Tanggal Pickup</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-surface-500 uppercase whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {distributions.map((dist) => (
                                <tr key={dist.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <p className="text-sm font-bold text-surface-800 font-mono">{dist.batch?.batch_code}</p>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-surface-600 truncate max-w-[150px] whitespace-nowrap">{dist.batch?.farm?.farm_name}</td>
                                    <td className="px-5 py-3.5 text-sm text-surface-600 whitespace-nowrap">{dist.batch?.commodity?.name}</td>
                                    <td className="px-5 py-3.5 text-sm text-surface-600 whitespace-nowrap">
                                        {dist.batch?.quantity} {dist.batch?.unit}
                                        <br /><span className="text-[10px] text-primary-600 font-medium tracking-wide">Rp{dist.batch?.price_per_unit || 0}/{dist.batch?.unit}</span>
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[dist.status] || 'bg-surface-100 text-surface-600'}`}>
                                            {statusLabels[dist.status] || dist.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-surface-500 whitespace-nowrap">
                                        {dist.pickup_date ? new Date(dist.pickup_date).toLocaleDateString('id-ID') : '-'}
                                    </td>
                                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                        {dist.status !== 'delivered' && (
                                            <button
                                                onClick={() => updateStatus(dist.id, dist.status)}
                                                disabled={updatingId === dist.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-60"
                                            >
                                                <HiArrowRight className="w-3 h-3" />
                                                {updatingId === dist.id ? 'Updating...' : statusLabels[statusFlow[statusFlow.indexOf(dist.status) + 1]] || 'Next'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {distributions.length === 0 && (
                                <tr><td colSpan={7} className="px-5 py-10 text-center text-surface-400 text-sm">Belum ada distribusi</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DistributionPage;
