import { useEffect, useState } from 'react';
import api from '../../services/api';
import BatchCard from '../../components/BatchCard';
import { HiShoppingCart, HiXMark } from 'react-icons/hi2';
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

const Marketplace = () => {
    const { showToast } = useToast();
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderForm, setOrderForm] = useState<{ batchId: number; price: string; quantity: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { fetchBatches(); }, []);

    const fetchBatches = async () => {
        try {
            const res = await api.get('/buyer/batches');
            setBatches(res.data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleOrder = async () => {
        if (!orderForm) return;
        setSubmitting(true);
        try {
            await api.post('/buyer/order', {
                batch_id: orderForm.batchId,
                price: parseFloat(orderForm.price),
                quantity: parseFloat(orderForm.quantity)
            });
            setOrderForm(null);
            fetchBatches();
            showToast('Pesanan berhasil dibuat!', 'success');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal membuat pesanan', 'error');
        } finally { setSubmitting(false); }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Marketplace</h1>
                <p className="text-surface-500 text-sm mt-1">Jelajahi dan beli hasil pertanian</p>
            </div>

            {orderForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-surface-800">Buat Pesanan</h3>
                            <button onClick={() => setOrderForm(null)} className="p-1 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
                                <HiXMark className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 mb-1">Kuantitas</label>
                                <input type="number" step="0.01" value={orderForm.quantity}
                                    onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 mb-1">Harga Total (Rp)</label>
                                <input type="number" step="100" value={orderForm.price}
                                    onChange={(e) => setOrderForm({ ...orderForm, price: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setOrderForm(null)}
                                className="flex-1 py-2.5 border border-surface-200 text-surface-600 text-sm font-medium rounded-lg hover:bg-surface-50">
                                Batal
                            </button>
                            <button onClick={handleOrder} disabled={submitting}
                                className="flex-1 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 disabled:opacity-60">
                                {submitting ? 'Memproses...' : 'Pesan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                onClick={() => setOrderForm({ batchId: batch.id, price: '', quantity: String(batch.quantity) })}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all"
                            >
                                <HiShoppingCart className="w-3.5 h-3.5" />
                                Beli
                            </button>
                        }
                    />
                ))}
            </div>

            {batches.length === 0 && (
                <div className="text-center py-16">
                    <HiShoppingCart className="w-12 h-12 text-surface-300 mx-auto" />
                    <p className="text-surface-500 mt-3">Belum ada produk di marketplace</p>
                </div>
            )}
        </div>
    );
};

export default Marketplace;
