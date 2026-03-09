import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiPlus, HiSun } from 'react-icons/hi2';
import { useToast } from '../../hooks/useToast';

interface Commodity {
    id: number;
    name: string;
}

const Harvest = () => {
    const { showToast } = useToast();
    const [commodities, setCommodities] = useState<Commodity[]>([]);
    const [form, setForm] = useState({ commodity_id: '', harvest_date: '', quantity: '', unit: 'kg' });
    const [newCommodity, setNewCommodity] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showNewCommodity, setShowNewCommodity] = useState(false);

    useEffect(() => { fetchCommodities(); }, []);

    const fetchCommodities = async () => {
        try {
            const res = await api.get('/batch/commodities');
            setCommodities(res.data.data);
        } catch (err) { console.error(err); }
    };

    const addCommodity = async () => {
        if (!newCommodity.trim()) return;
        try {
            await api.post('/batch/commodities', { name: newCommodity });
            setNewCommodity('');
            setShowNewCommodity(false);
            fetchCommodities();
            showToast('Komoditas berhasil ditambahkan', 'success');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Gagal menambah komoditas');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');
        try {
            const res = await api.post('/farmer/batches', {
                commodity_id: parseInt(form.commodity_id),
                harvest_date: form.harvest_date,
                quantity: parseFloat(form.quantity),
                unit: form.unit
            });
            setSuccess(`Batch berhasil dibuat: ${res.data.data.batch_code}`);
            showToast(`Batch ${res.data.data.batch_code} berhasil dibuat!`, 'success');
            setForm({ commodity_id: '', harvest_date: '', quantity: '', unit: 'kg' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Gagal mencatat panen');
            showToast(err.response?.data?.message || 'Gagal mencatat panen', 'error');
        } finally { setSubmitting(false); }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Input Panen</h1>
                <p className="text-surface-500 text-sm mt-1">Catat hasil panen dan buat Batch ID otomatis</p>
            </div>

            <div className="bg-white rounded-xl border border-surface-200 p-6 max-w-2xl">
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}
                {success && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-sm font-medium">{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-medium text-surface-700">Komoditas</label>
                            <button type="button" onClick={() => setShowNewCommodity(!showNewCommodity)}
                                className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium">
                                <HiPlus className="w-3 h-3" />
                                Komoditas Baru
                            </button>
                        </div>
                        {showNewCommodity && (
                            <div className="flex gap-2 mb-2">
                                <input type="text" value={newCommodity} onChange={(e) => setNewCommodity(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="Nama komoditas baru" />
                                <button type="button" onClick={addCommodity}
                                    className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">Tambah</button>
                            </div>
                        )}
                        <select value={form.commodity_id} onChange={(e) => setForm({ ...form, commodity_id: e.target.value })}
                            className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required>
                            <option value="">Pilih komoditas</option>
                            {commodities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">Tanggal Panen</label>
                        <input type="date" value={form.harvest_date} onChange={(e) => setForm({ ...form, harvest_date: e.target.value })}
                            className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Kuantitas</label>
                            <input type="number" step="0.01" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Satuan</label>
                            <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                                <option value="kg">Kilogram (kg)</option>
                                <option value="ton">Ton</option>
                                <option value="kwintal">Kwintal</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" disabled={submitting}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm disabled:opacity-60 text-sm">
                            <HiSun className="w-4 h-4" />
                            {submitting ? 'Membuat Batch...' : 'Catat Panen & Buat Batch ID'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Harvest;
