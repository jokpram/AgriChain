import { useEffect, useState } from 'react';
import api from '../../services/api';
import BatchCard from '../../components/BatchCard';
import { HiCube, HiInboxArrowDown } from 'react-icons/hi2';
import { useToast } from '../../hooks/useToast';

interface Batch {
    id: number;
    batch_code: string;
    harvest_date: string;
    quantity: number;
    unit: string;
    status: string;
    commodity: { name: string };
    farmer: { name: string; email: string };
}

const AvailableBatches = () => {
    const { showToast } = useToast();
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);
    const [pickingId, setPickingId] = useState<number | null>(null);

    useEffect(() => { fetchBatches(); }, []);

    const fetchBatches = async () => {
        try {
            const res = await api.get('/distributor/batches');
            setBatches(res.data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handlePickup = async (batchId: number) => {
        setPickingId(batchId);
        try {
            await api.post('/distributor/pickup', { batch_id: batchId });
            showToast('Batch berhasil diambil!', 'success');
            fetchBatches();
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal mengambil batch', 'error');
        } finally { setPickingId(null); }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Batch Tersedia</h1>
                <p className="text-surface-500 text-sm mt-1">Ambil batch dari petani untuk didistribusikan</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {batches.map((batch) => (
                    <BatchCard
                        key={batch.id}
                        batchCode={batch.batch_code}
                        commodity={batch.commodity?.name || '-'}
                        quantity={batch.quantity}
                        unit={batch.unit}
                        status={batch.status}
                        harvestDate={batch.harvest_date}
                        farmerName={batch.farmer?.name}
                        actions={
                            <button
                                onClick={() => handlePickup(batch.id)}
                                disabled={pickingId === batch.id}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                            >
                                <HiInboxArrowDown className="w-3.5 h-3.5" />
                                {pickingId === batch.id ? 'Mengambil...' : 'Ambil Batch'}
                            </button>
                        }
                    />
                ))}
            </div>

            {batches.length === 0 && (
                <div className="text-center py-16">
                    <HiCube className="w-12 h-12 text-surface-300 mx-auto" />
                    <p className="text-surface-500 mt-3">Tidak ada batch tersedia saat ini</p>
                </div>
            )}
        </div>
    );
};

export default AvailableBatches;
