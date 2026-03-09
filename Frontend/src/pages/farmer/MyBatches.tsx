import { useEffect, useState } from 'react';
import api from '../../services/api';
import BatchCard from '../../components/BatchCard';
import { HiArchiveBox } from 'react-icons/hi2';

interface Batch {
    id: number;
    batch_code: string;
    harvest_date: string;
    quantity: number;
    unit: string;
    status: string;
    commodity: { name: string };
}

const MyBatches = () => {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/farmer/batches').then((res: any) => { setBatches(res.data.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Batch Saya</h1>
                <p className="text-surface-500 text-sm mt-1">Riwayat semua batch panen Anda</p>
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
                    />
                ))}
            </div>

            {batches.length === 0 && (
                <div className="text-center py-16">
                    <HiArchiveBox className="w-12 h-12 text-surface-300 mx-auto" />
                    <p className="text-surface-500 mt-3">Belum ada batch, catat panen pertama Anda!</p>
                </div>
            )}
        </div>
    );
};

export default MyBatches;
