import { useEffect, useState } from 'react';
import api from '../../services/api';
import BatchCard from '../../components/BatchCard';
import { HiCube } from 'react-icons/hi2';

interface Batch {
    id: number;
    batch_code: string;
    quantity: number;
    unit: string;
    status: string;
    harvest_date: string;
    commodity: { name: string };
    farmer: { name: string; email: string };
}

const AdminBatches = () => {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const res = await api.get('/admin/batches');
                setBatches(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const statusBadge: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-blue-100 text-blue-700',
        rejected: 'bg-red-100 text-red-700',
        completed: 'bg-green-100 text-green-700',
    };


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Semua Batch</h1>
                <p className="text-surface-500 text-sm mt-1">Monitor seluruh batch produksi dalam sistem</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            />
                        ))}
                    </div>

                    {batches.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-xl border border-surface-200 shadow-sm">
                            <HiCube className="w-12 h-12 text-surface-300 mx-auto" />
                            <p className="text-surface-500 mt-3">Belum ada batch yang terdaftar</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminBatches;
